import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'

const InvoiceDetails = ({ consigneeGST, setConsigneeGST, sellerGST, setSellerGST, invoiceDetail, setInvoiceDetail, addInvoice, invoiceDocument, addSupport, supportDocument, handleInvoiceDetails, invoiceList, setInvoiceList }) => {
  const handleAddInvoice = () => {
    setInvoiceList([...invoiceList, {
      ...invoiceDetail,
      n_value: Number(invoiceDetail.n_value)
    }])
    setInvoiceDetail({
      ident: "",
      n_value: 0,
      ewaybill: ""
    })
  }
  console.log(invoiceList)
  const removeInvoice = (name) => {
    const index = invoiceList.findIndex((item) => item.name === name);
    if (index !== -1) {
      const newVariations = [...invoiceList];
      newVariations.splice(index, 1);
      setInvoiceList(newVariations);
    }
  }
  return (
    <div className='bg-white px-6 my-3 py-3' >
      <h3 className='font-[GilroyMedium]' >Invoice Details</h3>
      {/* <div className='flex gap-6 items-center my-3 justify-start' >
            <div className='w-[400px]' >
            <Select value={invoiceDetail?.collectionType} onChange={(e)=>setInvoiceDetail({...invoiceDetail,collectionType:e})} className=' font-[GilroyMedium] ' label='Amount Collection' >
            <Option value='Prepaid' >Prepaid</Option>
            <Option value='COD'>Cash on Delivery</Option>
             </Select>
            </div>
         {invoiceDetail.collectionType==="COD" &&  <div className='w-[400px]'>
            <Input value={invoiceDetail?.amountCollection} onChange={(e)=>setInvoiceDetail({...invoiceDetail,amountCollection:e.target.value})} label='Amount to Collect' />
            </div>}

        </div> */}
      <div className='flex gap-6 items-center my-3 justify-start' >
        <div className='w-[400px]'>
          <Input type='number' value={invoiceDetail?.n_value} onChange={(e) => setInvoiceDetail({ ...invoiceDetail, n_value: e.target.value })} label='Invoice Amount' />
        </div>
        <div className='w-[400px]'>
          <Input value={invoiceDetail?.ident} onChange={(e) => setInvoiceDetail({ ...invoiceDetail, ident: e.target.value })} label='Invoice No.' />
        </div>

      </div>
      <div className='flex items-center justify-center' >
        <Button onClick={handleAddInvoice} className='mb-3' >Add</Button>
      </div>
      {invoiceList?.length !== 0 && <div className=' my-4' >
        <div className='grid font-[GilroyMedium] bg-gray-200 px-4 py-3 grid-cols-3 grid-flow-col' >
          <p>Invoice Amount</p>
          <p>Invoice No</p>


          <p>Actions</p>
        </div>
        {
          invoiceList?.map((item) => (
            <div className='grid font-[GilroyMedium] bg-white my-0 px-4 py-3 grid-cols-3 grid-flow-col' >
              <p>{item.n_value}</p>
              <p>{item.ident}</p>


              <p onClick={() => removeInvoice(item.invoiceNo)} className='font-[GilroyBold] cursor-pointer' >X</p>
            </div>
          ))
        }

      </div>}
    </div>
  )
}

export default InvoiceDetails