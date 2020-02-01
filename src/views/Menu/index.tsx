import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
interface prop extends RouteComponentProps {
    myStock: Array<any>;
    setMyStock: Function;
}
class Menu extends Component<prop> {
    skipSearch() {
        this.props.history.push('/search');
    }
    deleteMyStock(code: number) {
        const arr = JSON.parse(JSON.stringify(this.props.myStock));
        arr.forEach((item: any, index: number) => {
            if (item.code == code) {
                arr.splice(index, 1);
                this.props.setMyStock(arr);
            }
        });
    }
    back() {
        this.props.history.go(-1);
    }
    render() {
        const { myStock } = this.props;
        return (
            <div className="Menu-Page">
                <div className="header">
                    <span
                        onClick={() => this.skipSearch()}
                        className="add iconfont icon-add"
                    ></span>
                    <span>Stocks</span>
                    <span onClick={() => this.back()} className="done">
                        Done
                    </span>
                </div>
                <div className="main">
                    <div className="container">
                        {myStock.map((item: any) => {
                            return (
                                <div key={item.symbol} className="box">
                                    <div
                                        onClick={() => this.deleteMyStock(item.code)}
                                        className="delete"
                                    >
                                        -
                                    </div>
                                    <p>
                                        <span>{item.name}</span>
                                        <span>{item.code}</span>
                                    </p>
                                    <p>{item.symbol}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
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
export default connect(MapStateToProps, MapDispatchToProps)(Menu);
