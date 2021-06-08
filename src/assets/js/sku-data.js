const sku = {
  tree: [
    {
      k_s: 't1', // 属性id
      k: '颜色', // 属性名
      v: [
        {
          id: 1, // 属性值id
          name: '白色', // 属性值名
        },
        {
          id: 2,
          name: '黑色'
        },
      ],
    },
    {
      k_s: 't2', // 属性id
      k: '尺寸', // 属性名
      v: [
        {
          id: 1, // 属性值id
          name: 'XL', // 属性值名
        },
        {
          id: 2,
          name: 'SL'
        },
      ],
    }
  ],
  list: [
    {
      id: 1, // skuId
      t1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
      t2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 1000, // 价格（单位分）
      stock_num: 10 // 当前 sku 组合对应的库存
    },
    {
      id: 2, // skuId
      t1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
      t2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 2000, // 价格（单位分）
      stock_num: 20 // 当前 sku 组合对应的库存
    },
    {
      id: 3, // skuId
      t1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
      t2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 3000, // 价格（单位分）
      stock_num: 30 // 当前 sku 组合对应的库存
    },
    {
      id: 4, // skuId
      t1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
      t2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
      price: 4000, // 价格（单位分）
      stock_num: 40 // 当前 sku 组合对应的库存
    }
  ],
  price: '1.00', // 默认价格（单位元）
  stock_num: 227, // 商品总库存
}

const goods = {
  // 默认商品 sku 缩略图
  picture: 'https://img01.yzcdn.cn/1.jpg'
}

const prop = [];

export {
  sku,goods,prop
}