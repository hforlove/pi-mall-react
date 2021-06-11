import React, { useState, useEffect} from 'react'

import TabBar from 'comp/TabBar/TabBar'
import Cell from 'comp/Cell/Cell'

import { getStore, removeStore } from "utils"
import { getUserDetail, logout } from 'api'

import './profile.less'

export default function Profile({history}) {

  const [detail, setDetail] = useState({})
  const [count, setCount] = useState({})

  const toOrderPage = state => {
    state = state >= 0 ? state : ''
    history.push(`/order?state=${state}`)
  }

  const onLogout = () => {
    removeStore('token')
    history.push('/login')
  }

  useEffect(_=>{
		getUserDetail().then(res=>{
			const { head_portrait, nickname, coupon_num, account, order_synthesize_num } = res.data
      setDetail({
        head_portrait: head_portrait,
        nickname: nickname,
        coupon_num: coupon_num,
        account: account,
        orderNum: order_synthesize_num
      })
      setCount(order_synthesize_num)
		})
  },[])

  return (
    <div>
      
      <div className="profile-bar">
        <img className="head" src={detail.head_portrait} alt="" />
        <span className="name">{detail.nickname}</span>
      </div>

      <div className="profile-row">
        <Cell title={
          <div className="icon">
            <i className="iconfont iconyinhangzhanghu" />
            <span>我的账户</span>
          </div>
        } />
        <div className="account">
          <div>
            <span>{detail.account?.user_money}</span>
            <span>余额</span>
          </div>
          <div>
            <span>{detail.account?.coupon_num}</span>
            <span>优惠券</span>
          </div>
          <div>
            <span>{detail.account?.user_integral}</span>
            <span>积分</span>
          </div>
        </div>
      </div>

      <div className="profile-row">
        <Cell onClick={_=>toOrderPage()} arrow={false} title={
          <div className="icon">
            <i className="iconfont icondingdan" />
            <span>全部订单</span>
          </div>
        } />
        <div className="block">
          <div className="item" onClick={_=>toOrderPage(0)}>
            <i className="iconfont icondaifukuan" />
            <span className="txt">待付款</span>
            {count['0']>0?<span className="badge">{count['0']}</span>:''}
          </div>
          <div className="item" onClick={_=>toOrderPage(1)}>
            <i className="iconfont iconfahuo" />
            <span className="txt">待发货</span>
            {count['1']>0?<span className="badge">{count['1']}</span>:''}
          </div>
          <div className="item" onClick={_=>toOrderPage(2)}>
            <i className="iconfont icondaishouhuo" />
            <span className="txt">待收货</span>
            {count['2']>0?<span className="badge">{count['2']}</span>:''}
          </div>
          <div className="item" onClick={_=>toOrderPage(3)}>
            <i className="iconfont iconpingjiaguanli" />
            <span className="txt">评价</span>
            {count['3']>0?<span className="badge">{count['3']}</span>:''}
          </div>
          <div className="item">
            <i className="iconfont iconshouhou" />
            <span className="txt">售后</span>
            {count['-1']>0?<span className="badge">{count['-1']}</span>:''}
          </div>
        </div>
      </div>

      <div className="profile-row">
        <Cell arrow={false} title={
          <div className="icon">
            <i className="iconfont iconfuwu" />
            <span>我的服务</span>
          </div>
        } />
        <div className="block">
          <div className="item" url="/pages/collect/collect">
            <i className="iconfont iconstar" />
            <span className="txt">我的收藏</span>
          </div>
          <div className="item">
            <i className="iconfont iconyouhuiquan" />
            <span className="txt">领劵中心</span>
          </div>
          <div className="item" onClick={_=>history.push('/address')}>
            <i className="iconfont icondizhi" />
            <span className="txt">我的地址</span>
          </div>
          <div className="item" onClick={onLogout}>
            <i className="iconfont icontuichu" />
            <span className="txt">退出</span>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  )
}
