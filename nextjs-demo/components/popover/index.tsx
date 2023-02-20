import { FC } from "react";
import Image from "next/image";
import publicLogo from "@/public/public_logo.png";
import styles from "./styles.module.scss";
import cName from "classnames";
import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useContext,
  useMemo,
} from "react";
export enum EbuttonType{
  clear,
  normal
}

export interface IPopOverProps {
  onMouseEnter:React.MouseEventHandler<HTMLDivElement>,
  onMouseLeave:React.MouseEventHandler<HTMLDivElement>,
  onclick:React.MouseEventHandler<HTMLDivElement>,

}

export const PopOver = forwardRef<IPopOverProps, { children:JSX.Element,fadeTime:number}>(({ children,fadeTime }, ref) => {
  const [visible, setVisible] = useState(false);
  const [leave, setLeave] = useState(false);
  let entering:boolean  = false;
  let FadeTime:number = fadeTime
  let LeaveTimer: NodeJS.Timeout 
  let EnterTimer: NodeJS.Timeout 
  let ticking:boolean = false
  useEffect(()=>{
    if(leave==true){
      setTimeout(() => {
        setVisible(false)
        setLeave(false)
      }, 200);
    }
  },[leave])
  function enterFunction():void {
    if(leave)return;
    if(!visible&&!entering){
      console.log("EnterTimer")
      entering=true;
      EnterTimer = setTimeout(()=>{
        setVisible(true);
        entering=false;
      },350)
      return;
    }
    if(visible&&ticking){
      clearTimeout(LeaveTimer)
      ticking=false;
    }
  }
  function leaveFunction():void {
    console.log("LeaveTimer")
    if(leave)return;
    if(entering){
      clearTimeout(EnterTimer)
      entering=false; 
    }
    if(visible){
      clearTimeout(EnterTimer)
      LeaveTimer =  setTimeout(() => {
        setLeave(true)
        ticking=false;
      }, FadeTime);
      ticking=true;
    }
  }
  useImperativeHandle(ref, () => ({
    onMouseEnter:enterFunction,
    onMouseLeave:leaveFunction,
    time:FadeTime,
    onclick:()=>{}
  }));
  const Content:JSX.Element = visible?(
    <div className={leave? styles.leave:styles.enter} 
    onMouseEnter={enterFunction}
    onMouseLeave={leaveFunction} >
      {children}
    </div>
  ):(
    <></>)
  return (
    Content
  );
});
