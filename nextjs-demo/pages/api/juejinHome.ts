import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';
import {IJuejinAuthorRank,IJuejinLinkRead,IJuejinAdvertiseData} from "@/pages/home/index"
export interface IJuejinHomeRawProps {
  homeAdvertise: any;
  linkRead : any;
  authorRank:any;
}
const getHomeData = (req: NextApiRequest, res: NextApiResponse<IJuejinAuthorRank&IJuejinLinkRead&IJuejinAdvertiseData>): void => {
  axios.get(`${CMSDOMAIN}/api/juejin-home?populate=deep`).then(result => {
    //获取数据
    const { data} = result.data || {};
    res.status(200).json({
      homeAdvertise:CMSDOMAIN+data.attributes.homeAdvertise.data.attributes.url,
      linkRead:data.attributes.linkRead?.data.map((linkItem:any)=>({
        cover:CMSDOMAIN+linkItem.attributes.cover?.data.attributes.url,
        title:linkItem.attributes.title,
      })),
      authorRank:data.attributes.authorRank?.data.map((authorItme:any)=>{
        const userData = authorItme.attributes
        return({
          name:userData&&userData.username,
          position:userData&&userData.position,
          avatar:userData&&`${CMSDOMAIN}${userData.image.data.attributes.url}`,
          jueyouRank :userData&&userData.jueyourank,
          chuangzuoRank:userData&&userData.chuangzuorank,
          follow:userData&&userData.follow,
          fan:userData&&userData.fan,
        })
      }),
    });
  });
};

export default getHomeData;
