import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import ChekoutSteps from '../components/ChekoutSteps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';

function PaymentMethodScreen() {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const {
        cart: { shippingAddress, paymentMethod },
    } = state

    const [paymentMethodName , setPaymentMethod] = useState(paymentMethod || 'PayPal')

    useEffect(() => {
        if (!shippingAddress.Address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder')
        }

  return (
    <div>
      <ChekoutSteps step1 step2 step3>
      </ChekoutSteps>
      <div className='container small-container'>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        <div className='mb-3'>
            <Form.Check className="check"
            type='radio'
            id='PayPal'
            label='PayPal'
            value='PayPal'
            checked={paymentMethodName === 'PayPal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
        </div>
        <div className='mb-3'>
            <Form.Check className="check"
            type='radio'
            id='Stripe'
            label='Stripe'
            value='Stripe'
            checked={paymentMethodName === 'Stripe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
        </div>
        <div className='mb-3'>
            <Button type='submit'>Continue</Button>
        </div>
        </Form>
      </div>
    </div>
  )
}

export default PaymentMethodScreen
