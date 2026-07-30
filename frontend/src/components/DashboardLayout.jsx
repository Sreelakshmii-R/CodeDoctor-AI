import StatsSection from "./StatsSection";
import RecentActivity from "./RecentActivity";
import AIInsights from "./AIInsights";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";



function DashboardLayout() {


const [stats, setStats] = useState(null);

useEffect(() => {
  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  loadStats();
}, []);

  return (
    <div className="max-w-7xl mx-auto px-10 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back to CodeDoctor-AI
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor repositories and AI code analysis.
          </p>
        </div>

        
      </div>

      <StatsSection stats={stats} />

      <div className="grid grid-cols-3 gap-6 mt-8">

  <div className="col-span-2">
    <RecentActivity />
  </div>

  <AIInsights />

</div>

    

    </div>
  );
}

export default DashboardLayout;