import React from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

export default function Clients() {
  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      plan: 'Weight Loss Plan',
      startDate: '2024-03-01',
      progress: 75,
      status: 'Active',
      image: 'https://source.unsplash.com/100x100/?portrait&1',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      plan: 'Muscle Gain Program',
      startDate: '2024-02-15',
      progress: 45,
      status: 'Active',
      image: 'https://source.unsplash.com/100x100/?portrait&2',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      plan: 'Maintenance Diet',
      startDate: '2024-03-10',
      progress: 25,
      status: 'Pending',
      image: 'https://source.unsplash.com/100x100/?portrait&3',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Clients</h1>

      <div className="card mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="input-field pl-10"
            />
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Filter size={20} />
            Filter
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="font-medium text-gray-900">{client.plan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium text-gray-900">{client.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium text-gray-900">{client.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${client.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}