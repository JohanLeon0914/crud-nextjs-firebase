import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../firebase'
import { useRouter } from 'next/router';

export default function Register() {

    const auth = getAuth(firebaseApp)
    const router = useRouter()
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials, // hago una copia de lo que tenga credentials hasta el momento
            [e.target.name]: e.target.value
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(credentials)
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(response => {
            router.push('/')
        })
        .catch(error => console.log(error))
    }

  return (
    <form onSubmit={handleSubmit}>

    <div className="mb-3">
        <label className="form-label">Email</label>
        <input 
          name='email'
          type='email'
          placeholder='email'
          onChange={handleChange}
          required
        />      
    </div>

    <div className="mb-3">
        <label className="form-label">Password</label>
        <input 
          name='password'
          type='password'
          placeholder='password'
          onChange={handleChange}
          required
        />        
    </div>

    <button type="submit" className="btn btn-primary">Register</button>

    </form>
  )
}
