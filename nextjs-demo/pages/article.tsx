import styles from "./article.module.scss"
import { SideBar } from "@/components/sidebar";
import {OperateRow } from '@/components/element/operate/index'
import {UserInfoRow} from '@/components/element/userInfo/index'
import axios from 'axios';
import React from 'react';
import { LOCALDOMAIN } from '@/utils';
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from "next/image";

const showdown = require('showdown');

export interface IArticleProps {
  title: string;
  author: string;
  description: string;
  createTime: string;
  content: string;
}

const article: NextPage<IArticleProps> = ({ title, author, description, createTime, content }) => {
    return (
    <div>
      <button className={styles.like}><Image  src="/like.png" width={25} height={25} alt=""/></button>
      <button className={styles.comment}><Image  src="/comment.png" width={25} height={20} alt=""/></button>
      <button className={styles.report}><Image  src="/report.svg" width={25} height={25} alt=""/></button>
     
      
      <div  className={styles.articleContainer} >
      <SideBar>
        <div className={styles.sidebox} >
        <div className={styles.info}>
        <Image className={styles.headimage} src="/xtl.png" width={40} height={40} alt=""/>
        <span className={styles.infoblock}>
        <span className={styles.username}>捡田螺的小男孩</span>
        <Image src="/lv-5.chaungzuo.png" width={35} height={18} alt=""/>
        <br/>
        <span className={styles.basicdesc}>2022年12月28日 08:45 ·  阅读 7779</span>
        </span>
        <hr/>
        </div>
        <OperateRow></OperateRow>
        <div>
        <div  className={styles.infoblock1}>
        <Image className={styles.hotrank1} src="/hot.png" width={30} height={30} alt=""/>
        <p className={styles.hotrank1info}>2021年度人气作者No.18</p><br/>
        </div>
        <div className={styles.infoblock2}>
        <Image className={styles.hotrank2} src="/hot.png" width={30} height={30} alt=""/>
        <p className={styles.hotrank2info}>获得点赞  16,743</p><br/>
        </div>
        <div className={styles.infoblock3}>
        <Image className={styles.hotrank3} src="/hot.png" width={30} height={30} alt=""/>
        <p className={styles.hotrank3info}>文章被阅读  1,509,687</p><br/>
        </div>
      
        </div>
        </div>
      </SideBar>
      <SideBar>
        <div className={styles.sidebox2} >
        <h2>相关文章</h2>
        <hr/>
        <a>Synchronized解析——如果你愿意一层一层剥开我的心</a><br/>
<p>200点赞  ·  35评论</p><br/>
<a>两万字！多线程50问！</a><br/>
<p>141点赞  ·  13评论</p><br/>
<a>小厂后端十连问</a><br/>
<p>201点赞  ·  26评论</p><br/>

        </div>
      </SideBar>
      <div className={styles.article}>
        <h1 className={styles.title}>字节国际支付十连问</h1>
        <div className={styles.info}>
        <Image className={styles.headimage} src="/xtl.png" width={40} height={40} alt=""/>
        <span className={styles.infoblock}>
        <span className={styles.username}>捡田螺的小男孩</span>
        <Image src="/lv-5.chaungzuo.png" width={35} height={18} alt=""/>
        <br/>
        <span className={styles.basicdesc}>2022年12月28日 08:45 ·  阅读 7779</span>
        </span>
        </div>
        <div className={styles.description}>
<h2>
  前言<hr/>
</h2>
<p>大家好，我是<strong>田螺</strong>。</p>
<br/>

<p>之前有位读者去<strong>字节面试</strong>，面的是<strong>国际支付部门</strong>，他凭记忆，回忆被问到<strong>一些面试真题</strong>。于是，我整理了比较全的答案，希望对大家找工作有帮助呀，加油~</p>
<br/>
<Image src="/tenquestion01.png" width={650} height={500}></Image>


<ul>
  <li><strong>公众号</strong>：捡田螺的小男孩</li>
  <li>github地址，感谢每颗star：<a href="#">github</a></li>
</ul>

<h2>
1. 聊聊工作中，你是如何设计数据库表的
</h2>

<ul>
  <li>命名规范</li>
  <li>选择合适的字段类型</li>
  <li>主键设计合理</li>
  <li>选择合适的字段长度</li>
  <li>优先考虑逻辑删除，而不是物理删除</li>
  <li>每个表必备的几个字段（如create_time和update_time等）</li>
  <li>一张表的字段不宜过多</li>
  <li>尽可能使用not null定义字段</li>
  <li>设计表时，评估哪些字段需要加索引</li>
  <li>不需要严格遵守3NF，通过业务字段冗余来减少表关联</li>
  <li>避免使用MySQL保留字</li>
  <li>不搞外键关联，一般都在代码维护</li>
  <li>一般都选择INNODB存储引擎</li>
  <li>选择合适统一的字符集。</li>
  <li>如果你的数据库字段是枚举类型的，需要在comment注释清楚</li>
  <li>时间类型选择恰当</li>
  <li>不建议使用Stored procedure(包括存储过程，触发器) 。</li>
  <li>1:N关系的设计</li>
  <li>大字段如何设计</li>
  <li>考虑是否需要分库分表</li>
  <li>索引的合理设计</li>


</ul>
<p>  我之前写过，做表的设计时，需要考虑哪些点，大家可以看下哈：21个MySQL表设计的经验准则</p>



<h2>
2.什么是三范式？你做过违反三范式的设计嘛
</h2>
<hr/>
<ul>
  <li>第一范式：对属性的原子性，要求属性具有原子性，不可再分解；</li>
  <li>第二范式：对记录的唯一性，要求记录有唯一标识，即实体的唯一性，即不存在部分依赖；</li>
  <li>第三方式：对字段的冗余性，要求任何字段不能由其他字段派生出来，它要求字段没有冗余，即不存在传递依赖。</li>

</ul>

<p>我们设计表及其字段之间的关系, 应尽量满足第三范式。但是有时候，可以适当冗余，来提高效率</p>

<h2>
3. TCP的四次挥手？三次挥手行不行
</h2>

<Image src="/tenquestion02.png" width={650} height={800}></Image>

<ul>
  <li>第一次挥手(FIN=1，seq=u)，发送完毕后，客户端进入FIN_WAIT_1状态</li>
  <li>第二次挥手(ACK=1，ack=u+1,seq =v)，发送完毕后，服务器端进入CLOSE_WAIT状态，客户端接收到这个确认包之后，进入FIN_WAIT_2状态</li>
  <li>第三次挥手(FIN=1，ACK=1,seq=w,ack=u+1)，发送完毕后，服务器端进入LAST_ACK状态，等待来自客户端的最后一个ACK。</li>
  <li>第四次挥手(ACK=1，seq=u+1,ack=w+1)，客户端接收到来自服务器端的关闭请求，发送一个确认包，并进入TIME_WAIT状态，等待了某个固定时间（两个最大段生命周期，2MSL，2 Maximum Segment Lifetime）之后，没有收到服务器端的ACK ，认为服务器端已经正常关闭连接，于是自己也关闭连接，进入CLOSED 状态。服务器端接收到这个确认包之后，关闭连接，进入CLOSED状态。</li>
</ul>

<h3>TCP为什么需要四次挥手？三次行不行呢？</h3>

<p>举个生活的例子吧，假设小明和小红打电话聊天，通话差不多要结束时：</p>

<q>小红说，“我没啥要说的了”。小明回答，“我知道了”。但是小明可能还有要说的话，小红不能要求小明跟着自己的节奏结束通话，于是小明可能又叽叽歪歪说了一通，最后小明说“我说完了”，小红回答“知道了”，这样通话才算结束。</q>

<Image src="/tenquestion03.png" width={650} height={900}></Image>

<h2>
4. 进程线程的区别，打开迅雷是开了个进程嘛。
</h2>

<ul>
  <li>进程是运行中的应用程序，线程是进程的内部的一个执行序列</li>
  <li>进程是资源分配的最小单位，线程是CPU调度的最小单位。</li>
  <li>一个进程可以有多个线程。线程又叫做轻量级进程，多个线程共享进程的资源</li>
  <li>进程间切换代价大，线程间切换代价小</li>
  <li>进程拥有资源多，线程拥有资源少地址</li>
  <li>进程是存在地址空间的，而线程本身无地址空间，线程的地址空间是包含在进程中的 举个例子：</li>
</ul>

<q>你打开QQ，开了一个进程；打开了迅雷，也开了一个进程。

在QQ的这个进程里，传输文字开一个线程、传输语音开了一个线程、弹出对话框又开了一个线程。

所以运行某个软件，相当于开了一个进程。在这个软件运行的过程里（在这个进程里），多个工作支撑的完成QQ的运行，那么这“多个工作”分别有一个线程。

所以一个进程管着多个线程。

通俗的讲：“进程是爹妈，管着众多的线程儿子”...
</q>

<h2>
5. 进程是如何通讯的？
</h2>

<p>进程间的通信方式有这几种：</p>

<ul>
  <li>管道</li>
  <li>消息队列</li>
  <li>共享内存</li>
  <li>信号量</li>
  <li>信号</li>
</ul>

<p>
  每个进程的用户地址空间都是相互独立、不能互相访问的。而内核空间则是每个进程都共享的，因此进程之间要通信必须通过内核。
</p>

<ul>
  <li>管道：它的本质是内核里面的一串缓存。它传输数据是单向的，这种通信方式效率低，不适合进程间频繁地交换数据。比如我们写linux命令时，ps -ef | grep java这个「|」竖线就是一个匿名管道。
</li>
  <li>消息队列：它是保存在内核中的消息链表。消息的发送方和接收方要约定好消息体的数据类型。有了消息队列，两个进程之间的通信就像平时发邮件一样，你来一封我一封。但是它也有不足，通信不及时，二是附件也有大小限制。
</li>
  <li>共享内存：就是拿出一块虚拟地址空间来，映射到相同的物理内存中，节省了用户态与内核态之间切换的开销。
</li>
  <li>信号量：它其实是一个整型的计数器，主要用于实现进程间的互斥与同步，而不是用于缓存进程间通信的数据。为了防止多进程竞争共享资源，而造成的数据错乱。
</li>
  <li>信号：是进程间通信机制中唯一的异步通信机制，因为可以在任何时候发送信号给某一进程
</li>
<li>
Socket：如果想跨网络与不同主机上的进程之间通信，需要socket。
</li>
</ul>

<p>大家可以参考下这篇文章哈：张三同学没答好「进程间通信」，被面试官挂了</p>

<h2>
6.什么是零拷贝？零拷贝实现的几种方式？哪些中间件应用了零拷贝技术？
</h2>
零拷贝实现的方式主要有这三种：

<ul>
  <li>mmap+write</li>
  <li>sendfile</li>
  <li>带有DMA收集拷贝功能的sendfile</li>
</ul>

<h3>Kafka为什么快等，也跟零拷贝技术有关。</h3>

<p>我之前写过一篇零拷贝技术的文章，收到了很多读者好评，大家可以看下哈,看一遍就理解：零拷贝详解
</p>

<h2>
7. 你如何设计分布式锁?有哪些坑？
</h2>

<p>大家可以看下我之前的这几篇文章哈：</p>

<ul>
  <li>面试必备：聊聊分布式锁的多种实现！</li>
  <li>Redis分布式锁的10个坑</li>
  <li>七种方案！探讨Redis分布式锁的正确使用姿势</li>
</ul>

<h2>
8. Redis跳表
</h2>
<p>跳跃表是有序集合zset的底层实现之一</p>
<ul>
  <li>跳跃表支持平均O（logN）,最坏O（N）复杂度的节点查找，还可以通过顺序性操作批量处理节点。
</li>
  <li>跳跃表实现由zskiplist和zskiplistNode两个结构组成，其中zskiplist用于保存跳跃表信息（如表头节点、表尾节点、长度），而zskiplistNode则用于表示跳跃表节点。
</li>
  <li>跳跃表就是在链表的基础上，增加多级索引提升查找效率。
</li>
</ul>
<h2>
9.你平时是如何优化慢SQL的
</h2>

<p>数据库慢查询主要有这些原因
</p>




<ul>
  <li>如果是SQL没加索引，那就加恰当的索引
</li>
  <li>如果 SQL 索引不生效，那就关注索引失效的十种经典场景（如不满足最左匹配原则）
</li>
  <li>关注limit深分页问题（标签记录法和延迟关联法）
</li>

<li>单表数据量太大（那就分库分表）
</li>
  <li>join 或者子查询过多（尽量不要有超过3个以上的表连接，而且关联的字段需要加索引）
</li>
  <li>in元素过多 （in元素查询数量做限制）
</li>

<li>数据库在刷脏页
</li>
  <li>order by 走文件排序
</li>
  <li>拿不到锁
</li>
<li>delete + in子查询不走索引！
</li>
</ul>

<p>详细讲解，大家可以看下我之前这篇文章哈：盘点MySQL慢查询的12个原因</p>

<h2>
10.十亿个数字里里面找最小的10个
</h2>


<p>
这是一道经典的TopK问题,可以使用分治法+快速排序原理解决。直接上代码
  </p>
</div>
      </div>
    </div>
    </div>
    );
  };
  

  export default article;