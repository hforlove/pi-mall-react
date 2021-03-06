import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { getStore } from 'utils'

import './TabBar.less'

function TabBar({location, history}) {
  const current = location.pathname
  const [tabs] = useState([
    {
      label: '首页',
      path: '/home',
      icon: 'iconshouye',
    },
    {
      label: '分类',
      path: '/category',
      icon: 'iconfenlei1',
    },
    
    {
      label: '购物车',
      path: '/cart',
      icon: 'icongouwuche',
      brage: getStore('cart')||0
    },
    {
      label: '我的',
      path: '/profile',
      icon: 'icongerenzhongxin',
    }
  ])

  const redirect = path => {
    history.push(path)
  }

  return (
    <ul className="tab-bar">
      {
        tabs.map(item=>(
          <li className={`${current === item.path ? 'act' : ''}`} key={item.path} onClick={_=>{redirect(item.path)}}>
            <i className={`iconfont ${item.icon}`}></i>
            {item.brage ? <span className="badge">{item.brage}</span>: ''}
            {item.label}
          </li>
        ))
      }
    </ul>
  )
}

export default withRouter(TabBar)
