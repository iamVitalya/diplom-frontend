import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import TextField from "../textfield";
import InputMask from 'react-input-mask';
import useHttp from "../../hook/http";
import {useHistory} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {sushiClearBasket} from "../../actions";

const Input = (props) => (
  <InputMask mask="+7 999 999 99-99" value={props.value} onChange={props.onChange}>
    {(inputProps) => <TextField {...inputProps} type="tel" />}
  </InputMask>
);

const Modal = ({ isShowing, hide, order }) => {
  const [form, setForm] = useState({
    fullName: {
      name: null,
      lastname: null,
      patronymic: null,
    },
    address: {
      city: null,
      street: null,
      home: null,
      flat: null,
    },
    phone: null,
    comment: null,
    order
  });
  const { loading, request, error, clearError } = useHttp();
  const [ statusRequest, setStatusRequest ] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => clearError(), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error])

  const createOrderHandler = async (event) => {
    event.preventDefault();

    try {
      const data = await request('/api/order/create', 'POST', {...form});

      setStatusRequest(data.message)

      setForm({
        fullName: {
          name: null,
          lastname: null,
          patronymic: null,
        },
        address: {
          city: null,
          street: null,
          home: null,
          flat: null,
        },
        phone: null,
        order: []
      })

      setTimeout(() => {
        history.push('/')
        dispatch({ type: 'SUSHI_CLEAR_BASKET' })
      }, 3000);
    } catch (e) {
    }
  }

  return isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className={styles.modal__overlay} />
      <div className={styles.modal__wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className={styles.modal}>
          <div className={styles.modal__header}>
            <button type="button" className={styles.modal__close__button} data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div>

            {
              statusRequest
              ?
                (<h2>{statusRequest}</h2>)
              :
              (
                <form className={styles.form}>
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

                  <div className={[styles.form__fullName, styles.form_p].join(' ')}>
                    <div className={styles.form__textfield}>
                      <label className={styles.form__textfield__label}>Фамилия *</label>
                      <TextField
                        value={form.fullName.lastname}
                        onChange={e => setForm({
                          ...form,
                          fullName: {
                            ...form.fullName,
                            lastname: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div className={styles.form__textfield}>
                      <label className={styles.form__textfield__label}>Имя *</label>
                      <TextField
                        value={form.fullName.name}
                        onChange={e => setForm({
                          ...form,
                          fullName: {
                            ...form.fullName,
                            name: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div className={styles.form__textfield}>
                      <label className={styles.form__textfield__label}>Отчество</label>
                      <TextField
                        value={form.fullName.patronymic}
                        onChange={e => setForm({
                          ...form,
                          fullName: {
                            ...form.fullName,
                            patronymic: e.target.value
                          }
                        })}
                      />
                    </div>
                  </div>

                  <div className={styles.form_p}>
                    <div className={styles.form__address}>
                      <div className={styles.form__textfield}>
                        <label className={styles.form__textfield__label}>Город *</label>
                        <TextField
                          value={form.address.city}
                          onChange={e => setForm({
                            ...form,
                            address: {
                              ...form.address,
                              city: e.target.value
                            }
                          })}
                        />
                      </div>
                      <div className={styles.form__textfield}>
                        <label className={styles.form__textfield__label}>Улица *</label>
                        <TextField
                          value={form.address.street}
                          onChange={e => setForm({
                            ...form,
                            address: {
                              ...form.address,
                              street: e.target.value
                            }
                          })}
                        />
                      </div>
                    </div>
                    <div className={[styles.form_p, styles.form__address].join(' ')}>
                      <div className={styles.form__textfield}>
                        <label className={styles.form__textfield__label}>Дом *</label>
                        <TextField
                          value={form.address.home}
                          onChange={e => setForm({
                            ...form,
                            address: {
                              ...form.address,
                              home: e.target.value
                            }
                          })}
                        />
                      </div>
                      <div className={styles.form__textfield}>
                        <label className={styles.form__textfield__label}>Квартира</label>
                        <TextField
                          value={form.address.flat}
                          onChange={e => setForm({
                            ...form,
                            address: {
                              ...form.address,
                              flat: e.target.value
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={[styles.form__phone, styles.form_p].join(' ')}>
                    <div className={styles.form__textfield}>
                      <label className={styles.form__textfield__label}>Телефон *</label>
                      <Input
                        value={form.phone}
                        onChange={e => setForm({
                          ...form,
                          phone: e.target.value
                        })}
                      />
                    </div>
                  </div>

                  <div className={[styles.form__phone, styles.form_p].join(' ')}>
                    <div className={styles.form__textfield}>
                      <label className={styles.form__textfield__label}>Комментарий</label>
                      <TextField
                        value={form.comment}
                        onChange={e => setForm({
                          ...form,
                          comment: e.target.value
                        })}
                      />
                    </div>
                  </div>


                  <div className={[styles.form__button, styles.form_p].join(' ')}>
                    <button
                      className="cart-list__button cart-list__buy"
                      type="button"
                      onClick={createOrderHandler}
                    >
                      <span className="sushi-list-item__main">Заказать</span>
                    </button>
                  </div>
                </form>
              )
            }

          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
}

export default Modal;