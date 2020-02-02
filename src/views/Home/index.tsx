import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Panel from '../../components/panel';
interface prop extends RouteComponentProps {
    myStock: Array<any>;
    setMyStock: Function;
    setSelectData: Function;
    selectData: any;
}
class Home extends Component<prop> {
    state = {
        flag: false,
        active: null,
        myStock1: [],
    };
    skipMenu() {
        this.props.history.push('/menu');
    }
    showInfo(item: any, index: number) {
        this.props.setSelectData(item);
        this.setState({
            flag: true,
            active: index,
        });
    }
    render() {
        const { myStock, selectData } = this.props;
        const { flag, active, myStock1 } = this.state;
        return (
            <div className="Home-Page">
                <header className="header"></header>
                <main className="main">
                    <div className="container">
                        {myStock.map((item: any, index: number) => {
                            return (
                                <div
                                    onClick={() => this.showInfo(item, index)}
                                    key={item.symbol}
                                    className={active === index ? 'box active' : 'box'}
                                >
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
                <Panel myStock1={myStock1} selectData={selectData} flag={flag} />
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
            this.setState({
                myStock1: myStock,
            });
        }
    }
}
const MapStateToProps = (state: any) => {
    return {
        myStock: state.myStock,
        selectData: state.selectData,
    };
};
const MapDispatchToProps = (dispatch: Function) => {
    return {
        setMyStock(data: any) {
            dispatch({ type: 'ADD_MY_STOCK', payload: data });
        },
        setSelectData(data: any) {
            dispatch({ type: 'SET_SELECT_DATA', payload: data });
        },
    };
};
export default connect(MapStateToProps, MapDispatchToProps)(Home);
