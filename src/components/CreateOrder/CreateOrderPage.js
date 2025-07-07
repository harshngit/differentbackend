import React, { useState } from 'react'

import ShipmentDetails from './ShipmentDetails'
import Dimensions from './Dimensions'
import { Button } from '@material-tailwind/react'
import InvoiceDetails from './InvoiceDetails'
import DeliveryAddress from './DeliveryAddress'

const CreateOrderPage = ({ loadingOrder, customerName, setCustomerName, step, setStep, dimension, setDimension, dimentionData, setDimentionData, subOrders, setSubOrders, dropLocation, setDropLocation, mode, setMode, amount, setAmount, weight, setWeight, consigneeGST, setConsigneeGST, sellerGST, setSellerGST, orderID, setOrderID, lrDetails, setLrDetails, lrNumber, setLrNumber, handleDimensionData, removeDimesion, handleShippingDetails, warehouseList, pickupLocation, setPickupLocation, invoiceDetail, setInvoiceDetail, addInvoice, invoiceDocument, handleDeliveryInformation, handleBookOrder, userList, user, setUser, invoiceList, setInvoiceList, orderList, setTotalbox, totalbox, handleConfirmOrder, loading }) => {


  return (

    <>

      <div className='col-span-4 h-[85v`h] overflow-y-scroll mx-6 my-6' >
        <h3 className='font-[GilroyBold] text-[1.5rem] ' >Create Order</h3>
        <div className='' >
          <ShipmentDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            totalbox={totalbox}
            setTotalbox={setTotalbox}
            userList={userList}
            user={user}
            orderList={orderList}
            setUser={setUser}
            warehouseList={warehouseList}
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            dimentionData={dimentionData}
            setDimentionData={setDimentionData}
            setDimension={setDimension}
            dimension={dimension}
            subOrders={subOrders}
            setSubOrders={setSubOrders}
            dropLocation={dropLocation}
            setDropLocation={setDropLocation}
            mode={mode}
            setMode={setMode}
            amount={amount}
            setAmount={setAmount}
            weight={weight}
            setWeight={setWeight}
            consigneeInvoice={consigneeGST}
            setConsigneeInvoice={setConsigneeGST}
            sellerInvoice={sellerGST}
            setSellerInvoice={setSellerGST}

            lrNumber={lrNumber}
            setLrNumber={setLrNumber}
            orderID={orderID}
            setOrderID={setOrderID}
            lrDetails={lrDetails}
            setLrDetails={setLrDetails}
            step={step} setStep={setStep} />
          <Dimensions
            handleDimensionData={handleDimensionData}
            removeDimesion={removeDimesion}
            dimentionData={dimentionData}
            setDimentionData={setDimentionData}
            setDimension={setDimension}
            dimension={dimension}
            subOrders={subOrders}
            setSubOrders={setSubOrders}
            dropLocation={dropLocation}
            setDropLocation={setDropLocation}
            mode={mode}
            setMode={setMode}
            amount={amount}
            setAmount={setAmount}
            weight={weight}
            setWeight={setWeight}
            consigneeInvoice={consigneeGST}
            setConsigneeInvoice={setConsigneeGST}
            sellerInvoice={sellerGST}
            setSellerInvoice={setSellerGST}

            lrNumber={lrNumber}
            setLrNumber={setLrNumber}
            orderID={orderID}
            setOrderID={setOrderID}
            lrDetails={lrDetails}
            setLrDetails={setLrDetails}

            step={step} setStep={setStep} />
          {/* <div className='flex mx-3 gap-4 items-center justify-end' >
          <Button disabled={true} >
            Back
          </Button>
          <Button onClick={handleShippingDetails}  >
            Next
          </Button>
        </div> */}
        </div>
        <div className='' >
          <DeliveryAddress
            customerName={customerName}
            setCustomerName={setCustomerName}
            dropLocation={dropLocation}
            setDropLocation={setDropLocation}
          />

          {/* <div className='flex mx-3 gap-4 items-center justify-end' >
          <Button onClick={() => setStep(1)} >
            Back
          </Button>
          <Button onClick={handleDeliveryInformation} >
            Next
          </Button>
        </div> */}
        </div>
        <div className='' >
          <InvoiceDetails consigneeGST={consigneeGST}
            handleDeliveryInformation={handleDeliveryInformation}
            invoiceDocument={invoiceDocument}
            setConsigneeGST={setConsigneeGST}
            sellerGST={sellerGST}
            setSellerGST={setSellerGST}
            invoiceDetail={invoiceDetail}
            setInvoiceDetail={setInvoiceDetail}
            addInvoice={addInvoice}
            invoiceList={invoiceList}
            setInvoiceList={setInvoiceList}
          />

          <div className='flex mx-3 gap-4 items-center justify-end' >
            {/* <Button onClick={() => setStep(1)} >
            Back
          </Button> */}
            <Button disabled={loadingOrder} onClick={handleConfirmOrder} >
              {loadingOrder ? "Placing Order..." : "Confirm Order"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateOrderPage