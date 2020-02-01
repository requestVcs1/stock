import { createStore } from 'redux';
interface action {
    type: string;
    payload: any;
}
const initState: any = {
    allStock: [],
    myStock: [],
};
const reducer = (state: any, action: action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'ADD_ALL_STOCK':
            newState.allStock = action.payload;
            return newState;
        case 'ADD_MY_STOCK':
            newState.myStock = action.payload;
            localStorage.setItem('myStock', JSON.stringify(action.payload));
            return newState;
        default:
            return newState;
    }
};
export default createStore(reducer, initState);
