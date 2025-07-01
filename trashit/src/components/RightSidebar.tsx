import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import ChatbotModal from "./ChatbotModal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ecoTips = [
  "Rinse recyclables before disposal.",
  "Flatten boxes to save space in the bin.",
  "Keep food waste out of recycling bins.",
];

const data = [
  { name: "Mon", pickups: 2 },
  { name: "Tue", pickups: 4 },
  { name: "Wed", pickups: 3 },
  { name: "Thu", pickups: 5 },
  { name: "Fri", pickups: 1 },
  { name: "Sat", pickups: 4 },
  { name: "Sun", pickups: 2 },
];

export default function RightSidebar() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % ecoTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden md:flex w-[280px] bg-[#F5FAF7] p-6 flex-col border-l border-[#D9F1E4]">

      {/* Profile */}
      <div className="flex justify-start pt-2">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="bg-[#D9F2E6] p-4 mt-4 rounded-xl">

      {/* ECO Tips Carousel */}
      <div className="bg-white p-4 rounded-md shadow text-sm">
        <h3 className="font-semibold text-trashGreen text-center">ECO TIPS</h3>
        <p className="text-gray-600 mt-2 text-center transition-all duration-500">
          {ecoTips[tipIndex]}
        </p>
        <div className="flex justify-center mt-2 space-x-1">
          {ecoTips.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === tipIndex ? "bg-trashGreen" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Weekly Pickups Chart */} 
      <div className="bg-[#69E99F] h-[180px] rounded-md mt-6 shadow">
        <h4 className="text-[#F5FAF7] font-semibold text-sm mb-2 text-center">
          Weekly Pickups
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#C4F7D1" />
            <XAxis dataKey="name" stroke="#fff" tick={{ fontSize: 10 }} />
            <YAxis stroke="#fff" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ backgroundColor: '#f0fff4', borderColor: '#34d399' }} />
            <Line type="monotone" dataKey="pickups" stroke="#fff" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chatbot Section */}
      <div className="flex items-center justify-between mt-6">
        <div>
          <p className="text-sm text-gray-500">Need help?</p>
          <p className="text-trashGreen font-semibold">
            <span className="text-trashBlue">Ask </span>TrashBot
          </p>
        </div>
        <button
          onClick={() => setChatbotOpen(true)}
          className="bg-white hover:bg-green-700 text-trashGreen p-4 rounded-full border-trashGreen border-8 shadow-lg transition-all duration-300"
          aria-label="Open Chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
        </div>
    </aside>
  );
}
