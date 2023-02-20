import { FC } from "react";
import styles from "./styles.module.scss";
export interface IUserInfoRowProps {
  name:string;
  position:string;
  avatar:string;
  jueyouRank?:number;
  chuangzuoRank?:number;
  follow?:number;
  fan?:number;
}
export  const UserInfoRow:FC<IUserInfoRowProps> = ({
  name,
  position,
  avatar,
  jueyouRank,
  chuangzuoRank
})=>{
  return(
      <div className={styles.infoRow}>
        <a href="xx">
          <img src={avatar} alt="" className={styles.avatar} />
        </a>
        <div className={styles.userInfo} >
          <a href="" className={styles.userName}>
            <span className={styles.name}>
              {name}
            </span>
            <span className={styles.rank}>
              等级
            </span>
          </a>
          <div className={styles.position}>
            {position}
          </div>
        </div>
      </div>
     
  );
}