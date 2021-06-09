import React, { useRef, useState, useEffect } from 'react'

import NavBar from 'comp/NavBar/NavBar'
import Goods from 'comp/Goods/Goods'
import ListScroll from 'comp/ListScroll/ListScroll'

import { setStore, getStore } from 'utils'
import { getGoodsList } from 'api'

import qs from 'querystring'

import './goodsList.less'

export default function GoodsList(props) {
  const cate_id = useRef(qs.parse(props.location.search.slice(1)).cate)
  const searchEL = useRef(null)
  const dataSource = useRef([])
  const [history, setHistory] = useState(getStore('historySearch',true)||[])
  const [hot] = useState(getStore('hotSearch',true)||[])
  const [showSearch, setShowSearch] = useState(!cate_id.current)
  const [nextPage, setNextPage] = useState(true)
  const [goodsList, setGoodsList] = useState([])

  const query = useRef({
    keyword: '',
    page: 1,
    cate_id: cate_id.current
  })

  const onFocus = () => {
    setShowSearch(true)
  }

  const onItemClick = value => {
    searchEL.current.value = value
    onSearch()
  }

  const getList = () => {
    getGoodsList(query.current).then(res=>{
      dataSource.current.push(...res.data)
      setGoodsList([...dataSource.current])
      if(res.data.length<12){
        setNextPage(false)
      }
    })
  }

  const onSearch = () => {
    const { value } = searchEL.current
    if(value && !history.includes(value)){
      setHistory([value, ...history])
      setStore('historySearch',history, true)
    }
    setShowSearch(false)
    query.current.page = 1
    query.current.keyword = value
    dataSource.current = []
    setGoodsList([])
    setNextPage(true)
    getList()
  }

  const onLoadMore = () => {
    if(nextPage){
      query.current.page++
      getList()
    }
  }

  useEffect(()=>{
    if(query.current.cate_id) getList()
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="full-container">
      <NavBar rightText="搜索"  onRightClick={onSearch}>
        <input ref={searchEL} className="search-input" type="text" placeholder="请输入商品关键字" onFocus={onFocus} />
      </NavBar>

      <div className={`goods-search ${showSearch?'':'hidden'}`}>
        <div className="search-item">
          <div className="tag">最近搜索<span><i className="iconfont iconshanchu"></i></span>
          </div>
          <div className="item">
            {history.map(item=><span key={item} onClick={_=>onItemClick(item)}>{item}</span>)}
          </div>
        </div>
        <div className="search-item">
          <div className="tag">热门搜索</div>
          <div className="item">
            {
              hot.map((item,index)=>(
                <span key={item} onClick={_=>onItemClick(item)} className={index<3?'act':''}>{item}</span>
              ))
            }
          </div>
        </div>
      </div>

      <div className="goods-list">
        <ListScroll data={goodsList} onLoadMore={onLoadMore}>
          {
            rowData=>(
              <div onClick={_=>props.history.push(`/goodsDetail?id=${rowData.id}`)}>
                <Goods
                  key={rowData.id}
                  pic={rowData.picture}
                  title={rowData.name}
                  price={rowData.price}
                  br={
                    <span>已售 {rowData.total_sales}<br />库存 {rowData.stock}</span>
                  }
                >
                  {rowData.sketch}
                </Goods>
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
