import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routerConfig from './routerConfig';
import RouterView from './routerView';
import '../iconfont/iconfont1/iconfont.css';
import '../iconfont/iconfont2/iconfont.css';
function RouterMain() {
    return (
        <Router>
            <RouterView routers={routerConfig} />
        </Router>
    );
}
export default RouterMain;
