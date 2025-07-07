import React, { useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import toast, { Toaster } from 'react-hot-toast'
import GiftCardForm from '../components/Create Card/GiftCardForm'
import { collection, addDoc, Timestamp, setDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../firebase.config'
import { useEffect } from 'react'
const CreateGiftCard = () => {

	const [giftCardCode, setGiftCardCode] = useState("")
	const [giftCardValue, setGiftCardValue] = useState("")
	const [giftCardProduct, setGiftCardProduct] = useState("")
	const [giftCardExpiryDate, setGiftCardExoiryDate] = useState("")
	const [loading, setLoading] = useState(false)

	const [productName, setProductName] = useState([]);
	const [product, setProduct] = useState({})

	const fetchProduct = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "Product")); // Use your actual collection name
			const cards = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setProductName(cards);

		} catch (error) {
			console.error("Error fetching product names:", error);
		}
	};

	console.log(productName)

	useEffect(() => {
		fetchProduct(); // ✅ Call on component mount
	}, []);




	const handleGiftCard = async () => {
		setLoading(true);

		// Validation
		if (!giftCardCode.trim()) {
			setLoading(false);
			return toast.error("Please Generate Code");
		}
		if (!giftCardValue.trim()) {
			setLoading(false);
			return toast.error("Enter Value of Gift Card");
		}

		try {
			// Generate random 5-digit ID
			const giftCardId = Math.floor(10000 + Math.random() * 90000).toString();

			// Date
			const date = new Date()

			// Create gift card object
			const giftCardData = {
				id: giftCardId,
				code: giftCardCode.trim(),
				value: parseFloat(giftCardValue),
				product: giftCardProduct,
				createdAt: date,
				ExpiryDate: giftCardExpiryDate,
				status: "Active",
				isUsed: false,
				usedBy: null,
				redeemedAt: null
			};

			// Add to Firestore
			await setDoc(doc(db, "Gift Cards", giftCardId), giftCardData);

			toast.success("Gift card added successfully!");
			// Reset form (optional)
			setGiftCardCode("");
			setGiftCardValue("");
			setProductName("")
			setGiftCardExoiryDate("")
		} catch (error) {
			console.error("Error adding gift card:", error);
			toast.error("Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	const handleGenerateCode = () => {
		let raw = "";
		for (let i = 0; i < 16; i++) {
			raw += Math.floor(Math.random() * 10);
		}

		const formatted = raw.match(/.{1,4}/g).join("-");
		setGiftCardCode(formatted); // e.g. 1234-5678-9012-3456
		toast.success("Gift card code generated!");
	};



	return (
		<>
			<div className='bg-gray-100 flex '>

				<Toaster />
				<Sidebar />
				<div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >

					<Topbar />
					<GiftCardForm
						product={product}
						setProduct={setProduct}
						productName={productName}
						giftCardCode={giftCardCode}
						setGiftCardCode={setGiftCardCode}
						giftCardValue={giftCardValue}
						setGiftCardValue={setGiftCardValue}
						giftCardProduct={giftCardProduct}
						setGiftCardProduct={setGiftCardProduct}
						giftCardExpiryDate={giftCardExpiryDate}
						setGiftCardExoiryDate={setGiftCardExoiryDate}
						loading={loading}
						setLoading={setLoading}
						handleGiftCard={handleGiftCard}
						handleGenerateCode={handleGenerateCode}
					/>
				</div>
			</div>
		</>
	)
}

export default CreateGiftCard