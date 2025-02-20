import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-center min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        БЮДЖЕТ. ВІДСТЕЖЕННЯ. КОНТРОЛЬ
      </h1>
      <h2 className="text-lg font-normal text-gray-600 mb-8">
        Керуйте своїми фінансами
      </h2>

      <div className="w-full max-w-sm space-y-4">
        <Link to="/register">
          <button className="w-full py-3 text-white bg-blue-500 rounded-lg text-xl font-medium hover:bg-blue-600 transition">
            ЗАРЕЄСТРУВАТИСЯ
          </button>
        </Link>
        <Link to="/login">
          <button className="w-full py-3 text-white bg-gray-500 rounded-lg text-xl font-medium hover:bg-gray-600 transition">
            УВІЙТИ
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
