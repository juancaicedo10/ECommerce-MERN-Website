import React, { useContext, useReducer, useState , useEffect} from 'react'
import { Store } from '../Store' 
import { Helmet } from 'react-helmet-async'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { getError } from '../utils'
import { toast } from 'react-toastify'
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true }
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false }
        case 'UPDATE_FAIL': 
            return { ...state, loadingUpdate: false }
        default: 
            return state
    } 
}

function ProfileScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.name ||'');
    const [email , setEmail] = useState(userInfo.email ||'');
    const [password , setPassword] = useState(userInfo.password || '');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name || '');
            setEmail(userInfo.email || '');
            setConfirmPassword(userInfo.password || '');
        }
    }, [userInfo]);

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(
                '/api/users/profile', 
                {
                    name,
                    email,
                    password
                },
                {
                    headers : {
                        Authorization : `Bearer ${userInfo.token}`
                    }
                }
            );
            console.log(data);
            dispatch({ type:'UPDATE_SUCCESS' });
            ctxDispatch({ type:'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User Updated successfully')
             
        } catch (error) {
            dispatch({ type: 'FETCH_FAIL' });
            toast.error(getError(error));
        }
    }

    return (
        <div className='container small-container'>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className='my-3'>User Profile</h1>
            <form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className='mb-3'>
                    <Button type='submit'>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
}


export default ProfileScreen
