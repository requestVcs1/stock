import React, { Component } from 'react';
import echarts from 'echarts';
interface prop {
    flag: boolean;
    selectData: any;
    myStock1: any;
}
class Penel extends Component<prop> {
    state = {
        start: 0,
        end: 0,
        curLeft: 0,
        myChart: null,
    };
    TouchStart(e: any) {
        const containerDom: any = this.refs.container;
        this.setState({
            start: e.targetTouches[0].pageX,
        });
        containerDom.style.left = this.state.curLeft;
        if (parseInt(containerDom.style.left) >= 0) containerDom.style.left = '-1px';
        if (parseInt(containerDom.style.left) <= -containerDom.offsetWidth / 2) {
            containerDom.style.left = -containerDom.offsetWidth / 2 + 1 + 'px';
        }
    }
    TouchMove(e: any) {
        const { start, curLeft } = this.state;
        const containerDom: any = this.refs.container;

        //左
        if (
            parseInt(containerDom.style.left) < 0 &&
            parseInt(containerDom.style.left) > -containerDom.offsetWidth / 2
        ) {
            //左
            if (start - e.targetTouches[0].pageX > 0) {
                containerDom.style.left = e.targetTouches[0].pageX - start + curLeft + 'px';
            } else {
                //右
                containerDom.style.left = e.targetTouches[0].pageX - start + curLeft + 'px';
            }
        }
    }
    TouchEnd(e: any) {
        const containerDom: any = this.refs.container;
        this.setState({
            curLeft: parseInt(containerDom.style.left),
        });
        if (parseInt(containerDom.style.left) >= 0) containerDom.style.left = '-1px';
        if (parseInt(containerDom.style.left) <= -containerDom.offsetWidth / 2) {
            containerDom.style.left = -containerDom.offsetWidth / 2 + 1 + 'px';
        }
    }
    render() {
        const { flag, selectData, myStock1 } = this.props;
        return (
            <div
                onTouchStart={e => this.TouchStart(e)}
                onTouchMove={e => this.TouchMove(e)}
                onTouchEnd={e => this.TouchEnd(e)}
                className={flag ? 'Panel-Com up' : 'Panel-Com down'}
            >
                <div ref="container" className="container">
                    <div>
                        <div className="name">{selectData && selectData.name}</div>
                        <div className="open">
                            <span>OPEN</span>
                            <span>{selectData && selectData.open}</span>
                        </div>
                        <div className="high">
                            <span>HIGH</span>
                            <span>{selectData && selectData.high}</span>
                        </div>
                        <div className="low">
                            <span>LOW</span>
                            <span>{selectData && selectData.low}</span>
                        </div>
                        <div className="vol">
                            <span>VOL</span>
                            <span>{selectData && selectData.volume}</span>
                        </div>
                        <div className="buy">
                            <span>P/E</span>
                            <span>{selectData && selectData.buy}</span>
                        </div>
                    </div>
                    <div ref="myCanvas"></div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        let myCanvasDom: any = this.refs.myCanvas;
        let myChart = echarts.init(myCanvasDom);
        let myStock1 = localStorage.getItem('myStock');
        if (myStock1) {
            let rawData = JSON.parse(myStock1);
            var dates = rawData.map(function(item: any) {
                console.log(item);
                return item.name;
            });

            var data = rawData.map(function(item: any) {
                return [+item.name, +item.open, +item.high, +item.low];
            });
            var option: any = {
                backgroundColor: '#21202D',
                legend: {
                    data: ['日K'],
                    inactiveColor: 'red',
                    textStyle: {
                        color: '#fff',
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false,
                        type: 'cross',
                        lineStyle: {
                            color: '#376df4',
                            width: 2,
                            opacity: 1,
                        },
                    },
                },
                xAxis: {
                    type: 'category',
                    data: dates,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                },
                yAxis: {
                    scale: true,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    splitLine: { show: false },
                },
                grid: {
                    bottom: 80,
                },
                dataZoom: [
                    {
                        textStyle: {
                            color: '#8392A5',
                        },
                        handleIcon:
                            'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        dataBackground: {
                            areaStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                opacity: 0.8,
                                color: '#fff',
                            },
                        },
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                        },
                    },
                    {
                        type: 'inside',
                    },
                ],
                animation: false,
                series: [
                    {
                        type: 'candlestick',
                        name: '日K',
                        data: data,
                        itemStyle: {
                            color: '#FD1050',
                            color0: '#0CF49B',
                            borderColor: '#FD1050',
                            borderColor0: '#0CF49B',
                        },
                    },
                ],
            };
            myChart.setOption(option);
        }
    }
}
export default Penel;
