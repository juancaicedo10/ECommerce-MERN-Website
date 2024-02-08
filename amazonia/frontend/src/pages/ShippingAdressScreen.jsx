import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import ChekoutSteps from '../components/ChekoutSteps';

function ShippingAdressScreen() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { ShippingAddress }
  } = state
  const [fullName, setFullName] = useState('');
  const [Address, setAddress] = useState('');
  const [City , setCity] = useState('');
  const [postalCode , setPostalCode] = useState('');
  const [Country , setCountry] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

     ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        Address,
        City,
        postalCode,
        Country
      }
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        Address,
        City,
        postalCode,
        Country
      })
    );

    console.log("done")
    navigate('/payment');
  }
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <ChekoutSteps step1 step2></ChekoutSteps>
      <div className='container small-container'>
      <h1 className='my-3'>Shipping address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='Address'>
          <Form.Label>Address</Form.Label>
          <Form.Control 
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          required
          autoComplete="address-line1"
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='City'>
          <Form.Label>City</Form.Label>
          <Form.Control 
          value={City}
          onChange={(e) => setCity(e.target.value)}
          required
          autoComplete="address-level2"
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='Postal Code'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control 
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          autoComplete="postal-code"
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='Country'>
          <Form.Label>Country</Form.Label>
          <Form.Control 
          value={Country}
          onChange={(e) => setCountry(e.target.value)}
          required
          autoComplete="country"
          />
        </Form.Group>
        <div className='mb-3'>
          <Button variant='primary' type='submit'>
            Continue
          </Button>
        </div>
      </Form>
      </div>
    </div>
  )
}

export default ShippingAdressScreen;
