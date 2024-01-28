import React,{useState, useEffect} from 'react'
import usePopup from '../hooks/usePopup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector}  from 'react-redux';
import { addProduct } from '../store/Store';
import { Container, Row, Col } from 'react-bootstrap';

export default function Popup(props) {
    const showPopup = usePopup();

    const dispatchPopup = useDispatch();

    const productSelector = useSelector(state => state.productViewSlice);

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const [resMsg, setResMsg] = useState(false);
 
   const hidePopup = () =>{
    props.hideModalProps();
   }

   const productNameInput = (e) =>{
    setProductName(e.target.value);
   }

   const categoryInput = (e) =>{
    setCategory(e.target.value);
   }

   const brandInput = (e) =>{
    setBrand(e.target.value);
   }

   const priceInput = (e) =>{
    setPrice(e.target.value);
   }

   const stockInput = (e) =>{
    setStock(e.target.value);
   }

   
    const submitProduct = async(e) =>{

       const objectProduct = {
            'productname': productName,
            'category': category,
            'price': price,
            'brand': brand,
            'stock': stock,
            'status': 'active'
       }
    
     const res = await dispatchPopup(addProduct(objectProduct));
     res ? setResMsg(true) : setResMsg(false);
       console.log(productSelector);
    }


    const bodyDiv = <>
       <Modal show={props.showModalProps}>
        <Modal.Header closeButton onClick={hidePopup}>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {resMsg ? 'Your Product Added' :''}
        <div className='formpopup'>
                    <Container className='formproduct'>
                    <Row className="mb-3">
                      <Col className='label p-2'>
                        Product Name 
                      </Col>
                      <Col>
                      <input className='p-2' type='text' id="productname" value={productName} onChange={productNameInput} />
                      </Col> 
                    </Row>
                    <Row className="mb-3">
                    <Col className='label p-2'>Category </Col>
                    <Col>
                    <input className='p-2' type='text' id="category" value={category} onChange={categoryInput} />
                    </Col>
                    </Row>
                    <Row className="mb-3">
                    <Col className='label p-2'>Brand </Col>
                    <Col>
                    <input className='p-2' type='text' id="brand" value={brand} onChange={brandInput} />
                    </Col>
                    </Row>
                    <Row className="mb-3">
                    <Col className='label p-2'>Price </Col>
                    <Col>
                    <input className='p-2' type='text' id="price" value={price} onChange={priceInput} />
                    </Col>
                    </Row>
                    <Row className="mb-3">
                    <Col className='label p-2'>Stock </Col>
                    <Col>
                    <input className='p-2' type='text' id="stock" value={stock} onChange={stockInput} />
                    </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Button variant="primary" id="button-addon1" type="submit" onClick={submitProduct}>
                           Add Product
                        </Button>
                      </Col>
                    </Row>
                    </Container>
                    </div>

        </Modal.Body>
       
      </Modal>
                   
                    </>


  return showPopup(bodyDiv);
}
