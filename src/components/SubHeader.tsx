import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  LayoutGrid, 
  Bookmark, 
  Volume2, 
  Settings2, 
  FileText,
  ChevronDown 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SubHeader() {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-[52px] sm:top-[57px] z-40">
      <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Left: Title and Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <h1 className="text-base sm:text-lg font-bold">Pulse</h1>
              <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7">
                <div className="flex gap-0.5">
                  <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-primary rounded-sm" />
                  <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-primary/60 rounded-sm" />
                  <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-primary/30 rounded-sm" />
                </div>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm border-2 border-warning bg-warning/20" />
              </Button>
            </div>
          </div>

          {/* Right: Display Options */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 hidden md:flex">
              <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 sm:h-8 gap-0.5 sm:gap-1 px-2 sm:px-3">
                  <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm hidden sm:inline">Display</span>
                  <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Card View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  List View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
              <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>

            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 hidden lg:flex">
              <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>

            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
              <Settings2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>

            <div className="hidden lg:flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2">
              <Button variant="ghost" size="sm" className="h-7 sm:h-8 gap-0.5 sm:gap-1 px-2 sm:px-3">
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">1</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-7 sm:h-8 gap-0.5 sm:gap-1 px-2 sm:px-3">
                <div className="flex gap-0.5">
                  <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-success rounded-sm" />
                  <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-success/60 rounded-sm" />
                  <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-success/30 rounded-sm" />
                </div>
                <span className="text-xs sm:text-sm">0</span>
                <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-50" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
