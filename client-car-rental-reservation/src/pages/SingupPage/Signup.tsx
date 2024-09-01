import { SubmitHandler, useForm } from "react-hook-form";
import DefaultContainer from "../../components/DefaultContainer";
import { Link, useNavigate } from "react-router-dom";
import { useCreateSignupMutation } from "../../redux/baseApi";
import toast from "react-hot-toast";

type TSingUp = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?:string;
    terms: boolean
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [createSignup] = useCreateSignupMutation(undefined);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSingUp>();
  const onSubmit: SubmitHandler<TSingUp> = async(data) => {
    const res = await createSignup(data).unwrap();
    if(res?.success === true){
      toast.success(res?.message);
      navigate("/signin");
    }else{
      toast.success(res?.message);
    }
  };

  const password = watch("password");

  return (
    <div>
      <DefaultContainer>
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              Create Account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  type="text"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  type="text"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  type="password"
                  placeholder="********"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    {...register("terms", {
                      required: "You must agree to the terms and conditions",
                    })}
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="ml-2">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-indigo-600 hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-sm">{errors.terms.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-indigo-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default Signup;
