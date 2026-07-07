import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function Index({ categories }) {
  const deleteCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      router.delete(route('categories.destroy', id));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          href={route('categories.create')}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          + Add Category
        </Link>
      </div>

      <table className="w-full border-collapse border border-gray-200 shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Description</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.data.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="border p-3">{category.name}</td>
              <td className="border p-3">{category.description}</td>
              <td className="border p-3 text-center">
                <Link
                  href={route('categories.edit', category.id)}
                  className="text-indigo-600 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}