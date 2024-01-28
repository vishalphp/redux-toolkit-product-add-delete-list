import { createSlice } from '@reduxjs/toolkit';
import ProductViewReducers, { productAddReducers } from '../reducers/ProductViewReducers';

const initialstate = {
    products: []
}

const productViewSlice = createSlice({
    name: 'productView',
    initialState: initialstate,
    reducers:{
        ProductViewReducers: ProductViewReducers,
        productAddReducers: productAddReducers
    }
});


export const productViewAction = productViewSlice.actions;
export default productViewSlice;