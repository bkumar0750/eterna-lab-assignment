import { Search, Bell, Star, Wallet, ChevronDown, User, Settings, LogOut, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "@/components/NavLink";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-background rotate-45" />
              </div>
              <span className="text-base sm:text-lg font-bold">AXIOM</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">Pro</span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink to="/" className="px-3 py-1.5 text-sm hover:text-foreground transition-colors">
                Discover
              </NavLink>
              <NavLink 
                to="/" 
                className="px-3 py-1.5 text-sm text-primary bg-primary/10 rounded-md font-medium"
                activeClassName="text-primary bg-primary/10"
              >
                Pulse
              </NavLink>
              <NavLink to="/trackers" className="px-3 py-1.5 text-sm hover:text-foreground transition-colors">
                Trackers
              </NavLink>
              <NavLink to="/perpetuals" className="px-3 py-1.5 text-sm hover:text-foreground transition-colors">
                Perpetuals
              </NavLink>
              <NavLink to="/yield" className="px-3 py-1.5 text-sm hover:text-foreground transition-colors">
                Yield
              </NavLink>
              <NavLink to="/vision" className="px-3 py-1.5 text-sm hover:text-foreground transition-colors">
                Vision
              </NavLink>
              <NavLink to="/portfolio" className="px-3 py-1.5 text-sm hover:text-foreground transition-colors">
                Portfolio
              </NavLink>
            </nav>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-xs sm:max-w-md relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-7 sm:pl-10 pr-7 sm:pr-10 h-8 sm:h-9 bg-secondary/50 border-border focus:bg-secondary text-xs sm:text-sm"
            />
            <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              /
            </kbd>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* SOL Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 sm:h-9 gap-0.5 sm:gap-1 px-1.5 sm:px-3">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">SOL</span>
                  </div>
                  <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-blue-400" />
                    Solana
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
                    Ethereum
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-400 to-amber-400" />
                    Base
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Deposit Button */}
            <Button size="sm" className="h-7 sm:h-9 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-2 sm:px-3 text-xs sm:text-sm">
              <span className="hidden sm:inline">Deposit</span>
              <span className="sm:hidden">+</span>
            </Button>

            {/* Star Icon */}
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-9 sm:w-9 hidden md:flex">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-9 sm:w-9 relative hidden md:flex">
              <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-destructive rounded-full" />
            </Button>

            {/* Wallet */}
            <Button variant="ghost" size="sm" className="h-7 sm:h-9 gap-1 sm:gap-2 px-1.5 sm:px-3 hidden lg:flex">
              <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">0</span>
            </Button>

            {/* Balance Display */}
            <Button variant="ghost" size="sm" className="h-7 sm:h-9 gap-1 sm:gap-2 px-1.5 sm:px-3 hidden lg:flex">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-emerald-400 to-green-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">0</span>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-9 sm:w-9 rounded-full">
                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 sm:w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">My Account</p>
                    <p className="text-xs text-muted-foreground">trader@axiom.trade</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Watchlist
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
