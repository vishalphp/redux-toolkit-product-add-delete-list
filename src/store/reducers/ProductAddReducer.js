import React from "react";

const productAddReducer = (state, action) =>{

    state.products.push(action.payload);
        //console.log(action.payload);
  
    return state;

}

export default productAddReducer; 