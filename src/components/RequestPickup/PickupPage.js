import React from 'react'
import PickupForm from './PickupForm'
import PickupList from './PickupList'

const PickupPage = ({pickupData,setPickupData,pickupList,handlePickup,warehouseList,warehouseLocation,setWarehouseLocation,handleUpdateModal,setPickupId,requestId,setRequestId,deletePickup}) => {
  return (
    <div className='col-span-4'>
    <PickupForm warehouseList={warehouseList}  warehouseLocation={warehouseLocation} setWarehouseLocation={setWarehouseLocation} pickupData={pickupData} handlePickup={handlePickup} setPickupData={setPickupData} />
        <PickupList deletePickup={deletePickup} requestId={requestId} setRequestId={setRequestId} setPickupId={setPickupId} handleUpdateModal={handleUpdateModal} pickupList={pickupList} />
    </div>
  )
}

export default PickupPage