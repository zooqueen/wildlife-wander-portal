
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">WildlifeWander</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Connecting passionate volunteers with impactful wildlife conservation experiences worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/experiences" className="text-muted-foreground hover:text-foreground transition-colors">Browse Experiences</Link></li>
              <li><Link to="/locations" className="text-muted-foreground hover:text-foreground transition-colors">Locations</Link></li>
              <li><Link to="/wildlife-types" className="text-muted-foreground hover:text-foreground transition-colors">Wildlife Types</Link></li>
              <li><Link to="/featured" className="text-muted-foreground hover:text-foreground transition-colors">Featured Programs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Our Mission</Link></li>
              <li><Link to="/ethics" className="text-muted-foreground hover:text-foreground transition-colors">Ethical Guidelines</Link></li>
              <li><Link to="/impact" className="text-muted-foreground hover:text-foreground transition-colors">Measuring Impact</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/partnerships" className="text-muted-foreground hover:text-foreground transition-colors">Partnerships</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WildlifeWander. All rights reserved.
          </p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
