import React, { memo } from "react";

const UserInfo = ({ onLogout }) => {
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  return (
    <div className="flex justify-between font-medium text-light_black items-center p-4 bg-white shadow-md rounded-lg">
      <div className="border-l-4 border-blue_c pl-2">
        <p className="text-lg md:text-xl">Привіт, {user.name || "Користувач"}</p>
        <p className="text-sm text-gray-600">{user.email || "Немає email"}</p>
      </div>
      <button onClick={onLogout} className="flex items-center text-red-500 hover:text-red-700">
        <img className="w-6 h-6 md:w-8 md:h-8" src="/log_out.svg" alt="Logout" />
      </button>
    </div>
  );
};

export default memo(UserInfo);
