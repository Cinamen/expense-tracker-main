import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { FaRegEdit } from "react-icons/fa";
import { MdAutoDelete, MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExpenseList = ({ setVisibleForm, handleEditClick, handleDeleteClick }) => {
  const { deleteSuccess, expenses, deleteLoading, deleteError, fetchLoading, fetchError } = useSelector(
    (state) => state.expenses
  );

  const dispatch = useDispatch();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Витрата видалена");
      dispatch({ type: "RESET_STATUS" });
      setDeletingId(null);
    }
  }, [deleteSuccess, dispatch]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: "RESET_STATUS" });
      setDeletingId(null);
    }
  }, [deleteError, dispatch]);

  const handleDelete = (id) => {
    setDeletingId(id);
    handleDeleteClick(id);
  };

  const memoizedExpenses = useMemo(
    () =>
      expenses?.map((expense) => (
        <li
          key={uuidv4()}
          className="flex items-center bg-[#E9E9E9] justify-between mt-3 px-5 py-3 rounded-lg shadow-md md:w-3/4 lg:w-2/3 mx-auto"
        >
          <div>
            <h1 className="font-semibold text-gray-800 text-lg md:text-xl">{expense.category}</h1>
            <span className="text-gray-500 text-sm md:text-base">{formatDate(expense.date)}</span>
          </div>
          <div className="text-2xl flex items-center">
            <span className="text-blue-600 font-bold text-lg md:text-xl lg:text-2xl mr-4">
              ₹ {expense.amount}
            </span>
            <button
              onClick={() => {
                setVisibleForm(true);
                handleEditClick(expense);
              }}
              className="p-2 text-gray-700 hover:text-gray-900 transition"
            >
              <FaRegEdit />
            </button>
            <button
              disabled={deleteLoading && deletingId === expense._id}
              onClick={() => handleDelete(expense._id)}
              className="p-2 text-red-500 hover:text-red-700 transition"
            >
              {deleteLoading && deletingId === expense._id ? <MdAutoDelete /> : <MdDelete />}
            </button>
          </div>
        </li>
      )),
    [expenses, handleEditClick, handleDeleteClick, deleteLoading, deletingId]
  );

  if (fetchLoading) {
    return <div className="text-center text-gray-500">Завантаження...</div>;
  }

  if (fetchError) {
    return <div className="text-red-500 text-center">Failed to load expenses. Please try again later.</div>;
  }

  return <ul className="mt-4 w-full md:w-5/6 lg:w-3/4 mx-auto">{memoizedExpenses}</ul>;
};

export default ExpenseList;
