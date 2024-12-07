import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import About from './Components/About';
import Contact from './Components/Contact';
import Feature from './Components/Feature';
import Header from './Components/Header';
import NavBar from "./Components/NavBar";
import Offer from './Components/Offer';
import RegistrationQuiz from './RegistrationQuiz/RegistrationQuiz';
import NetworkBackground from './NetworkBackground';
import LoginForm from './LoginForm';
import Dashboard from './User/Dashboard';
import Sidebar from './User/Sidebar';
import Profile from './User/Profile';
import NutritionTracking from './User/NutritionTracking';
import Workouts from './User/Workouts';
import MealPlanner from './User/MealPlanner';
import Settings from './User/Settings';
import FoodRecipy from './User/FoodRecipe';
import RecipeDetails from './User/RecipeDetails';
import CalorieCalculator from './User/CalorieCalculator';
import FoodGole from './User/FoodGoal';
import ViewFoodGoal from './User/ViewFoodGoal';

// Admin Pages
import Login from './Admin/pages/Login';
import Dashboard1 from './Admin/pages/Dashboard';
import AddDietPlan from './Admin/pages/AddDietPlan';
import ViewDietPlans from './Admin/pages/ViewDietPlans';
import Clients from './Admin/pages/Clients';
import Settings1 from './Admin/pages/Settings';
import AdminLayout from './Components/AdminLayout';
import ViewUsers from './Admin/pages/ViewUsers';  // Add this import
import AddNutritionist from './User/AddNutritionist';
import NutritionistTable from './User/ViewallNutritionist';
import AddResourceForm from './User/AddResource';
import ResourceLibrary from './User/ResourceLibrary';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <BrowserRouter>
      <Routes>
        {/* Main route */}
        <Route 
          path="/" 
          element={
            <div id="main">
              <NavBar />
              <Header />
              <Feature />
              <Offer />
              <About />
              <Contact />
            </div>
          } 
        />
        
        {/* Admin Login Route */}
        <Route path="/admin-login" element={<Login/>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard1 />} />
          <Route path="add-diet-plans" element={<AddDietPlan />} />
          <Route path="view-diet-plans" element={<ViewDietPlans />} />
          <Route path="view-users" element={<ViewUsers />} />
           {/* Corrected path */}
          {/* Add more admin routes here if needed */}
        </Route>

        {/* User Routes */}
        <Route 
          path="/login" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-900 flex items-center justify-center p-4">
              <NetworkBackground />
              <LoginForm />
            </div>
          } 
        />
        
        {/* Dashboard route */}
        <Route 
          path="/dashboard" 
          element={
            <div className="flex">
              <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
              <div className="flex-1 ml-64">
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'foodrecipy' && <FoodRecipy />}
                {currentPage === 'profile' && <Profile />}
                {currentPage === 'nutrition' && <NutritionTracking />}
                {currentPage === 'workouts' && <Workouts />}
                {currentPage === 'planner' && <MealPlanner />}
                {currentPage === 'addnutritionist' && <AddNutritionist />}
                {currentPage === 'viewnutritionist' && <NutritionistTable />}
                {currentPage === 'addresource' && <AddResourceForm />}
                {currentPage === 'viewresource' && <ResourceLibrary/>}
                {currentPage === 'FoodGoal' && <FoodGole />}
                {currentPage === 'viewfoodgoal' && <ViewFoodGoal />}
                {currentPage === 'settings' && <Settings />}
              </div>
            </div>
          } 
        />

        {/* Recipe Details route */}
        <Route 
          path="/recipe/:label"
          element={
            <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-900 flex items-center justify-center p-4">
              <RecipeDetails />
            </div>
          } 
        />
        
        {/* Calorie Calculator route */}
        <Route path="/calorie-calculator" element={<CalorieCalculator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
