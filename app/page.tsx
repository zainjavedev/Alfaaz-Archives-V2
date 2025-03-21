"use client";

import { Card } from "@/components/ui/card";
import { Plus, Mail, Webhook, Bot, FileText, Ship, Key, Rocket, BookOpen, Linkedin, Youtube, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const items = [
    { icon: Plus, label: "Add ClipBoard", color: "text-purple-500", href: "/" },
    { icon: Webhook , label: "Quickeis", color: "text-blue-500", href: "/quickies" },
  ];

  return (
    <div className="min-h-screen bg-[#13111C]">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">ClipBoards</h1>
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="px-4 py-2 pl-10 bg-[#1C1927] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card
                className="bg-[#1C1927] border-0 hover:bg-[#252131] transition-colors cursor-pointer p-6 flex flex-col items-center justify-center gap-3 aspect-square"
              >
                <item.icon className={`h-10 w-10 ${item.color}`} />
                <span className="text-sm text-gray-200 text-center">{item.label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}