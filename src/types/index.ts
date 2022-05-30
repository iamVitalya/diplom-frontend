export type TypeOneCategoryAndSorting = {
  id: number,
  label: string,
  name: string
};

export type TypeOneSushiServer = {
  id: number,
  amount: number
  category: string
  composition: Array<string | null | undefined>,
  currency: number,
  imageUrl: string
  name: string
  popularity: number
  price: number,
  onAddedToCart?: any,
  countInCart: number
};

export type TypeRequestService = {
  sushiShopService: {
    GET_DATA_URL: string,
    getData(): {
      then(p: (data: TypeOneSushiServer) => any): Array<TypeOneSushiServer>
    }
  },
  getData(): any;
}

export type TypeSushiListProps = {
  sushiList: Array<TypeOneSushiServer>,
  sushiListLoaded: any
  currentCategory: string,
  currentSorting: string
};

export type TypeOneItemInCart = {
  buyAmount: number,
  currency: string | number,
  id: number,
  imageUrl: string,
  name: string,
  totalPrice: number
  composition: Array<string | null | undefined>
}
