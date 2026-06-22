import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { assignRole, deleteUser, fetchAllUsers } from '../../api/admin';
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

const Users = () => {

  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => fetchAllUsers(page),
    keepPreviousData: true,
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

  const meta = data?.meta;
  const handleNext = () => { if (meta?.current_page < meta?.last_page) setPage(prev => prev + 1); };
  const handlePrev = () => { if (meta?.current_page > 1) setPage(prev => prev - 1); };

  if (isLoading) {
    return <CgSpinner className="mx-auto mt-10 animate-spin" />;
  }

  return (
    <div className="paddingClass">
      <h1 className='text-6xl text-gray-700'>User Management</h1>

      <div className="mt-10 overflow-x-auto rounded-lg border border-gray-200">
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

      <div className="mt-4 flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg border border-gray-200">
        <div className="text-sm text-gray-700">
          Showing <span className="font-semibold">{meta?.from}</span> to <span className="font-semibold">{meta?.to}</span> of <span className="font-semibold">{meta?.total}</span> users
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className='flex items-center gap-1 rounded px-3 py-1 text-sm font-semibold border text-theme border-theme hover:bg-theme/10'
          >
            <FaChevronLeft size={10} /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page === meta?.last_page}
            className='flex items-center gap-1 rounded px-3 py-1 text-sm font-semibold border text-theme border-theme hover:bg-theme/10'
          >
            Next <FaChevronRight size={10} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default Users