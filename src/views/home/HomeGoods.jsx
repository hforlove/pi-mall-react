import React from 'react'
import PropTypes from 'prop-types'

function HomeGoods(props) {
  return (
    <div className="home-goods-item">
      <img src={props.pic} alt="" />
      <p>{props.title}</p>
      <span>￥{props.price}</span>
    </div>
  )
}

HomeGoods.propTypes = {
  pic: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
HomeGoods.defaultProps = {
  pic:'',
  title:'',
  price:''
}

export default HomeGoods

