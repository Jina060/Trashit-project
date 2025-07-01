import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPinned,
  CalendarDays,
  Settings,
  UserCheck
} from "lucide-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RightSidebar from '../components/RightSidebar';

const CollectorDashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  return (
    <div className="bg-[#F5FAF7] overflow-hidden flex min-h-[100vh]">
      {/* Sidebar */}
      <aside className="w-full md:w-[230px] bg-[#69E99F]">
        <div className="bg-[#F5FAF7] w-full h-[60px] flex items-center justify-center">
          <img src="/trashlogo.png" alt="Logo" className="w-24 mr-7" />
        </div>

        <ul className="space-y-3 mt-8 px-6">
          <li className="flex items-center space-x-3 bg-[#55B884] hover:bg-green-400 transition-colors rounded-md px-3 py-3 font-medium text-sm text-[#F5FAF7] cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-green-200 transition-colors rounded px-3 py-3 font-medium text-sm text-trashBlue cursor-pointer">
            <CalendarDays className="w-5 h-5" />
            <span>My Schedule</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-green-200 transition-colors rounded px-3 py-3 font-medium text-sm text-trashBlue cursor-pointer">
            <MapPinned className="w-5 h-5" />
            <span>Route Map</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-green-200 transition-colors rounded px-3 py-3 font-medium text-sm text-trashBlue cursor-pointer">
            <UserCheck className="w-5 h-5" />
            <span>Assigned Customers</span>
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
          <h1 className="font-black text-3xl text-trashBlue pl-4 pt-12">Collector Dashboard</h1>
          <input
            type="text"
            placeholder="Search"
            className="w-2/3 md:w-1/2 px-6 py-2 rounded-full border border-gray-300 shadow-inner focus:outline-none text-sm"
          />
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h2 className="text-xl font-bold text-trashBlue mb-4">My Pickup Schedule</h2>
          <div className="w-full max-w-md mx-auto">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="rounded-lg shadow border p-4"
            />
            <p className="mt-4 text-center text-sm text-gray-600">
              Selected Date: {selectedDate?.toDateString()}
            </p>
          </div>
        </div>

        {/* Map Placeholder Section */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold text-trashBlue mb-4">Today's Route</h2>
          <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">Map routing will appear here</p>
          </div>
        </div>
      </main>
      <RightSidebar />
    </div>
  );
};

export default CollectorDashboard;
