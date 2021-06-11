import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import App from './App';

import 'antd-mobile/dist/antd-mobile.css'
import 'assets/styles/common.less'
import 'assets/styles/iconfont.css'

import 'amfe-flexible'

import { Toast } from 'antd-mobile'
Toast.config({ duration: 1.5 })

ReactDOM.render(
  <HashRouter>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </HashRouter>,
  document.getElementById('root')
);
