import { Button } from '@material-tailwind/react';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { db } from '../../firebase.config';
import Barcode from 'react-barcode';
import logo from '../../asset/grc-logo.png';

const ShippinglabelAdmin4x2 = () => {
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

	return (
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
							size: 4in 2in;
							
							margin-top: 2px;
						}
					
						.print-container {
							width: 3.9in !important;
							height: 1.8in !important;
							overflow: hidden;
							page-break-after: always;
							display: flex;
							justify-content: center;
							align-items: center;
							margin:auto
						}
					}
				`}
			</style>

			{/* Labels Container */}
			<div className=' grid grid-rows-auto grid-flow-row p-1 gap-3' ref={componentRef4x2}>
				{Array.from({ length: quantity }, (_, i) => (
					<div
						key={i}
						className="print-container w-[4in] h-[2in]  flex flex-col justify-center items-start border border-gray-300 bg-white rounded-lg p-2"
					>
						{/* Header Section */}
						<div className="flex justify-between w-full">
							<img className="w-[50px]" src={logo} alt="Logo" />
						</div>
						<div className="mt-2 flex justify-between w-full text-[10px] font-bold">
							<p>LR No: {orderDetail?.lrno}</p>
							<p>Box: {i + 1}/{quantity}</p>
						</div>

						{/* From and To Locations */}
						<div className="mt-1 flex justify-between w-full text-[6px]">
							<div className="w-1/2">
								<p className="font-bold text-[8px]">From:</p>
								<p>
									{orderDetail?.pickup_location?.personName}
									<br />
									{orderDetail?.pickup_location?.address}, {orderDetail?.pickup_location?.city}, India
									<br />
									{orderDetail?.pickup_location?.phone}
								</p>
							</div>
							<div className="w-1/2">
								<p className="font-bold text-[8px]">To:</p>
								<p>
									{orderDetail?.dropoff_location?.consignee}
									<br />
									{orderDetail?.dropoff_location?.address}, {orderDetail?.dropoff_location?.zip}, {orderDetail?.dropoff_location?.region}, India
									<br />
									{orderDetail?.dropoff_location?.phone}
								</p>
							</div>
						</div>

						{/* Barcode Section */}
						<div className="mt-2">
							<Barcode value={id} width={1} height={10} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ShippinglabelAdmin4x2;
