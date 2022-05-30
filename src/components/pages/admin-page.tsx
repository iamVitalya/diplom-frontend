import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import styles from './AdminPage.module.scss';
import useHttp from "../../hook/http";
import {AuthContext} from '../context/auth';
import TextField from '../textfield';
import Select from "../select";

const RegComponent: React.FC = () => {
  const [userList, setUserList] = useState([]);
  const [userUpdate, setUserUpdate] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    isAdmin: false
  });
  const {token} = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();

  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUserList(fetched)
    } catch (e) {
    }
  }, [token, request])

  useEffect(() => {
    fetchUser()
  }, [fetchUser, userUpdate])

  useEffect(() => {
    const timeout = setTimeout(() => clearError(), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target?.name]: event.target.value
    })
  }

  const registerHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      // @ts-ignore
      const data = await request('/api/auth/register', 'POST', {...form}, {
        Authorization: `Bearer ${token}`
      });

      setForm({
        email: '',
        password: '',
        isAdmin: false
      })

      setUserUpdate(prevState => !prevState);
    } catch (e) {
    }
  }

  const removeItemHandler = async (id: string) => {
    try {
      // @ts-ignore
      const data = await request(`/api/user/${id}/delete`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      });
      setUserUpdate(prevState => !prevState);
    } catch (e) {
    }
  }

  // @ts-ignore
  return (
    <div className={styles.d_flex}>
      <div className={styles.d_flex__item_l}>
        <form>
          {error && (
            <>
              <div style={{
                color: 'red',
                fontSize: '14px',
                padding: '15px 0',
                borderBottom: '1px solid'
              }}>
                {String(error)}
              </div>
              <br/>
            </>
          )}

          <div>
            <label htmlFor="email" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Почта</label>
            <TextField
              placeholder="Введите почту"
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
            />
          </div>
          <br/>
          <div>
            <label htmlFor="password" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Пароль</label>
            <TextField
              placeholder="Введите пароль"
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
            />
          </div>
          <br/>
          <br/>
          <div>
            <button
              className="button sushi-list-item__button"
              style={{
                padding: '10px 20px',
                margin: '0',
                minHeight: '50px',
              }}
              disabled={loading}
              onClick={registerHandler}
              type="button"
            >
              <span
                className="sushi-list-item__main">Регистрация</span>
            </button>
          </div>
        </form>
      </div>
      <div className={styles.d_flex__item_r}>
        {!userList.length ?
          (
            <>
              Список пуст
            </>
          )
          :
          (
            <div className={styles.table}>
              <table>
                <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>email</th>
                  <th>role</th>
                  <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((user: any, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{user.roles[0]}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeItemHandler(user._id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  )
};

const ProductComponent: React.FC = () => {
  const [productList, setProductList] = useState([]);
  const [form, setForm] = useState({
    id: Date.now(),
    amount: 1,
    category: 'rolls',
    composition: null,
    currency: '₽',
    imageUrl: null,
    name: null,
    popularity: 1,
    price: null,
  });
  const [productUpdate, setProductUpdate] = useState(false);
  const {token} = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();

  const fetchProduct = useCallback(async () => {
    try {
      const fetched = await request('/api/product', 'GET', null, {
        Authorization: `Bearer ${token}`
      })

      fetched[0].edit = false;

      setProductList(fetched)
    } catch (e) {
    }
  }, [token, request])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct, productUpdate])

  useEffect(() => {
    const timeout = setTimeout(() => clearError(), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target?.name]: event.target.value
    })
  }

  const createHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const payload = {
        ...form,
        // @ts-ignore
        composition: form.composition.split(',')
      }

      // @ts-ignore
      delete payload.edit;

      // @ts-ignore
      const data = await request('/api/product/create', 'POST', payload, {
        Authorization: `Bearer ${token}`
      });

      setForm({
        id: Date.now(),
        amount: 1,
        category: 'rolls',
        composition: null,
        currency: '₽',
        imageUrl: null,
        name: null,
        popularity: 1,
        price: null,
      })

      setProductUpdate(prevState => !prevState);
    } catch (e) {
    }
  }

  const updateHandler = async (event: React.MouseEvent, id: string) => {
    event.preventDefault();

    try {
      const payload = [...productList];

      payload.map(item => {
        // @ts-ignore
        delete item.edit
        return item;
      });

      // @ts-ignore
      const data = await request(`/api/product/${ id }/update`, 'PUT', payload, {
        Authorization: `Bearer ${token}`
      });

      setProductUpdate(prevState => !prevState);
    } catch (e) {
    }
  }

  const editItemHandler = (id: string) => {
    const payload = productList.map(item => {
      // @ts-ignore
      if(item._id === id) {
        // @ts-ignore
        item.edit = !item.edit;

        return item;
      }

      return item;
    });

    setProductList(payload)
  }

  const changeItemHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string | number) => {
    const payload = productList.map(item => {
      // @ts-ignore
      if(item._id === id) {
        // @ts-ignore
        item[event.target?.name] = event.target.value;

        return item;
      }

      return item;
    });

    setProductList(payload);
  }

  const removeItemHandler = async (id: string) => {
    try {
      // @ts-ignore
      const data = await request(`/api/product/${id}/delete`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      });
      setProductUpdate(prevState => !prevState);
    } catch (e) {
    }
  }


  return (
    <div className={styles.d_flex}>
      <div className={styles.d_flex__item_l}>
        <form>
          {error && (
            <>
              <div style={{
                color: 'red',
                fontSize: '14px',
                padding: '15px 0',
                borderBottom: '1px solid'
              }}>
                {String(error)}
              </div>
              <br/>
            </>
          )}

          <div>
            <label htmlFor="email" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Категория</label>
            {/* @ts-ignore*/}
            <Select onChange={changeHandler}
                    placeholder="Введите категорию"
                    id="category"
                    name="category"
                    value={form.category}
            >
              <option value="rolls">Роллы</option>
              <option value="sushi">Суши</option>
              <option value="spice">Специи</option>
              <option value="sets">Сеты</option>
              <option value="other">Остальное</option>
            </Select>
          </div>
          <br/>
          <div>
            <label htmlFor="email" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Состав</label>
            <TextField
              placeholder="Введите состав через запятую"
              id="composition"
              type="text"
              name="composition"
              value={form.composition}
              onChange={changeHandler}
            />
          </div>
          <br/>
          <div>
            <label htmlFor="password" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Изображение</label>
            <TextField
              placeholder="Введите ссылку на изображение"
              id="imageUrl"
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={changeHandler}
            />
          </div>
          <br/>
          <div>
            <label htmlFor="password" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Имя позиции</label>
            <TextField
              placeholder="Введите имя позиции"
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={changeHandler}
            />
          </div>
          <br/>
          <div>
            <label htmlFor="password" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Популярность</label>
            <TextField
              placeholder="Введите популярность"
              id="popularity"
              type="number"
              name="popularity"
              value={form.popularity}
              onChange={changeHandler}
            />
          </div>
          <br/>
          <div>
            <label htmlFor="password" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              paddingBottom: '5px'
            }}>Стоимость</label>
            <TextField
              placeholder="Введите стоимость"
              id="price"
              type="number"
              name="price"
              value={form.price}
              onChange={changeHandler}
            />
          </div>
          <br/>
          <br/>
          <div>
            <button
              className="button sushi-list-item__button"
              style={{
                padding: '10px 20px',
                margin: '0',
                minHeight: '50px',
              }}
              disabled={loading}
              onClick={createHandler}
              type="button"
            >
              <span className="sushi-list-item__main">Добавить позицию</span>
            </button>
          </div>
        </form>
      </div>
      <div className={styles.d_flex__item_r}>
        {!productList.length ?
          (
            <>
              Список пуст
            </>
          )
          :
          (
            <div className={styles.table}>
              {/*{ JSON.stringify(productList) }*/}
              <table>
                <thead>
                <tr>
                  <th>#</th>
                  <th>name</th>
                  <th>category</th>
                  {/*<th>amount</th>*/}
                  <th>composition</th>
                  <th>imageUrl</th>
                  <th>popularity</th>
                  <th>price</th>
                  <th>currency</th>
                  <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {productList.map((product: any, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      { !product.edit ? product.name : (
                        <input type="text" name="name" value={product.name} onChange={e => changeItemHandler(e, product._id)} style={{ maxWidth: '60px' }}/>
                      )}
                    </td>
                    <td>
                      { !product.edit ? product.category : (
                        <input type="text" name="category" value={product.category} onChange={e => changeItemHandler(e, product._id)} style={{ maxWidth: '60px' }}/>
                      )}
                    </td>
                    <td>
                      { product.composition.join(', ') }
                      {/*{ !product.edit ? product.composition.join(', ') : (*/}
                      {/*  <input type="text" name="composition" value={product.composition} onChange={e => changeItemHandler(e, product._id)} />*/}
                      {/*)}*/}
                    </td>
                    <td>
                      <a target="_blank" href={product.imageUrl}>
                        Избрж
                      </a>
                    </td>
                    <td>
                      { !product.edit ? product.popularity : (
                        <input type="text" name="popularity" value={product.popularity} onChange={e => changeItemHandler(e, product._id)} style={{ maxWidth: '60px' }}/>
                      )}
                    </td>
                    <td>
                      { !product.edit ? product.price : (
                        <input type="text" name="price" value={product.price} onChange={e => changeItemHandler(e, product._id)} style={{ maxWidth: '60px' }}/>
                      )}
                    </td>
                    <td>
                      { !product.edit ? product.currency : (
                        <input type="text" name="currency" value={product.currency} onChange={e => changeItemHandler(e, product._id)} style={{ maxWidth: '30px' }}/>
                      )}
                    </td>
                    <td>
                      { !product.edit
                        ?
                        (
                          <button
                            type="button"
                            style={{marginRight: '5px'}}
                            onClick={() => editItemHandler(product._id)}
                          >
                            Ред
                          </button>
                        )
                        :
                        (
                          <button
                            type="button"
                            style={{marginRight: '5px'}}
                            onClick={(e) => updateHandler(e, product._id)}
                          >
                            Обновить
                          </button>
                        )
                      }

                      <button
                        type="button"
                        onClick={() => removeItemHandler(product._id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  )
};

const AdminPage: React.FC = () => {
  // @ts-ignore
  return (
    <>
      <RegComponent/>
      <hr style={{margin: '45px 0'}}/>
      <ProductComponent/>
    </>
  )
};

export default AdminPage;