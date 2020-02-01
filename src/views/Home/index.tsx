import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
interface prop extends RouteComponentProps {
    myStock: Array<any>;
    setMyStock: Function;
}
class Home extends Component<prop> {
    skipMenu() {
        this.props.history.push('/menu');
    }
    render() {
        const { myStock } = this.props;
        return (
            <div className="Home-Page">
                <header className="header"></header>
                <main className="main">
                    <div className="container">
                        {myStock.map((item: any) => {
                            return (
                                <div key={item.symbol} className="box">
                                    <div className="left">{item.name}</div>
                                    <div className="right">
                                        <span></span>
                                        <span className={item.changepercent > 0 ? 'green' : 'red'}>
                                            {item.changepercent}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
                <footer className="footer">
                    <span>YaHoo!</span>
                    <span onClick={() => this.skipMenu()} className="iconfont icon-caidan"></span>
                </footer>
            </div>
        );
    }
    componentDidMount() {
        const myStock = localStorage.getItem('myStock');
        if (myStock) {
            this.props.setMyStock(JSON.parse(myStock));
        }
    }
}
const MapStateToProps = (state: any) => {
    return {
        myStock: state.myStock,
    };
};
const MapDispatchToProps = (dispatch: Function) => {
    return {
        setMyStock(data: any) {
            dispatch({ type: 'ADD_MY_STOCK', payload: data });
        },
    };
};
export default connect(MapStateToProps, MapDispatchToProps)(Home);
