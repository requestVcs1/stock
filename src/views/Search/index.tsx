import React, { Component } from 'react';
interface prop {}
class Search extends Component<prop> {
    render() {
        return (
            <div className="Search-Page">
                <div className="header">
                    <div className="title">Type a company name or stock syrmbol.</div>
                    <div className="search">
                        <span className="iconfont icon-sousuo"></span>
                        <input type="text" />
                        <span className="cancel">
                            <span>×</span>
                            <span>Cancel</span>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Search;
