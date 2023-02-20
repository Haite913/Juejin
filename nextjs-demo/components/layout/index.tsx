import { FC, useState } from "react";
import { IFooterProps, Footer } from "../footer/index";
import { INavBarProps, NavBar } from "../navbar/index";
import styles from "./styles.module.scss";

export interface ILayoutProps {
  navbarData: INavBarProps;
  footerData: IFooterProps;
}

export const Layout: FC<ILayoutProps & { children: JSX.Element }> = ({
  navbarData,
  footerData,
  children,
}) => {
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

  return (
    <div onWheel={e=>handleWheel(e)} className={styles.layout}
       onTouchMove={(e)=>{
          //手指触动监听
       }}>
      <NavBar wheel={navHide} {...navbarData} />
      <main  className={styles.main}>{children}</main>
      {/* <Footer {...footerData} /> */}
    </div>
  );
};
