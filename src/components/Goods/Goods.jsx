import React from 'react'
import PropTypes from 'prop-types'

import './Goods.less'

function Goods(props) {
  return (
    <div className="goods-row">
      <div className="img">
        <img src={props.pic} alt="" />
      </div>
      <div className="cont">
        <h3 className="ellipsis-mul top">{props.title}</h3>
        <div className="ellipsis mid">{props.children}</div>
        <div className="bottom">
          ￥{props.price}
          <div className="br">
            {props.br}
          </div>
        </div>
      </div>
    </div>
  )
}

Goods.propTypes = {
  pic: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
Goods.defaultProps = {
  pic:'',
  title:'',
  price:''
}

export default Goods

