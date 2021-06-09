import React, { useEffect, useRef, useImperativeHandle } from 'react'
import BScroll from 'better-scroll'

import './Scroll.less'

const Scroll = React.forwardRef((props, ref) => {
  const wrapper = useRef(null)
  const wrapperScroll = useRef(null)
  
  useImperativeHandle(ref, () => ({
    refresh
  }))
  
  const refresh = () => {
    setTimeout(_=>{
      wrapperScroll.current.scrollTo(0,0,0)
      wrapperScroll.current.refresh()
    })
  }

  useEffect(_=>{
    wrapperScroll.current = new BScroll(wrapper.current, {click: true,tap: true})
  },[])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="scroll-wrapper" ref={wrapper}>
      {props.children}
    </div>
  )
})

export default Scroll
