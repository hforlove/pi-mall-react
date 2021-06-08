
// const host = 'http://www.pride.demo.com/'
// const host = 'https://pride.test.utools.club/'
// const host = 'http://localhost:8000/'  
const host = 'https://pridewu.cn1.utools.club/'
const imgHost = 'http://www.pride.demo.com/'

const orderStatus = {
   '0': '待付款' ,
   '1': '待发货' ,
   '2': '已发货' ,
   '3': '已收货' ,
   '4': '已完成' ,
   '-1': '退货申请' ,
   '-2': '退款中' ,
   '-3': '退款完成' ,
   '-4': '已关闭' ,
   '-5': '撤销申请' ,
   '101': '待成团' ,
   '201': '备货中' ,
   '202': '待付尾款'
}

export {
  host,
  imgHost,
  orderStatus
}