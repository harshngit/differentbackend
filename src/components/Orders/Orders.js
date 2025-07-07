import React, { useState } from 'react'
import TopTab from './TopTab'
import OrderTable from './OrderTable'
import { Button, Input } from '@material-tailwind/react'
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ExportJsonCsv } from 'react-export-json-csv';
import { SiMicrosoftexcel } from "react-icons/si";
import { PencilIcon } from '@heroicons/react/24/outline';
import Loader from '../Loader';
import AutocompleteUserSearch from '../ManageWarehouse/AutocompleteUserSearch';
const Orders = ({ orderList, activeTab, setActiveTab, handlePartnerModal, setOrderID, filterBySearch, filteredOrderList, deleteOrder, dateRange, setDateRange, startDate, endDate, fetchByDate, clearDate, csvOrders, setLoadingOrder, loadingOrder, setSearch, search, searchQuery, currentPage, setCurrentPage, setItemOffset, user, setuser, userlist, setUserlist, filterBySearchClient, setFilteredOrderList, fetchAdminOrders, loadingMore }) => {
  console.log(orderList?.length)
  const [searchShow, setSearchShow] = useState(true)
  const headers = [
    {
      key: 'lr',
      name: 'LR No',
    },
    {
      key: 'forwardingNumber',
      name: 'Forwarding Number',
    },
    {
      key: 'expecteddate',
      name: 'Expected Delivery Date',
    },
    {
      key: 'bookingDate',
      name: 'Booking Date',
    },
    {
      key: 'client',
      name: 'Client',
    },
    {
      key: 'consigneeName',
      name: 'Consignee Name',
    },
    {
      key: 'originPincode',
      name: 'Origin Pincode',
    },
    {
      key: 'consigneePincode',
      name: 'Consignee Pin Code',
    },
    {
      key: 'consigneecitystate',
      name: 'Consignee State',
    },
    {
      key: 'consigneecity',
      name: 'Consignee City',
    },
    {
      key: 'actualWeight',
      name: 'Actual Weight',
    },
    {
      key: 'chargableWeight',
      name: 'Chargable Weight',
    },
    {
      key: 'boxes',
      name: 'Boxes',
    },
    {
      key: 'status',
      name: 'Status',
    },
  ]
  return (
    <div className=' h-[105vh] mx-4 bg-gray-100' >
      <div className='mt-[10px]  ' >
        <div className='lg:grid grid-cols-2 items-center grid-flow-col' >
          <div className='col-span-1' >
            <h3 className='font-[GilroyBold] text-[1.5rem]' >Orders</h3>
          </div>
          {/* <div className='col-span-2 flex items-center justify-start'>
            <div className="relative flex  gap-2 md:w-max">
              {Object.keys(user).length === 0 ? <AutocompleteUserSearch filterBySearchClient={filterBySearchClient} selected={user} setSelected={setuser} placeholder="Enter Client Name" data={userlist} /> : <div>
                <div className='flex items-center justify-end' >
                  <PencilIcon className='w-[20px] cursor-pointer' onClick={() => {
                    setuser({})
                    setFilteredOrderList(orderList);
                  }
                  } />
                </div>
                <h3 className='text-[1rem]' >{user.name}</h3>
              </div>}
            </div> 
          </div> */}
          <div className='col-span-1 flex items-center justify-end'>
            <div className="relative flex  gap-2 md:w-max">
              <Input
                type="search"
                onChange={filterBySearch}
                placeholder="Order no"
                containerProps={{
                  className: "lg:min-w-[250px]",
                }}
                className=" !border-t-blue-gray-200 outline-none bg-white pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-200"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-3 top-[13px]">
                <CiSearch />
              </div>
            </div>
          </div>
          {/* <div className='col-span-3 flex items-center justify-end gap-8' >
            <DatePicker
              className='px-3 border-[1px] border-gray-200 rounded-lg py-2 '
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);

              }}

            />
            {searchShow ? <Button className='' onClick={() => {
              fetchByDate()
              setSearchShow(false)
            }} >Search</Button> : <Button className='' color='red' onClick={() => {
              clearDate()
              setSearchShow(true)
            }} >X Clear</Button>}
            <div className='flex px-3 py-2 rounded-lg bg-black text-white items-center justify-start' >
              <SiMicrosoftexcel className='w-[30px]  ' />
              <ExportJsonCsv headers={headers} items={csvOrders}>Export</ExportJsonCsv>
            </div>
          </div> */}
        </div>
      </div>
      {loadingOrder ? (
        <div className='flex justify-center items-center h-full'>
          <Loader />
        </div>
      ) : (
        <>
          <TopTab orderList={orderList} activeTab={activeTab} setActiveTab={setActiveTab} />
          <OrderTable fetchAdminOrders={fetchAdminOrders} loadingMore={loadingMore} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage} currentPage={currentPage} searchQuery={searchQuery} deleteOrder={deleteOrder} filteredOrderList={filteredOrderList} handlePartnerModal={handlePartnerModal} setOrderID={setOrderID} orderList={orderList} activeTab={activeTab} loadingOrder={loadingOrder} setLoadingOrder={setLoadingOrder} search={search} filterBySearch={filterBySearch} />
        </>
      )}

    </div>
  )
}

export default Orders