
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#33C3F0] py-6">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-black font-bold text-3xl">
          ZOO CONNECT
        </Link>

        <div className="hidden md:flex items-center gap-6 text-black">
          <Link to="/donate" className="hover:underline font-medium">Donate.</Link>
          <span className="text-lg">·</span>
          <Link to="/experiences" className="hover:underline font-medium">Browse Experiences.</Link>
        </div>
        
        <div>
          <Link to="/login" className="text-black font-medium hover:underline">Log In</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
