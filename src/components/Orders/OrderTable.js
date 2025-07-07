import { TrashIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PaginatedItems from './PaginatedItems'
import NonPaginatedItem from './NonPaginatedItem'

const OrderTable = ({ activeTab, orderList, handlePartnerModal, setOrderID, filteredOrderList, deleteOrder, loadingOrder, setLoadingOrder, search, filterBySearch, searchQuery, currentPage, setCurrentPage, setItemOffset, fetchAdminOrders, loadingMore }) => {
  const { isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  )
  const [showAdd, setShowAdd] = useState('')
  return (
    <>
      <div className=''  >
        <div className={`bg-gray-300  py-4 px-8 grid  gap-6 grid-flow-row  items-center justify-start grid-cols-2 lg:grid-cols-5  `}>
          <p className='col-span-1 font-[GilroyMedium]' >Order No</p>
          <p className='col-span-1 font-[GilroyMedium]' >Created Date</p>
          {/* <p className='col-span-1 font-[GilroyMedium]' >Order ID</p> */}
          <p className='col-span-1 font-[GilroyMedium]' >Customer Name</p>
          <p className='col-span-1 font-[GilroyMedium]' >Order Status</p>
          <p className='col-span-1 font-[GilroyMedium]' >Action</p>
        </div>
        {searchQuery ? <NonPaginatedItem orderList={orderList} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage} currentPage={currentPage} searchQuery={searchQuery} itemsPerPage={5} filteredOrderList={filteredOrderList} showAdd={showAdd} setShowAdd={setShowAdd} setOrderID={setOrderID} handlePartnerModal={handlePartnerModal} userProfile={userProfile} filterBySearch={filterBySearch}
          deleteOrder={deleteOrder} loadingOrder={loadingOrder} setLoadingOrder={setLoadingOrder} search={search} /> :
          <PaginatedItems fetchAdminOrders={fetchAdminOrders} loadingMore={loadingMore} orderList={orderList} setItemOffset={setItemOffset} setCurrentPage={setCurrentPage} currentPage={currentPage} searchQuery={searchQuery} itemsPerPage={5} filteredOrderList={filteredOrderList} showAdd={showAdd} setShowAdd={setShowAdd} setOrderID={setOrderID} handlePartnerModal={handlePartnerModal} userProfile={userProfile} filterBySearch={filterBySearch}
            deleteOrder={deleteOrder} loadingOrder={loadingOrder} setLoadingOrder={setLoadingOrder} search={search} />
        }

      </div>

    </>
  )
}

export default OrderTable