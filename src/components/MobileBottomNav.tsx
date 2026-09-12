import React from "react";
import { BookOpen, Award, Wrench, MapPin, Bot, FileText, Radio, FileCheck, Mic } from "lucide-react";

interface MobileBottomNavProps {
  activeTab: "curriculum" | "exam" | "tools" | "maps" | "legal" | "ai" | "docai" | "podcast" | "simulation";
  setActiveTab: (tab: "curriculum" | "exam" | "tools" | "maps" | "legal" | "ai" | "docai" | "podcast" | "simulation") => void;
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
      id: "simulation" as const,
      label: "Tiếp dân AI",
      icon: Mic,
    },
    {
      id: "podcast" as const,
      label: "Podcast",
      icon: Radio,
    },
    {
      id: "docai" as const,
      label: "Soát VB",
      icon: FileCheck,
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
      id: "ai" as const,
      label: "Trợ lý",
      icon: Bot,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-1 py-1 pb-safe">
      <div className="grid grid-cols-7 items-center justify-around gap-0.5 max-w-lg mx-auto">
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
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all cursor-pointer min-h-[46px] ${
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
                <Icon className={`w-4 h-4 ${isActive ? "text-red-700 stroke-[2.3]" : "text-slate-500 stroke-[1.8]"}`} />
              </div>
              <span className="text-[9px] leading-tight tracking-tight mt-0.5 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
