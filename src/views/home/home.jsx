import React, { useState, useEffect } from 'react'

import { Carousel } from 'antd-mobile'

import TabBar from 'comp/TabBar/TabBar'
import NavBar from 'comp/NavBar/NavBar'
import HomeGoods from './HomeGoods'

import { getHomeData } from 'api'
import { setStore } from 'utils'

import './home.less'

export default function Home({history}) {

  const [homeData, setHomeData] = useState({
    swiperList: [],
    navList: [],
    noticeList: [],
    newList: [],
    hotList: [],
    recommenList: [],
  }) 

  useEffect(()=>{
    getHomeData().then(res=>{
      const { data } = res
      setHomeData({
        swiperList: data.adv.index_top,
        navList: data.cate,
        noticeList: data.announce,
        newList: data.product_new,
        hotList: data.product_hot,
        recommenList: data.product_recommend
      })

      setStore('hotSearch', data.search.hot_search_list, true);
    })
  },[])

  return (
    <div className="main-container">
      <NavBar back={false} onRightClick={_=>history.push('/goodsList')}>PI 商城</NavBar>

      <Carousel autoplay={true} infinite >
        {
          homeData.swiperList.map(item=>(
            <div className="home-swiper" key={item.id}>
              <img src={item.cover} alt="" onLoad={() => {window.dispatchEvent(new Event('resize'));}} />
            </div>
          ))
        }
      </Carousel>

      <ul className="home-Nav">
        {
          homeData.navList.map(item=>(
            <li key={item.id} onClick={()=>history.push(`/goodsList?cate=${item.id}`)}>
              <div>
                <img src={item.cover}  alt="" />
                {item.title}
              </div>
            </li>
          ))
        }
      </ul>
      
      <div className="home-goods">
        <h3>新品</h3>
        <ul>
          {
            homeData.newList.map(item=>(
              <li key={item.id} onClick={_=>history.push(`/goodsDetail?id=${item.id}`)}>
                <HomeGoods pic={item.picture} title={item.name} price={item.price} />
              </li>
            ))
          }
        </ul>
      </div>
      
      <div className="home-goods">
        <h3>热门</h3>
        <ul>
          {
            homeData.hotList.map(item=>(
              <li key={item.id} onClick={_=>history.push(`/goodsDetail?id=${item.id}`)}>
                <HomeGoods pic={item.picture} title={item.name} price={item.price} />
              </li>
            ))
          }
        </ul>
      </div>
      
      <div className="home-goods">
        <h3>推荐</h3>
        <ul>
          {
            homeData.recommenList.map(item=>(
              <li key={item.id} onClick={_=>history.push(`/goodsDetail?id=${item.id}`)}>
                <HomeGoods pic={item.picture} title={item.name} price={item.price} />
              </li>
            ))
          }
        </ul>
      </div>

      <TabBar />
    </div>
  )
}

