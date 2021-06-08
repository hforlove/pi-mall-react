import React, { useRef, useState } from 'react'
import { Tabs, InputItem, Button, Toast } from 'antd-mobile'

import { login, register, sendSmsCode } from 'api'
import { setToken } from 'utils'

import './login.less'

export default function Login({history}) {
  const loginMobileRef = useRef(null)
  const loginPasswordRef = useRef(null)
  const regMobileRef = useRef(null)
  const regPasswordRef = useRef(null)
  const regCodeRef = useRef(null)
  const regNicknameRef = useRef(null)

  const tabs = [ {title: '登录'}, {title: '注册'} ]

  const [regCode,setRegCode] = useState('')
  const [active,setActive]  = useState(0)

  const getRefValue = (ref) => {
    return ref.current.state.value
  }

  const onChangeTabs = (_,index) => {
    setActive(index)
  }

  const onSendCode = () => {
    const mobile = getRefValue(regMobileRef)
    if(!mobile){
      Toast.offline('请输入手机号！')
      return
    }
    sendSmsCode(mobile).then(res=>{
      setRegCode(res.data)
    })
  }

  const onRegister = () => {
    const code = getRefValue(regCodeRef)
    const password = getRefValue(regPasswordRef)
    const mobile = getRefValue(regMobileRef)
    const nickname = getRefValue(regNicknameRef)
    const password_repetition = password
    if(code && password && mobile && nickname){
      const params = { code, password, mobile, nickname, password_repetition, group: "tinyShopH5"}
      register(params).then(res=>{
        Toast.success('注册成功')
        setActive(0)
      })
    }else{
      Toast.offline('请输入注册资料！')
    }
  }

  const onLogin = () => {
    const mobile = getRefValue(loginMobileRef)
    const password = getRefValue(loginPasswordRef)
    if(mobile && password){
      login({mobile, password, group: "tinyShopH5"}).then(res=>{
        setToken(res.data.access_token)
        Toast.success('登陆成功！')
        history.push('/home')
      })
    }else{
      Toast.offline('请输入登录信息！')
    }
  }

  return (
    <>
      <div className="login-banner">
        <div className="text">Hi~<br />PI商城欢迎你</div>
        <div className="logo"></div>
      </div>
      <div className="login-main">
        <Tabs tabs={tabs} swipeable={false} page={active} onChange={onChangeTabs}>
          <div className="login-tab">
            <InputItem placeholder="手机号" ref={loginMobileRef} defaultValue="13128542661" >手机号</InputItem>
            <InputItem placeholder="密码" ref={loginPasswordRef} defaultValue="123123" >密码</InputItem>
            <div className="btn"><Button type="primary" onClick={onLogin}>登录</Button></div>
          </div>
          <div className="login-tab">
            <InputItem placeholder="手机号" ref={regMobileRef} >手机号</InputItem>
            <div className="code">
              <div className="l">
                <InputItem value={regCode} placeholder="验证码" ref={regCodeRef} >验证码</InputItem>
              </div>
              <div className="r">
                <Button type="ghost" size="small" onClick={onSendCode}>发送验证码</Button>
              </div>
            </div>
            <InputItem placeholder="密码" ref={regPasswordRef} >密码</InputItem>
            <InputItem placeholder="昵称" ref={regNicknameRef} >昵称</InputItem>
            <div className="btn"><Button type="primary" onClick={onRegister}>注册</Button></div>
          </div>
        </Tabs>
      </div>
    </>
  )
}
