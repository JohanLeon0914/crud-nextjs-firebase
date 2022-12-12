
import firebaseApp from '../../firebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
const db = getFirestore(firebaseApp)

export default function EdirProducto({producto}) {
    
    const {query} = useRouter()
    const router = useRouter()

    const valorInicial = {
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad
      }

    const [dato, setDato] = useState(valorInicial)

    const obtenerInputs = (e) => {
        const {name, value} = e.target;
        setDato({...dato, [name]: value})
      }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(dato)
        try {
            await updateDoc(doc(db, 'productos', query.id), {
              ...dato
            })
          } catch (error) {
            console.log(error)
          }
          router.push('/')
    }
    
    return (
        <Layout>
      <div className='container mt-2'>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input type="text" placeholder='ingresar nombre' className='form-control mb-3' 
                name='nombre' value={dato.nombre} onChange={obtenerInputs} required  />
            </div>

            <div className='form-group'>
                <input type="text" placeholder='ingresar precio' className='form-control mb-3'
                name='precio' value={dato.precio} onChange={obtenerInputs} required />
            </div>

            <div className='form-group'>
                <input type="text" placeholder='ingresar cantidad' className='form-control mb-3'
                name='cantidad' value={dato.cantidad} onChange={obtenerInputs} required />
            </div>

            <button className='btn btn-primary'>
                Enviar
            </button>
            <button className='btn btn-secondary ms-2' onClick={()=>router.push('/')} >volver</button>
        </form>
      </div>
      </Layout>
  )
}

export const getServerSideProps = async({query: {id}}) => {
    const docRef = doc(db, 'productos', id)
    const docSnap = await getDoc(docRef)
    const producto = docSnap.data()

    return {
      props:{
        producto
      }
    }
  }