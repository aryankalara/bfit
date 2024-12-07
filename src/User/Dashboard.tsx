import { Flame, Apple, Droplet, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';

const Dashboard = () => {

  const [UserData,setUserData] = useState("");
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData)
    }
  }, []);

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-black to-red-950 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          {/* Display the user's name dynamically */}
          <h1 className="text-3xl font-bold text-white">Welcome back, {UserData.name}!</h1>
          <p className="text-gray-400">Here's your nutrition summary for today</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{ icon: Flame, label: 'Calories', value: '1,200', target: '2,000', color: 'text-orange-500' },
            { icon: Apple, label: 'Proteins', value: '60g', target: '80g', color: 'text-green-500' },
            { icon: Timer, label: 'Carbs', value: '130g', target: '200g', color: 'text-blue-500' },
            { icon: Droplet, label: 'Water', value: '1.5L', target: '2.5L', color: 'text-cyan-500' },
          ].map((stat, index) => (
            <div key={index} className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-2 rounded-lg ${stat.color} bg-white/10`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium text-white">{stat.label}</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">Target: {stat.target}</div>
                <div className="w-full bg-black/50 rounded-full h-2">
                  <div className={`${stat.color} h-2 rounded-full`} style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          ))}

        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <h2 className="text-xl font-bold text-white mb-4">Today's Meals</h2>
            <div className="space-y-4">
              {[{ time: 'Breakfast', meal: 'Oatmeal with berries', calories: 320 },
                { time: 'Lunch', meal: 'Grilled chicken salad', calories: 420 },
                { time: 'Snack', meal: 'Greek yogurt with honey', calories: 180 },
                { time: 'Dinner', meal: 'Salmon with quinoa', calories: 450 },
              ].map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">{meal.time}</p>
                    <p className="text-white">{meal.meal}</p>
                  </div>
                  <div className="text-red-400">{meal.calories} kcal</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
            <h2 className="text-xl font-bold text-white mb-4">Nutrition Tips</h2>
            <div className="space-y-4">
              {[
                "Stay hydrated! Aim to drink water throughout the day",
                "Include protein in every meal to maintain muscle mass",
                "Eat colorful vegetables for varied nutrients",
                "Avoid processed foods and added sugars"
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                  <div className="p-1 bg-red-500 rounded-full mt-1">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <p className="text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
