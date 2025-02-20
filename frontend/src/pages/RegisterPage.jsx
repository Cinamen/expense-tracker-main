import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading, registerError, registerSuccess } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(name, email, password));
  };

  const token = sessionStorage.getItem("token");
  if (token) {
    navigate("/expenses");
  }

  useEffect(() => {
    if (registerSuccess) {
      toast.success("Реєстрація успішна!");
      navigate("/login");
    }
  }, [registerSuccess]);

  useEffect(() => {
    if (registerError) {
      toast.error(registerError);
    }
    dispatch({ type: "CLEAR_ERROR" });
  }, [registerError]);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Створіть акаунт
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 mb-2">
              Ім'я
            </label>
            <input
              type="text"
              id="name"
              placeholder="Введіть ваше ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Електронна пошта
            </label>
            <input
              type="email"
              id="email"
              placeholder="Введіть вашу електронну пошту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          {registerError && (
            <p className="text-red-500 text-sm">{registerError}</p>
          )}
          <button
            type="submit"
            disabled={registerLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 font-medium transition"
          >
            {registerLoading ? "Реєстрація..." : "ЗАРЕЄСТРУВАТИСЯ"}
          </button>
          <div className="text-center font-medium mt-4 text-sm text-gray-700">
            Вже маєте акаунт? {" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Увійти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
