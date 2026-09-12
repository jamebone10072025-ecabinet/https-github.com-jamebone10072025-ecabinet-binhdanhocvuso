import React from "react";
import { BookOpen, Award, Wrench, MapPin, Bot, FileText } from "lucide-react";

interface MobileBottomNavProps {
  activeTab: "curriculum" | "exam" | "tools" | "maps" | "legal" | "ai";
  setActiveTab: (tab: "curriculum" | "exam" | "tools" | "maps" | "legal" | "ai") => void;
  onOpenLegal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenLegal,
}) => {
  const navItems = [
    {
      id: "curriculum" as const,
      label: "Học tập",
      icon: BookOpen,
    },
    {
      id: "exam" as const,
      label: "Sát hạch",
      icon: Award,
    },
    {
      id: "tools" as const,
      label: "Công cụ",
      icon: Wrench,
    },
    {
      id: "maps" as const,
      label: "Bản đồ",
      icon: MapPin,
    },
    {
      id: "ai" as const,
      label: "Trợ lý AI",
      icon: Bot,
    },
  ];

  return (
    <div className="md:hidden bg-white/95 border-t border-slate-200/90 shadow-sm px-2 py-1.5 mt-4">
      <div className="grid grid-cols-5 items-center justify-around gap-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                isActive
                  ? "text-red-700 font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-all ${
                  isActive ? "bg-red-50 text-red-700" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-red-700 stroke-[2.3]" : "text-slate-500 stroke-[1.8]"}`} />
              </div>
              <span className="text-[10px] leading-tight tracking-tight mt-0.5 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
