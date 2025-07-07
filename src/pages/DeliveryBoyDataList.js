import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import Topbar from '../components/Layout/Topbar'
import { Toaster } from 'react-hot-toast'
import DeliveryBoyList from './DeliveryBoyList'
import DeliveryBoyData from '../components/DeliveryBoyDataLists/DeliveryBoyData'
import { db } from '../firebase.config'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'

const DeliveryBoyDataList = () => {
	const [activeTab, setActiveTab] = useState("all")
	const [deliverytData, setDeliverytData] = useState([])
	const { isAuthenticated, users, userProfile } = useSelector(
		(state) => state.user
	)
	const fetchDeliveryBoyDataList = async () => {

		if (activeTab === "currentday") {
			const today = new Date();
			today.setHours(0, 0, 0, 0); // Normalize to start of the day

			const q = query(collection(db, "DeliveryBoyData"));
			const querySnapshot = await getDocs(q);

			const newOrders = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();

				// Ensure `createdAt` is a Firestore Timestamp and convert it
				if (data.createdAt && data.createdAt.toDate) {
					const createdAtDate = data.createdAt.toDate();
					createdAtDate.setHours(0, 0, 0, 0); // Normalize time for comparison

					if (createdAtDate.getTime() === today.getTime()) {
						newOrders.push({
							id: doc.id,
							...data,
						});
					}
				}
			});

			// Update state
			setDeliverytData(newOrders);
		} else {
			const q = query(collection(db, "DeliveryBoyData"));
			const querySnapshot = await getDocs(q);

			const allOrders = [];
			querySnapshot.forEach((doc) => {
				allOrders.push({
					id: doc.id,
					...doc.data(),
				});
			});

			// Update state
			setDeliverytData(allOrders);
		}

	}

	console.log(deliverytData)

	const deleteOrder = async (id) => {
		await deleteDoc(doc(db, "DeliveryBoyData", id))
		window.location.reload()
	}

	useEffect(() => {
		fetchDeliveryBoyDataList()
	}, [activeTab])



	return (
		<div className='bg-gray-100 flex'>
			<Toaster />
			<Sidebar />
			<div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
				<Topbar />
				<DeliveryBoyData deleteOrder={deleteOrder} deliverytData={deliverytData} activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>
		</div>
	)
}

export default DeliveryBoyDataList