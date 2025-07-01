import React from 'react';
import Button from '../components/Button';
import RightSidebar from '../components/RightSidebar';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ScrollText,
  CreditCard,
  Settings,
} from "lucide-react";


const Dashboard = () => {
 
   const navigate = useNavigate();
  return ( 
    <div className="bg-[#F5FAF7] overflow-hidden flex min-h-[100vh]">

      {/* Sidebar */}
     <aside className="w-full md:w-[230px] bg-[#69E99F]">
      <div className="bg-[#F5FAF7] w-full h-[60px] flex items-center justify-center">
        <img src="/trashlogo.png" alt="Logo" className="w-24 mr-7"/>
      </div>

      <ul className="space-y-3 mt-8 px-6">
        <li className="flex items-center space-x-3 bg-[#55B884] hover:bg-green-400 transition-colors rounded-md px-3 py-3 font-medium text-sm text-[#F5FAF7] cursor-pointer">
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-green-200 transition-colors rounded px-3 py-3 font-medium text-sm text-trashBlue cursor-pointer">
          <ScrollText className="w-5 h-5" />
          <span>My Subscriptions</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-green-200 transition-colors rounded px-3 py-3 font-medium text-sm text-trashBlue cursor-pointer">
          <CreditCard className="w-5 h-5" />
          <span>Payment History</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-green-200 transition-colors rounded px-3 py-3 font-medium text-sm text-trashBlue cursor-pointer">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </li>
      </ul>
    </aside>

      {/* Main Content */} 
      <main className="flex-1 p-4 md:px-6 md:pt-0 md:pb-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-black text-3xl text-trashBlue pl-4 pt-12">Dashboard</h1>
          <input
            type="text"
            placeholder="Search"
            className="w-2/3 md:w-1/2 px-6 py-2 rounded-full border border-gray-300 shadow-inner focus:outline-none text-sm"
          />
          
        </div>

        {/* Welcome Section */}
        <div className="bg-[#D9F2E6] py-8 pl-8 pr-4 rounded-2xl flex flex-col md:flex-row items-center justify-between h-[180px]">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-black text-trashBlue">
              Hello, <span className="text-green-400">Jina!</span>
            </h2>
            <p className="text-sm text-trashBlue mt-1">Ready to keep your space clean? Let's schedule a pickup.</p>
            <Button className="rounded-xl shadow mt-6 text-sm" onClick={() => navigate("/dashboard/SchedulePickup")}>
              Schedule a pickup
            </Button>
          </div>
          <img
            src="/chat4.png"
            alt="Collectors"
            className="w-40 md:w-64 mb-8 h-[180px]"
          />
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Active Subscriptions</h3>
            <p className="text-sm text-gray-500 mt-2">You haven't chosen a plan yet</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Your Last Pickup</h3>
            <p className="text-sm text-gray-500 mt-2">No pickups yet. Your pickup history will appear here once you schedule a collection</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Trash Collector Assigned</h3>
            <p className="text-sm text-gray-500 mt-2">No collector yet. Choose one when you schedule your first pickup</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-[#0F3D3E]">Next Scheduled Pickup</h3>
            <p className="text-sm text-gray-500 mt-2">No upcoming pickup</p>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
     <RightSidebar />
    </div>
  
  );
};

export default Dashboard;
