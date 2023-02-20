import { LOCALDOMAIN ,CMSDOMAIN} from '@/utils';
import axios from 'axios';
import { FC, useContext, useEffect, useRef, useState} from "react";
import React from 'react';
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styles from './styles.module.scss';
import {Entry } from '@/components/entry';
import { UserAgentContext } from "@/stores/userAgent";
import { Environment } from '@/constants/enum';
import {SideBar} from '@/components/sidebar'
import {UserInfoRow } from '@/components/element/userInfo'
import {IUserInfoRowProps} from "@/components/element/userInfo/index"
import { IArticleBriefProps} from "@/components/entry/index"
interface ICategoryProps {
  name:string;
  link:string;
}
export interface IJuejinAdvertiseData{
  homeAdvertise:string;
}
export interface IJuejinAuthorRank{
  authorRank:Array<IUserInfoRowProps>;
}
export interface IJuejinLinkRead{
  linkRead:Array<{cover:string,title:string}>;
}
export interface IJuejinArticles{
  articles:Array<IArticleBriefProps>
}
export interface InavHide{
  navHide:boolean
}
interface IJuejinHome{
  homeAdvertise?:string;
  articles:Array<IArticleBriefProps>
  authorRank?:Array<IUserInfoRowProps>;
  linkRead?:Array<{cover:string,title:string}>
}
const Home: NextPage<IJuejinHome> = ({
  homeAdvertise ,authorRank,linkRead,articles}) => {

  const { userAgent } = useContext(UserAgentContext);
  let categoryData: ICategoryProps[]=[
  {name:"综合",link:"recommend"},
  {name:"关注",link:"following"},
  {name:"后端",link:"backend"},
  {name:"前端",link:"frontend"},
  {name:"android",link:"android"},
  {name:"iOS",link:"ios"},
  {name:"人工智能",link:"ai"},
  {name:"开发工具",link:"freebie"},
  {name:"代码人生",link:"career"},
  {name:"阅读",link:"article"},
]
const [navHide,setNavHide] =  useState(false)
let downDouble:number = 0

function handleWheel(e:any):void {
  if(e.deltaY<0){
    setNavHide(false);
    downDouble = 0;
    return
  }
  if(e.deltaY>0){
    downDouble+=1
    if(downDouble==4){
      setNavHide(true);
    }
    return
  }
}

const CategoryMenu = categoryData.map((data:ICategoryProps)=>
  <a href={data.link}className={styles.navItem} key={data.name}>
    <span className ={styles.navText} >{data.name}
    </span>
  </a>
)
  const SignInTip:JSX.Element= 
    <div className={[styles.siginTip,styles.siderBlock].join(' ')}>
      <div  className={styles.firstLine}>
        <div className={styles.iconText}>
          <span className={styles.title}>限时领掘金会员</span>
          <div className={styles.secondLine}>点亮在社区的每一天</div>
        </div>
        <div className={styles.signInButton}>
        <span className={styles.btnText}>去签到</span>
        </div>
      </div>
    </div>
  
  const Recommend:JSX.Element =
    <div className={[styles.recommend,styles.siderBlock].join(' ')}>
      <div className={styles.recommendHead}>
      🎖️作者榜
      </div>
      <div className={styles.userList}>
        {authorRank?.map((userData)=>
        <div  className={styles.userItem}>
        <UserInfoRow {...userData}></UserInfoRow>
        </div>)}
        <a  href="" className={styles.item}>
        <div className={styles.more}>
          <span> 完整榜单</span>
          <i className={styles.ionRight} ></i>
        </div>
        </a>
      </div>
    </div>

  const LinkBock:JSX.Element = 
    <div className={[styles.linkBlock,styles.siderBlock].join(' ')} >
      <ul className={styles.linkList}>
        {linkRead?.map((linkItem)=>        
        <li className ={styles.item}>
          <a className={styles.link}>
            <img className={styles.icon} src={linkItem.cover} alt="" />
            <span className={styles.title}>
            {linkItem.title}
            </span>
          </a>
        </li>)}
      </ul>
    </div>
  
  const Advertise:JSX.Element=
   <div className={styles.siderBlock} >
       <img src={homeAdvertise} alt="" style={{width:"100%",height:"auto"}} />
    </div>

  const AdvertiseStick:JSX.Element=
  <div className={styles.siderBlock} style={{position:"sticky"}} >
      <img src={homeAdvertise} alt="" style={{width:"100%",height:"auto"}} />
  </div>
  return (
    <div className={styles.bodyContainer} onWheel={e=>handleWheel(e)} >
      <div  className={[styles.category,navHide?styles.hide:styles.show].join(' ')} >
        <div className={styles.navList} >
          {CategoryMenu}
          {/* <a href="../recommend" className={styles.right}>标签管理</a> */}
        </div>
      </div>
      <div className={styles.timelineContainer} >
    
        <div className={styles.timelineContent}>
          <div className={styles.entryList} style={userAgent===Environment.mobile?{marginRight:"0rem"}:{marginRight:"21.667rem"}}>
            <header className={styles.listHeader}>
              <nav className={styles.listNav}>
                <ul  className={styles.navList}>
                  <li className={styles.navItem}>推荐</li>
                  <li className={styles.navItem}>最新</li>
                  <li className={styles.navItem}>热门</li>
                </ul>  
              </nav>
            </header>
            <div className={styles.entryListWrap}>
              {articles.map((item)=>
                <Entry {...item} ></Entry>
              )}
            </div>
          </div>
          <SideBar>
            {SignInTip}
            {Advertise}
            {Recommend}
            {LinkBock}
          </SideBar>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IJuejinHome> = async context => {
  //const { data: homeData } = await axios.get(`${LOCALDOMAIN}/api/juejinhome`);
  const { data: articleData } = await axios.post(`${LOCALDOMAIN}/api/juejin_article_brief`, {
    pageNo: 1,
    pageSize: 12,
  });
  const { data: homeData } = await axios.get(`${LOCALDOMAIN}/api/juejinHome`);
  return {
    props: {
      articles:articleData.articles,
      linkRead:homeData.linkRead,
      authorRank:homeData.authorRank,
      homeAdvertise:homeData.homeAdvertise,
      navHide:false
    }
  };
};

export default Home;
