import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './views/login/login'
import Home from './views/home/home'
import Category from './views/category/category'
import Cart from './views/cart/cart'
import Profile from './views/profile/profile'

import GoodsList from './views/goodsList/goodsList'
import GoodsDetail from './views/goodsDetail/goodsDetail'
import Order from './views/order/order'
import OrderCreate from './views/orderCreate/orderCreate'
import OrderDetail from './views/orderDetail/orderDetail'
import Address from './views/address/address'
import AddressForm from './views/addressForm/addressForm'
import Pay from './views/pay/pay'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/category" component={Category} />
        <Route path="/cart" component={Cart} />
        <Route path="/profile" component={Profile} />
        <Route path="/goodsList" component={GoodsList} />
        <Route path="/goodsDetail" component={GoodsDetail} />
        <Route path="/order" component={Order} />
        <Route path="/orderCreate" component={OrderCreate} />
        <Route path="/orderDetail" component={OrderDetail} />
        <Route path="/address" component={Address} />
        <Route path="/addressForm" component={AddressForm} />
        <Route path="/pay" component={Pay} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;
