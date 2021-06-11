import React, { useEffect, useState, useRef } from 'react'

import { Switch, Picker } from 'antd-mobile'

import NavBar from 'comp/NavBar/NavBar'
import Cell from 'comp/Cell/Cell'

import { createAddress, updateAddress, deleteAddress, getAddressDetail } from 'api'
import { setStore } from 'utils'

import areaList from 'utils/areaJson'

import qs from 'querystring'

import './addressForm.less'

export default function Address(props) {

  const aid = useRef(qs.parse(props.location.search.slice(1)).id)
  
  const [visible,setVisible] = useState(false)
  const [areaData,setAreaData] = useState([])
  const [address, setAddress] = useState({
    address_name: '',
    realname: '',
    mobile: '',
    address_details: '',
    province_id: '',
    city_id: '',
    area_id: '',
    is_default: 0
  })
  
  const onChange = (ev,type) => {
    const addr = {...address}
    addr[type] = ev.target ? ev.target.value : ev
    setAddress(addr)
  }

  const onSelectArea = (val) => {
    const province = areaList.find(item=>item.value == val[0])
    const city = province.children.find(item=>item.value == val[1])
    const area = city.children.find(item=>item.value == val[2])

    setAreaData(val)
    setVisible(false)
    setAddress({
      ...address,
      province_id: val[0],
      city_id: val[1],
      area_id: val[2],
      address_name: `${province.label} ${city.label} ${area.label}`
    })
  }

  const onDelete = () => {
    deleteAddress(address.id).then(res=>{
      props.history.goBack()
    })
  }

  const onSubmit = () => {
    const params = {...address}
    if(address.id){
      params.id = address.id
      updateAddress(params).then(_=>{
        props.history.goBack()
      })
    }else{
      createAddress(params).then(_=>{
        props.history.goBack()
      })
    }
  }

  useEffect(_=>{
    if(aid.current){
      getAddressDetail(aid.current).then(res=>{
        const data = res.data
        setAddress(data)
        setAreaData([data.province_id+'',data.city_id+'',data.area_id+''])
      })
    }
  },[])

  return (
    <div className="main-container">
      <NavBar>{address.id?'编辑地址':'新增地址'}</NavBar>

      <div className="address-form">
        <Cell title="姓名" arrow={false}>
          <input
            className="input"
            value={address.realname}
            onChange={ev=>onChange(ev,'realname')}
            placeholder="收货人姓名"
          />
        </Cell>
        <Cell title="电话" arrow={false}>
          <input
            className="input"
            value={address.mobile}
            onChange={ev=>onChange(ev,'mobile')}
            placeholder="收货人电话"
          />
        </Cell>
        <Cell title="地区" onClick={_=>setVisible(true)}>
          <input
            className="input"
            value={address.address_name}
            placeholder="选择省/市/区"
            readOnly
          />
        </Cell>
        <Cell title="详细地址" arrow={false}>
          <input
            className="input"
            value={address.address_details}
            onChange={ev=>onChange(ev,'address_details')}
            placeholder="街道门牌 楼层房间号等信息"
          />
        </Cell>
        <div className="address-def">
          <span>设为默认收货地址</span>
          <Switch checked={address.is_default}
            onChange={ev => onChange(ev,'is_default')}
          />
        </div>
      </div>

      <Picker
        visible={visible}
        value={areaData}
        data={areaList}
        onChange={onSelectArea}
        onDismiss={_=>setVisible(false)}
      />

      <div className="address-add">
        <button className="btn btn-block btn-Red" onClick={onSubmit}>保存</button>
        {
          address.id ? <button className="btn btn-block btn-default" onClick={onDelete}>删除</button> : ''
        }
      </div>

    </div>
  )
}
