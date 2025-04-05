import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFeaturedExperiences } from "@/data/experiencesData";

const Index = () => {
  const featuredExperiences = getFeaturedExperiences();
  const [email, setEmail] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Brutalist Two Column Layout */}
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 brutalist-bg-black brutalist-text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/f0273a25-68e9-408f-aeda-99539ab1c947.png" 
                    alt="Sea Turtle Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Sea Turtle</h1>
                  <h2 className="text-3xl md:text-4xl font-bold">Sanctuary</h2>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-brutalist-yellow text-brutalist-yellow" />
                <span className="text-white font-medium">4.8</span>
                <span className="text-gray-400">(176 Reviews)</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5" />
                <span>Montezuma, Costa Rica</span>
              </div>

              <p className="text-lg mb-8">
                Volunteer on the beautiful Pacific beaches of Montezuma to protect sea turtle nesting sites and newborn hatchlings.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/experiences/1/apply" className="brutalist-yellow-button">
                  APPLY
                </Link>
                <Link to="/experiences/1" className="brutalist-green-button">
                  PROGRAM DETAILS
                </Link>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative bg-blue-500">
            <img 
              src="https://images.unsplash.com/photo-1518877593221-1f28583780b4" 
              alt="Sea Turtle Conservation" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 flex items-center justify-center p-8">
              <div className="brutalist-testimonial text-white max-w-md">
                <p className="text-2xl font-medium italic">
                  "I spent 4 weeks here. It was hard work but I feel so in touch now and couldn't have asked for such an incredible experience. Super grateful for the volunteer opportunity!"
                </p>
                <p className="text-right mt-4 font-medium">-Kara L.</p>
                <div className="brutalist-star text-3xl top-12 right-10">✧</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Make a connection section with circles */}
        <section className="py-16 brutalist-grid-bg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-3xl font-bold">Make an animal connection.</h2>
              <div className="flex items-center">
                <hr className="w-32 border-black mx-4" />
                <ArrowRight className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Save a life.</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="brutalist-bg-green brutalist-connection-circle mx-auto flex items-center justify-center">
                <img 
                  src="/lovable-uploads/9798fac3-1e15-44d8-baec-f36754a5db90.png" 
                  alt="Human hand reaching out" 
                  className="object-cover"
                />
              </div>
              <div className="brutalist-bg-green brutalist-connection-circle mx-auto flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" 
                  alt="Wildlife hand" 
                  className="object-cover"
                />
              </div>
              <div className="brutalist-bg-green brutalist-connection-circle mx-auto flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d" 
                  alt="Wildlife" 
                  className="object-cover"
                />
              </div>
              <div className="brutalist-bg-green brutalist-connection-circle mx-auto flex items-center justify-center">
                <img 
                  src="/lovable-uploads/9798fac3-1e15-44d8-baec-f36754a5db90.png" 
                  alt="Human hand reaching out" 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Email Signup Section */}
        <section className="py-16 brutalist-grid-bg">
          <div className="container mx-auto px-4">
            <div className="brutalist-signup-form max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">EMAIL SIGN UP!</h2>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowRight className="w-6 h-6" />
                    <ArrowRight className="w-6 h-6" />
                    <ArrowRight className="w-6 h-6" />
                    <ArrowRight className="w-6 h-6" />
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full border-2 border-black bg-brutalist-green text-black placeholder:text-black/70"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button className="brutalist-bg-green brutalist-border font-bold px-8 w-full md:w-auto">
                  SUBSCRIBE
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Experiences - Keep grid layout but with brutalist styling */}
        <section className="py-12 md:py-16 brutalist-bg-black brutalist-text-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold uppercase">Featured Experiences</h2>
              <Link to="/experiences">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredExperiences.map((experience) => (
                <Link 
                  key={experience.id} 
                  to={`/experiences/${experience.id}`}
                  className="brutalist-border bg-black group hover:bg-brutalist-blue transition-colors duration-300 p-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden brutalist-border">
                    <img 
                      src={experience.images[0]} 
                      alt={experience.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-brutalist-yellow brutalist-border px-3 py-1">
                      <span className="text-black font-bold">{experience.wildlifeTypes[0]}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-gray-300">{experience.location.city}, {experience.location.country}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-brutalist-yellow text-brutalist-yellow" />
                        <span className="font-medium">{experience.rating}</span>
                        <span className="text-gray-400">({experience.reviewsCount})</span>
                      </div>
                      <div className="text-brutalist-yellow font-bold">
                        ${experience.pricing.amount} <span className="text-sm text-gray-300 font-normal">/ {experience.pricing.period}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
