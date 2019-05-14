import React, { useState } from 'react'
import axios from 'axios';

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('')
    
    function handleSubmit(e) {
        e.preventDefault();
        axios.post()
            .then(res => {
                props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <h3>User Register</h3>
            <form onSubmit={handleSubmit}>
                <h4>Username</h4>
                <input
                    type='text'
                    name='username'
                    placeholder = 'Username'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                >
                </input>

                <h4>Email</h4>
                <input
                    type='email'
                    name='email'
                    placeholder = 'Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                >
                </input>

                <h4>Password</h4>
                <input
                    type='password'
                    name='password'
                    placeholder = 'Username'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                >
                </input>
                <h4>Phone Number</h4>
                <input
                    type='tel'
                    name='phonenumber'
                    placeholder = '(123)-456-7890'
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phonenumber}
                >
                </input>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Register;

