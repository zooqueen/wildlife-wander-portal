
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline">WildlifeWander</span>
          </Link>
        </div>

        <div className={`transition-all duration-300 ${isSearchExpanded ? 'w-full md:w-1/2 mx-4' : 'w-auto'}`}>
          {isSearchExpanded ? (
            <div className="relative w-full">
              <Input 
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200"
                placeholder="Search for wildlife experiences..." 
                autoFocus
                onBlur={() => setIsSearchExpanded(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="rounded-full hidden md:flex items-center gap-2"
              onClick={() => setIsSearchExpanded(true)}
            >
              <Search className="h-4 w-4" />
              <span>Search experiences</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/experiences">
            <Button variant="ghost" className="hidden md:inline-block">
              Browse All
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Users className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/login" className="w-full cursor-pointer">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="w-full cursor-pointer">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
