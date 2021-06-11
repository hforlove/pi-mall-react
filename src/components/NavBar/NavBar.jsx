import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './NavBar.less'

function NavBar(props) {

  const goBack = () => {
    props.history.goBack()
  }

  const onRightClick = () => {
    if(props.onRightClick){
      props.onRightClick()
    }else{
      props.history.push('/home')
    }
  }

  return (
    <div className="nav-bar">
      <div className="left">
        {
          props.back ? (
            <div onClick={goBack}>
              <i className="iconfont iconjiantou-zuo"></i>
            </div>
          ) : null
        }
      </div>
      <div className="mid">
        <div>
          {props.children}
        </div>
      </div>
      <div className="right">
        <div onClick={onRightClick}>
          {
            props.rightText ? props.rightText : <i className={`iconfont ${props.right}`}></i>
          }
        </div>
      </div>
    </div>
  )
}


NavBar.propTypes = {
  back: PropTypes.bool,
  right: PropTypes.string,
  rightText: PropTypes.string
}
NavBar.defaultProps = {
  back: true,
  right: 'iconshouye',
  rightText: ''
}
export default withRouter(NavBar)
