import React from 'react';
import { Home, User, Settings, Calendar, Activity, BarChart2, LogOut, Utensils  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Utensils, label: 'FoodRecipes', id: 'foodrecipy' },
    { icon: BarChart2, label: 'Nutrition Tracking', id: 'nutrition' },
    { icon: Activity, label: 'Workouts', id: 'workouts' },
    // { icon: Calendar, label: 'Meal Planner', id: 'planner' },
    { icon: Calendar, label: 'Meal Planner', id: 'FoodGoal' },
    { icon: Settings, label: 'View Food Goal', id: 'viewfoodgoal' },
    { icon: Settings, label: 'Add Nutristnist', id: 'addnutritionist' },
    { icon: Settings, label: 'Add Resources', id: 'addresource' },
    { icon: Settings, label: 'View Resources', id: 'viewresource' },
    { icon: Settings, label: 'View Nutristnist', id: 'viewnutritionist' },
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  const navigate = useNavigate();

  const logout = () =>{
    navigate("/login")
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-red-950 text-white p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 p-2">
        <Activity className="w-8 h-8 text-red-500" />
        <h1 className="text-xl font-bold">B-FIT</h1>
      </div>
      
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors w-full text-left ${
              currentPage === item.id
                ? 'bg-red-500 text-white'
                : 'hover:bg-red-900 text-gray-300'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <button
        className="flex items-center gap-3 p-3 text-gray-300 hover:bg-red-900 rounded-lg transition-colors mt-auto w-full text-left"
        onClick={logout}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;