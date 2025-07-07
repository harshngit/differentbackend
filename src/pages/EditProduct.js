import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase.config';
import toast from 'react-hot-toast';
import { uploadBytesResumable, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import EditProductForm from '../components/EditProduct/EditProductForm';

const EditProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [productName, setProductName] = useState("");
	const [sizeInput, setSizeInput] = useState('');
	const [productSkuDetails, setProductSkuDetails] = useState("manual");
	const [productSku, setProductSku] = useState("");
	const [productImg, setProductImg] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productColor, setproductColor] = useState("")
	const [productDescription, setProductDescription] = useState("");
	const [productMaterial, setProductMaterial] = useState("");
	const [productDeliveryPayment, setProductDeliveryPayment] = useState("");
	const [productMetaTitle, setProductMetaTitle] = useState("");
	const [productMetaDescription, setProductMetaDescription] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productType, setProductType] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productSize, setProductSize] = useState([]);
	const [productQuantity, setproductQuantity] = useState("");
	const [variationData, setvariationData] = useState({
		size: [],
		color: "",
		price: "",
		quantity: "",
		img: "",
		status: "Available"
	});
	const [uploading, setUploading] = useState(false);
	const [variation, setVariation] = useState([]);
	const [productVideo, setProductVideo] = useState("");
	const [uploadingVideo, setuploadingVideo] = useState(false)

	const handleEditProduct = async () => {
		setLoading(true);

		if (!productName.trim()) return toast.error("Please fill Product Name"), setLoading(false);
		if (productImg.length === 0) return toast.error("Please Upload Image"), setLoading(false);
		if (!productDescription.trim()) return toast.error("Please fill Product Description"), setLoading(false);
		if (!productMetaTitle.trim()) return toast.error("Please fill Product Meta Title"), setLoading(false);
		if (!productMetaDescription.trim()) return toast.error("Please fill Product Meta Description"), setLoading(false);
		if (!productCategory.trim()) return toast.error("Please fill Product Category"), setLoading(false);
		if (!productType.trim()) return toast.error("Please fill Product Type"), setLoading(false);
		if (!productPrice.trim()) return toast.error("Please fill Product Price"), setLoading(false);
		if (productSize.length === 0) return toast.error("Please add at least one product size") || setLoading(false);
		if (!productMaterial.trim()) return toast.error("Please fill Product Material"), setLoading(false);
		if (!productDeliveryPayment.trim()) return toast.error("Please fill Product Delivery Payment"), setLoading(false);
		if (!productQuantity.trim()) return toast.error("Please fill Product Quantity"), setLoading(false);

		const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
		const randomSuffix = Math.floor(10000 + Math.random() * 90000);
		const productID = `${dateStr}${randomSuffix}`;
		const sku = `SKU-${productID}`;
		const date = new Date();
		const uploadedImageUrls = [];

		for (let i = 0; i < productImg.length; i++) {
			const imageFile = productImg[i].file;
			if (imageFile) {
				const imageRef = storageRef(storage, `productImages/${productID}-${i}`);
				await uploadBytes(imageRef, imageFile);
				const downloadURL = await getDownloadURL(imageRef);
				uploadedImageUrls.push(downloadURL);
			} else if (productImg[i].data_url) {
				uploadedImageUrls.push(productImg[i].data_url);
			} else {
				uploadedImageUrls.push(productImg[i]);
			}
		}

		await updateDoc(doc(db, "Product", id), {
			createdAtDate: date,
			productSku: productSkuDetails === "automatic" ? sku : productSku,
			productName,
			productImages: uploadedImageUrls,
			productDescription,
			productMaterial,
			productDeliveryPayment,
			productMetaTitle,
			productPrice,
			productSize,
			productVideo,
			productQuantity,
			productMetaDescription,
			productCategory,
			productType,
			variation,
		});

		toast.success("Product Updated successfully!");
		setTimeout(() => navigate("/products"), 1000);
		setLoading(false);
	};

	const addProductVideo = (e) => {
		e.preventDefault();
		const file = e.target[0]?.files[0];
		if (!file) return;

		setUploading(true);
		const storeRef = storageRef(storage, `productVideos/${file.name}`);
		const uploadTask = uploadBytesResumable(storeRef, file);

		uploadTask.on(
			"state_changed",
			() => { },
			(error) => {
				alert("Video upload error: " + error);
				setUploading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setProductVideo(downloadURL);
					setUploading(false);
					toast.success("Video Update")
				});
			}
		);
	};

	const addImageVariant = (e) => {
		e.preventDefault();
		const file = e.target[0]?.files[0];
		if (!file) return;
		setUploading(true);
		const storeRef = storageRef(storage, `imagevariant/${file.name}`);
		const uploadTask = uploadBytesResumable(storeRef, file);

		uploadTask.on(
			"state_changed",
			() => { },
			(error) => alert(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setvariationData((prev) => ({ ...prev, img: downloadURL }));
					setUploading(false);
					toast.success("Image Updated")
				});
			}
		);
	};

	const handlevariant = () => {
		setVariation([...variation, {
			size: variationData.size,
			color: variationData.color,
			price: Number(variationData.price),
			quantity: Number(variationData.quantity),
			img: variationData.img,
			status: variationData.status
		}]);
		setvariationData({
			size: [],
			color: "",
			price: "",
			quantity: "",
			img: "",
			status: "Available"
		});
	};

	useEffect(() => {
		onSnapshot(doc(db, "Product", id), (docSnap) => {
			const data = docSnap.data();
			if (data) {
				setProductCategory(data.productCategory);
				setProductDescription(data.productDescription);
				const formattedImages = (data.productImages || []).map((img) => {
					if (typeof img === 'string') return { data_url: img };
					return img;
				});
				setProductImg(formattedImages);
				setProductMetaDescription(data.productMetaDescription);
				setProductMetaTitle(data.productMetaTitle);
				setProductPrice(data.productPrice);
				setproductQuantity(data.productQuantity);
				setProductSku(data.productSku);
				setProductType(data.productType);
				setProductName(data.productName);
				setProductSize(data.productSize);
				setVariation(data.variation);
				setProductMaterial(data.productMaterial);
				setProductDeliveryPayment(data.productDeliveryPayment);
				setProductVideo(data.productVideo);
			}
		});
	}, []);

	return (
		<div className='bg-gray-100 flex'>
			<Sidebar />
			<div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col'>
				<Topbar />
				<EditProductForm
					setproductColor={setproductColor}
					productColor={productColor}
					sizeInput={sizeInput}
					setSizeInput={setSizeInput}
					addProductVideo={addProductVideo}
					productVideo={productVideo}
					setProductVideo={setProductVideo}
					setProductMaterial={setProductMaterial}
					productMaterial={productMaterial}
					setProductDeliveryPayment={setProductDeliveryPayment}
					productDeliveryPayment={productDeliveryPayment}
					uploading={uploading}
					addImageVariant={addImageVariant}
					variation={variation}
					setVariation={setVariation}
					variationData={variationData}
					setvariationData={setvariationData}
					handlevariant={handlevariant}
					productPrice={productPrice}
					productSize={productSize}
					productQuantity={productQuantity}
					setProductPrice={setProductPrice}
					setProductSize={setProductSize}
					setproductQuantity={setproductQuantity}
					productSkuDetails={productSkuDetails}
					setProductSkuDetails={setProductSkuDetails}
					productSku={productSku}
					setProductSku={setProductSku}
					loading={loading}
					setLoading={setLoading}
					productName={productName}
					setProductName={setProductName}
					productImg={productImg}
					setProductImg={setProductImg}
					productDescription={productDescription}
					setProductDescription={setProductDescription}
					productMetaTitle={productMetaTitle}
					setProductMetaTitle={setProductMetaTitle}
					productMetaDescription={productMetaDescription}
					setProductMetaDescription={setProductMetaDescription}
					productCategory={productCategory}
					setProductCategory={setProductCategory}
					productType={productType}
					setProductType={setProductType}
					handleEditProduct={handleEditProduct}
					uploadingVideo={uploadingVideo}
				/>
			</div>
		</div>
	);
};

export default EditProduct;
