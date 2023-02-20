export interface IArticleBriefProps {
    author:any;
    date:string;
    tag:any;
    title:string;
    description:string;
    view:number;
    like:number;
    comment:number;
    image?:string;
    cover:any;
}
export interface IMyInfoProps {
    name: string;
    avatar:string
    rank:string;
    follow:number;
    like:number;
    collection:Number;
    position:string;
    rankcount:number;
    description: string;
}
export interface IOtherUserInfoBriefProps {
    username: string;
    avatar:string
    jueyourank:number;
    chuangzuorank:number;
    position:string;
    follow:number;
    fan:number;
    image:any;
}
export interface IAuthorRankProps {
    data:{avatar:string;
                name:string;
                description:string;
                jueyourank:number;
                }[]
}
export interface ILinkBlockProps {
    data:{image:string;
        description:string}[]
}