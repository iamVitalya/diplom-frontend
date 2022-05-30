import {TypeOneSushiServer} from "../types";

export const filterCategorySushi = (sushiList: Array<TypeOneSushiServer>, currentCategory: string) => {
  if (currentCategory.length === 0 ||
    currentCategory === 'all') return sushiList;

  return sushiList.filter(item => {
    return item.category === currentCategory;
  });
}