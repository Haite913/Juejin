import { FC } from "react";
import default_avatar from "@/public/default_avatar.webp"
import styles from "./styles.module.scss";
import cName from "classnames";
import {CMSDOMAIN,TimeDescriptionFromCurrent } from "@/utils/index"
import { UserInfoRow} from "@/components/element/userInfo/index"
import {  OperateRow} from "@/components/element/operate/index"
import { IPopOverProps, PopOver } from "../popover/index"
import { IUserInfoRowProps} from"@/components/element/userInfo/index"
import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  useContext,
  useMemo,
  createRef,
} from "react";
import { time } from "console";
import { url } from "inspector";
import { userInfo } from "os";
export interface IArticleBriefProps {
  title:string;
  date:string;
  tags:Array<string>;
  description:string;
  view:number;
  like:number;
  comment:number;
  UserInfo:IUserInfoRowProps;
  cover:string;
}
export const Entry:FC<IArticleBriefProps> =({
  UserInfo,
  title,
  date,
  tags,
  description,
  view,
  like,
  comment,
  cover,
}) =>{
  const popoverDislikeRef = useRef<IPopOverProps>(null);
  const popoverUserMessageRef = useRef<IPopOverProps>(null);
  const [disLikeVisible,setDisLikeVisible] = useState(false);
  let currentTime:Date = new Date()
  let publicTime = new Date(date)
  const [IsTop,SetIsTop]= useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  const DisLikeMenu = 
      <div className={styles.dislikeMenu} >
        <div className={styles.menuItem}>
          <span className={[styles.menuIcon,styles.noInterest].join(' ')} ></span>
          <span className={styles.menuText} >不感兴趣</span>
        </div>
        <div className={styles.menuItem}>
          <span className={[styles.menuIcon,styles.blockAuthor].join(' ')} ></span>
          <span className={styles.menuText} >屏蔽作者： {UserInfo?.name}</span>
        </div>
        <div className={styles.menuItem} onClick={()=>{
          setDisLikeVisible(!disLikeVisible)
        }} >
          <span className={[styles.menuIcon,styles.blockTag].join(' ')} ></span>
          <span className={styles.menuText} >屏蔽标签</span>
        </div>
        {disLikeVisible?<div className={styles.tagRow}>
          <div className={styles.tagList}> 
            {
            tags.map(
              (attributes)=>
              <div className={styles.tagItem}>{attributes}</div>
              )
            }      
          </div>
          <div className={styles.btnBlockTag} >
            确定屏蔽
          </div>
        </div>:<></>}
        <div className={styles.menuItem}>
          <span className={[styles.menuIcon,styles.report].join(' ')} ></span>
          <span className={styles.menuText} >举报</span>
        </div>
      </div>
  const UserMessageMenu= 
      <div className={styles.popoverContent} style={
        IsTop?{bottom:"1rem"}:{top:"1rem"}}  >
        <UserInfoRow {...UserInfo}></UserInfoRow>
        <OperateRow></OperateRow>
        <div  className={styles.metaRow}>
          <ul className={styles.metaList}>
            <li className={styles.metaItem}>
              <div className={styles.count}>{UserInfo?UserInfo.follow:0}</div>
              <div className={styles.title}>关注</div>
            </li>
            <li  className={styles.divider}></li>
            <li className={styles.metaItem}>
              <div className={styles.count}>{UserInfo?UserInfo.fan:0}</div>
              <div className={styles.title}>粉丝</div>
            </li>
          </ul>
        </div>
      </div>


  return (
    <div className ={styles.item} ref={textRef}>
        <div className ={styles.entry} >
          <div className={styles.metaContainer}>
            <div className={styles.userMessage} 

              onMouseEnter={(Event)=>{
                if(document.body.offsetHeight-Event.pageY>250){
                  SetIsTop(false)
                }
                else{
                  SetIsTop(true)
                }
                popoverUserMessageRef.current?.onMouseEnter(Event)
              }}
              onMouseLeave={Event=>popoverUserMessageRef.current?.onMouseLeave(Event)}>
                {UserInfo?UserInfo.name:"未知用户"}  
                <PopOver ref={popoverUserMessageRef} fadeTime={200} >
                {UserMessageMenu}
                </PopOver>
            </div>
            <div className={styles.date}  >
              {TimeDescriptionFromCurrent(currentTime,publicTime)}
            </div>
            <div className={styles.tagList}  >
                {
                tags.map(
                  (attributes)=>
                  <a  className={styles.tag} href="xx">{attributes}</a>
                  )
                }  
              </div>
          </div>
          
          <div className={styles.cotentWrapper}>
            <div className={styles.contentMain} >
              <div className={styles.titleRow}  >
                <a href="article" className={styles.title}>
                  {title}
                  </a></div>
              <div className={styles.abstract} ><a href="">
                {description}
              </a>
               </div>
              <ul className={styles.actionList} >
                <li className={[styles.actionItem,styles.view].join(' ')} >
                  <i></i>
                  <span>{view}</span>
                </li>
                <li className={[styles.actionItem,styles.like].join(' ')} >
                  <i></i>
                  <span>{like}</span>
                </li>
                <li className={[styles.actionItem,styles.comment].join(' ')} >
                  <i></i>
                  <span>{comment}</span>
                </li>
              </ul>
              </div>
              {cover&&<img 
              src={cover}
              className={styles.thumb}/>}
          </div>

          <div className={styles.dislike} 
          onMouseEnter={(Event):void=>{
            popoverDislikeRef.current?.onMouseEnter(Event);
          }}
          onMouseLeave={(Event):void=>{
            popoverDislikeRef.current?.onMouseLeave(Event);
          }}
           >
          <PopOver ref={popoverDislikeRef} fadeTime={500} >
              {DisLikeMenu}
              </PopOver>
          </div>
        </div>
      </div>
  );
}
