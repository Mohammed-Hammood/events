import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, EffectFade } from "swiper";
import { EventTypes } from "types";
import { Event } from "components";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";


interface SwiperProps {
	events: EventTypes[];
}

const SwiperElement = ({ events }: SwiperProps) => {

	return (
		<Swiper
			breakpoints={{
				360: {
					slidesPerView: "auto",
					pagination: {
						clickable: true,
						type: "bullets",
					},
				},
				768: {
					spaceBetween: 10,
					slidesPerView: 2,
					pagination: {
						type: "custom",
					},
				},
				1024: {
					spaceBetween: 30,
					slidesPerView: 3,
					pagination: {
						type: "custom",
					},
				},
			}}
			pagination
			grabCursor
			navigation
			modules={[FreeMode, Navigation, Pagination, EffectFade]}
			className={"card__swiper"}
		>
			{events.map(item => {
				return (
					<SwiperSlide key={item.id}>
						<Event event={item as EventTypes} />
					</SwiperSlide>
				)
			}
			)}
		</Swiper>
	);
};

export default SwiperElement;