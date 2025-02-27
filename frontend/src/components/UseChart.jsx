import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { MdEdit } from "react-icons/md";

function UseChart({ totalExpense, onEditBudget }) {
  const budget = sessionStorage.getItem("budget");
  const remainingBudget = budget - totalExpense;

  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
      <div className="relative w-4/5 mx-auto">
        <PieChart
          data={[
            { title: "Витрати", value: totalExpense, color: "#FF4D4D" },
            { title: "Залишок бюджету", value: remainingBudget > 0 ? remainingBudget : 0, color: "#28A745" }
          ]}
          labelStyle={{ fontSize: "5px", fontFamily: "sans-serif", fill: "#fff" }}
          radius={42}
          animate
          lineWidth={20}
        />
        <div className="absolute text-3xl inset-0 flex flex-col items-center justify-center">
          <div className="relative text-center rounded-full p-4 bg-white shadow-md">
            <p className="text-sm font-semibold text-gray-600">Баланс</p>
            <p className="font-bold text-2xl md:text-3xl text-gray-900">₴{budget}</p>
            <button onClick={onEditBudget} className="text-gray-600 text-lg mt-1">
              <MdEdit />
            </button>
          </div>
        </div>
      </div>
      <div className="flex text-gray-900 border-b pb-3 justify-center mt-2 space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-[#FF4D4D]"></div>
          <span className="text-red-500">Витрати</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-[#28A745]"></div>
          <span className="text-green-500">Залишок бюджету</span>
        </div>
      </div>
      <ul className="font-bold list-none text-md flex justify-between mt-4 px-4">
        <li className="text-red-500">
          ВИТРАТИ <h2 className="text-gray-900 text-xl">₴{totalExpense}</h2>
        </li>
        <li className="text-green-500">
          ЗАЛИШОК <h3 className="text-gray-900 text-xl">₴{remainingBudget > 0 ? remainingBudget : 0}</h3>
        </li>
      </ul>
    </div>
  );
}

export default UseChart;
