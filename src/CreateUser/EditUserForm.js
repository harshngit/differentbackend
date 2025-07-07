import React from 'react'
import { Button, Input, Option, Select } from '@material-tailwind/react'
const EditUserForm = ({name,setName,email,setEmail,password,setPassword,companyName,setCompanyName,gstNo,setGstNo,agreement,setAgreement,gstDocument,setGstDocument,otherDoc,setOtherDoc,insuranceType,setInsuranceType,contact,setContact,companyAddress,setCompanyAddress,handleCreateUser,addGSTInformation,addAgreementInformation,rateChart,setRateChart,rateJson,setRateJson,handleConvert}) => {
  return (
    <div className='col-span-4 mx-12 my-8 bg-white rounded-lg px-12 py-6' >
        <div className='' >
            <h3 className='font-[GilroyBold]  text-[2rem]' >Edit User</h3>
            <div className='grid grid-cols-2 mt-3 grid-flow-col gap-6' >
            <div>
                <Input value={name} onChange={(e)=>setName(e.target.value)} label='Name' />
                </div>
                <div>
                <Input value={companyName} onChange={(e)=>setCompanyName(e.target.value)} label='Company Name' />
                </div>
            </div>
            <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
           
            <div>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} label='Email' />
                </div>
            <div>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' />
                </div>
            </div>
            <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
            <div>
                <Input value={contact} onChange={(e)=>setContact(e.target.value)} label='Contact No' />
                </div>
            <div>
                <Input value={companyAddress} onChange={(e)=>setCompanyAddress(e.target.value)} label='Company Address' />
                </div>
            
            </div>
            <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
            <div>
                <Input value={gstNo} onChange={(e)=>setGstNo(e.target.value)} label='GST No' />
                </div>
            <div>
            <Select value={insuranceType} onChange={(e)=>setInsuranceType(e)}  className=' font-[GilroyMedium] ' label='Insurance Type' >
            <Option value='owner risk' >Owners Risk</Option>
            <Option value='carrier risk' >Carrier Risk</Option>
             </Select>
                </div>
            
            </div>
            <div className='grid grid-cols-3 mt-3 pt-3 grid-flow-col gap-6' >
            <div>
            <form onSubmit={addGSTInformation}  className='form flex items-center justify-center flex-col my-6 '>
             <input accept='.pdf' type='file' />
            <Button className='my-6' type='submit' size="md">GST Copy</Button>
            </form>
            <p className='text-[.8rem] w-[100px] ' >{gstDocument}</p>
                </div>
            <div>
            <form onSubmit={addAgreementInformation}  className='form flex items-center justify-center flex-col my-6 '>
             <input accept='.pdf' type='file' />
        <Button className='my-6' type='submit' size="md">Agreement</Button>
            </form>
            <p className='text-[.8rem] w-[100px] ' >{agreement}</p>
                </div>
                <div>
            <form   className='form flex items-center justify-center flex-col my-6 '>
             <input type='file' accept='.pdf' />
        <Button className='my-6' type='submit' size="md">Other Documents</Button>
            </form>
                </div>
            
            </div>
            <div className="flex items-center justify-center flex-col gap-6" >
            <input type="file" accept=".xls,.xlsx" onChange={e => setRateChart(e.target.files[0])} />
            <Button onClick={handleConvert}>Upload Rate Chart</Button>
            
            </div>
        </div>
        <div className='flex items-center justify-end mt-6 ' >
        <Button className='' onClick={handleCreateUser} >Submit</Button>
        </div>
    </div>
  )
}

export default EditUserForm