import {
  FolderGit2,
  BrainCircuit,
  ShieldCheck,
  Bug,
} from "lucide-react";

function StatsSection({ stats }) {
  const cards = [
    {
      title: "Repositories",
      value: stats?.repositories ?? "...",
      icon: FolderGit2,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "AI Reviews",
      value: stats?.analyses ?? "...",
      icon: BrainCircuit,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Security Score",
      value: `${stats?.security_score ?? "..."}%`,
      icon: ShieldCheck,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Issues Found",
      value: stats?.issues ?? "...",
      icon: Bug,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              p-6
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
            "
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3 text-slate-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${item.color}
                `}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsSection;