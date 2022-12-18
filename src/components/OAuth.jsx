import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { db } from '../firebase'
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
  const navigate = useNavigate()
  async function onGoogleClick(){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check user

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <button type='button' onClick={onGoogleClick} className='flex items-center justify-center w-full bg-red-700 px-7 py-3 text-white uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded'> <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>Continue with Google</button>
  )
}
