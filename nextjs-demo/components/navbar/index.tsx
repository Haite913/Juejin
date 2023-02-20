import { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { Themes, Environment } from "@/constants/enum";
import { Popup, IPopupRef } from "../popup";
import {Button,IButtonProps,EbuttonType} from "../button/index"
import Link from "next/link";
import Image from "next/image";
export interface INavBarProps {}
export interface IButtonListProps {
  ButtonListData:IButtonProps[]
}
export interface ItestProps {
  ButtonListData:Number[]
}
const button1:IButtonProps = {
  url:"df",
  ButtonText:"IOS",
}
const button2:IButtonProps = {
  url:"df",
  ButtonText:"前端",
}
const data:IButtonListProps = {
  ButtonListData:[button1,button2]
};
// function ButtonList(buttonData:IButtonListProps) {
 
//   const content =  buttonData.ButtonListData.map((buttonData) => 
//   <div >
//     <Button url={buttonData.url} ButtonText={buttonData.ButtonText}></Button>
//   </div>);

//   return (
//       <div>
//           {/* { content } */}
//       </div>
//   )
// }
//不能用Array
//function ButtonList(data:Array<Number>) {


export const NavBar: FC<INavBarProps&{wheel:boolean}> = ({wheel}) => {
  const { setTheme } = useContext(ThemeContext);
  const { userAgent } = useContext(UserAgentContext);
  const popupRef = useRef<IPopupRef>(null);
  const [hide,setHide] = useState(false);
  useEffect(()=>{
    setHide(wheel)
  },[wheel])
  return (
    <div className={styles.StickTest}>
    <div className={[styles.navBar,hide?styles.hide:styles.show].join(' ')}>

      <div>
      <ul className={styles.list}>
<li className={styles.firstListItem}>
  <div className={styles.logo}>
    <Image src="/favicon-32x32.png" width={30} height={30} alt=""/>
  </div>

<Link href="/home">稀土掘金</Link>
</li>
<li className={styles.listItem}>
<Link href="/home">首页</Link>
</li>
<li className={styles.listItem}>
<Link href="/boiling-point">沸点</Link>
</li>
<li className={styles.listItem}>
<Link href="/course">课程</Link>
</li>
<li className={styles.listItem}>
<Link href="/direct-broadcast">直播</Link>
</li>
<li className={styles.listItem}>
<Link href="/movement">活动</Link>
</li>
<li className={styles.listItem}>
<Link href="/store">商城</Link>
</li>
<li className={styles.listItem}>
<Link href="/application">APP</Link>
<div className={styles.invite}>邀请有礼</div>
</li>
<li className={styles.listItem}>
<Link href="/plug">插件</Link>
</li>
         </ul>
      </div>
      <div className={styles.themeArea}>
        <div
          className={styles.popupText}
          onClick={(): void => {
            popupRef.current?.open();
          }}
        >
          弹窗示范
        </div>
        {userAgent === Environment.pc && (
          <span className={styles.text}>当前是pc端样式</span>
        )}
        {userAgent === Environment.ipad && (
          <span className={styles.text}>当前是Ipad端样式</span>
        )}
        {userAgent === Environment.mobile && (
          <span className={styles.text}>当前是移动端样式</span>
        )}
        <div
          className={styles.themeIcon}
          onClick={(): void => {
            if (localStorage.getItem("theme") === Themes.light) {
              setTheme(Themes.dark);
            } else {
              setTheme(Themes.light);
            }
          }}
        ></div>
      </div>
      <Popup ref={popupRef}>
        <div>这是一个弹窗</div>
      </Popup>
    </div>
    </div>
  );
};
