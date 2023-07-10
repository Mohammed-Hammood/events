import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { CategoryButton, SwiperElement, Loader, ICON } from "components";
import "styles/transition.scss";
import "styles/home.scss";
import { useSelector } from "react-redux";
import { selectEventsByFilters, setActiveCategory, useAppDispatch } from "store";
import { categories } from "utils/categories";
import { CategoryTypes } from "types";
import { useFetch } from "hooks";


export default function HomePage(): JSX.Element {
    const { loading } = useFetch();
    const { events, activeCategory } = useSelector(selectEventsByFilters)
    const [startYear, setStartYear] = useState<number>(2015);
    const [endYear, setEndYear] = useState<number>(2022);
    const [inProp, setInProp] = useState(false);
    const dispatch = useAppDispatch();
    const [degree, setDegree] = useState<number>(
        360 - (360 / categories.length) * categories.length + 360 / categories.length
    );
    const nodeRef = useRef(null); //to avoid defaulting to ReactDOM.findDOMNode, which is deprecated in StrictMode 
    const getCategoryButtonDegree = ({ index }: { index: number }): number => {
        if (index === 0) return degree
        let newDegree = degree;
        for (let i = 0; i < index; i++) {
            newDegree += 356 / categories.length;
        }
        return newDegree;
    }
    const shiftCategory = (direction: "prev" | "next"): void => {
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

                if (startY !== startYear) setStartYear(y => y > startY ? y - 1 : y + 1);

                if (endY !== endYear) setEndYear(y => y > endY ? y - 1 : y + 1);
            }, time);

            return () => clearTimeout(interval);

        };
        updateYears();

        const r = 389.4 - (358 / categories.length) * activeCategory.id + (358 / categories.length);
        setDegree(r);

        setInProp(false)

    }, [inProp, setInProp, events, startYear, activeCategory, endYear, setEndYear, setStartYear, setDegree]);

    if (loading) return (<Loader size={100} />)
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
                        <div className="card__body__activeCategoryMobile">
                            {activeCategory.name}
                        </div>
                    </div>

                    <div className={"card__events"}>
                        <div className={"card__events__categoriesCount"}>
                            {activeCategory.id < 10 ? `0${activeCategory.id}` : activeCategory.id}/
                            {categories.length < 10 ? `0${categories.length}` : categories.length}
                        </div>
                        <div className={"card__events__sliderButtons"}>
                            <button disabled={activeCategory.id === 1} onClick={() => shiftCategory('prev')} >
                                <ICON name="angle-left" />
                            </button>
                            <button disabled={activeCategory.id === categories.length} onClick={() => shiftCategory('next')}>
                                <ICON name="angle-right" />
                            </button>
                        </div>
                    </div>
                    <div className={"card__swiper"}> 
                        {events.length > 0 && <CSSTransition
                            nodeRef={nodeRef}
                            timeout={300}
                            in={inProp}
                            classNames={"card__swiper"}
                        >
                        {activeCategory && (
                            <div ref={nodeRef} className="card__swiper__wrapper">
                                <SwiperElement events={events} />
                            </div>
                        )}
                        </CSSTransition>}
                    </div>
                </div>
            </div>
        </main>
    );
};

