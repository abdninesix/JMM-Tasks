import React from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/categories');
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Category</h1>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save
          </button>
          <Link href="/categories" className="text-gray-600">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

Create.layout = page => <Layout>{page}</Layout>;