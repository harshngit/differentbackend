import React, { useEffect, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

const LightBox = ({ productDetails }) => {
	const productImages = productDetails?.productImages || [];
	const variationImages = productDetails?.variation?.map(v => v.img) || [];
	const productVideo = productDetails?.productVideo || "";
	const allImages = [...productImages, ...variationImages];
	const allMedia = productVideo ? [...allImages, productVideo] : allImages;

	const [selectedMedia, setSelectedMedia] = useState(allMedia[0] || '');

	useEffect(() => {
		if (allMedia.length > 0) {
			setSelectedMedia(allMedia[0]);
		}
	}, [productDetails]);

	const isVideo = (file) => {
		const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
		return videoExtensions.some(ext => file?.toLowerCase().includes(ext));
	};

	return (
		<div className='flex flex-col-reverse md:flex-row gap-10 items-center justify-center'>
			<div className="flex justify-center items-center md:flex-col gap-4">
				{allMedia.map((media, index) => (
					<div
						key={index}
						onClick={() => setSelectedMedia(media)}
						className={`relative w-16 h-16 cursor-pointer border ${selectedMedia === media ? "border-black" : "border-gray-300"}`}
					>
						{isVideo(media) ? (
							<>
								<video src={media} className="w-full h-full object-cover" muted />
								<div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
									<FaPlayCircle className="text-white w-6 h-6" />
								</div>
							</>
						) : (
							<img
								src={media}
								alt={`Thumbnail ${index}`}
								className="w-full h-full object-cover "
							/>
						)}
					</div>
				))}
			</div>

			<div className="w-full max-w-md">
				{selectedMedia && (
					isVideo(selectedMedia) ? (
						<video
							src={selectedMedia}
							autoPlay
							className="w-full lg:h-[500px] h-[400px] object-cover "
						/>
					) : (
						<img
							src={selectedMedia}
							alt="Selected"
							className="w-full lg:h-[500px] h-[400px] object-cover "
						/>
					)
				)}
			</div>
		</div>
	);
};

export default LightBox;
