import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { Stepper, Toast } from 'antd-mobile'

import './Sku.less'

function Sku(props) {
  
  const info = useRef({})

  const [detail, setDetail] = useState({
    pic: '',
    price: 0,
    stock: ''
  })
  const [options,setOptions] = useState([])
  const [selectText, setSelectText] = useState('')
  const [num, setNum] = useState(1)

  const onChangeNum = val => {
    setNum(val)
  }

  const onSubmit =type => {
    if(!info.current.sku_id){
      Toast.offline('请选择商品规格')
      return
    }
    props.onSubmit && props.onSubmit({type, num, sku_id: info.current.sku_id})
  }

  const calcSku = sku => {
    if(Object.keys(sku).length<1) return
    setDetail({
      pic: sku.picture,
      price: sku.price,
      stock: sku.stock
    })
    setOptions(sku.base_attribute_format)

    if(sku.base_attribute_format.length){
      info.current.skuList = sku.sku
      info.current.selected = new Array(sku.base_attribute_format.length)
      // 保存每个分类选中的数据id
      info.current.selected.fill('')
      // skuArr为二维数组,储存每种组合里管理的规格id
      info.current.skuArr = info.current.skuList.map(item=>item.data.split('-'))
    }else{
      info.current.sku_id = sku.sku[0].id
    }
  }

  const onSelectOption = (pIndex, cIndex, child) => {
    if(child.disabled||child.active) return
    // 把选中的数据id放入对应的位置
    info.current.selected[pIndex] = child.base_spec_value_id
    const attrs = JSON.parse(JSON.stringify(options))
    attrs[pIndex].value.map(item=>item.active = false)
    attrs[pIndex].value[cIndex].active = true
    attrs[pIndex].active = true
    // 上面设置选择状态
    // 下面设置哪些需要禁用的
    setOptionStatus(pIndex,attrs)
    calcSelectText()
  }

  const setOptionStatus = (pIndex,attrs) => {
    attrs.forEach((item,index)=>{
      if(index != pIndex){	// 跳过相同的分类
        let inList = info.current.skuArr
        info.current.selected.forEach((s,i)=>{
          if(s && i != index) inList = inList.filter(l=>l[i] == s)
        })
        
        const ids = inList.map(item=>item[index])
        item.value.forEach(child=>{
          const cid = child.base_spec_value_id
          child.disabled = !ids.includes(cid) 
        })
      }
    })
    setOptions([...attrs])
  }

  const calcSelectText = () => {
    const ok = info.current.selected.filter(item=>!item).length
    if(ok == 0){
      const str = info.current.selected.join('-')
      const cur = info.current.skuList.find(item=>item.data == str)
      info.current.sku_id = cur.id
      setSelectText(cur.name)
      setDetail({...detail, stock: cur.stock, price: cur.price})
    }
  }

  useEffect(_=>{
    if(Object.keys(props.sku)) calcSku(props.sku)
  }, [ props.sku ])   // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="goods-sku">
      <div className="close">
        <i className="iconfont iconClose"></i>
      </div>
      <div className="top">
        <img className="img" src={detail.pic} alt="" />
        <div className="info">
          <div className="price">￥{detail.price}</div>
          <div className="stock">剩余{detail.stock}件</div>
          {
            selectText ? (
              <div className="tips">
              已选 
              <span className="type">{selectText}</span>
            </div>
            ) : (
              <div className="tips">
              请选择
              {
                options.map(item=>(
                  item.active ? '' :
                  <span className="type" key={item.id}>
                    {item.title}
                  </span>
                ))
              } 
            </div>
            )
          }
        </div>
      </div>
      {
        options.map((item,index)=>(
          <div className="option" key={item.id}>
            <div className="title">{item.title}</div>
            <div className="list">
              {
                item.value.map((child,cIndex)=>(
                  <span
                    className={`item ${child.active?'act':''} ${child.disabled?'disabled':''}`}
                    key={child.base_spec_value_id}
                    onClick={_=>onSelectOption(index,cIndex,child)}
                  >
                    {child.title}
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
      <div className="count">
        <div>购买数量</div>
        <div>
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            min={1}
            value={num}
            onChange={onChangeNum}
          />
        </div>
      </div>
      <div className="btn-group">
        <button className="btn btn-yellow" onClick={_=>onSubmit('cart')}>加入购物车</button>
        <button className="btn btn-red" onClick={_=>onSubmit('buy')}>立即购买</button>
      </div>
    </div>
  )
}

Sku.propTypes = {
  sku: PropTypes.object
}
Sku.defaultProps = {
  sku: {}
}

export default Sku

