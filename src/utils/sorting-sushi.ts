import { TypeOneSushiServer } from "../types";

export function sortingSushi (sushiList: any, currentSorting: string) {
  switch (currentSorting) {
    case 'популярности':
      return sushiList.sort((prev: TypeOneSushiServer, next: TypeOneSushiServer) => prev.popularity - next.popularity);

    case 'цене':
      return sushiList.sort((prev: TypeOneSushiServer, next: TypeOneSushiServer) => prev.price - next.price);

    case 'алфавиту':
      return sushiList.sort((prev: TypeOneSushiServer, next: TypeOneSushiServer) => {
        if ( prev.name < next.name ) return -1;
        if ( prev.name < next.name ) return 1;
        return prev && next;
      });

    default:
      return sushiList;
  }
}
