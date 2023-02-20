import { FC } from "react";
import Image from "next/image";
import publicLogo from "@/public/public_logo.png";
import styles from "./styles.module.scss";
import cName from "classnames";
export enum EbuttonType{
  clear,
  normal
}
export interface IButtonProps {
  ButtonText:String,
  url:string,
}
export const Button:FC<IButtonProps&{buttonType?:EbuttonType}> =({
  ButtonText,
  url,
  buttonType=EbuttonType.normal,
}) =>{

  let butttonStyle:string= styles.button;
  if(buttonType==EbuttonType.normal){
    butttonStyle = styles.button;
  }

  return (
    <a href={url} className={butttonStyle} >
      <text className={styles.ButtonText}>{ButtonText}</text>
    </a>
  );
}
