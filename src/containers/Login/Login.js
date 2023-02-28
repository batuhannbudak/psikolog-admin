import React, { useState } from "react";

import LoadingDots from "../../components/shared/LoadingDots";
import AuthenticationService from "../../services/layers/AuthenticationService";
const Login = ({ setIsLoggedIn }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    if (event.target.username.value === '' || event.target.password.value === '') {
      alert('Kullanıcı adı veya şifre alanı boş bırakılamaz.');
      return;
    }

    setIsLoading(true);
    const body = {
      username: event.target.username.value,
      password: event.target.password.value
    };

    try {
      const res = await AuthenticationService.login(body);

      if (res.data[0] === false) {
        setIsLoggedIn(false);
        setIsError(true);
      } else if (res.data[0].loggedIn === true) {
        setIsError(false);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  
  }

  return (
    <div className='h-full w-full flex bg-navy-50'>
      <div className="m-auto bg-white w-120 radius shadow-xs">
        <div className="text-center pt-10 flex flex-col gap-4">
          <span className='font-bold text-xl color-navy-700'>Afet Psikososyal Destek Platformu</span>
          <span className='font-bold color-gray-200'>Kullanıcı adı ve şifreniz ile giriş yapınız.</span>
        </div>
        <form className="pt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col p-4 gap-4">
            <input
              type="text"
              className="border-2 border-navy-100 h-12 p-4 focus:border-blue-400 radius "
              placeholder="Kullanıcı Adı"
              name="username"
            />
          </div>
          <div className="flex flex-col p-4 gap-4">
            <input
              type="password"
              className="border-2 border-navy-100 h-12 p-4 focus:border-blue-400 radius "
              placeholder="Şifreniz"
              name="password"
            />
          </div>
          
          <div className="flex px-4 pt-4 flex-col mb-5">
            <button
              type="submit"
              className="radius p-4 bg-blue-400 grow-1 color-white hover:bg-blue-600 duration-500"
            >
              {isLoading ? (
                <div className='w-full h-full flex items-center justify-center'>
                  <LoadingDots backgroundColor={'#fff'}/>
                </div>
              ) : (
                  <p>Giriş Yap</p>
              )
            }
            </button>
            {isError && (
              <p className="pt-4 color-red-500 font-semibold">Kullanıcı adı veya şifre yanlış.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );

};

export default Login;
