import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
interface prop extends RouteComponentProps {}
class Menu extends Component<prop> {
    skipSearch() {
        this.props.history.push('/search');
    }
    render() {
        return (
            <div className="Menu-Page">
                <div className="header">
                    <span
                        onClick={() => this.skipSearch()}
                        className="add iconfont icon-add"
                    ></span>
                    <span>Stocks</span>
                    <span className="done">Done</span>
                </div>
            </div>
        );
    }
}
export default Menu;
