import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import RegisterForm from "../../components/auth/RegisterForm";
import { useRegister } from "../../hooks/auth/useRegister";

export default function Register() {
  const navigate = useNavigate();

  const { mutate: register, isPending, error } = useRegister();

  const handleBackToDashboard = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4">
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <button
          className="absolute top-3 left-2 cursor-pointer"
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="w-8 h-8 hover:text-black" />
        </button>
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mt-2">Sign Up</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create an account for free.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error.response?.data?.message || error.message || error}</span>
          </div>
        )}

        <RegisterForm onSubmit={register} isPending={isPending} />
      </div>
    </div>
  );
}
