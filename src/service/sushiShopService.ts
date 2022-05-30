export default class SushiShopService {
  GET_DATA_URL: string = 'https://react-sushi-shop.firebaseio.com/sushi-shop.json';
  GET_DATA_URL_PROD: string = 'http://localhost:5000/api/product';

  async getData() {
    const response = await fetch(this.GET_DATA_URL);
    const responseProd = await fetch(this.GET_DATA_URL_PROD, { method: 'get' });

    if (response.ok) {
      const json = await response.json();
      const jsonProd = await responseProd.json();

      return jsonProd;
    }
  }
}


