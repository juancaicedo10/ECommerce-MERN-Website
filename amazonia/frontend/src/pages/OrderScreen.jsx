import React, { useEffect, useReducer, useContext } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function OrderScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: null, // Inicializamos order como null en lugar de un objeto vacío
        error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };

        if (!userInfo) {
            return navigate('/login');
        }

        if (!order || order._id !== orderId) {
            fetchOrder();
        }
    }, [order, userInfo, orderId, navigate]);

    return (
        <div>
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1 className='my-3'>Order {orderId}</h1>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                order && ( // Verificamos si order tiene datos
                    <Row>
                        <Col>
                            <Card className='mb-3'>
                                <Card.Body>
                                    <Card.Title>Shipping</Card.Title>
                                    <Card.Text>
                                        <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                        <strong>Address:</strong> {order.shippingAddress.Address},
                                        {order.shippingAddress.City}, {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country}
                                    </Card.Text>
                                    {order.isDelivered ? (
                                        <MessageBox variant='success'>
                                            Delivered at {order.deliveredAt}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant='danger'>Not Delivered</MessageBox>
                                    )}
                                </Card.Body>
                            </Card>
                            <Card className='mb-3'>
                                <Card.Body>
                                    <Card.Title>Payment</Card.Title>
                                    <Card.Text>
                                        <strong>Method:</strong> {order.paymentMethod}
                                    </Card.Text>
                                    {order.isPaid ? (
                                        <MessageBox variant='success'>
                                            Paid at {order.PaidAt}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant='danger'>Not paid</MessageBox>
                                    )}
                                </Card.Body>
                            </Card>
                            <Card className='mb-3'>
                                <Card.Body>
                                    <Card.Title>Items</Card.Title>
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item) => (
                                            <ListGroup.Item key={item._id}>
                                                <Row className='align-items-center'>
                                                    <Col md={6}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className='img-fluid rounded img-thumbnail'
                                                        />
                                                        <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{item.quantity}</span>
                                                    </Col>
                                                    <Col md={3}>${item.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                </Row>
               </ListGroup.Item>
               </ListGroup>
            </Card.Body>
            </Card>
            </Col>
            </Row>
                )
            )}
        </div>
    );
}

export default OrderScreen;
