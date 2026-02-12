
import React, { useEffect, useState } from 'react';
import { User, InsightData } from '../types';
import { getDailyInsight } from '../services/geminiService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const data = await getDailyInsight(user.username);
      setInsight(data);
      setLoading(false);
    };
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-slate-800 flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <i className="fa-solid fa-cube text-white text-sm"></i>
          </div>
          <span className="text-sm font-bold truncate lowercase">make by rohit krause</span>
        </div>

        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl">
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
            <i className="fa-solid fa-robot"></i> AI Models
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
            <i className="fa-solid fa-folder-open"></i> Projects
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
            <i className="fa-solid fa-gear"></i> Settings
          </a>
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-[#020617]/80 backdrop-blur-xl border-bottom border-slate-800 p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Overview</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]"></span>
            </button>
            <div className="flex items-center gap-3 px-3 py-1.5 glass rounded-full">
              <img src={user.avatar} className="w-6 h-6 rounded-full" alt="User" />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* AI Insight Card */}
          <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-600/20">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Daily Insight</span>
                <h3 className="text-3xl font-bold mb-4">Welcome back, {user.username}!</h3>
                
                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-1/2"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-blue-100 text-lg italic mb-2 leading-relaxed">"{insight?.quote}"</p>
                    <p className="text-blue-200 text-sm">— {insight?.author}</p>
                  </>
                )}
              </div>
              
              <div className="w-full md:w-auto">
                <div className="glass bg-white/10 p-6 rounded-2xl w-full md:w-64">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-lightbulb text-yellow-300"></i> Code Tip
                  </h4>
                  <p className="text-sm text-blue-50 text-slate-200">
                    {loading ? "Analyzing workflows..." : insight?.tip}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm">Active Projects</span>
                <i className="fa-solid fa-microchip text-blue-500"></i>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-emerald-400 text-xs mt-2"><i className="fa-solid fa-arrow-up"></i> +2 this month</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm">AI Tokens Used</span>
                <i className="fa-solid fa-brain text-purple-500"></i>
              </div>
              <p className="text-3xl font-bold">4.2M</p>
              <p className="text-slate-500 text-xs mt-2">68% of monthly limit</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm">Average Latency</span>
                <i className="fa-solid fa-bolt text-amber-500"></i>
              </div>
              <p className="text-3xl font-bold">142ms</p>
              <p className="text-emerald-400 text-xs mt-2"><i className="fa-solid fa-arrow-down"></i> -12ms improved</p>
            </div>
          </div>

          {/* Activity Section */}
          <div className="glass rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h4 className="font-semibold">Recent Activity</h4>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>
            <div className="divide-y divide-slate-800">
              {[
                { action: 'Deployed new endpoint', time: '2 hours ago', icon: 'fa-cloud-arrow-up', color: 'text-blue-400' },
                { action: 'Updated model weights', time: '5 hours ago', icon: 'fa-weight-hanging', color: 'text-purple-400' },
                { action: 'Database optimized', time: 'Yesterday', icon: 'fa-database', color: 'text-amber-400' },
              ].map((item, i) => (
                <div key={i} className="p-6 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${item.color}`}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
