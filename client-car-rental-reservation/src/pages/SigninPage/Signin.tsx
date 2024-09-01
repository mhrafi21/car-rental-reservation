import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import DefaultContainer from "../../components/DefaultContainer";
import { useCreateLoginMutation } from "../../redux/baseApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";

interface SignInFormInputs {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [createLogin] = useCreateLoginMutation(undefined);
  const dispatch = useAppDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();
  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    const {success, token} = await createLogin(data).unwrap();
    if (success === true) {
      const user = verifyToken(token)
      console.log(user);
      dispatch(setUser({ user: user, token: token }));
      toast.success("Logged in successfully");
      navigate(location?.state ? location?.state : "/dashboard")
    }else{
      toast.error("Invalid email or password");
    }
  };

  return (
    <div>
      <DefaultContainer>
        <div className="min-h-screen flex justify-center items-center ">
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              Sign In
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  type="email"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  type="password"
                  placeholder="********"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
              >
                Sign In
              </button>
            </form>
            <p className="text-center text-sm text-gray-600">
              <a
                href="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot Password?
              </a>
            </p>
            <p className="text-center text-sm text-gray-600">
              New here?{" "}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default Signin;
