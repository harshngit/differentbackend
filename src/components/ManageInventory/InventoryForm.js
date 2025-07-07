import React, { useEffect, useState } from 'react'
import {
	Button,
	Dialog,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Select,
	Option,
	Textarea,

} from "@material-tailwind/react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase.config';
import toast from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

const InventoryForm = ({ inventoryManage, setinventoryManage, refreshProducts, handleInventoryModal, selectedProductId }) => {

	const [productDetails, setProductDetails] = useState({});
	const [quantity, setQuantity] = useState('');
	const [inventoryStatus, setInventoryStatus] = useState('');
	const [variation, setVariantion] = useState([])

	// Fetch single product
	useEffect(() => {
		if (!selectedProductId) return;

		const unsubscribe = onSnapshot(doc(db, "Product", selectedProductId), (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data();
				setProductDetails(data);
				setQuantity(data?.productQuantity || '');
				setInventoryStatus(data?.productInventoryStatus || '');
				setVariantion(data?.variation || []);
			}
		});

		return () => unsubscribe();
	}, [selectedProductId]);

	// Handle update
	const handleUpdateInventory = async () => {
		if (!selectedProductId) return;
		try {
			const productRef = doc(db, "Product", selectedProductId);
			await updateDoc(productRef, {
				productQuantity: Number(quantity),
				productInventoryStatus: inventoryStatus,
				variation: variation || [],
			});
			toast.success("Inventory updated successfully!");
			setinventoryManage(false);

			// ✅ Refresh inventory list
			if (refreshProducts) {
				refreshProducts();
			}
		} catch (err) {
			console.error("Update failed:", err);
			alert("Failed to update inventory");
		}
	};


	return (
		<>
			<ToastContainer />
			<div>
				<div>
					<Dialog
						size="md"
						open={inventoryManage}
						handler={handleInventoryModal}
						className="bg-transparent  shadow-none"
					>
						<Card className="lg:mx-auto  relative    w-full ">
							<div className='px-6 pt-4 flex items-center justify-between' >
								<div className='' >
									<h3 className='text-[1.4rem] font-[GilroyBold]' >Manage Inventory</h3>
								</div>
								<div
									onClick={() => setinventoryManage(!inventoryManage)}
									className=" cursor-pointer w-[40px] h-[40px]" >
									<XMarkIcon className='w-[30px]' />
								</div>
							</div>
							<CardBody className="h-[250px] mt-4 overflow-y-scroll ">
								<div className='flex gap-2 justify-center items-center'>
									<Input
										label='Name Of Product'
										disabled
										value={productDetails?.productName || ''}
										className='w-[50%]'
									/>

									<Input
										label='Update Inventory'
										type='number'
										value={quantity}
										onChange={(e) => setQuantity(e.target.value)}
										className='w-[50%]'
									/>
								</div>
								<div className='flex gap-2 mt-5 justify-center items-center'>
									<Select
										label='Choose Inventory Status'
										value={inventoryStatus}
										onChange={(val) => setInventoryStatus(val)}
									>
										<Option value="Available">Available</Option>
										<Option value="Unavailable">Unavailable</Option>
										<Option value="Committed">Committed</Option>
									</Select>
								</div>

								<div className='mt-5'>
									<h2 className='text-[1.4rem] font-[GilroyBold] mb-3'>Variants</h2>
									{variation?.map((variant, index) => (
										<div key={variant.id} className='mb-4 border p-3 rounded-lg'>
											<div className='flex justify-between items-center'>
												<Typography className='font-medium'>{variant.label}</Typography>
											</div>
											<div className='flex gap-2 mt-2'>
												<Input
													label='Quantity'
													type='number'
													value={variant.quantity}
													onChange={(e) => {
														const updated = [...variation];
														updated[index].quantity = Number(e.target.value);
														setVariantion(updated);
													}}
												/>
												<Select
													label='Status'
													value={variant.status}
													onChange={(val) => {
														const updated = [...variation];
														updated[index].status = val;
														setVariantion(updated);
													}}
												>
													<Option value="Available">Available</Option>
													<Option value="Unavailable">Unavailable</Option>
													<Option value="Committed">Committed</Option>
												</Select>
											</div>
										</div>
									))}

								</div>

							</CardBody>
							<CardFooter>
								<Button onClick={handleUpdateInventory}>Update Inventory</Button>
							</CardFooter>
						</Card>
					</Dialog>
				</div>
			</div>
		</>
	)
}

export default InventoryForm