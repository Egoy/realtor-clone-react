import { getAuth, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { FcHome } from 'react-icons/fc'
import { Link } from 'react-router-dom'

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData
  function onLogout() {
    auth.signOut()
    navigate('/')
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        const docRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(docRef, {
          name
        })
      }
      toast.success('Profile updated')
    } catch (error) {
      toast.error('Could not update profile details')
    }
  }

  return (
    <>
      <section className='max-w-6xl mx-auto flex items-center justify-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name Input */}
            <input type="text" value={name} id="name" disabled={!changeDetail} onChange={onChange} className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${changeDetail && 'bg-red-200 focus:bg-red-200'}`}/>
 
            {/* Email Input */}
            <input type="email" value={email} id="email" disabled className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'/>
          
            <div className='flex justify-between whitespace-nowrap text-sm md:text-lg mb-6'>
              <p className='flex items-center'>Do you want to change your name? 
                <span onClick={() => {
                changeDetail && onSubmit()
                setChangeDetails((prevState) => !prevState)
                }} 
              className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>{changeDetail ? 'Apply change' : 'Edit'}</span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-700 cursor-pointer transition ease-in-out duration-200'>Sign Out</p>
            </div>
          </form>
          <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800'>
            <Link to='/create-listing' className='flex items-center justify-center'>
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>Sell or rent your home
            </Link>
            
          </button>
        </div>
      </section>
    </>
  )
}
