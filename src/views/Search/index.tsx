import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import CurData from '../../components/curData';
import AllData from '../../components/allData';
interface prop extends RouteComponentProps {
    setAllStock: Function;
    allStock: Array<any>;
    myStock: Array<any>;
    addMyStock: Function;
}
class Search extends Component<prop> {
    state = {
        curData: [],
        val: '',
    };
    //模糊搜索
    fuzzySearch(e: any) {
        let val = e.target.value;
        if (val.trim()) {
            const result = this.props.allStock.filter((item: any) => {
                return (
                    item.name.includes(val) || item.symbol.includes(val) || item.code.includes(val)
                );
            });
            this.setState({
                curData: result,
                val: e.target.value,
            });
        } else {
            this.setState({
                curData: [],
            });
        }
    }
    //添加收藏
    addMyStock = (data: any) => {
        const arr = this.props.myStock;
        for (let i of arr) {
            if (i.code === data.code) {
                alert('不能重复添加');
                return;
            }
        }
        arr.push(data);
        this.props.addMyStock(arr);
        alert('添加成功');
    };
    //后退
    back() {
        this.props.history.go(-1);
    }
    render() {
        const { curData } = this.state;
        const { allStock } = this.props;
        return (
            <div className="Search-Page">
                <div className="header">
                    <div className="title">Type a company name or stock syrmbol.</div>
                    <div className="search">
                        <span className="iconfont icon-sousuo"></span>
                        <input onInput={e => this.fuzzySearch(e)} type="text" />
                        <span className="cancel">
                            <span>×</span>
                            <span onClick={() => this.back()}>Cancel</span>
                        </span>
                    </div>
                </div>
                <div className="main">
                    <div className="container">
                        {curData.length > 0 ? (
                            <CurData addMyStock={this.addMyStock} curData={curData} />
                        ) : (
                            <AllData addMyStock={this.addMyStock} allData={allStock} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        //从本地仓库提取
        const stockData = localStorage.getItem('stockData');
        //判断是否已有数据
        if (stockData) {
            //有 存入store
            this.props.setAllStock(JSON.parse(stockData));
        } else {
            //无 从新请求数据
            Axios({
                url:
                    '/finance/stock/shall?stock=&page=1&type=3&key=e227d398ffd69487130a667a35887909',
            }).then(res => {
                //转化JSON数据
                const stringify = JSON.stringify(res.data.result.data);
                //存入本地仓库
                localStorage.setItem('stockData', stringify);
                //存入store
                this.props.setAllStock(res.data.result.data);
            });
        }
    }
}
const MapStateToProps = (state: any) => {
    return {
        allStock: state.allStock,
        myStock: state.myStock,
    };
};
const MapDispatchToProps = (dispatch: Function) => {
    return {
        setAllStock(data: any) {
            dispatch({ type: 'ADD_ALL_STOCK', payload: data });
        },
        addMyStock(data: any) {
            dispatch({ type: 'ADD_MY_STOCK', payload: data });
        },
    };
};
export default connect(MapStateToProps, MapDispatchToProps)(Search);
