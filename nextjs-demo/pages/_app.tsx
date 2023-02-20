import type { AppProps, AppContext } from 'next/app';
import React from 'react';
import App from 'next/app';
import { Layout, ILayoutProps } from '@/components/layout';
import Head from 'next/head';
import axios from 'axios';
import { getIsMobile, getIsSupportWebp, LOCALDOMAIN } from '@/utils';
import { ThemeContextProvider } from '@/stores/theme';
import { UserAgentProvider } from '@/stores/userAgent';
import { LanguageContextProvider } from '@/stores/language';
import './global.scss';
//?:boolean意思是类型可以是boolean 也可以是undefined
export interface IComponentProps {
  isMobile?: boolean;
  isSupportWebp?: boolean;
}
//& 好像是拼接的意思
const MyApp = (data: AppProps & ILayoutProps & IComponentProps): JSX.Element => {
  const { Component, pageProps, navbarData, footerData, isMobile, isSupportWebp } = data;

  return (
    <div>
      <Head>
        <title>{`稀土掘金`}</title>
        <meta name="description" content={`掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。(${isMobile ? '移动端' : 'pc端'})`} />
        <meta name="viewport" content="user-scalable=no" />
        <meta name="keywords" content="掘金,稀土,Vue.js,前端面试题,Kotlin,ReactNative,Python" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <UserAgentProvider>
            <Layout navbarData={navbarData} footerData={footerData}>
              <Component {...pageProps} isMobile={isMobile} isSupportWebp={isSupportWebp} />
            </Layout>
          </UserAgentProvider>
        </ThemeContextProvider>
      </LanguageContextProvider>
    </div>
  );
};
MyApp.getInitialProps = async (context: AppContext): Promise<AppProps & ILayoutProps & IComponentProps> => {
  const pageProps = await App.getInitialProps(context);
  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`);
  //为什么自动加上populate参数
  return {
    ...pageProps,
    ...data,
    isMobile: getIsMobile(context),
    isSupportWebp: getIsSupportWebp(context),
  };
};

export default MyApp;
