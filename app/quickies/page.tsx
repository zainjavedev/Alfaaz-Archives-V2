"use client";

import { useState } from "react";
import { Plus, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClipboardItem } from "@/components/ClipboardItem";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const initialTemplates = [
  {
    id: 1,
    title: "Cold Outreach - HR",
    content: "Hi there, are you aiming to attract top talent to your organization? An engaging social media presence can make all the difference in today's competitive job market..."
  },
  {
    id: 2,
    title: "Cold Outreach - Healthcare",
    content: "Hello [Name], having a strong social media presence helps healthcare providers build trust and credibility with potential patients. I noticed your profiles could use some optimization..."
  },
  {
    id: 3,
    title: "Cold Outreach - Banking",
    content: "Hello [Name], in today's digital world, a strong social media presence is crucial for financial institutions to connect with their customers and build trust..."
  },
  {
    id: 4,
    title: "Cold Outreach - Education",
    content: "Hi [Name], I specialize in helping educational institutions enhance their digital presence and engage with students, parents, and alumni effectively..."
  },
  {
    id: 5,
    title: "Cold Outreach - Real Estate",
    content: "Hi there, I noticed your real estate agency's social media presence could benefit from some professional optimization to attract more potential buyers and sellers..."
  }
];

export default function EmailPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTemplate, setNewTemplate] = useState({ title: "", content: "" });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleSave = (id: number, newContent: string) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, content: newContent } : template
    ));
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast.success("Template deleted successfully!");
  };

  const handleAdd = () => {
    if (!newTemplate.title || !newTemplate.content) {
      toast.error("Please fill in all fields");
      return;
    }

    const newId = Math.max(...templates.map(t => t.id)) + 1;
    setTemplates([...templates, { ...newTemplate, id: newId }]);
    setNewTemplate({ title: "", content: "" });
    setIsAddDialogOpen(false);
    toast.success("New template added successfully!");
  };

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#13111C]">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Place for Your Quick Texts</h1>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search templates"
                className="px-4 py-2 pl-10 bg-[#1C1927] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Template
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1C1927] border-[#252131] text-white">
                <DialogHeader>
                  <DialogTitle>Add New Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Template Title"
                    value={newTemplate.title}
                    onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                    className="bg-[#252131] border-0 text-white"
                  />
                  <Textarea
                    placeholder="Template Content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                    className="bg-[#252131] border-0 text-white min-h-[200px]"
                  />
                  <Button onClick={handleAdd} className="w-full">
                    Add Template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <ClipboardItem
              key={template.id}
              title={template.title}
              content={template.content}
              onSave={(newContent) => handleSave(template.id, newContent)}
              onDelete={() => handleDelete(template.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}