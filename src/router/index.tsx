import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routerConfig from './routerConfig';
import RouterView from './routerView';
import '../iconfont/iconfont1/iconfont.css';
import '../iconfont/iconfont2/iconfont.css';
import { Provider } from 'react-redux';
import stroe from '../store/';
function RouterMain() {
    return (
        <Provider store={stroe}>
            <Router>
                <RouterView routers={routerConfig} />
            </Router>
        </Provider>
    );
}
export default RouterMain;
