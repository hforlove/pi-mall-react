import React from 'react'

import NavBar from 'comp/NavBar/NavBar'

import './goodsDetail.less'

export default function GoodsDetail(props) {
  console.log(props);
  return (
    <div className="main-container">
      <NavBar right="iconshouye">商品详情</NavBar>
      <button className="btn btn-red">立即购买</button>
      <button className="btn btn-yellow">立即购买</button>
      <div className="btn-group">
        <button className="btn btn-red">立即购买</button>
        <button className="btn btn-yellow">立即购买</button>
      </div>
    </div>
  )
}
