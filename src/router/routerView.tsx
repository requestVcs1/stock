import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
interface prop {
    routers: Array<any>;
}
class RouterView extends Component<prop> {
    render() {
        const { routers } = this.props;
        return (
            <Switch>
                <Redirect exact from="/" to="/home" />
                {routers.map((item: any, index: number) => {
                    console.log(item);
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            render={prop => {
                                const Com = item.component;
                                return item.children ? (
                                    <Com children={item.children} {...prop} />
                                ) : (
                                    <Com {...prop} />
                                );
                            }}
                        />
                    );
                })}
            </Switch>
        );
    }
}
export default RouterView;
