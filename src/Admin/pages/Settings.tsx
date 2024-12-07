import React from 'react';
import { Bell, Lock, User, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <User className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
              <p className="text-sm text-gray-500">Update your personal information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input type="text" className="input-field" defaultValue="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input type="text" className="input-field" defaultValue="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input type="email" className="input-field" defaultValue="john.doe@example.com" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-gray-500">Manage your password and security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input type="password" className="input-field" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input type="password" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input type="password" className="input-field" />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Bell className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            {['Email Notifications', 'Push Notifications', 'SMS Notifications'].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item}</p>
                  <p className="text-sm text-gray-500">Receive notifications about updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* System Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Globe className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">System</h2>
              <p className="text-sm text-gray-500">Manage system preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select className="input-field">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Zone
              </label>
              <select className="input-field">
                <option>UTC-05:00 Eastern Time</option>
                <option>UTC-06:00 Central Time</option>
                <option>UTC-07:00 Mountain Time</option>
                <option>UTC-08:00 Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}