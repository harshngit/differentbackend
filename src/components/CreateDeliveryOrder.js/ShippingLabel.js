import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import QRCode from "react-qr-code";
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Barcode from 'react-barcode';
const ShippingLabel = ({ lrNumber, pickupLocation, dropLocation, quantity }) => {
  console.log(quantity)
  console.log(
    quantity,
    Array(quantity),
    Array(quantity).fill(0).map((_, i) => i),
  );
  let componentRef = useRef();
  return (
    <>
      <div className='my-4 mx-2 flex justify-around items-center' >
        <ReactToPrint
          className=""
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
        />
        <Link to="/"><Button>Back</Button></Link>
      </div>
      <style>
        {`
					@media print {
						@page {
							size: 4in 2in;
						}
					
						.print-container {
							width: 3.9in !important;
							height: 1.2in !important;
							overflow: hidden;
							page-break-after: always;
							display: flex;
							justify-content: center;
							align-items: start;
							margin:auto
						}
					}
				`}
      </style>
      <div className=' grid grid-rows-auto grid-flow-row p-1 gap-1' ref={(el) => (componentRef = el)}>
        {
          Array.from({ length: quantity }, (_, i) => (
            <div key={i} style={{ breakAfter: "page" }} className='w-[3.8in] h-[1.8in] px-2 py-1 border-[1px] border-gray-600' >

              <div className='grid grid-cols-2 grid-flow-col justify-between' >
                <div>
                  <h3 className='font-[GilroyBold]' >From Location,</h3>
                  <p className='text-[0.6rem]' >{pickupLocation?.personName}</p>
                  <p className='text-[0.6rem]'>{pickupLocation?.address},{pickupLocation?.city}, {pickupLocation?.state},  India</p>
                  {pickupLocation?.phone?.length !== 0 && <p className='text-[0.6rem]'>{pickupLocation?.phone}</p>}
                </div>
                <div >
                  <h3 className='font-[GilroyBold]' >To Location,</h3>
                  <p className='text-[0.6rem]' >{dropLocation?.name}</p>
                  <p className='text-[0.6rem]'>{dropLocation?.address},{dropLocation?.city}, {dropLocation?.region}, India , {dropLocation?.zip}</p>
                  {dropLocation?.phone?.length !== 0 && <p className='text-[0.6rem]'>{dropLocation?.phone}</p>}
                </div>
              </div>
              <div className='grid grid-cols-1 grid-flow-col justify-between items-center' >
                <div>
                  <p>Box no: <span className='font-[GilroyBold] ' > {i + 1}/{quantity}</span></p>
                  <Barcode value={lrNumber} width={1} height={10} />
                </div>

              </div>

            </div>
          ))

        }
      </div>
    </>
  )
}

export default ShippingLabel