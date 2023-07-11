import React from 'react'
import { styled } from 'styled-components';
import { CategoryTypes } from 'types';


interface props {
	degree: number;
	category: CategoryTypes;
	setCategory: (category: CategoryTypes) => void;
	active: boolean;
	startYear: number;
}
type WrapperProps = {
	$active: boolean;
	$degree: number;
	$startYear: number
	$activeCategory: CategoryTypes;
}
const Wrapper = styled.div<WrapperProps>`
	position: absolute;
	left: 50%;
	bottom: 50%;
	width: 0;
	padding-bottom: 275px;
	transform: ${({ $degree }) => "rotate(" + $degree + "deg)"};
	transform-origin: 0% 100%;
	transition-duration: 1s;
	.category {
		min-height: 40px;
		min-width: 	40px;
		position: absolute;
		display:flex;
		justify-content: center;
		align-items: center;

		&__name {
			transform: rotate(-29deg);
			color: var(--blackBlue);
			font-size: 20px;
			font-weight: 700;
			line-height: 30px;
			animation: ${({ $startYear, $active, $activeCategory }) => $active && $activeCategory.startYear === $startYear ? 'CATEGORY_NAME 1s 1' : 'none'};
			display: ${({ $startYear, $active, $activeCategory }) => $active && $activeCategory.startYear === $startYear ? 'flex' : 'none'};
			position: absolute;
			margin-top: -68px;
			z-index: 1;
			margin-left: 154px;
			min-width: 121px;
			margin-bottom: 30px;
		}
		&__activeBtn, &__btn {
			width: 56px;
			height: 56px;
			margin-left: -20px;
			margin-top: -20px;
			border: 1px solid #303E5880;
			background-color: white;
			transform: ${({ $degree }) => "rotate(-" + $degree + "deg)"};
			border-radius: 50%;
			border-style: solid;
			border-width: 1px;
			display: flex;
			justify-content: center;
			align-items: center;
			&__activeBtn__categoryId {
			}
		}
		&__btn {
			cursor: pointer;
			width: 6px;
			height: 6px;
			background-color: #000000;
			transition: all 0.3s linear;
			
			&__categoryId {
				display: none;
			}
		}
	&:hover {
		cursor: pointer;
		.category__btn {
				width: 56px;
				height: 56px;
				margin-left: -25px;
				margin-top: -25px;
				background-color: white;
				&__categoryId {
					display: flex;
			}
		}
	}

@keyframes CATEGORY_NAME {
    0% {
        opacity: 0;
    }
    
    100% {
        opacity: 1;
    }
	}
 }
`
const CategoryButton = (props: props) => {
	const { degree, category, setCategory, active, startYear } = props;
	return (
		<Wrapper $degree={degree} $active={active} $startYear={startYear} $activeCategory={category}>
			<div className='category'>
				<div className={'category__name'}>{category.name}</div>
				<button onClick={() => setCategory(category)}
					className={active ? 'category__activeBtn' : 'category__btn'}
				>
					<span className={active ? 'category__activeBtn__categoryId' : 'category__btn__categoryId'}>
						{category.id}
					</span>
				</button>
			</div>
		</Wrapper>
	);
};

export default CategoryButton