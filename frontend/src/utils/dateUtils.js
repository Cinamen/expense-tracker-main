// utils/dateUtils.js

export const formatDate = (date) => {
    const currentDate = new Date();
    const expenseDate = new Date(date);
  
    const isToday =
      currentDate.toDateString() === expenseDate.toDateString();
  
    const isYesterday =
      new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString() ===
      expenseDate.toDateString();
  
    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
  
    return expenseDate.toLocaleDateString();
  };
  