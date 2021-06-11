import React, { useState, useEffect, useRef } from 'react'

import { Checkbox, Toast } from 'antd-mobile'

import NavBar from 'comp/NavBar/NavBar'

import qs from 'querystring'

import { getOrderByPay, payOrder } from 'api'

import './pay.less'

const CheckboxItem = Checkbox.CheckboxItem

const payList = [
  { label:'微信支付', value: 1 },
  { label:'支付宝支付', value: 2 },
  { label:'预存款支付', value: 5 },
]

export default function Pay(props) {

  const oid = useRef(qs.parse(props.location.search.slice(1)).id)
  const [payType,setPayType] = useState(5)
  const [price,setPrice] = useState(0)

  const onSubmit = () => {
    if(payType == 1 ){
      Toast.offline('暂不支持')
      return
    }
    const params = {
      data: `{"order_id": ${oid.current}}`,
      order_group: 'order',
      pay_type: payType,
      trade_type: 'js'
    }
    payHandle(params)
  }

  const payHandle = params => {
    payOrder(params).then(res=>{
      Toast.success('支付成功')
      setTimeout(_=>{
        props.history.push('/profile')
      },1500)
    })
  }

  useEffect(_=>{
    getOrderByPay({simplify:1, id: oid.current}).then(res=>{
      setPrice(res.data.pay_money)
    })
  },[])

  return (
    <div className="full-container">
      <NavBar>支付</NavBar>

      <div className="pay-bar">
        <div className="v1">支付金额</div>
        <div className="v2">￥{price}</div>
      </div>

      <div className="pay-type">
        {
          payList.map(item=>(
            <div key={item.value} onClick={_=>setPayType(item.value)}>
              {item.label}
              <CheckboxItem checked={item.value == payType} />
            </div>
          ))
        }
      </div>

      <div className="pay-btn">
        <button className="btn btn-block btn-Red" onClick={onSubmit}>确认支付</button>
      </div>

    </div>
  )
}
