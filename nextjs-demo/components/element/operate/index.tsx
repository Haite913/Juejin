import { FC } from "react";
import Image from "next/image";
import publicLogo from "@/public/public_logo.png";
import styles from "./styles.module.scss";
import cName from "classnames";
export enum EbuttonType{
  clear,
  normal
}
export interface IOperateProps {
  ButtonText:String,
  url:string,
}
export   const OperateRow:FC<{}> = ({})=>{
  return(
    <div  className={styles.operateButton}>
    <div className={styles.followButton}>
      关注
    </div>
    <a href="" className={styles.imButton}>
      私信
    </a>
  </div>
     
  );
}