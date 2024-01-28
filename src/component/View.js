import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { fetchProductsFirebase, deleteRecord } from '../store/Store';
import Popup from './Popup';


const View = () => {

  const [checkBoxDeleteElement, setCheckBoxDeleteElement ] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const imageURL = 'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA';

  const productSelector = useSelector(state => state.productViewSlice);

  const dispatch = useDispatch();

  const deleteRecordsById = async(index) =>{
    await dispatch(deleteRecord(index));
   fetchProducts();
 }

  useEffect(()=>{
    fetchProducts();
  },[]);

  const fetchProducts = useCallback(() =>{
   dispatch(fetchProductsFirebase()); 
  },[dispatch]);

  const addElementInList = (e) =>{
   // console.log(e.target.checked);
   e.target.checked === true ? 
   setCheckBoxDeleteElement(prev => [...prev, e.target.value]) 
   : setCheckBoxDeleteElement(checkBoxDeleteElement.filter(elm => elm !== e.target.value));
   //console.log(e.target.value);
  }

  const loopProduct = (products) =>{

   const txt = <Row key={products.key} className='border-top border-bottom pt-2 pb-2 fs-6'>
    <Col><input onChange={addElementInList} className='form-check-input' type='checkbox' value={products.key} id={`flexCheckDefault-${products.key}`} />
    </Col>
    <Col><img width="20" src={imageURL} alt="image1" />{products.value.productname}</Col>
    <Col>{products.value.category}</Col> 
    <Col>{products.value.brand}</Col>
    <Col>${products.value.price}</Col>
    <Col>{products.value.stock}</Col>
    <Col>{products.value.status}</Col>
    <Col>
      <Link to='#' className='text-warning p-1' ><FaRegEdit /></Link>
      <Link to='#' className='text-danger p-1' onClick={()=>deleteRecordsById(products.key)}><MdDeleteSweep /></Link>
    </Col>
  </Row>;
     
    return txt;
  }

  const getIdsofCheckedEelents = async() =>{
    await deleteRecordsById(checkBoxDeleteElement);
  }

  const openPopupAdd = () =>{
    setShowModal(true);
  }

  const closepopup = () =>{
    setShowModal(false);
  }



  return (
<>
    <Popup showModalProps={showModal} hideModalProps={closepopup} />
    <Container className='mt-5 bagcont rounded'>
        <Row className='text-white p-1'>
          <Col xs={9} className='text-start p-2 fs-2 fw-bold'>
            Product Details
          </Col>
          <Col xs={1} className='text-start p-2 fs-6'>
            <Button variant="danger" className='rounded' onClick={getIdsofCheckedEelents}>Delete</Button>
          </Col>
          <Col xs={2} className='text-start p-2 fs-6'>
          <Button variant="success" className='rounded' onClick={openPopupAdd}><FaPlus /> Add New Product</Button>
          </Col>
        </Row>
     
  </Container>  
  
  <Container className='mt-1 rounded'>
  <Row className='border-top border-bottom pt-2 pb-2 fw-bold'>
          <Col>
             
          </Col>
          <Col>Product</Col>
          <Col>Category</Col>
          <Col>Brand</Col>
          <Col>Price</Col>
          <Col>Stock</Col>
          <Col>Status</Col>
          <Col>Action</Col>
        </Row>

       {productSelector?.products.map((product, index)=> loopProduct(product))}

       
   
    
  </Container>
  </>
 
  )
}


export default View;