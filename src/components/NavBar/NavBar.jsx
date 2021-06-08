import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './NavBar.less'

function NavBar(props) {

  const goBack = () => {
    props.history.goBack()
  }

  const onRightClick = () => {
    props.onRightClick && props.onRightClick()
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
          <i className={`iconfont ${props.right}`}></i>
        </div>
      </div>
    </div>
  )
}


NavBar.propTypes = {
  back: PropTypes.bool,
  right: PropTypes.string
}
NavBar.defaultProps = {
  back: true,
  right: 'iconsousuo'
}
export default withRouter(NavBar)
