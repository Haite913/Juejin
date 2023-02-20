
import { FC, useContext} from "react";
import styles from './styles.module.scss';
import { Environment } from '@/constants/enum';
import { UserAgentContext } from "@/stores/userAgent";

export interface ISideBarProps {}

export const SideBar:FC<ISideBarProps &{children:JSX.Element[]|JSX.Element}> =({children}) =>{

  const { userAgent } = useContext(UserAgentContext);
  const Content:JSX.Element = userAgent!==Environment.mobile?(
  <aside  className={styles.indexAside}>{children}
             </aside>
              ):(<></>)
  return (
    Content
  );
}
