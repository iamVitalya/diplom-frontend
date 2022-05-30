import { TypeOneCategoryAndSorting, TypeOneSushiServer } from "../types";

type GetDataInArraysType = {
  arrays: {
    sushiList: Array<TypeOneSushiServer>,
    categories: Array<TypeOneCategoryAndSorting>,
    sortingList: Array<TypeOneCategoryAndSorting>,
  };
}

type ReturnDataInArraysTypeType = {
  sushiList: Array<TypeOneSushiServer>;
  categories: Array<TypeOneCategoryAndSorting>;
  sortingList: Array<TypeOneCategoryAndSorting>
}

const updateDataInArrays = (state: GetDataInArraysType, actions: any): ReturnDataInArraysTypeType => {
  if (state === undefined) {
    return {
      sushiList: [],
      categories: [
        { id: 1, name: 'all', label: 'Все' },
        { id: 2, name: 'rolls', label: 'Роллы' },
        { id: 3, name: 'sets', label: 'Сеты' },
        { id: 4, name: 'sushi', label: 'Суши' },
        { id: 5, name: 'spice', label: 'Специи' },
      ],
      sortingList: [
        { id: 1, name: 'popularity', label: 'популярности' },
        { id: 2, name: 'prices', label: 'цене' },
        { id: 3, name: 'alphabet', label: 'алфавиту' }
      ]
    }
  }

  switch (actions.type) {
    case "SUSHI_LIST_LOADED":
      return {
        ...state.arrays,
        sushiList: actions.payload,
      }
    case "CATEGORY_READY":
      return {
        ...state.arrays,
        categories: actions.payload,
      }

    default:
      return state.arrays
  }
};

export default updateDataInArrays;