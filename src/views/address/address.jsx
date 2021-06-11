import React, { useEffect, useState } from 'react'

import NavBar from 'comp/NavBar/NavBar'

import { getAddress } from 'api'
import { setStore } from 'utils'

import './address.less'

export default function Address({history}) {

  const [addressList, setAddressList] = useState([])

  const onSelect = addr => {
    setStore('address',addr, true)
    history.goBack()
  }

  useEffect(_=>{
    getAddress().then(res=>{
      setAddressList(res.data)
    })
  },[])

  return (
    <div className="main-container">
      <NavBar>收货地址</NavBar>

      <div className="address-list">
        {
          addressList.map(item=>(
            <div className="address-item" key={item.id} onClick={_=>onSelect(item)}>
              <div className="l">
                <div className="t">
                  {item.realname} {item.mobile}
                  {
                    item.is_default==1?<span>默认</span>:''
                  }
                </div>
                <div className="b">{item.address_name} {item.address_details}</div>
              </div>
              <div className="r" onClick={_=>history.push(`/addressForm?id=${item.id}`)}>
                <i className="iconfont iconbianjimian"></i>
              </div>
            </div>
          ))
        }
      </div>

      <div className="bottom-action address-add">
        <button className="btn btn-block btn-Red" onClick={_=>history.push('/addressForm')}>新增地址</button>
      </div>

    </div>
  )
}
