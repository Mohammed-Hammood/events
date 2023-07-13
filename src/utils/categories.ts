import { Category, CategoryTypes } from "types";


// You can add more Categories but the ids should be sequentially e.g. 1, 2, 3, 4, 5, 6, 7, ... 
export const categories:CategoryTypes[] = [
    {
        id:1,
        name: Category.science,
        startYear: 2015,
        endYear: 2022
    },
    {
        id:2,
        name: Category.cinema,
        startYear: 1987,
        endYear: 1991
    },
    {
        id:3,
        name: Category.literature,
        startYear: 1992,
        endYear: 1997
    },
    {
        id:4,
        name: Category.theatre,
        startYear: 2006,
        endYear: 2014
    },
    {
        id:5,
        name: Category.music,
        startYear: 2010,
        endYear: 2020
    },
    {
        id:6,
        name: Category.oscar,
        startYear: 2004,
        endYear: 2009
    }
]
