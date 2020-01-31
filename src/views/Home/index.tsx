import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
interface prop extends RouteComponentProps {}
class Home extends Component<prop> {
    skipMenu() {
        this.props.history.push('/menu');
        console.log(this.props);
    }
    render() {
        return (
            <div className="Home-Page">
                <header className="header"></header>
                <main className="main"></main>
                <footer className="footer">
                    <span>YaHoo!</span>
                    <span onClick={() => this.skipMenu()} className="iconfont icon-caidan"></span>
                </footer>
            </div>
        );
    }
}
export default Home;
