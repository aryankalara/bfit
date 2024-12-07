import React from 'react';
import { Users, Utensils, TrendingUp, Calendar } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">256</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Diet Plans</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Utensils className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Diet Plans */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Diet Plans</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((plan) => (
              <div key={plan} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Weight Loss Plan {plan}</h3>
                  <p className="text-sm text-gray-600">Created 2 days ago</p>
                </div>
                <span className="px-3 py-1 text-sm text-white bg-red-600 rounded-full">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Clients</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((client) => (
              <div key={client} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://source.unsplash.com/100x100/?portrait&${client}`}
                    alt="Client"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">Client Name {client}</h3>
                    <p className="text-sm text-gray-600">Joined yesterday</p>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-700">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}