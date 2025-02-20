import React, { useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ExpenseForm = ({
  amount,
  setAmount,
  category,
  setVisibleForm,
  setCategory,
  editId,
  handleAddExpense,
}) => {
  const dispatch = useDispatch();
  const {
    addLoading,
    addError,
    updateError,
    updateSuccess,
    addSuccess,
    updateLoading,
  } = useSelector((state) => state.expenses);

  useEffect(() => {
    if (addError) {
      toast.error(addError);
      dispatch({ type: "RESET_STATUS" });
    }
  }, [addError, dispatch]);

  useEffect(() => {
    if (addSuccess) {
      toast.success("Додана витрата");
      dispatch({ type: "RESET_STATUS" });
    }
  }, [addSuccess, dispatch]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: "RESET_STATUS" });
    }
  }, [updateError, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Витрата оновлена");
      dispatch({ type: "RESET_STATUS" });
    }
  }, [updateSuccess, dispatch]);

  return (
    <div className="fixed shadow-lg border text-gray-800 rounded-lg z-10 bg-white px-5 py-4 w-11/12 max-w-md md:max-w-lg lg:max-w-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex text-lg font-semibold items-center mb-3">
        <h1>{editId ? "Редагувати" : "Додати"} витрату</h1>
        <div
          className="w-max cursor-pointer ml-auto text-3xl"
          onClick={() => {
            setAmount("");
            setCategory("");
            setVisibleForm(false);
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
      </div>
      <form onSubmit={handleAddExpense}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Кількість"
          required
          className="w-full px-4 py-2 border rounded-md mb-3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-3"
          required
        >
          <option value="">Оберіть категорію</option>
          <option value="Їжа">Їжа</option>
          <option value="Розваги">Розваги</option>
          <option value="Аренда житла">Аренда житла</option>
          <option value="Кава">Кава</option>
          <option value="Комунальні послуги">Комунальні послуги</option>
          <option value="Таксі">Таксі</option>
          <option value="Одяг">Одяг</option>
        </select>
        <button
          type="submit"
          disabled={addLoading || updateLoading}
          className="bg-blue-500 text-white py-3 w-full rounded-md hover:bg-blue-600 transition duration-200"
        >
          {addLoading
            ? "Додавання..."
            : updateLoading
            ? "Оновлення..."
            : editId
            ? "Оновити витрату"
            : "Додати витрату"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
