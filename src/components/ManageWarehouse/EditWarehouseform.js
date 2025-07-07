import React from 'react'
import {
	Button,
	Dialog,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Select,
	Option,
	Textarea,

} from "@material-tailwind/react";
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AutocompleteUser from './AutocompleteUser';

const EditWarehouseform = ({ setWarehouseData, warehouseData, UpdateWarehouse, pickupName, setPickupName, userList }) => {
	return (
		<div className=" p-6  rounded-lg">
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-2xl font-bold'>Update Warehouse</h3>
			</div>

			<div className='grid grid-cols-3 gap-6'>
				<div className='col-span-2'>
					{Object.keys(pickupName).length === 0 ? (
						<AutocompleteUser selected={pickupName} setSelected={setPickupName} placeholder="Enter Client Name" data={userList} />
					) : (
						<div>
							<div className='flex items-center justify-end'>
								<PencilIcon className='w-6 cursor-pointer' onClick={() => setPickupName({})} />
							</div>
							<h3 className='text-sm'>{pickupName.name}, {pickupName.email}</h3>
							<h3 className='text-sm'>{pickupName.companyName}</h3>
						</div>
					)}
				</div>
				<div className='col-span-1'>
					<Input value={warehouseData.pinCode} onChange={(e) => setWarehouseData({ ...warehouseData, pinCode: e.target.value })} type="text" label="Pin Code" />
				</div>
			</div>

			<div className='grid grid-cols-3 mt-4 gap-6'>
				<Input value={warehouseData.city} onChange={(e) => setWarehouseData({ ...warehouseData, city: e.target.value })} type="text" label="City" />
				<Input value={warehouseData.state} onChange={(e) => setWarehouseData({ ...warehouseData, state: e.target.value })} type="text" label="State" />
				<Input value={warehouseData.country} onChange={(e) => setWarehouseData({ ...warehouseData, country: e.target.value })} type="text" label="Country" />
			</div>

			<div className='mt-4'>
				<Input value={warehouseData.address} onChange={(e) => setWarehouseData({ ...warehouseData, address: e.target.value })} type="text" label="Address" />
			</div>

			<div className='grid grid-cols-3 mt-4 gap-6'>
				<Input value={warehouseData.personName} onChange={(e) => setWarehouseData({ ...warehouseData, personName: e.target.value })} type="text" label="Contact Person Name" />
				<Input value={warehouseData.email} onChange={(e) => setWarehouseData({ ...warehouseData, email: e.target.value })} type="text" label="Email" />
				<Input value={warehouseData.phone} onChange={(e) => setWarehouseData({ ...warehouseData, phone: e.target.value })} type="text" label="Phone Number" />
			</div>

			<div className='mt-4'>
				<Select value={warehouseData.slot} onChange={(e) => setWarehouseData({ ...warehouseData, slot: e })} className='font-medium' label='Preferred Slot'>
					<Option value='01:00 Pm - 04:00 Pm'>01:00 Pm - 04:00 Pm</Option>
					<Option value='04:00 Pm - 07:00 Pm'>04:00 Pm - 07:00 Pm</Option>
					<Option value='07:00 Pm - 10:00 Pm'>07:00 Pm - 10:00 Pm</Option>
				</Select>
			</div>

			<div className='flex items-center justify-end mt-6 gap-4'>
				<Button onClick={UpdateWarehouse}>Submit</Button>
			</div>
		</div>
	)
}

export default EditWarehouseform