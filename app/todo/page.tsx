"use client";

import { Card } from "@/components/ui/card";

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-[#13111C]">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-8">To-Do List</h1>
        <Card className="bg-[#1C1927] border-0 p-6">
          <p className="text-gray-400">To-do list content coming soon</p>
        </Card>
      </div>
    </div>
  );
}