import React, { useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import CreateInvoiceArea from '../components/Invoice/CreateInvoiceArea'

const CreateInvoice = () => {
 
  return (
    <div className='bg-gray-100 flex '>
     <Sidebar />
   
    <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
       
        <Topbar />
     <CreateInvoiceArea />
        </div>
    </div>
  )
}

export default CreateInvoice