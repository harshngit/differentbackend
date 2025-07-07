import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'

const UserForm = ({ name, setName, email, setEmail, password, setPassword, role, setRole, setInsuranceType, contact, setContact, handleCreateUser }) => {
    return (
        <div className='col-span-4 mx-12 my-8 bg-white rounded-lg px-12 py-6' >
            <div className='' >
                <h3 className='font-[GilroyBold]  text-[2rem]' >Create User</h3>
                <div className='grid grid-cols-2 mt-3 grid-flow-col gap-6' >
                    <div>
                        <Input value={name} onChange={(e) => setName(e.target.value)} label='Name' />
                    </div>
                    <div>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} label='Email' />
                    </div>
                </div>
                <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >


                    <div>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} label='Password' />
                    </div>
                    <div>
                        <Input value={contact} onChange={(e) => setContact(e.target.value)} label='Contact No' />
                    </div>
                </div>
                <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
                    <div>
                        <Select
                            // value={insuranceType}
                            onChange={(e) => setRole(e)} className=' font-[GilroyMedium]' label='Role' >
                            <Option value='admin' >Admin</Option>
                            <Option value='staff' >Staff</Option>
                        </Select>
                    </div>

                </div>
            </div>
            <div className='flex items-center justify-end mt-6 ' >
                <Button className='' onClick={handleCreateUser} >Submit</Button>
            </div>
        </div>
    )
}

export default UserForm