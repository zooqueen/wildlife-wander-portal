
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#33C3F0] flex flex-col">
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-black font-bold text-3xl">ZOO CONNECT</div>
        
        <div className="hidden md:flex items-center gap-6 text-black">
          <Link to="/donate" className="hover:underline font-medium">Donate.</Link>
          <span className="text-lg">·</span>
          <Link to="/experiences" className="hover:underline font-medium">Browse Experiences.</Link>
        </div>
        
        <div>
          <Link to="/login" className="text-black font-medium hover:underline">Log In</Link>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/2 relative">
          <img 
            src="/lovable-uploads/f4faa93f-ae28-4c52-ad24-55267af6c9fa.png" 
            alt="Zoo Connect Globe" 
            className="w-full max-w-[600px] mx-auto"
          />
        </div>
        
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-8">
            Volunteer, Travel,<br /> 
            Preserve and Connect!
          </h1>
          
          <Link to="/experiences">
            <Button className="bg-green-500 text-black uppercase font-bold text-2xl px-8 py-6 h-auto border-2 border-black relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              GET OFF-GRID
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
