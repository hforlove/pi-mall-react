import React, { useState, useEffect, useRef } from 'react'

import TabBar from 'comp/TabBar/TabBar'
import NavBar from 'comp/NavBar/NavBar'
import Scroll from 'comp/Scroll/Scroll'

import { getCategory } from 'api'

import './category.less'

export default function Category({history}) {

  const [cid, setCid] = useState('')
  const [plist, setPlist] = useState([])
  const [clist, setClist] = useState([])

  const pScroll = useRef(null)
  const cScroll = useRef(null)

  const onChange = id => {
    const { child } = plist.find(item=>item.id == id)
    setCid(id)
    setClist(child)
    cScroll.current.refresh()
  }

  useEffect(_=>{
    getCategory().then(res=>{
      setPlist(res.data)
      setClist(res.data[0].child)
      setCid(res.data[0].id)
      pScroll.current.refresh()
      cScroll.current.refresh()
    })
  },[])

  return (
    <div className="main-container">
      <NavBar right="iconsousuo" onRightClick={_=>history.push('/goodsList')}>分类</NavBar>

      <div className="category">
        <div className="cate-left">
          <Scroll ref={pScroll}>
          <ul className="cate-list">
            {
              plist.map(item=>(
                <li
                  className={item.id===cid?'act':''}
                  key={item.id}
                  onClick={_=>onChange(item.id)}
                >
                  {item.title}
                </li>
              ))
            }
          </ul>
          </Scroll>
        </div>
        <div className="cate-right">
          <Scroll ref={cScroll}>
            <div>
              {
                clist.map(item=>(
                  <div className="cate-child" key={item.id}>
                    <div className="cell">{item.title}</div>
                    <ul className="tags">
                      {
                        item.child.map(child=>(
                          <li key={child.id} onClick={_=>history.push(`/goodsList?cate=${child.id}`)}>
                            <div><img src={child.cover} alt="" /></div>
                            <span>{child.title}</span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))
              }
            </div>
          </Scroll>
        </div>
      </div>

      <TabBar />
    </div>
  )
}
