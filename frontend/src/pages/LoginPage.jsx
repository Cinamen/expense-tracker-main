import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginLoading, loginSuccess, loginError } = useSelector(
    (state) => state.auth
  );
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
  };

  if (token) {
    navigate("/expenses");
  }

  useEffect(() => {
    if (loginSuccess) {
      toast.success("Успішний вхід!");
    }
    dispatch({ type: "CLEAR_ERROR" });
  }, [loginSuccess]);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
    }
    dispatch({ type: "CLEAR_ERROR" });
  }, [loginError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Вхід в акаунт
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Електронна пошта
            </label>
            <input
              type="email"
              id="email"
              placeholder="Введіть вашу пошту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              placeholder="Введіть ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 font-medium transition"
          >
            {loginLoading ? "Завантаження..." : "УВІЙТИ"}
          </button>
          <div className="text-center text-sm text-gray-700 mt-4">
            Немає акаунту? {" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Зареєструватися
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
