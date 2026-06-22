import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { assignRole, deleteUser, fetchAllUsers } from '../../api/admin';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Users = () => {

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchAllUsers,
  });

  const roleMutation = useMutation({
    mutationFn: assignRole,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["admin-users"]);
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to update role"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["admin-users"]);
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to delete user"),
  });

  const handleRoleChange = (id, role) => {
    if (role) roleMutation.mutate({ id, role });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="paddingClass">
       <h1 className='text-6xl text-gray-700'>User Management</h1>

      <div className="mt-10 overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-theme/10 text-xs uppercase text-theme">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 text-center">Change Role</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.data?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{user.full_name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  <select onChange={(e) => handleRoleChange(user.id, e.target.value)} defaultValue={user.role} className="rounded border border-gray-300 p-1 text-xs outline-theme">
                    <option value="" disabled>Change Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users