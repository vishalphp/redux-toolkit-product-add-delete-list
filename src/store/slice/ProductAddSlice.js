import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import productAddReducer from "../reducers/ProductAddReducer";

const initialstate = {
    products: []
}

const productAddSlice = createSlice({
    name: 'addproductslice',
    initialState: initialstate,
    reducers:{
        productAddReducer: productAddReducer
    }
});

export default productAddSlice;
export const productAddAction = productAddSlice.actions;