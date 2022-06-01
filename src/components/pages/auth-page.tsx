import React, {useContext, useEffect, useState} from 'react';
import useHttp from '../../hook/http';
import { AuthContext } from '../context/auth';
import TextField from "../textfield";

const AuthPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [ form, setForm ] = useState({
    email: '',
    password: '',
    isAdmin: true
  });

  useEffect(() => {
    const timeout = setTimeout(() => clearError(), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error])

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target?.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      // @ts-ignore
      const data = await request('/api/auth/register', 'POST', {...form})
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      // @ts-ignore
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.isAuthenticated = true;
      // @ts-ignore
      auth.login(data.token, data.userId, data.userRoles)
    } catch (e) {}
  }


  return (
    <form style={{ maxWidth: '30%', margin: '0 auto' }}>
      { error && (
        <>
          <div style={{
            color: 'red',
            fontSize: '14px',
            padding: '15px 0',
            borderBottom: '1px solid'
          }}>
            { String(error) }
          </div>
          <br/>
        </>
      ) }

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
          className="button sushi-list-item__button" style={{
            padding: '10px 20px',
            margin: '0',
            minHeight: '50px',
          }}
          disabled={loading}
          onClick={loginHandler}
        >
          <span className="sushi-list-item__main">Войти</span>
        </button>
      </div>
      {/*<div>*/}
      {/*  <button*/}
      {/*    className="button sushi-list-item__button" style={{*/}
      {/*      padding: '10px 20px',*/}
      {/*      margin: '0',*/}
      {/*      minHeight: '50px',*/}
      {/*    }}*/}
      {/*    disabled={loading}*/}
      {/*    onClick={registerHandler}*/}
      {/*  >*/}
      {/*    <span className="sushi-list-item__main">Регистрация</span>*/}
      {/*  </button>*/}
      {/*</div>*/}
    </form>
  )
};

export default AuthPage;