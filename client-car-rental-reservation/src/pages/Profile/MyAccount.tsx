import DefaultContainer from "../../components/DefaultContainer";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const MyAccount = () => {
  const { name, email } = useAppSelector(useCurrentUser);
  return (
    <div>
      <DefaultContainer>
        <h2 className="text-2xl font-semibold mb-6">User Dashboard</h2>
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Personal Information</h3>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={name}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Update Profile
            </button>
          </form>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default MyAccount;
