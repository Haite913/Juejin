import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';
import { IArticleBriefProps} from "@/components/entry/index"
import {IJuejinArticles} from "@/pages/home/index"
import { Tag } from '@douyinfe/semi-ui';
import {IUserInfoRowProps } from "@/components/element/userInfo/index"
import { values } from 'lodash';
const getarticlesData = (req: NextApiRequest, res: NextApiResponse<IJuejinArticles>): void => {
  axios.get(`${CMSDOMAIN}/api/juejin-articles?populate=deep`).then(result => {
    //获取数据
    const { data, meta } = result.data || {};

    res.status(200).json({
      
      articles: data?.map((item2: any) =>{
        const item = item2.attributes

        const userData = item.author.data?.attributes

        return  ({
          title:item.title,
          date:item.date,
          tags:item.tag.data.map((tagItem:any)=>
            tagItem.attributes.name
          ),
          description:item.description,
          view:item.view,
          like:item.like,
          comment:item.comment,
          UserInfo:{
            name:userData&&userData.username,
            position:userData&&userData.position,
            avatar:userData&&`${CMSDOMAIN}${userData.image.data.attributes.url}`,
            jueyouRank :userData&&userData.jueyourank,
            chuangzuoRank:userData&&userData.chuangzuorank,
            follow:userData&&userData.follow,
            fan:userData&&userData.fan,
          },
          cover: item.cover.data?`${CMSDOMAIN}${item.cover.data?.attributes.url}`:""
          })
      })

    });
  });
};
export default getarticlesData;
