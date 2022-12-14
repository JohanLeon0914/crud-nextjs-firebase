import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

//importar firebase
import firebaseApp from '../firebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
import { useRouter } from 'next/router'
const db = getFirestore(firebaseApp)
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Home({ productos }) {
  const provider = new GoogleAuthProvider()
  const auth = getAuth(firebaseApp)
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  if(loading) {
    return <div> loading... </div>
  } 

  if(!user) {
    router.push('/login')
    return <div> Please login </div>
  }


  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={() => auth.signOut()}>
          Sign Out
      </button>

      <div className="container">
        <Link href="/formulario">
          <button className='btn btn-primary mb-4'>Agregar producto</button>
        </Link>
        
        <div className='row'>
        {productos.map((product) => (
          <div className="card card-body col-md-4" key={product.id}>
            <h5 className='card-header'>{product.nombre}</h5>
            <p>{product.precio}</p>
            <p>{product.cantidad} und.</p>
            <button className='btn btn-danger' onClick={()=>router.push(`/producto/${product.id}`)}>View</button>
          </div>
        ))}
        </div>
      </div>

    </Layout>
  )
}

export const getServerSideProps = async(context) => {
  const querySnapshot = await getDocs(collection(db,'productos'))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id: doc.id})
                })

  return {
    props:{
      productos: docs
    }
  }
}
