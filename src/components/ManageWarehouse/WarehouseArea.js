import React from 'react'
import TopArea from './TopArea'
import WarehouseTable from './WarehouseTable'

const WarehouseArea = ({ handleWarehouseModal, warehouseList, deleteWarehouse, handleeditWarehouseModal }) => {
  return (
    <div className='col-span-4 mx-4 bg-gray-100' >
      <TopArea handleWarehouseModal={handleWarehouseModal} />
      <WarehouseTable handleeditWarehouseModal={handleeditWarehouseModal} handleWarehouseModal={handleWarehouseModal} deleteWarehouse={deleteWarehouse} warehouseList={warehouseList} />
    </div>
  )
}

export default WarehouseArea