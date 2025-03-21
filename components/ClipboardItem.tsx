"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Copy, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ClipboardItemProps {
  title: string;
  content: string;
  onSave?: (newContent: string) => void;
  onDelete?: () => void;
}

export function ClipboardItem({ title, content, onSave, onDelete }: ClipboardItemProps) {
  const [editContent, setEditContent] = useState(content);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleSave = () => {
    onSave?.(editContent);
    setIsOpen(false);
    toast.success("Changes saved successfully!");
  };

  return (
    <Card className="bg-[#1C1927] border-0 hover:bg-[#252131] transition-colors p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1C1927] border-[#252131] text-white">
              <DialogHeader>
                <DialogTitle>Edit Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="bg-[#252131] border-0 text-white min-h-[200px]"
                />
                <Button onClick={handleSave} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-500"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <p className="text-gray-400 text-sm line-clamp-3">{content}</p>
    </Card>
  );
}