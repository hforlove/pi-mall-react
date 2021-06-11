import React, { useEffect, useState, useRef } from 'react'

import { Steps } from 'antd-mobile'

import NavBar from 'comp/NavBar/NavBar'
import Goods from 'comp/Goods/Goods'
import AddressBar from 'comp/AddressBar/AddressBar'

import { getOrderDetail } from 'api'
import { orderStatus } from 'utils/config'

import qs from 'querystring'

import './orderDetail.less'

const Step = Steps.Step

export default function OrderDetail(props) {

  const oid = useRef(qs.parse(props.location.search.slice(1)).id)

  const [order,setOrder] = useState({product:[]})

  useEffect(_=>{
    getOrderDetail(oid.current).then(res=>{
      setOrder(res.data)
    })
  }, [])

  return (
    <div className="full-container">
      <NavBar>订单详情</NavBar>

      <AddressBar
        user={order.receiver_name}
        phone={order.receiver_mobile}
        arrow={false}>
          {order.receiver_region_name} {order.receiver_address}
        </AddressBar>

      {
        order?.product.map(item=>(
          <Goods
            key={item.id}
            title={item.product_name}
            price={item.price}
            pic={item.product_picture}
            br={`x${item.num}`}
          >
            {item.sku_name}
          </Goods>
        ))
      }

      <div className="order-steps">
        <Steps current={order.order_status} direction="horizontal" size="small">
          <Step key="0" title="创建订单" />  
          <Step key="1" title="订单支付" />   
          <Step key="2" title="卖家发货" />   
          <Step key="3" title="买家收货" />  
        </Steps>
      </div>

      <div className="info-row">
        <span>订单状态</span>
        <span className="red">{orderStatus[order.order_status]}</span>
      </div>
      <div className="info-row">
        <span>订单号</span>
        <span>{order.order_sn}</span>
      </div>
      <div className="info-row">
        <span>配送方式</span>
        <span className="red">{order.shipping_explain}</span>
      </div>
      <div className="info-row">
        <span>支付方式</span>
        <span className="red">{order.payment_explain}</span>
      </div>
      <div className="info-row">
        <span>实付金额</span>
        <span className="red">￥{order.pay_money}</span>
      </div>

    </div>
  )
}
