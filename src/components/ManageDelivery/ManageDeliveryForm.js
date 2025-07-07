import React from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import AutocompleteUser2 from './AutocompleteUser2'
import { Button, Input, Option, Select } from '@material-tailwind/react'
import LrNoTable from './LrNoTable'
import AutocompleteLrNo from './AutocompleteLrNo'

const ManageDeliveryForm = ({ user, setUser, userList, setUserList, orderList, lrNumber, setLrNumber, handleLrNoData, lrNolist, removelrno, handleDeliveryBoy, setVehicileNo, vehicileNo }) => {
	console.log(lrNumber)
	return (
		<>
			<div className='col-span-4 mx-6 my-6' >
				<h3 className='font-[GilroyBold] text-[1.5rem] ' >Manage Delivery</h3>
				<div className=''>
					<div className='my-4 bg-white  px-6 py-3' >
						<h4 className='font-[GilroyBold] border-b-[2px] border-black py-2 w-[160px] ' >Add Delivery Details</h4>
						<div className='flex-wrap gap-3 flex items-center justify-start  my-2'>
							<div className='w-[500px]'>
								{Object.keys(user).length === 0 ? <AutocompleteUser2 selected={user} setSelected={setUser} placeholder="Enter Delivery Boy Name" data={userList} /> : <div>
									<div className=' flex items-center justify-end' >
										<PencilIcon className='w-[25px] cursor-pointer' onClick={() => setUser({})} />
									</div>
									<h3 className='text-[.8rem]' >{user.name}, {user.email}</h3>
									<h3 className='text-[.8rem]' >{user.contact}</h3>

								</div>}
							</div>
							<div className='w-[500px]'>
								<Input value={vehicileNo} onChange={(e) => setVehicileNo(e.target.value)} label='Enter Vehicil Number' />
							</div>
							<div className='w-[500px] my-5'>
								{Object.keys(lrNumber).length === 0 ? <AutocompleteLrNo handleLrNoData={handleLrNoData} selected={lrNumber} setSelected={setLrNumber} placeholder="Enter Lr no " data={orderList} /> : <div>
									<div className=' flex items-center justify-end' >
										<PencilIcon className='w-[25px] cursor-pointer' onClick={() => setLrNumber({})} />
									</div>
									<h3 className='text-[.8rem]' >{lrNumber}</h3>


								</div>}
							</div>
							{/* <div>
								<Button onClick={handleLrNoData}> Add More </Button>
							</div> */}
						</div>
						<LrNoTable removelrno={removelrno} lrNolist={lrNolist} />
					</div>
					<div className='flex justify-end items-end'>
						<Button onClick={handleDeliveryBoy}>Submit</Button>
					</div>
				</div>

			</div>
		</>
	)
}

export default ManageDeliveryForm