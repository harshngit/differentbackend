import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import EditWarehouseform from '../components/ManageWarehouse/EditWarehouseform'

const EditWarehouse = () => {
	const [editWarehouse, setEditWarehouse] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [warehouseDetails, setwarehouseDetails] = useState({})
	const { id } = useParams()
	const handleeditWarehouseModal = () => {
		setEditWarehouse(!editWarehouse)
	}
	const [userList, setuserList] = useState([])
	const [pickupName, setPickupName] = useState({})
	const [warehouseData, setWarehouseData] = useState({

		pinCode: "",
		city: "",
		state: "",
		country: "",
		address: "",
		personName: "",
		email: "",
		phone: "",
		slot: ""
	})
	console.log(id)
	const fetchwarehouseDetails = () => {
		onSnapshot(doc(db, "warehouse", id), (doc) => {
			const data = doc.data()
			setwarehouseDetails(data)
			setPickupName(data?.pickupName)
			setWarehouseData({
				pinCode: data?.pinCode || "",
				city: data?.city || "",
				state: data?.state || "",
				country: data?.country || "",
				address: data?.address || "",
				personName: data?.personName || "",
				email: data?.email || "",
				phone: data?.phone || "",
				slot: data?.slot || "",
			});
		});
	}
	console.log(warehouseDetails)
	const UpdateWarehouse = async () => {
		await updateDoc(doc(db, "warehouse", id), {
			pickupName: pickupName,
			pinCode: warehouseData.pinCode,
			city: warehouseData.city,
			state: warehouseData.state,
			country: warehouseData.country,
			address: warehouseData.address,
			personName: warehouseData.personName,
			email: warehouseData.email,
			phone: warehouseData.phone,
			slot: warehouseData.slot,
			userUid: pickupName?.uid
		}).then(() => {
			navigate("/warehouse")
		})
	}
	const fetchUsers = async () => {
		const q = query(collection(db, "users"), where("service", "==", "logistics"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setuserList((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])

		});
	}

	useEffect(() => {
		fetchwarehouseDetails()
		fetchUsers()
	}, [])

	return (
		<div className='bg-gray-100 flex '>
			<Sidebar />
			<div className='h-[100vh]  flex flex-1 flex-col'>
				<Topbar />
				<EditWarehouseform userList={userList} pickupName={pickupName} setPickupName={setPickupName} UpdateWarehouse={UpdateWarehouse} warehouseData={warehouseData} setWarehouseData={setWarehouseData} setEditWarehouse={setEditWarehouse} />
			</div>
		</div>
	)
}

export default EditWarehouse