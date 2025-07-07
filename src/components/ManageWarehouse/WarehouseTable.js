import { EllipsisHorizontalCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
const WarehouseTable = ({ warehouseList, deleteWarehouse, handleeditWarehouseModal }) => {
    return (
        <div className='overflow-scroll h-[85vh]' >
            <div className='bg-gray-300 py-4 px-8 grid grid-cols-9 gap-6 grid-flow-col  items-center justify-start ' >
                <p className='col-span-1 font-[GilroyMedium]' >Client Name</p>
                <p className='col-span-1 font-[GilroyMedium]' > Company Name</p>
                <p className='col-span-1 font-[GilroyMedium]' >Pin Code</p>
                <p className='col-span-1 font-[GilroyMedium]' >City</p>
                <p className='col-span-1 font-[GilroyMedium]' >State</p>
                <p className='col-span-1 font-[GilroyMedium]' >Country</p>
                <p className='col-span-1 font-[GilroyMedium]' >Person Name</p>
                <p className='col-span-1 font-[GilroyMedium]' >Phone</p>
                <p className='col-span-1 font-[GilroyMedium]' >Action</p>
            </div>
            {
                warehouseList?.map((item) => (
                    <div className='bg-white border-b-[2px] border-gray-200 py-4 px-8 grid grid-cols-9 gap-6 grid-flow-col  items-center justify-start ' >
                        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item?.pickupName?.name}</p>
                        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item?.pickupName?.companyName}</p>
                        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.pinCode}</p>
                        <p className='col-span-1 text-[0.8rem]  font-[GilroyMedium]' >{item.city}</p>
                        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.state}</p>
                        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.country}</p>
                        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.personName}</p>
                        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.phone}</p>
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <Button className='hover:bg-trasparent' variant="text">
                                    <EllipsisHorizontalCircleIcon className="h-8 w-8" />
                                </Button>
                            </MenuHandler>
                            <MenuList>
                                <Link to={`/editwarehouse/${item.id}`} className='text-left' ><MenuItem>Edit</MenuItem></Link>
                                <MenuItem onClick={() => deleteWarehouse(item.id)} className='text-[red]'> Delete</MenuItem>
                            </MenuList>
                        </Menu>

                    </div>

                ))
            }

        </div>
    )
}

export default WarehouseTable