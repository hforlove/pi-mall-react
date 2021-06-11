import React, { useEffect, useRef, useState } from 'react'

import { Checkbox, Stepper } from 'antd-mobile'

import TabBar from 'comp/TabBar/TabBar'
import NavBar from 'comp/NavBar/NavBar'
import Goods from 'comp/Goods/Goods'

import { getCart, updateCart, deleteCart } from 'api'

import './cart.less'

const CheckboxItem = Checkbox.CheckboxItem

export default function Cart({history}) {

  const [cartList,setCartList] = useState([])
  const [selectAll,setSelectAll] = useState(true)
  const [price, setPrice] = useState(0)

  const onChange = id => {
    const cur = cartList.find(item=>item.id == id)
    cur.checked = !cur.checked
    setCartList([...cartList])
  }

  const onChangeNum = (sku_id,num) => {
    updateCart({num, sku_id}).then(_=>{
      const cur = cartList.find(item=>item.sku_id == sku_id)
      cur.number = num
      setCartList([...cartList])
    })
  }

  const onSelectAll = ev => {
    const { checked } = ev.target
    setSelectAll(checked)
    cartList.map(item=>item.checked = checked)
    setCartList([...cartList])
  }

  const onSubmit = () => {
    const ids = cartList.filter(item=>item.checked).map(item=>item.id)
    history.push(`/orderCreate?type=cart&ids=${ids.join(',')}`)
  }

  useEffect(_=>{
    getCart().then(res=>{
      res.data.map(item=>{
        item.checked = true
      })
      setCartList(res.data)
    })
  }, [])

  useEffect(_=>{
    const checks = cartList.filter(item => item.checked)
    let total = 0
    if (checks.length > 0) {
      total = checks.reduce((prev, cur) => {
        return prev + cur.number * cur.price
      }, 0)
    }
    setPrice(total.toFixed(2))
    setSelectAll(checks.length == cartList.length)
  },[cartList])

  return (
    <div className="main-container">
      <NavBar>购物车</NavBar>

      {
        cartList.map(item=>(
          <div className="cart-item" key={item.id}>
            <div className="l">
            <CheckboxItem checked={item.checked} onChange={() => onChange(item.id) } />
            </div>
            <div className="r">
              <Goods
                pic={item.product_img}
                title={item.product_name}
                price={item.price}
                br={
                  <Stepper
                    style={{ width: '100%', minWidth: '100px' }}
                    showNumber
                    min={1}
                    value={item.number}
                    onChange={val=>onChangeNum(item.sku_id,val)}
                  />
                }
              >
                {item.sku_name}
              </Goods>
            </div>
          </div>
        ))
      }

      <div className="bottom-action cart-action">
        <div className="l">
          <CheckboxItem checked={selectAll} onChange={onSelectAll}>全选</CheckboxItem>
        </div>
        <div className="r">
          合计：<span>￥{price}</span>
          <button className="btn btn-red" onClick={onSubmit}>结算</button>
        </div>
      </div>
     
    </div>
  )
}
