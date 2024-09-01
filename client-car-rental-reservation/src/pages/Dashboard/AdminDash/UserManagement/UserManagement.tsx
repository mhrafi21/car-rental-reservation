import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusOrRoleMutation,
} from "../../../../redux/baseApi";
import { TUser } from "../../../../interfaces";
import toast from "react-hot-toast";

const UserManagement: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser,] = useUpdateUserStatusOrRoleMutation();

  // Define the state for managing form data, where each key is a user ID
  const [formData, setFormData] = useState<{ [key: string]: { role?: string; status?: string } }>({});

  // Handle input change and update formData state based on user ID
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [name]: value,
      },
    }));
  };

  // Handle form submission for updating user role and status
  const handleSubmit = async (userId: string) => {
    const userFormData = formData[userId];
    if (!userFormData) return;

    try {
      const res = await updateUser({
        id: userId,
        role: userFormData.role,
        status: userFormData.status,
      }).unwrap();
      if(res.success === true){
        toast.success("Updated Successfully")
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 w-full">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
            {isLoading && <div>Loading...</div>}
              {data?.data?.map((user: TUser) => (
                <tr key={user._id}>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{user.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <select
                      name="role"
                      value={formData[user._id]?.role || user?.role || ""}
                      onChange={(e) => handleInputChange(e, user._id)}
                      className="px-2 py-1 border rounded-md"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <select
                      name="status"
                      value={formData[user._id]?.status || user?.status || ""}
                      onChange={(e) => handleInputChange(e, user._id as string)}
                      className="px-2 py-1 border rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button
                      onClick={() => handleSubmit(user._id as string)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
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
    </div>
  );
};

export default UserManagement;
