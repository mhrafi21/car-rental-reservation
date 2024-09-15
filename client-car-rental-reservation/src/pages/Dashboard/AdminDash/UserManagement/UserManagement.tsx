import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusOrRoleMutation,
} from "../../../../redux/baseApi";
import { TUser } from "../../../../interfaces";
import toast from "react-hot-toast";
import DefaultContainer from "../../../../components/DefaultContainer";

const UserManagement: React.FC = () => {
  // Fetch users and provide typings
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserStatusOrRoleMutation(undefined);

  // Local state for managing current user being edited
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    role: string;
    status: string;
  } | null>(null);

  // Handle input changes directly in the user object
  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Type guard to check if currentUser is not null
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  // Handle form submission to update the user's role and status
  const handleSubmit = async () => {
    if (!currentUser) {
      // If currentUser is null, return early and log an error
      console.error("No user selected for updating.");
      toast.error("No user selected for updating.");
      return;
    }

    try {
      const response = await updateUser({
        id: currentUser.id,
        role: currentUser.role,
        status: currentUser.status,
      }).unwrap();

      if (response.success) {
        toast.success("User updated successfully!");
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      toast.error("Failed to update user.");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 w-full">
      <DefaultContainer>
      <div className="bg-white shadow-lg rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              )}
              {data?.data?.map((user: TUser) => (
                <tr key={user._id}>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <select
                      name="role"
                      value={
                        currentUser?.id === user._id
                          ? currentUser?.role
                          : user.role || "user" // Fallback to "user" if role is undefined
                      }
                      onChange={(e) => {
                        // Guard to ensure user._id exists and currentUser is updated correctly
                        if (user._id) {
                          setCurrentUser({
                            id: user._id,
                            role: e.target.value,
                            status: currentUser?.status || user.status || "active", // Fallback to "active" if status is undefined
                          });
                        }
                        handleInputChange(e);
                      }}
                      className="px-2 py-1 border rounded-md"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <select
                      name="status"
                      value={
                        currentUser?.id === user._id
                          ? currentUser?.status
                          : user.status || "active" // Fallback to "active" if status is undefined
                      }
                      onChange={(e) => {
                        // Guard to ensure user._id exists and currentUser is updated correctly
                        if (user._id) {
                          setCurrentUser({
                            id: user._id,
                            role: currentUser?.role || user.role || "", // Fallback to "user" if role is undefined
                            status: e.target.value,
                          });
                        }
                        handleInputChange(e);
                      }}
                      className="px-2 py-1 border rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                      disabled={currentUser?.id !== user._id}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </DefaultContainer>
    </div>
  );
};

export default UserManagement;
