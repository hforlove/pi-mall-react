import React, { useEffect, useRef, useState } from 'react'

import { Toast } from 'antd-mobile'

import NavBar from 'comp/NavBar/NavBar'
import AddressBar from 'comp/AddressBar/AddressBar'
import Goods from 'comp/Goods/Goods'

import { getOrderPreview, createOrder, getCartNum } from 'api'
import { getStore, setStore, removeStore } from 'utils'

import qs from 'querystring'

import './orderCreate.less'

export default function OrderCreate(props) {
  
  const payload = useRef(qs.parse(props.location.search.slice(1)))
  const [orderList,setOrderList] = useState([])
  const [address,setAddress] = useState({})
  const [price,setPrice] = useState(0)
  
  const onSubmit = () => {
    if(!address.id){
      Toast.offline('请选择收货地址！')
      return
    }
    createOrderHandle()
  }

  const createOrderHandle = () => {
    const { type, ids, num } = payload.current
    const params = {
      address_id: address.id,
      buyer_message: '',
      data: num ? `{"sku_id":${ids},"num":${num}}` : ids,
      shipping_type: 1,
      type
    }
    createOrder(params).then(res=>{
      getCartNum().then(res=>{
        setStore('cart',res.data)
      })
      props.history.push(`/pay?id=${res.data.id}`)
    })
  }

  useEffect(_=>{
    const { type, ids, num } = payload.current
    const params = {
      type,
      data: num ? `{"sku_id":${ids},"num":${num}}` : ids
    }
    getOrderPreview(params).then(res=>{
      setOrderList(res.data.products)
      setAddress(res.data.address||{})
      setPrice(res.data.products.reduce((prev,cur) => prev + cur.num * cur.price, 0))

      const addr = getStore('address', true)
      addr && setAddress(addr)
      removeStore('address')
    })
  },[])

  return (
    <div className="main-container">
      <NavBar>创建订单</NavBar>

      <AddressBar
        user={address.realname}
        phone={address.mobile}
        onClick={_=>props.history.push('/address')}
      >
        {address.address_name} {address.address_details}
      </AddressBar>

      {
        orderList.map(item=>(
          <div key={item.sku_id}>
            <Goods
              pic={item.product_picture}
              title={item.product_name}
              price={item.price}
              br={`x${item.num}`}
            >{item.sku_name}</Goods>
          </div>
        ))
      }

      <div className="bottom-action order-action">
        <div>实付款：<span>￥{price}</span></div>
        <button className="btn btn-red" onClick={onSubmit}>提交订单</button>
      </div>

    </div>
  )
}
