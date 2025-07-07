import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Sidebar } from '../components/Layout/Sidebar'
import Topbar from '../components/Layout/Topbar'
import ManageDeliveryForm from '../components/ManageDelivery/ManageDeliveryForm'
import { useSelect } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, Timestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase.config'

const ManageDelivery = () => {

	const { error, loading } = useSelector(
		(state) => state.order
	)
	const { isAuthenticated, users, userProfile } = useSelector(
		(state) => state.user
	)
	const [orderActivity, setorderActivity] = useState([])
	const [user, setUser] = useState({})
	const [userList, setUserList] = useState([])
	const [lrNumber, setLrNumber] = useState("")
	const [orderList, setOrderList] = useState([])
	const [lrNolist, setLrNolist] = useState([])
	const [orderDetails, setOrderDetail] = useState({})
	const [vehicileNo, setVehicileNo] = useState("")
	const handleDeliveryBoy = async () => {
		const date = new Date();

		// Validation checks
		if (user.length === 0 || vehicileNo.length === 0) {
			toast.error("Please fill all the fields");
			return;
		}

		if (lrNolist.length === 0) {
			toast.error("Please Add lr No");
			return;
		}

		try {
			// Iterate over lrNolist
			for (const lrno of lrNolist) {
				// Check if lrno exists in the orderList
				const matchingOrder = orderList.find((orderItem) => orderItem?.lrno === lrno);

				if (matchingOrder) {
					const repairRef = doc(db, "logisticOrder", lrno);

					// Fetch the current document data once
					const docSnap = await getDoc(repairRef);

					if (docSnap.exists()) {
						const data = docSnap.data();

						// Update the document
						await updateDoc(repairRef, {
							orderStatus: "Out for Delivery",
							orderActivity: [
								...(data?.orderActivity || []), // Ensure the orderActivity array exists
								{
									status: "Out for Delivery",
									remark: "Order Has Been Delivery",
									location: "Order Has Been Delivery",
									time: date,
								},
							],
						});
					}
				}
			}

			// Add delivery boy record
			await addDoc(collection(db, "DeliveryBoyData"), {
				createdAt: date,
				user: user,
				lrNumber: lrNolist,
				vehicleNo: vehicileNo,
				deliveryBoyStatus: "Delivery Pending"
			});

			toast.success("Delivery Boy Added Successfully");
			window.location.reload();
		} catch (error) {
			toast.error("Failed to process: " + error.message);
		}
	};


	console.log(lrNolist)
	const handleLrNoData = (selectedValue) => {
		setLrNolist((prevList) => {
			const updatedList = [...prevList, selectedValue];
			return updatedList;
		});
		setLrNumber("");
	};

	console.log(lrNolist)
	const removelrno = (lrNumber) => {
		setLrNolist((prevList) =>
			prevList.filter((item) =>
				typeof item === "object" ? item.lrno !== lrNumber.lrno : item !== lrNumber
			)
		);
	};



	const fetchOrder = async () => {
		const month = new Date().getMonth();
		const q = query(collection(db, "logisticOrder"), where("orderStatus", "in", ["in-transit", "pickedUp"]))
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const data = doc.data()
			if (data.createdAt.toDate().getMonth() === month) {
				setOrderList((prev) => [...prev, {
					id: doc.id,
					...doc.data()
				}])
			}

		});



	}

	console.log(orderList)

	const fetchUser = async () => {
		const q = query(collection(db, "users"), where("role", "==", "Delivery Boy"))
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setUserList((prev) => [...prev, {
				id: doc.id,
				...doc.data()
			}])

		});
	}

	console.log(userList)

	useEffect(() => {
		if (Object.keys(user).length == 0) {
			fetchUser()
		}
		fetchOrder()
	}, [user])



	return (
		<div className='bg-gray-100 flex ' >
			<Toaster />
			<Sidebar />
			<div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
				<Topbar />
				<ManageDeliveryForm vehicileNo={vehicileNo} setVehicileNo={setVehicileNo} handleDeliveryBoy={handleDeliveryBoy} user={user} setUser={setUser} userList={userList} setUserList={setUserList} setOrderList={setOrderList} orderList={orderList} lrNumber={lrNumber} setLrNumber={setLrNumber} handleLrNoData={handleLrNoData} lrNolist={lrNolist} removelrno={removelrno} />
			</div>
		</div>
	)
}

export default ManageDelivery