import { Button, Input, Option, Radio, Select } from "@material-tailwind/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploading from "react-images-uploading";
import Variation from "../Create Product/Variation";

const EditProductForm = ({
	setSizeInput,
	sizeInput,
	uploading,
	variation,
	addImageVariant,
	setProductMaterial,
	productMaterial,
	setProductDeliveryPayment,
	productDeliveryPayment,
	setVariation,
	variationData,
	setvariationData,
	handlevariant,
	productName,
	setProductName,
	productImg,
	setProductImg,
	productDescription,
	setProductDescription,
	productMetaTitle,
	setProductMetaTitle,
	productMetaDescription,
	setProductMetaDescription,
	productCategory,
	setProductCategory,
	productType,
	setProductType,
	handleProduct,
	loading,
	setLoading,
	productSkuDetails,
	setProductSku,
	setProductSkuDetails,
	productSku,
	productPrice,
	handleEditProduct,
	productSize,
	productQuantity,
	setProductPrice,
	setProductSize,
	setproductQuantity,
	addProductVideo,
	productVideo,
	setProductVideo,
	setproductColor,
	productColor,
	uploadingVideo,
}) => {
	return (
		<div className="bg-[#fff] my-6 mx-6 rounded-lg py-5 px-5 h-[90vh] overflow-y-scroll">
			<h2 className="text-secondary font-bold text-[1.5rem]">Edit Product</h2>

			<div className="flex flex-col gap-5 mb-5 mt-5">
				<div className='w-[400px] my-2'>
					<Input
						value={productSku}
						onChange={(e) => setProductSku(e.target.value)}
						disabled={true}
						label='Enter SKU'
					/>
				</div>
			</div>

			<div className="flex gap-5 mb-5 mt-5">
				<div className="w-[40%]">
					<Input
						label="Product Name"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						placeholder="Enter Product Name"
					/>
				</div>

				<div className="w-[40%]">
					<Input
						type="number"
						label="Product Inventory"
						value={productQuantity}
						onChange={(e) => setproductQuantity(e.target.value)}
						placeholder="Enter Product Inventory"
					/>
				</div>
				<div className="w-[5%]">
					<Input
						type="color"
						label="Product Color"
						value={productColor}
						onChange={(e) => setproductColor(e.target.value)}
						placeholder="Enter Product Color"
					/>
				</div>

			</div>
			<div className="flex gap-5 mb-5 mt-5">
				<div className="w-1/2">
					<Input
						type="number"
						label="Product Price"
						value={productPrice}
						onChange={(e) => setProductPrice(e.target.value)}
						placeholder="Enter Product Price"
					/>
				</div>

				<div className="w-1/2">
					<div className="flex gap-2 mb-2">
						<Input
							type="text"
							value={sizeInput}
							label="Size"
							onChange={(e) => setSizeInput(e.target.value)}
							className="border border-gray-300 rounded px-3 py-1 !w-[90%]"
							placeholder="e.g. M or 38"
						/>
						<Button
							onClick={() => {
								if (sizeInput.trim() && !productSize.includes(sizeInput.trim())) {
									setProductSize([...productSize, sizeInput.trim()]);
									setSizeInput('');
								}
							}}
							className="bg-black text-white !w-[50%] px-3 py-1 rounded"
						>
							Add Size
						</Button>
					</div>

					{/* Show Added Sizes */}
					<div className="flex flex-wrap gap-2">
						{productSize.map((size, index) => (
							<div
								key={index}
								className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1"
							>
								{size}
								<button
									type="button"
									onClick={() => {
										const updatedSizes = productSize.filter((_, i) => i !== index);
										setProductSize(updatedSizes);
									}}
									className="text-red-600 hover:text-red-800"
								>
									×
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			<label className="font-medium text-[1rem] mb-8">Product Description</label>
			<ReactQuill value={productDescription} onChange={setProductDescription} className="w-full h-[20vh] mb-[60px]" />

			<label className="font-medium text-[1rem] mb-8">Product Material</label>
			<ReactQuill value={productMaterial} onChange={setProductMaterial} className="w-full h-[20vh] mb-[60px]" />

			<label className="font-medium text-[1rem] mb-8">Product Delivery Payment</label>
			<ReactQuill value={productDeliveryPayment} onChange={setProductDeliveryPayment} className="w-full h-[20vh] mb-[60px]" />

			<ImageUploading
				multiple
				value={productImg}
				onChange={setProductImg}
				dataURLKey="data_url"
			>
				{({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
					<div className="flex flex-col gap-3">
						<div className="flex gap-5">
							<Button type="button" className="px-4 py-2 text-white rounded" onClick={onImageUpload}>
								Select Images
							</Button>
							<Button type="button" className="px-4 py-2 text-white rounded" onClick={onImageRemoveAll}>
								Remove All
							</Button>
						</div>

						{imageList && (
							<div className="flex gap-3 mt-3 flex-wrap border border-gray-300 p-5 rounded">
								{imageList.map((image, index) => (
									<div key={index} className="relative">
										<img
											src={image.data_url}
											alt="preview"
											className="w-24 h-24 object-cover rounded-md border"
										/>
										<div className="flex gap-1 mt-1">
											<button type="button" className="text-xs bg-green-500 text-white px-2 py-1 rounded" onClick={() => onImageUpdate(index)}>
												Update
											</button>
											<button type="button" className="text-xs bg-red-500 text-white px-2 py-1 rounded" onClick={() => onImageRemove(index)}>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</ImageUploading>

			<div className="flex flex-col justify-start items-start">
				<h2 className="text-secondary font-bold text-[1.5rem] mt-5">Variant</h2>
				<div className="flex justify-start items-center flex-col">
					<Variation
						uploading={uploading}
						variation={variation}
						addImageVariant={addImageVariant}
						setVariation={setVariation}
						variationData={variationData}
						setvariationData={setvariationData}
						handlevariant={handlevariant}
					/>
				</div>
			</div>

			<h2 className="text-secondary font-bold text-[1.5rem] mt-5">Meta</h2>
			<Input className="mb-[20px]" value={productMetaTitle} onChange={(e) => setProductMetaTitle(e.target.value)} label="Meta Title" />
			<ReactQuill value={productMetaDescription} onChange={setProductMetaDescription} className="w-full h-[30vh] mb-[60px] mt-[20px]" />

			<div className="flex gap-5 mt-8">
				<div className="w-[30%]">
					<label className="font-medium text-[1rem] mb-1">Product Category</label>
					<Select value={productCategory} onChange={(val) => setProductCategory(val)}>
						<Option value="For Him">For Him</Option>
						<Option value="For Her">For Her</Option>
						<Option value="Signature">Signature</Option>
						<Option value="Arabic">Arabic</Option>
					</Select>
				</div>
				<div className="w-[30%]">
					<label className="font-medium text-[1rem] mb-1">Product Type</label>
					<Select value={productType} onChange={(val) => setProductType(val)}>
						<Option value="Oversized">OverSized</Option>
						<Option value="Polo T-shirt">Polo T-shirt</Option>
					</Select>
				</div>
				<div className="w-[30%]">
					<form onSubmit={addProductVideo} className='form flex items-center flex-col justify-center gap-2 my-2'>
						<input type='file' accept=".mp4" />
						<Button type="submit" disabled={uploading}>
							{uploading ? "Uploading..." : "Upload Video"}
						</Button>
						{productVideo ? (
							<video loop autoPlay controls src={productVideo} className="mt-2" />
						) : (
							<h2>No video Found</h2>
						)}
					</form>
				</div>
			</div>

			<div className="flex justify-end mt-5">
				<Button onClick={handleEditProduct} disabled={loading}>
					{loading ? "Updating.." : "Update Product"}
				</Button>
			</div>
		</div>
	);
};

export default EditProductForm;
