import React, { Component } from 'react';
interface prop {
    curData: Array<any>;
    addMyStock: Function;
}
class CurData extends Component<prop> {
    render() {
        const { curData, addMyStock } = this.props;
        return (
            <div>
                {curData.map((item: any) => {
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
export default CurData;
