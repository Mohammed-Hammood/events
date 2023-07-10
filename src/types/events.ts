export enum Category {
	sport = "Спорт",
	science = "Наука",
	cinema = "Кино",
	literature = "Литература",
	music = "Музыка",
	oscar = "Оскар",
	theatre = "Театр",
	NobelPrize = "Нобелевская премия"
}

export type EventTypes = {
	id: number;
	year: number;
	category: Category;
	description: string;
}

export type CategoryTypes = {
	id: number;
	name: Category
	startYear: number;
	endYear: number;
}