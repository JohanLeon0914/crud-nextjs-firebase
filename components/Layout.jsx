import React from 'react'
import Navbar from './navbar'
import { useAuthState } from "react-firebase-hooks/auth";
import firebaseApp from '../firebase'
import { getAuth } from "firebase/auth";

export default function Layout({children}) {
  const auth = getAuth(firebaseApp)
  const [user, loading] = useAuthState(auth)
  return (
    <div>
      {loading ? <div> loading... </div> : <Navbar user={user} />}
      {children}
    </div>
  )
}
