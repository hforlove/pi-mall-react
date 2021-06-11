import React, { useEffect, useRef, useState } from 'react'

import { Carousel, Modal, Toast } from 'antd-mobile'

import NavBar from 'comp/NavBar/NavBar'
import Cell from 'comp/Cell/Cell'
import Sku from 'comp/Sku/Sku'

import { setStore, getStore } from 'utils'
import { getGoodsDetail, addCart, createCollect, deleteCollect, getCartNum } from 'api'

import qs from 'querystring'
import './goodsDetail.less'

export default function GoodsDetail(props) {

  const gid = useRef(qs.parse(props.location.search.slice(1)).id)

  const [detail, setDetail] = useState({})
  const [count, setCount] = useState(getStore('cart'))
  const [visible, setVisible] = useState(false)

  const onSubmit = ({ type, sku_id, num }) => {
    if(type == 'cart'){
      addCart({sku_id, num }).then(res=>{
				getCartNum().then(res=>{
					setStore('cart',res.data)
					setCount(res.data)
          setVisible(false)
				})
			})
    }
    if(type == 'buy') props.history.push(`/orderCreate/orderCreate?type=buy_now&ids=${sku_id}&num=${num}`)
  }

  const onCollect = () => {
    if(detail.myCollect){
      deleteCollectHandle(detail.myCollect.id)
    }else{
      createCollectHandle()
    }
  }

  const createCollectHandle = () => {
    const params = {
      topic_id: gid.current,
      topic_type: "product"
    }
    createCollect(params).then(res=>{
      Toast.success('收藏成功')
      setDetail({...detail, myCollect: res.data})
    })
  }

  const deleteCollectHandle = id => {
    deleteCollect(id).then(res=>{
      setDetail({...detail, myCollect: null})
    })
  }

  useEffect(_=>{
    getGoodsDetail(gid.current).then(res=>{
      setDetail(res.data)
    })
  }, [])

  return (
    <div className="main-container">
      <NavBar right="iconshouye">商品详情</NavBar>

      <Carousel autoplay={true} infinite >
        {
          detail?.covers?.map(item=>(
            <div className="goods-swiper" key={item}>
              <img src={item} alt="" onLoad={() => {window.dispatchEvent(new Event('resize'));}} />
            </div>
          ))
        }
      </Carousel>

      <div className="detail-info">
        <div className="title">
          <div>{detail.name}</div>
          <span className={detail.myCollect?'act':''} onClick={onCollect}>
            <i className={`iconfont ${detail.myCollect ? 'iconpingjia2' : 'iconpingjia1'}`}></i>
            收藏
          </span>
        </div>
        <div className="tips">
          <div>
            <span>￥{detail.price}</span>
            <span>￥{detail.market_price}</span>
          </div>
          <span>月销：{detail.total_sales }</span>
        </div>
        <Cell title="选择" onClick={_=>setVisible(true)}>商品规格</Cell>
        <Cell title="优惠券">领取优惠券</Cell>
        <Cell title="服务">7天无理由退货</Cell>
        <Cell title="评价" right>好评率{detail.match_ratio}</Cell>
        <div className="detail">
          <div className="bar">商品详情</div>
          <div className="cont" dangerouslySetInnerHTML={{__html: detail.intro}}></div>
        </div>
      </div>

      <div className="bottom-action goods-action">
        <div className="kf">
          <i className="iconfont iconliuyan"></i>
          客服
        </div>
        <div className="gwc" onClick={_=>props.history.push('/cart')}>
          {
            count>0?<span className="badge">{count}</span>:''
          }
          <i className="iconfont icongouwuche"></i>
          购物车
        </div>
        <div className="btn-group">
          <button className="btn btn-yellow" onClick={_=>setVisible(true)}>加入购物车</button>
          <button className="btn btn-red" onClick={_=>setVisible(true)}>立即购买</button>
        </div>
      </div>

      <Modal
        popup
        visible={visible}
        onClose={_=>setVisible(false)}
        animationType="slide-up"
      >
        <Sku sku={detail} onSubmit={onSubmit} />
      </Modal>

    </div>
  )
}
