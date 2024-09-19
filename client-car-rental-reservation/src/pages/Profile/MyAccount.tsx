import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser, useCurrentToken, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import {  useUpdateProfileMutation } from "../../redux/baseApi";
import toast from "react-hot-toast";


type Inputs = {
  name: string;
  email: string;
};

const MyAccount = () => {
  const { name, email } = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [updateProfileInfo, {isLoading}] = useUpdateProfileMutation(undefined);

  const { handleSubmit, register } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async(data) => {

    const user = {
      email: email,
      name: data?.name
    }

    const res = await updateProfileInfo({id: email, name: data?.name}).unwrap();

    dispatch(setUser({user,token}))
    if(res?.success === true){
      toast.success(res?.message);
    } else{
      toast.error(res?.message);
    }
  };

  return (
    <div className="py-10 dark:bg-gray-700 dark:px-5">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">User Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4 dark:text-white">Personal Information</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block dark:text-white text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                defaultValue={name}
                {...register("name")}
                className="mt-1 block w-full dark:bg-black dark:text-white p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block dark:text-white text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                defaultValue={email}
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`mt-4 bg-indigo-600 text-white ${isLoading && 'opacity-50'} px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors`}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
