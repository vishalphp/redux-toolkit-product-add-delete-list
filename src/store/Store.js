//old version with toolkit
//import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import productViewSlice from './slice/ProductViewSlice';
import { productViewAction } from './slice/ProductViewSlice';
//import { productAddAction } from './slice/ProductAddSlice';
import Axios from '../component/axios/Axios';
//import productAddSlice from './slice/ProductAddSlice';

const Store = configureStore({
    reducer:{
        productViewSlice: productViewSlice.reducer,
        //productAddSlice: productAddSlice.reducer
    }
});


export const fetchProductsFirebase = () =>{

    return async(dispatch)=>{
  
      try{

        const response = await Axios.get(
        '.json',
         {
            headers: {'content-type':'application/json'}
         }
         );

         if(!response.statusText === 'OK'){
            throw new Error("not able to connect with any database");
         }

         //console.log(response)
 
        dispatch(productViewAction.ProductViewReducers(response.data));
      }catch(err){
        throw err;
      }
  
      }
  
  }


export const deleteRecord = (id) =>{

 
    return async(dispatch) => { 
 const config = {
          headers: {
            'content-type':'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
        };
      try{

      if(Array.isArray(id)){
        const resp =  await loopDelete(id, config)
        return resp ? true: '';
      }else{
        await Axios.delete(
          `${id}.json`,
          config
          )  
        return true;
      }
      }catch(err){
        throw err;
      }

    }

    
  }

  const loopDelete =  async(element, config) =>{

    for await (const results of element) {
      await Axios.delete(
        `${results}.json`,
        config
        )
    } 
    return true;
  }


export const addProduct = (obj) =>{

  return async(dispatch) =>{

     try{

       const data = await Axios.post( 
        '.json',
          obj
       ) 

     const updateData = {
      key: data.data.name,
      value: obj
     }

        dispatch(productViewAction.productAddReducers(updateData));
      
       return true;

     }catch(err){
      throw err;
     }

  }


  }


export default Store;
