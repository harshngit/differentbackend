import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sidebar } from '../components/Layout/Sidebar'
import Topbar from '../components/Layout/Topbar'
import ViewProducts from '../components/ViewProducts/ViewProducts'
import { db } from '../firebase.config'
import { doc, onSnapshot } from 'firebase/firestore'

const ViewProductsDetails = () => {
	const { id } = useParams()

	const [productDetails, setproductDetails] = useState({})
	const fetchProductDetail = () => {

		onSnapshot(doc(db, "Product", id), (doc) => {
			const data = doc.data()
			setproductDetails(data)
		});
	}
	console.log(productDetails)

	useEffect(() => {
		fetchProductDetail()
	}, [])


	return (
		<div className='bg-gray-100 flex'>
			<Sidebar />
			<div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col'>
				<Topbar />
				<ViewProducts productDetails={productDetails} />
			</div>
		</div>
	)
}

export default ViewProductsDetails