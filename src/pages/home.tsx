import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CategoryButton, SwiperElement, Loader, ICON } from "components";
import { useSelector } from "react-redux";
import { selectEventsByFilters, setActiveCategory, useAppDispatch } from "store";
import { categories } from "utils/categories";
import { CategoryTypes } from "types";
import { useFetch } from "hooks";
import { gsap } from 'gsap';
import "styles/home.scss";


export default function HomePage(): JSX.Element {
    const { loading } = useFetch();
    const { events, activeCategory } = useSelector(selectEventsByFilters);
    const [startYear, setStartYear] = useState<number>(2015);
    const [endYear, setEndYear] = useState<number>(2022);
    const dispatch = useAppDispatch();

    const [degree, setDegree] = useState<number>(
        360 - (360 / categories.length) * categories.length + 360 / categories.length
    );

    const nodeRef = useRef<HTMLDivElement>(null);

    const tl = useRef<GSAPTimeline>(); // timeline 

    const getCategoryButtonDegree = ({ index }: { index: number }): number => {

        if (index === 0) return degree;

        let newDegree = degree;

        for (let i = 0; i < index; i++) {
            newDegree += 356 / categories.length;
        }

        return newDegree;
    }
    const shiftCategory = (direction: "prev" | "next"): void => {
        // 1 = next category
        // -1 = previous category
        const index = direction === 'next' ? 1 : -1;

        const category = categories.find(item => item.id === (activeCategory.id + index));

        if (category) {

            dispatch(setActiveCategory({ category }));
        }
    }
    useEffect(() => {
        const updateYears = () => {
            //destruct the useRef hook which saves the start and end events years.
            const { startYear: startY, endYear: endY } = activeCategory;

            const time = 300 / Math.abs(startY - startYear);

            let interval = setTimeout(() => {
                //keeps updating the start and end years untill they become equal to start and end years of activeCategory .
                if (startY !== startYear) setStartYear(y => y > startY ? y - 1 : y + 1);

                if (endY !== endYear) setEndYear(y => y > endY ? y - 1 : y + 1);
            }, time);

            return () => clearTimeout(interval);

        };
        updateYears();

        const r = 389.4 - (358 / categories.length) * activeCategory.id + (358 / categories.length);
        setDegree(r);


    }, [events, startYear, activeCategory, endYear, setEndYear, setStartYear, setDegree]);

    useLayoutEffect(() => {
        // if condition to avoid fix the warning in console because useLayoutEffect is executed before the DOM is painted. 
        if (document.querySelector('.swiper-wrapper')) {

            let ctx = gsap.context(() => {
                tl.current = gsap.timeline()
                    .from([".swiper-wrapper", ".CategoryNameMobileOnly"], { opacity: 0, duration: 1, y: 20 })
                    .to([".swiper-wrapper", ".CategoryNameMobileOnly"], { opacity: 1, duration: 1, delay: 10, y: 0 })

            }, nodeRef)

            return () => ctx.revert();
        }

    }, [events])
    return (
        <main>
            <div className="center-content">
                <div className="card">
                    <div className={"card__body"}>
                        <h1 className={"card__body__title"}>
                            Исторические <br /> даты
                        </h1>
                        <div className={"card__body__years"}>
                            <div className={"card__body__years__years"}>
                                <div className="startYear">{startYear}</div>
                                <div className="endYear">{endYear} </div>
                            </div>
                            <div className={"card__body__years__circle"}>
                                {categories.map((item, index: number) => {
                                    return (
                                        <CategoryButton
                                            active={activeCategory.id === item.id}
                                            key={item.id}
                                            degree={getCategoryButtonDegree({ index })}
                                            category={item}
                                            setCategory={(category: CategoryTypes) => dispatch(setActiveCategory({ category }))}
                                            {...{ startYear }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className={"card__events"}>
                        <div className={"card__events__categoriesCount"}>
                            {activeCategory.id < 10 ? `0${activeCategory.id}` : activeCategory.id}/
                            {categories.length < 10 ? `0${categories.length}` : categories.length}
                        </div>
                        <div className={"card__events__sliderButtons"}>
                            <button
                                disabled={activeCategory.id === 1}
                                onClick={() => shiftCategory('prev')}
                            >
                                <ICON name="angle-left" />
                            </button>
                            <button
                                disabled={activeCategory.id === categories.length}
                                onClick={() => shiftCategory('next')}
                            >
                                <ICON name="angle-right" />
                            </button>
                        </div>
                    </div>
                    <div className={"card__swiper"}>
                        <div ref={nodeRef} className="card__swiper__wrapper">
                            <div className="CategoryNameMobileOnly">
                                {activeCategory.name}
                            </div>
                            {loading ? <Loader size={80} /> : <SwiperElement events={events} />}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

