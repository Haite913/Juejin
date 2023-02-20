import { LOCALDOMAIN } from '@/utils';
import axios from 'axios';
import React from 'react';
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styles from './styles.module.scss';
import {SideBar } from '@/components/sidebar/index'
import {OperateRow } from '@/components/element/operate/index'
import {UserInfoRow} from '@/components/element/userInfo/index'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// shutdown 是 markdown格式转html的工具
const showdown = require('showdown');

export interface IArticleProps {
  title: string;
  author: string;
  description: string;
  createTime: string;
  content: string;
}
//参数转成html代码
const Article: NextPage<IArticleProps> = ({ title, author, description, createTime, content }) => {
  const converter = new showdown.Converter();
  return (
    <div  className={styles.articleContainer} >
      <SideBar>
        <div style={{width:"auto",}} >
          <UserInfoRow></UserInfoRow>
          <OperateRow></OperateRow>
        </div>
      </SideBar>
      <div className={styles.article}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.info}>
          作者：{author} | 创建时间: {createTime}
        </div>
        <div className={styles.description}>{description}</div>
        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} className={styles.content} />
      </div>
    </div>
  );
};

// Article.getInitialProps = async (context): Promise<IArticleProps> => {
//   // debugger;
//   const { articleId } = context.query;
//   const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
//     params: {
//       articleId,
//     },
//   });
//   return data;
// };
//服务器先获取所有的数据 ssr //第一个是函数名，虽然和类型一样//在网页方位的时候自动调用
//无需手动调用？获得的数据自动填充到Article函数中
export const getServerSideProps: GetServerSideProps = async (context) => {
  //获取请求参数[articleId]
  const { articleId } = context.query;
  const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
    params: {
      articleId,
    },
  });
  return {
    props: data, // 需要拿props包裹
  };
};

// ssg;
// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [{ params: { articleId: '1' } }],
//   fallback: false,
// });

// export const getStaticProps: GetStaticProps = async context => {
//   const { articleId } = context.params as any;
//   const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
//     params: {
//       articleId,
//     },
//   });
//   return {
//     props: data,
//   };
// };

export default Article;
