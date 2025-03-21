"use client";

import { Clipboard, ListTodo, Wand2, ScanText, History, Settings } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: Clipboard, label: "ClipBoards", href: "/" },
  { icon: ListTodo, label: "To-Do List", href: "/todo" },
  { icon: Wand2, label: "AI Modifier", href: "/ai" },
  { icon: ScanText, label: "OCR Scanner", href: "/ocr" },
  { icon: History, label: "Copy History", href: "/history" },
  { icon: Settings, label: "Settings", href: "/settings" }
];

export function Sidebar() {
  return (
    <div className="w-64 bg-[#1C1927] h-screen fixed left-0 top-0 p-4">
      <div className="flex items-center gap-2 px-4 mb-8">
        <Clipboard className="h-6 w-6 text-purple-500" />
        <span className="text-lg font-semibold text-white">AlfaazArchives</span>
      </div>
      
      <nav className="space-y-2">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-[#252131] rounded-lg transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}