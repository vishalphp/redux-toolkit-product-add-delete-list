import React from 'react';


const ProductViewReducers = (state, action) => {
   
   // state.products = Object.values(action.payload);
  // state.products = [...state.products, action.payload];
  if(action.payload !==''){

  const filtered = Object.entries(action.payload).filter(([key, value]) => value !== null );
  const updatedProducts = filtered.map(([key, value]) => { 
    
        return {
        key: key,
        value: value,
      }
    });

 /* const newState = {
    ...state,
    products: [...state.products, ...updatedProducts],
  };*/
  state.products = updatedProducts;
  //state.loadProduct = false;
  //console.log(state);

}

    return state;
}

export default ProductViewReducers;


export const productAddReducers = (state, action) =>{

  state.products.push(action.payload);

  return state;

}
