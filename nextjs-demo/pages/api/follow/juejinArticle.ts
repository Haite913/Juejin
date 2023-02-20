import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CMSDOMAIN } from '@/utils';

interface IHomeProps {
  title: string;
  description: string;
}
//传入一个Request res 中的json有title和description
const getHomeData = (req: NextApiRequest, res: NextApiResponse<IHomeProps>): void => {
  axios.get(`${CMSDOMAIN}/api/homes`).then(result => {
    //获取数据
    const { title, description } = result.data || {};
    res.status(200).json({
      title,
      description,
    });
  });
};

export default getHomeData;
