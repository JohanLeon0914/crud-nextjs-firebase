import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../firebase'
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {

    const provider = new GoogleAuthProvider()
    const auth = getAuth(firebaseApp)
    const router = useRouter()
    const [user, loading] = useAuthState(auth)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    if(loading) {
        return <div> loading... </div>
      } 
    
      if(user) {
        router.push('/')
        return <div> Welocme {user.displayName} </div>
      }

    const handleChange = (e) => {
        setCredentials({
            ...credentials, // hago una copia de lo que tenga credentials hasta el momento
            [e.target.name]: e.target.value
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(response => {
            router.push('/')
        })
        .catch(error => console.log(error))
    }

    const loginWithGoggle = (e) => {
        const result = signInWithPopup(auth, provider)
        .then(() => {
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

    <button type="submit" className="btn btn-primary">Sign in</button>
    <button type="submit" className="btn btn-secondary" onClick={loginWithGoggle}>Sign in with Google</button>

    </form>

  )
}
