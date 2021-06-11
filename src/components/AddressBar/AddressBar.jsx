import React from 'react'

import './AddressBar.less'

export default function AddressBar({user,phone,children,onClick,arrow=true}) {
  return (
    <div className="address-bar" onClick={_=>onClick&&onClick()}>
      <div className="info">
        <div className="loc">
          <i className="iconfont icondizhi"></i>
        </div>
        <div className="cont">
          <p>{user} {phone}</p>
          <p>{children}</p>
        </div>
      </div>
      {
        arrow ?
        <div className="icon">
          <i className="iconfont iconjiantou"></i>
        </div>
        : ''
      }
    </div>
  )
}
