import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './views/login/login'
import Home from './views/home/home'
import Category from './views/category/category'
import Cart from './views/cart/cart'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/category" component={Category} />
        <Route path="/cart" component={Cart} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;
