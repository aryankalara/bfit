import React, { useState } from 'react';
import { Activity, Calendar, Clock, Dumbbell, Plus, BarChart, Trash2 } from 'lucide-react';

const Workouts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [workoutData, setWorkoutData] = useState({
    date: '',
    workoutType: 'Strength Training', // Default workout type
    durationMinutes: '',
    sets: '',
    reps: '',
    weightKg: '',
    exerciseName: '',
  });
  

  const changeForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (key, value) => {
    setWorkoutData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveWorkout = async () => {
    try {
      const response = await fetch('http://localhost:2025/user/addworkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });
      if (response.ok) {
        console.log('Workout saved successfully');
        setShowForm(false); // Close form after save
      } else {
        const errorData = await response.json();
        console.error('Failed to save workout:', errorData.message);
      }
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const workoutHistory = [
    {
      date: '2024-03-15',
      type: 'Strength Training',
      duration: '45 min',
      exercises: [
        { name: 'Bench Press', sets: 3, reps: 10, weight: 60 },
        { name: 'Squats', sets: 4, reps: 8, weight: 80 },
        { name: 'Deadlifts', sets: 3, reps: 8, weight: 100 },
      ],
    },
    {
      date: '2024-03-14',
      type: 'Cardio',
      duration: '30 min',
      exercises: [{ name: 'Treadmill Run', distance: '5km', pace: '6:00/km' }],
    },
  ];

  const stats = [
    { label: 'Workouts This Week', value: '4', icon: Activity },
    { label: 'Total Duration', value: '180 min', icon: Clock },
    { label: 'Strength Sessions', value: '3', icon: Dumbbell },
    { label: 'Cardio Sessions', value: '1', icon: BarChart },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black to-red-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-500 rounded-full">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Workouts</h1>
            <p className="text-gray-400">Track your fitness progress</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5 text-red-400" />
                <span className="text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Log */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Workout Log</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-black/30 border border-red-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {workoutHistory.map((workout, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-red-400" />
                      <span className="text-white">{workout.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">{workout.type}</span>
                      <span className="text-gray-400">{workout.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {workout.exercises.map((exercise, idx) => (
                      <div key={idx} className="bg-black/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{exercise.name}</span>
                          <button className="text-gray-400 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {'sets' in exercise
                            ? `${exercise.sets} sets × ${exercise.reps} reps @ ${exercise.weight}kg`
                            : `${exercise.distance} | Pace: ${exercise.pace}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Add Workout */}
          <div className="space-y-6">
            <div className="bg-red-900/20 rounded-xl p-6 backdrop-blur-sm border border-red-900/50">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Add Workout</h2>
              <div className="space-y-4">
                <button
                  onClick={changeForm}
                  className="w-full flex items-center justify-between bg-black/30 p-4 rounded-lg hover:bg-black/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-5 h-5 text-red-400" />
                    <span className="text-white">Strength Training</span>
                  </div>
                  <Plus className="w-5 h-5 text-gray-400" />
                </button>

                {/* <button
                  onClick={changeForm}
                  className="w-full flex items-center justify-between bg-black/30 p-4 rounded-lg hover:bg-black/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-5 h-5 text-red-400" />
                    <span className="text-white">Cardio Training</span>
                  </div>
                  <Plus className="w-5 h-5 text-gray-400" />
                </button> */}
              </div>

              {showForm && (
                <form className="bg-black/30 mt-4 p-4 rounded-lg space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Date (YYYY-MM-DD)</label>
                    <input
                      type="text"
                      placeholder="Enter date (e.g., 2024-03-15)"
                      value={workoutData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Exercise Name</label>
                    <input
                      type="text"
                      placeholder="Enter exercise name"
                      value={workoutData.exerciseName}
                      onChange={(e) => handleInputChange('exerciseName', e.target.value)}
                      className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Duration (mins)</label>
                    <input
                      type="number"
                      placeholder="Enter duration"
                      value={workoutData.durationMinutes}
                      onChange={(e) => handleInputChange('durationMinutes', e.target.value)}
                      className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-1">Number of Sets</label>
                    <input
                      type="text"
                      placeholder="Enter number of sets"
                      value={workoutData.sets}
                      onChange={(e) => setWorkoutData({ ...workoutData, sets: e.target.value })}
                      className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Number of Reps per Set</label>
                    <input
                      type="text"
                      placeholder="Enter Number of Reps per Set"
                      value={workoutData.reps}
                      onChange={(e) => setWorkoutData({ ...workoutData, reps: e.target.value })}
                      className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
                    />
                  </div>
                 
<div>
  <label className="block text-gray-400 mb-1">Weight (KG)</label>
  <input
    type="number"
    placeholder="Enter weight in kg"
    value={workoutData.weightKg} // Correct field
    onChange={(e) => setWorkoutData({ ...workoutData, weightKg: e.target.value })}
    className="w-full px-4 py-2 bg-black border border-red-900/50 text-white rounded-lg focus:outline-none"
  />
</div>

                  <button
                    type="button"
                    onClick={handleSaveWorkout}
                    className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
                  >
                    Save Workout
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
