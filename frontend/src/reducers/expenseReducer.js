const initialState = {
  fetchLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  fetchError: null,
  addError: null,
  updateError: null,
  deleteError: null,
  fetchSuccess: false,
  addSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  expenses: [],
  earliestDate: null,
  newUserEarliestDate:null
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EXPENSES_REQUEST":
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        fetchSuccess: false,
      };
    case "FETCH_EXPENSES_SUCCESS":
      return {
        ...state,
        fetchLoading: false,
        expenses: action.payload.expenses,
        earliestDate: action.payload.earliestExpense?.date,
        fetchSuccess: true,
      };
    case "FETCH_EXPENSES_ERROR":
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.payload,
      };

    case "ADD_EXPENSE_REQUEST":
      return {
        ...state,
        addLoading: true,
        addError: null,
        addSuccess: false,
      };
    case "ADD_EXPENSE_SUCCESS":
      return {
        ...state,
        addLoading: false,
        expenses: [action.payload, ...state.expenses],
        newUserEarliestDate: action.payload?.date,

        addSuccess: true,
      };
    case "ADD_EXPENSE_ERROR":
      return {
        ...state,
        addLoading: false,
        addError: action.payload,
      };

    case "UPDATE_EXPENSE_REQUEST":
      return {
        ...state,
        updateLoading: true,
        updateError: null,
        updateSuccess: false,
      };
    case "UPDATE_EXPENSE_SUCCESS":
      return {
        ...state,
        updateLoading: false,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
        updateSuccess: true,
      };
    case "UPDATE_EXPENSE_ERROR":
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
      };

    case "DELETE_EXPENSE_REQUEST":
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
        deleteSuccess: false,
      };
    case "DELETE_EXPENSE_SUCCESS":
      return {
        ...state,
        deleteLoading: false,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
        deleteSuccess: true,
      };
    case "DELETE_EXPENSE_ERROR":
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload,
      };
      case "RESET_STATUS":
        return {
          ...state,
          fetchError: null,
          addError: null,
          updateError: null,
          deleteError: null,
          fetchSuccess: false,
          addSuccess: false,
          updateSuccess: false,
          deleteSuccess: false,
        };
    default:
      return state;
  }
};

export default expenseReducer;
