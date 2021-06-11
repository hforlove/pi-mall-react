import React from 'react'
import './Cell.less'
function Cell(props) {
  const onClick = () => {
    props.onClick && props.onClick()
  }
  return (
    <div className="cell" onClick={onClick}>
      <div className="cl">{props.title}</div>
      <div className="cr">
        <div className={props.right?'r':''}>{props.children}</div>
        {
          props.arrow ? 
          <span>
            <i className="iconfont iconjiantou"></i>
          </span>
          : ''
        }
      </div>
    </div>
  )
}

Cell.defaultProps = {
  arrow: true
}

export default Cell

