import React from 'react'

import firebaseApp from '../../firebase'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
import { useRouter } from 'next/router'
const db = getFirestore(firebaseApp)
import Swal from 'sweetalert2'
import Layout from '../../components/Layout'

export default function Producto({producto}) {
    
    const {query} = useRouter()
    const router = useRouter()

    const deleteProduct = async() => {
        const { id } = query
          await deleteDoc(doc(db, 'productos', id))
          router.push('/')
    }

    const validateDelete = () => {
      let validate
      Swal
    .fire({
        title: "Confirmar eliminación",
        text: "¿Estas seguro que deseas eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            deleteProduct()
        } else {
            // Dijeron que no
            validate = false;
        }
    });


    }
    
    return (
      <Layout>
      <div className='container mt-2'>
        <div className='card'>
            <div className='card card-harder text-center'>
                <h5> {producto.nombre} </h5>
            </div>

            <div className='card card-body'>
                <p>{producto.precio}</p>
                <p>{producto.cantidad} unid.</p>
                <button className='btn btn-danger' onClick={validateDelete}> Eliminar </button>
                <button className='btn btn-secondary mt-2' onClick={() => router.push(`/edit/${query.id}`)}> Editar </button>
            </div>

        </div>
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
  