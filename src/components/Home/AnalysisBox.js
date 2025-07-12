import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaTruckLoading, FaTshirt } from 'react-icons/fa';
import { FaTruckFast } from 'react-icons/fa6';
import { GiSkirt, GiSleevelessJacket } from 'react-icons/gi';
import { PiPantsFill } from 'react-icons/pi';
import { db } from '../../firebase.config';

const AnalysisBox = () => {
	const [activeTab, setActiveTab] = useState('product');

	// Product List Fetch

	const [totalProductList, setTotalProductList] = useState([])
	const [forhimlist, setForhimlist] = useState([])
	const [forherlist, setForherlist] = useState([])
	const [signature, setSignature] = useState([])
	const [arabic, setArabic] = useState([])

	const [newOrderlist, setnewOrderlist] = useState([])
	const [totalOrderList, setTotalOrderList] = useState([]);
	const [orderInTransitList, setOrderInTransitList] = useState([]);
	const [orderDeliveryList, setOrderDeliveryList] = useState([]);
	const [fulfilledList, setFulfilledList] = useState([]);

	const fetchProduct = async () => {
		const q = query(collection(db, "Product"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setTotalProductList((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}

	const fetchProductHim = async () => {
		const q = query(collection(db, "Product"), where("productCategory", "==", "For Him"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setForhimlist((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}

	const fetchProductHer = async () => {
		const q = query(collection(db, "Product"), where("productCategory", "==", "For Her"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setForherlist((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}
	const fetchProductSignature = async () => {
		const q = query(collection(db, "Product"), where("productCategory", "==", "Signature"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setSignature((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}
	const fetchProductArabic = async () => {
		const q = query(collection(db, "Product"), where("productCategory", "==", "Arabic"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setArabic((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}



	const fetchOrder = async () => {
		const q = query(collection(db, "Order"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setTotalOrderList((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}

	const fetchnewOrder = async () => {
		const q = query(collection(db, "Order"), where("orderStatus", "==", "New"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setnewOrderlist((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}
	const fetchOrderIntransit = async () => {
		const q = query(collection(db, "Order"), where("orderStatus", "==", "in-transit"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setOrderInTransitList((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}

	const fetchOrdeDeilvered = async () => {
		const q = query(collection(db, "Order"), where("orderStatus", "==", "delivered"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setOrderDeliveryList((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}

	const fetchOrdefulfilled = async () => {
		const q = query(collection(db, "Order"), where("orderStatus", "==", "Fulfilled"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setFulfilledList((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])
		})
	}

	useEffect(() => {
		fetchProduct()
		fetchProductHim()
		fetchProductHer()
		fetchProductSignature()
		fetchProductArabic()
		// order
		fetchOrder()
		fetchnewOrder()
		fetchOrderIntransit()
		fetchOrdefulfilled()
		fetchOrdeDeilvered()
	}, [])


	return (
		<>

			{/* Tabs */}
			<div className='justify-center items-center mt-5 flex gap-4'>
				<button
					onClick={() => setActiveTab('product')}
					className={`py-2 px-4 rounded-full font-[GilroyMedium] transition-all duration-300 ${activeTab === 'product' ? 'bg-[#000] text-white' : 'bg-gray-300 text-black hover:bg-gray-200'
						}`}
				>
					Product
				</button>
				<button
					onClick={() => setActiveTab('order')}
					className={`py-2 px-4 rounded-full font-[GilroyMedium] transition-all duration-300 ${activeTab === 'order' ? 'bg-[#000] text-white' : 'bg-gray-300 text-black hover:bg-gray-200'
						}`}
				>
					Order
				</button>
			</div>

			{/* Tab Content */}
			<div className='mx-10 my-5 relative h-[160px]'>
				{/* Total Orders Tab */}
				<div
					className={`absolute w-full transition-opacity duration-500 ${activeTab === 'product' ? 'opacity-100' : 'opacity-0 pointer-events-none'
						}`}
				>
					<div className='flex justify-center items-center pb-5 w-full'>
						<h2 className='font-[GilroyBold] text-[20px]'>Total Product ({totalProductList.length})</h2>
					</div>
					<div className='grid grid-cols-4 gap-10'>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<FaTshirt className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>For Him</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{forhimlist.length}</h1>
								</div>
							</div>
						</div>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<GiSkirt className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>For Her</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{forherlist?.length}</h1>
								</div>
							</div>
						</div>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<PiPantsFill className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>Signature</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{signature?.length}</h1>
								</div>
							</div>
						</div>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<GiSleevelessJacket className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>Arabic</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{arabic?.length}</h1>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Orders in Transit Tab */}
				<div
					className={`absolute w-full transition-opacity duration-500 ${activeTab === 'order' ? 'opacity-100' : 'opacity-0 pointer-events-none'
						}`}
				>
					<div className='flex justify-center items-center pb-5 w-full'>
						<h2 className='font-[GilroyBold] text-[20px]'>Total Order ({totalOrderList?.length})</h2>
					</div>
					<div className='grid grid-cols-4 gap-10'>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<FaTruckLoading className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>New Order</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{newOrderlist.length}</h1>
								</div>
							</div>
						</div>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<FaBoxOpen className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>Order In Transit</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{orderInTransitList?.length}</h1>
								</div>
							</div>
						</div>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<FaTruckFast className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>Order fulfilled</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{fulfilledList.length}</h1>
								</div>
							</div>
						</div>
						<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
							<div className='flex justify-between items-center'>
								<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#dcdbdb]'>
									<FaTruckFast className='text-[#000] text-[40px]' />
								</div>
								<div className='text-right pt-2'>
									<h3 className='font-[GilroyMedium]'>Order Delivered</h3>
									<h1 className='font-[GilroyBold] text-[40px]'>{orderDeliveryList?.length}</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default AnalysisBox;
