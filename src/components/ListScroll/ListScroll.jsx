import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { ListView } from 'antd-mobile'

function ListScroll(props) {

  const [list, setList] = useState(new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  }))

  const onLoadMore = () => {
    props.onLoadMore && props.onLoadMore()
  }

  useEffect(() => {
    setList(list.cloneWithRows(props.data))
  }, [props.data])

  return (
    <ListView
      dataSource={list}
      renderRow={props.children}
      useBodyScroll
      onEndReached={onLoadMore}
      onEndReachedThreshold={50}
    />
  )
}

ListScroll.propTypes = {
  data: PropTypes.array,
  children: PropTypes.func
}
ListScroll.defaultProps = {
  data: [],
  children: ()=>{}
}

export default ListScroll

