import React, { useEffect, useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import ProductLists from '../components/Products/ProductLists'
import { db } from '../firebase.config'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'

const ProductList = () => {
	const [productList, setProductList] = useState([]);
	const [allProducts, setAllProducts] = useState([]); // <-- original data
	const [activeTab, setActiveTab] = useState("All")

	const fetchProductList = async () => {
		try {
			setProductList([]);
			let q;

			if (["Archived", "Draft", "Active", "Published"].includes(activeTab)) {
				q = query(
					collection(db, "Product"),
					where("productStatus", "==", activeTab),
					orderBy("createdAtDate", "desc")
				);
			} else {
				q = query(
					collection(db, "Product"),
					orderBy("createdAtDate", "desc")
				);
			}

			const querySnapshot = await getDocs(q);
			const products = [];
			querySnapshot.forEach((doc) => {
				products.push({ id: doc.id, ...doc.data() });
			});

			setAllProducts(products);
			setProductList(products);

		} catch (error) {
			if (error.code === 'failed-precondition' || error.code === 'permission-denied') {
				console.error("⚠️ Firestore requires a composite index for this query.");
				console.error("👉 Follow this link to create it in the Firebase Console:", error.message);
			} else {
				console.error("❌ Error fetching products:", error);
			}
		}
	};

	console.log(productList)
	const handleStatusChange = async (id, newStatus) => {
		try {
			const productRef = doc(db, "Product", id);
			await updateDoc(productRef, {
				productStatus: newStatus
			});

			setProductList((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, productStatus: newStatus } : item
				)
			);

			// Keep allProducts in sync too
			setAllProducts((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, productStatus: newStatus } : item
				)
			);
		} catch (error) {
			console.error("Error updating product status:", error);
		}
	};

	useEffect(() => {
		fetchProductList();
	}, [activeTab]);

	const filterBySearch = (event) => {
		const query = event.target.value.toLowerCase();

		if (query === "") {
			setProductList(allProducts); // Reset from original
		} else {
			const filtered = allProducts.filter((item) =>
				item?.id.toLowerCase().includes(query) ||
				item?.productSku?.toLowerCase().includes(query) // optional extra field
			);
			setProductList(filtered);
		}
	};
	const deleteOrder = async (id) => {
		await deleteDoc(doc(db, "Product", id))
		toast.success("Product Deleted")
		window.location.reload()
	}

	return (
		<>
			<ToastContainer />
			<div className='bg-gray-100 flex'>
				<Sidebar />
				<div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col'>
					<Topbar />
					<ProductLists
						deleteOrder={deleteOrder}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						filterBySearch={filterBySearch}
						handleStatusChange={handleStatusChange}
						productList={productList}
					/>
				</div>
			</div>
		</>
	)
}

export default ProductList
