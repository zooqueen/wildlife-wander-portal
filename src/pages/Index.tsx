
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { getFeaturedExperiences } from "@/data/experiencesData";
import { Continent, WildlifeType } from "@/types";

const Index = () => {
  const featuredExperiences = getFeaturedExperiences();
  const [searchQuery, setSearchQuery] = useState("");
  
  const continents: Continent[] = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
  const wildlifeTypes: WildlifeType[] = ['Big Cats', 'Primates', 'Elephants', 'Marine Life', 'Birds', 'General Wildlife'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-hero-pattern hero-section py-20 md:py-32 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
              Make a Difference with Wildlife Conservation
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-up">
              Find meaningful volunteer experiences at wildlife sanctuaries around the world
            </p>
            
            <div className="max-w-md mx-auto bg-white rounded-full flex overflow-hidden shadow-lg animate-slide-up">
              <Input 
                placeholder="Search wildlife experiences..." 
                className="flex-1 border-none rounded-l-full focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link to={`/experiences?search=${searchQuery}`}>
                <Button className="rounded-r-full px-6">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Experiences */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">Featured Experiences</h2>
              <Link to="/experiences">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Browse by Continent */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Browse by Continent</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {continents.map((continent) => (
                <Link 
                  key={continent} 
                  to={`/experiences?continent=${continent}`}
                  className="aspect-square bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center p-4 text-center"
                >
                  <span className="text-2xl mb-2">
                    {continent === 'Africa' ? '🌍' : 
                     continent === 'Asia' ? '🌏' : 
                     continent === 'Europe' ? '🌍' :
                     continent === 'North America' ? '🌎' :
                     continent === 'South America' ? '🌎' : '🌏'}
                  </span>
                  <span className="font-medium">{continent}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Browse by Wildlife Type */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Browse by Wildlife Type</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wildlifeTypes.map((type) => (
                <Link 
                  key={type} 
                  to={`/experiences?wildlifeType=${type}`}
                  className="bg-accent rounded-lg overflow-hidden group relative hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[2/1] p-6 flex items-center justify-center">
                    <h3 className="text-xl font-semibold text-accent-foreground z-10">{type}</h3>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/30 opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Volunteer */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
              Why Volunteer with Wildlife?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 text-xl">
                  🌏
                </div>
                <h3 className="text-xl font-semibold mb-2">Make a Real Impact</h3>
                <p className="text-muted-foreground">
                  Help conserve endangered species and their habitats through direct, hands-on work that makes a measurable difference.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 text-xl">
                  🧠
                </div>
                <h3 className="text-xl font-semibold mb-2">Gain Valuable Skills</h3>
                <p className="text-muted-foreground">
                  Learn about wildlife care, conservation techniques, and environmental management from experienced professionals.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 text-xl">
                  ❤️
                </div>
                <h3 className="text-xl font-semibold mb-2">Unforgettable Experience</h3>
                <p className="text-muted-foreground">
                  Create meaningful connections with wildlife, local communities, and fellow volunteers from around the world.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/about">
                <Button size="lg">Learn More About Our Mission</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
