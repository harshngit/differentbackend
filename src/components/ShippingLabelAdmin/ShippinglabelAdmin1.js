import { Button } from '@material-tailwind/react'
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print'
import { db } from '../../firebase.config';
import Barcode from 'react-barcode';
import logo from '../../asset/grc-logo.png'

const ShippinglabelAdmin1 = () => {
	const { id } = useParams();
	const [orderDetail, setOrderDetail] = useState({})
	const [quantity, setQuantity] = useState("")
	// console.log(quantity)
	console.log(orderDetail)
	const fetchOrderDetail = () => {
		// console.log("hi")
		onSnapshot(doc(db, "logisticOrder", id), (doc) => {
			const data = doc.data()
			setOrderDetail(data)
			setQuantity(data.totalqty)
		});
	}

	useEffect(() => {
		fetchOrderDetail()
	}, [id])

	console.log(
		quantity,
		Array(quantity),
		Array(quantity).fill(0).map((_, i) => i),
	);
	let componentRef = useRef();
	return (
		<div className='my-4 mx-2'>
			<ReactToPrint
				trigger={() => <Button>Print this out!</Button>}
				content={() => componentRef}
			/>

			<div className='grid grid-cols-2 gap-12 p-12' ref={(el) => (componentRef = el)}>
				{Array.from({ length: quantity }, (_, i) => (
					<div
						key={i}
						className="w-full flex flex-col h-[400px] flex-wrap justify-center page-break"
						style={{ pageBreakAfter: (i + 1) % 4 === 0 ? 'always' : 'auto' }}
					>
						<div className="w-[100%] p-3 bg-white border border-gray-300 rounded-lg m-2" style={{ height: '350px' }}>
							<div className="flex justify-between">
								<img className='w-[100px]' src={logo} alt="Logo" />
							</div>
							<div className="mt-4 flex  justify-between items-start">
								<p className="font-bold"><span className="font-bold">LR No:</span> {orderDetail?.lrno}</p>
								<p className='font-bold'>Box no: <span className='font-[GilroyBold]'>{i + 1}/{quantity}</span></p>
							</div>
							<div className="mt-3 flex justify-center items-start gap-6">
								<div className='w-1/2'>
									<p className="font-bold text-[15px]">From Location:</p>
									<p className='text-[8px]'>
										{orderDetail?.pickup_location?.personName}<br />
										{orderDetail?.pickup_location?.address},<br />
										{orderDetail?.pickup_location?.city},<br />
										India
									</p>
									<p className='text-[8px]'>{orderDetail?.pickup_location?.phone}</p>
								</div>
								<div className='w-1/2'>
									<p className="font-bold text-[15px]">To Location:</p>
									<p className='text-[8px]'>
										{orderDetail?.dropoff_location?.consignee}<br />
										{orderDetail?.dropoff_location?.address},<br />
										{orderDetail?.dropoff_location?.zip},<br />
										{orderDetail?.dropoff_location?.region}<br />
										India
									</p>
									<p className='text-[10px]'>{orderDetail?.pickup_location?.phone}</p>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<Barcode value={id} className="w-[100px]" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ShippinglabelAdmin1