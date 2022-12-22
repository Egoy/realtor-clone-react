import React from 'react'

export default function CreateListing() {
    function onChange() {

    }
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>SELL / RENT</p>
            <div>
                <button type='button' id='type' value='sale' onClick={onChange} className=''>
                    SELL
                </button>
                <button type='button' id='type' value='rent' onClick={onChange} className=''>
                    RENT
                </button>
            </div>
        </form>
    </main>
  )
}
