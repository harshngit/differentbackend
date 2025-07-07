import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../../../src/asset/banner/1.png';
import img2 from '../../../src/asset/banner/2.png';
import img3 from '../../../src/asset/banner/3.png';
import img4 from '../../../src/asset/banner/4.png';

const SwiperPhoto = () => {
	return (
		<div className="w-full h-screen">
			<Swiper
				effect="fade"
				// modules={[Navigation, EffectFade, Pagination, A11y, Autoplay]}
				slidesPerView={1}
				navigation
				// pagination={{ clickable: true }}
				loop={true}
				modules={[Autoplay]}
				autoplay={true}
				fadeEffect={{ crossFade: true }}
				speed={100} // Faster transition speed
				className="w-full h-full"
			>
				{[img1, img2, img3, img4].map((image, index) => (
					<SwiperSlide key={index}>
						<div className="flex items-center justify-center w-full h-screen">
							<img
								src={image}
								className="w-full h-full object-cover shadow-lg  transition-transform duration-300 ease-in-out transform hover:scale-105"
								alt={`Slide ${index + 1}`}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SwiperPhoto;
