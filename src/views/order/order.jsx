import React, { useEffect, useState, useRef } from 'react'

import { Tabs } from 'antd-mobile'

import NavBar from 'comp/NavBar/NavBar'
import Goods from 'comp/Goods/Goods'
import ListScroll from 'comp/ListScroll/ListScroll'

import { getOrder, deleteOrder, closeOrder, deliveryOrder } from 'api'
import { orderStatus } from 'utils/config'

import qs from 'querystring'

import './order.less'

const tabs = [
  { id: '-1', title: '全部'},
  { id: '0', title: '待付款'},
  { id: '1', title: '待发货'},
  { id: '2', title: '待收货'},
  { id: '3', title: '评价'},
]

export default function Order(props) {

  const state = useRef(qs.parse(props.location.search.slice(1)).state)
  const curIndex = useRef(tabs.findIndex(item=>item.id == state.current))
  const dataSource = useRef([])

  const [active,setActive] = useState(curIndex.current<0?0:curIndex.current)
  const [nextPage,setNextPage] = useState(true)
  const [orderList, setOrderList] = useState([])

  const query = useRef({
    page: 1,
    state: state.current
  })

  const onChangeTabs = (data,index) => {
    setActive(index)
    setOrderList([])
    setNextPage(true)
    query.current.page = 1
    query.current.state = data.id
    dataSource.current = []
    getOrderHandle()
  }

  const onLoadMore = () => {
    if(nextPage){
      query.current.page++
      getOrderHandle()
    }
  }

  const getOrderHandle = () => {
    const { page, state } = query.current
    const params = {
      synthesize_status: state > -1 ? state : '',
      page
    }
    getOrder(params).then(res=>{
      dataSource.current.push(...res.data)
      setOrderList([...dataSource.current])
      if(res.data.length < 10){
        setNextPage(false)
      }
    })
  }

  const onCancel = id => {
    closeOrder(id).then(res=>{
      const index = dataSource.current.findIndex(item=>item.id == id)
      dataSource.current[index].order_status = -4
      setOrderList([...dataSource.current])
    })
  }
  const onReceive = id => {
    deliveryOrder(id).then(res=>{
      const index = dataSource.current.findIndex(item=>item.id == id)
      dataSource.current[index].order_status = 3
      setOrderList([...dataSource.current])
    })
  }
  const onDelete = id => {
    deleteOrder(id).then(res=>{
      const index = dataSource.current.findIndex(item=>item.id == id)
      dataSource.current.splice(index,1)
      setOrderList([...dataSource.current])
    })
  }
  const onPay = id => {
    props.history.push(`/pay?id=${id}`)
  }

  useEffect(_=>{
    getOrderHandle()
  },[])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="full-container">
      <NavBar>我的订单</NavBar>

      <div className="order-bar">
        <Tabs tabs={tabs} swipeable={false} page={active} onChange={onChangeTabs} />
      </div>

      <div className="goods-list">
        <ListScroll data={orderList} onLoadMore={onLoadMore}>
          {
            rowData=>(
              <div className="order-row" key={rowData.id}>
                <div className="top-info">
                  <span>订单号：{rowData.order_sn}</span>
		              <span>{orderStatus[rowData.order_status]}</span>
                </div>
                {
                  rowData.product.map(item=>(
                    <div>
                      <Goods
                        key={item.id}
                        pic={item.product_picture}
                        title={item.product_name}
                        price={item.price}
                        br={`x${item.num}`}
                      >
                        {item.sku_name}
                      </Goods>
                    </div>
                  ))
                }
                <div className="tips-info">
                  共<span> {rowData.product_count} </span>件商品 实付款 ￥<span>{rowData.pay_money}</span>
                </div>
                <div className="btn-bar">
                  {
                    rowData.order_status == 0?
                      <button onClick={_=>onCancel(rowData.id)}>取消订单</button>:''
                  }
                  {
                    rowData.order_status == -4?
                    <button onClick={_=>onDelete(rowData.id)}>删除订单</button>:''
                  }
                  {
                    <button
                      className="b-red"
                      onClick={_=>props.history.push(`/orderDetail?id=${rowData.id}`)}
                    >
                      订单详情
                    </button>
                  }
                  {
                    rowData.order_status == 0 || rowData.order_status == 202?
                    <button className="b-red" onClick={_=>onPay(rowData.id)}>立即支付</button>:''
                  }
                  {
                    rowData.order_status == 2?
                    <button className="b-red" onClick={_=>onReceive(rowData.id)}>确认收货</button>:''
                  }
                </div>
              </div>
            )
          }
        </ListScroll>
        {
          nextPage ? '' : <div className="no-more"></div>
        }
      </div>

    </div>
  )
}
