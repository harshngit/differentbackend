import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/Layout/Sidebar'
import Topbar from '../components/Layout/Topbar'
import InventoryList from '../components/ManageInventory/InventoryList'
import { db } from '../firebase.config'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import InventoryForm from '../components/ManageInventory/InventoryForm'

const ManageInventory = () => {
	const [productList, setProductList] = useState([]);
	const [allProducts, setAllProducts] = useState([]); // <-- original data
	const [activeTab, setActiveTab] = useState("All");
	const [inventoryManage, setinventoryManage] = useState(false)
	const [selectedProductId, setSelectedProductId] = useState(null);

	const fetchProductList = async () => {
		try {
			setProductList([]);
			let q;

			if (["Unavailable", "Committed", "Available",].includes(activeTab)) {
				q = query(
					collection(db, "Product"),
					where("productInventoryStatus", "==", activeTab),
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

	const handleInventoryModal = (id) => {
		setSelectedProductId(id);
		setinventoryManage(!inventoryManage)
	}






	return (
		<div className='bg-gray-100 flex'>
			<Sidebar />
			<InventoryForm inventoryManage={inventoryManage} setSelectedProductId={setSelectedProductId} selectedProductId={selectedProductId} setinventoryManage={setinventoryManage} handleInventoryModal={handleInventoryModal} refreshProducts={fetchProductList} />
			<div className='h-[96vh] overflow-y-scroll flex flex-1 flex-col'>
				<Topbar />
				<InventoryList
					handleInventoryModal={handleInventoryModal}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					filterBySearch={filterBySearch}
					handleStatusChange={handleStatusChange}
					productList={productList}
					refreshProducts={fetchProductList}
				/>
			</div>
		</div>
	)
}

export default ManageInventory