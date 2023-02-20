import { AppContext } from "next/app";

export const LOCALDOMAIN = "http://127.0.0.1:3000";
export const CMSDOMAIN = "http://127.0.0.1:1337";

export const getIsMobile = (context: AppContext) => {
  const { headers = {} } = context.ctx.req || {};
  return /mobile|android|iphone|ipad|phone/i.test(
    (headers["user-agent"] || "").toLowerCase()
  );
};

export const getIsSupportWebp = (context: AppContext) => {
  const { headers = {} } = context.ctx.req || {};
  return headers.accept?.includes("image/webp");
};
export const TimeDescriptionFromCurrent = (current:Date,from:Date):string => {
  const years = current.getFullYear()-from.getFullYear()
  if(years!=0){
    return years>0?(years.toString()+"年前"):((-years).toString()+"年后")
  }
  const months = current.getMonth()-from.getMonth()
  if(months!=0){
    return months>0?(months.toString()+"月前"):((-months).toString()+"月后")
  }
  const days = current.getDate()-from.getDate()
  if(days!=0){
    return days>0?(days.toString()+"天前"):((-days).toString()+"天后")
  }
  const hours = current.getHours()-from.getHours()
  if(hours!=0){
    return hours>0?(hours.toString()+"小时前"):((-hours).toString()+"小时后")
  }
  const minutes = current.getMinutes()-from.getMinutes()
  if(minutes !=0){
    return minutes>0?(minutes.toString()+"分钟前"):((-minutes).toString()+"分钟后")
  }
  const seconds = current.getSeconds()-from.getSeconds()
  if(seconds!=0){
    return seconds>0?(seconds.toString()+"秒前"):((-seconds).toString()+"秒后")
  }
  return "刚刚"
};
