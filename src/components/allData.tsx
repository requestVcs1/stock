import React, { Component } from 'react';
interface prop {
    allData: Array<any>;
    addMyStock: Function;
}
class AllData extends Component<prop> {
    render() {
        const { allData, addMyStock } = this.props;
        return (
            <div>
                {allData.map((item: any) => {
                    return (
                        <div key={item.symbol} className="box">
                            <div onClick={() => addMyStock(item)} className="add">
                                ＋
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
        );
    }
}
export default AllData;
