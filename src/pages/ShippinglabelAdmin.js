import { Button } from '@material-tailwind/react';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import Barcode from 'react-barcode';
import logo from '../../src/asset/grc-logo.png';
import { db } from '../firebase.config';
import QRCode from 'react-qr-code';

const ShippinglabelAdmin = () => {
	const { id } = useParams();
	const [orderDetail, setOrderDetail] = useState({});
	const [quantity, setQuantity] = useState(1);
	const componentRef4x2 = useRef();

	// Fetch order details from Firestore
	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, 'logisticOrder', id), (doc) => {
			if (doc.exists()) {
				const data = doc.data();
				setOrderDetail(data);
				setQuantity(data.totalqty || 1);
			}
		});
		return () => unsubscribe();
	}, [id]);
	console.log(orderDetail)
	return (
		<>

			<div className="my-4 mx-2">
				{/* Print button */}
				<ReactToPrint
					trigger={() => <Button className='mb-5'>Print Labels</Button>}
					content={() => componentRef4x2.current}
				/>

				{/* Print Styles */}
				<style>
					{`
    @media print {
      @page {
        size: 4in 2in; /* Set the page size */
        margin: 0; /* Remove default margins */
      }

      body {
        margin: 0; /* Remove body margin */
        padding: 0; /* Remove body padding */
        width: 4in; /* Set body width */
        height: 2in; /* Set body height */
        overflow: hidden; /* Prevent content from overflowing */
      }

      .print-container {
        width: 3.9in !important; /* Slightly less than page width to avoid overflow */
        height: 1.8in !important; /* Slightly less than page height to avoid overflow */
        overflow: hidden; /* Ensure content does not overflow */
        page-break-after: always; /* Ensure each container is on a new page */
        margin: 0 auto; /* Center the container horizontally */
        box-sizing: border-box; /* Ensure padding and border are included in the element's total width and height */
      }
    }
  `}
				</style>

				{/* Labels Container */}
				<div className=" grid grid-rows-auto grid-flow-row p-1 gap-3" ref={componentRef4x2}>
					{Array.from({ length: quantity }, (_, i) => (
						<div key={i} className=' w-[3.9in] h-[1.8in] border-[1px] border-[#000]'>
							<div className='grid grid-cols-3'>
								<div className='col-span-1 p-2 border-r-[1px] border-b-[1px] border-[#000]'>
									<img src={logo} className='w-[50px]' alt="" />
								</div>
								<div className='col-span-1 p-2 border-r-[1px] border-b-[1px] border-[#000]'>
									<p className='text-[0.6rem] font-[GilroyMedium]' >Date :{orderDetail?.createdAt?.toDate().toDateString()}</p>
								</div>
								<div className='col-span-1 p-2 border-b-[1px] border-[#000]'>
									<p className='text-[0.6rem] font-[GilroyMedium]' >Box : {i + 1}/{quantity}</p>
								</div>
							</div>
							<div className='grid grid-cols-3'>
								<div className='col-span-1 p-2 flex justify-center item-center border-r-[1px] border-b-[1px] border-[#000]'>
									<QRCode value={id} size={68} />
								</div>
								<div className='col-span-2  '>
									<div className='grid grid-cols-2  border-b-[1px] border-[#000] '>
										<div className=''>
											<p className='text-[11px] ml-2 font-[GilroyMedium] border-r-[1px] border-[#000]' >lr: {orderDetail?.lrno}</p>
										</div>
										<p className='text-[11px]  ml-2 font-[GilroyMedium]' >OID: {orderDetail?.orderID}</p>
									</div>
									<div className='  border-b-[1px] border-[#000]'>
										<p className='text-[11px] ml-2 font-[GilroyMedium]'>Client :- {orderDetail?.userName}</p>
									</div>
									<div className='  border-b-[1px] border-[#000]'>
										<p className='text-[11px] ml-2 font-[GilroyMedium]'>Consignee Address :- {orderDetail?.dropoff_location?.companyName}
											,{orderDetail?.dropoff_location?.address},{orderDetail?.dropoff_location?.city},{orderDetail?.dropoff_location?.zip},
											{orderDetail?.dropoff_location?.region}
										</p>
									</div>
								</div>
							</div>
							<div className='flex justify-center items-end'>
								<Barcode className="bg-transparent" value={id} width={1} // Adjust the width of the barcode
									height={9} />
							</div>
						</div>
					))}
				</div>
			</div>

		</>
	)
}

export default ShippinglabelAdmin