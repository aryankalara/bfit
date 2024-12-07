import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Utensils, Users, Settings as SettingsIcon } from 'lucide-react';

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black fixed top-0 left-0 h-full">
        <div className="h-full flex flex-col">
          {/* Admin Panel Header */}
          <div className="flex items-center justify-center h-16 bg-red-600">
            <h1 className="text-white text-xl font-bold">Admin Panel</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col mt-0 items-start">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 text-sm text-white font-medium hover:bg-red-600 hover:text-white ${
                  isActive ? 'border-l-4 border-red-600 bg-black' : ''
                }`
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="view-diet-plans"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 text-sm text-white font-medium hover:bg-red-600 hover:text-white ${
                  isActive ? 'border-l-4 border-red-600 bg-black' : ''
                }`
              }
            >
              <Utensils size={20} />
              <span>Diet Plans</span>
            </NavLink>

            

            <NavLink
              to="clients"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 text-sm text-white font-medium hover:bg-red-600 hover:text-white ${
                  isActive ? 'border-l-4 border-red-600 bg-black' : ''
                }`
              }
            >
              <Users size={20} />
              <span>Clients</span>
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 text-sm text-white font-medium hover:bg-red-600 hover:text-white ${
                  isActive ? 'border-l-4 border-red-600 bg-black' : ''
                }`
              }
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-auto bg-gray-100">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}