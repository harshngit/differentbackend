import React, { useEffect, useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import toast, { Toaster } from 'react-hot-toast'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import GiftCardLists from '../components/Giftcard/GiftCardLists'

const GiftCard = () => {


	const [giftCards, setGiftCards] = useState([]);

	const fetchGiftCards = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "Gift Cards")); // Use your actual collection name
			const cards = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setGiftCards(cards);
		} catch (error) {
			console.error("Error fetching gift cards:", error);
		}
	};

	useEffect(() => {
		fetchGiftCards();
		updateExpiredCoupons()
	}, []);
	const deleteOrder = async (id) => {
		await deleteDoc(doc(db, "Gift Cards", id))
		toast.success("Gift Card Deleted")
		window.location.reload()
	}

	const updateExpiredCoupons = async () => {
		try {
			const q = collection(db, "Gift Cards");
			const querySnapshot = await getDocs(q);
			const today = new Date();

			querySnapshot.forEach(async (docSnap) => {
				const data = docSnap.data();
				const expireDate = new Date(data?.ExpiryDate);

				if (expireDate < today && data?.status !== "Expired") {
					const couponRef = doc(db, "Coupon", docSnap.id);
					await updateDoc(couponRef, {
						status: "Expired",
					});
				}
			});
		} catch (error) {
			console.error("Error auto-updating expired coupons:", error);
		}
	};

	return (
		<>
			<div className='bg-gray-100 flex '>

				<Toaster />
				<Sidebar />
				<div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
					<Topbar />
					<GiftCardLists
						deleteOrder={deleteOrder}
						giftCards={giftCards}
						setGiftCards={setGiftCards}
					/>
				</div>
			</div>
		</>
	)
}

export default GiftCard