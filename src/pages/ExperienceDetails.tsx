import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getExperienceById } from "@/data/experiencesData";
import { Experience } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, ChevronRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExperienceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchedExperience = getExperienceById(id);
      if (fetchedExperience) {
        setExperience(fetchedExperience);
      }
    }
  }, [id]);

  const handleApply = () => {
    setIsApplying(true);
    
    // In a real app, this would submit an application
    setTimeout(() => {
      setIsApplying(false);
      toast({
        title: "Application submitted!",
        description: "The sanctuary will review your application and contact you soon.",
      });
    }, 1500);
  };

  if (!experience) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Experience not found</h2>
            <p className="text-gray-400 mb-6">The experience you're looking for doesn't exist or has been removed.</p>
            <Link to="/experiences">
              <Button variant="secondary">Browse All Experiences</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/experiences" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to all experiences</span>
          </Link>
        </div>
        
        {/* Hero section with images */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <img 
                src={experience.images[0]} 
                alt={experience.title} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {experience.images.slice(1, 3).map((image, index) => (
                <img 
                  key={index} 
                  src={image}
                  alt={`${experience.title} ${index + 2}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
              ))}
              {experience.images.length <= 1 && (
                <>
                  <div className="bg-gray-800 rounded-lg"></div>
                  <div className="bg-gray-800 rounded-lg"></div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.wildlifeTypes.map((type) => (
              <Badge key={type} variant="outline" className="bg-gray-800 text-white/80">
                {type}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
          
          <div className="flex items-center gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{experience.location.city}, {experience.location.country}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span>{experience.rating} ({experience.reviewsCount} reviews)</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>
                {experience.duration.minWeeks} - {experience.duration.maxWeeks || '12+'} weeks
              </span>
            </div>
          </div>
        </div>
        
        {/* Main content and sidebar */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-5 bg-gray-900">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">Overview</TabsTrigger>
                  <TabsTrigger value="wildlife" className="data-[state=active]:bg-gray-700">Wildlife</TabsTrigger>
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-gray-700">Tasks</TabsTrigger>
                  <TabsTrigger value="ethics" className="data-[state=active]:bg-gray-700">Ethics</TabsTrigger>
                  <TabsTrigger value="requirements" className="data-[state=active]:bg-gray-700">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-gray-300 mb-6">{experience.overview}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Impact</h3>
                  <p className="text-gray-300 mb-6">{experience.impact}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Location</h3>
                  <div className="bg-gray-900 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500 text-center p-4">
                      Interactive map would be displayed here in a real application
                    </p>
                  </div>
                  <p className="text-gray-300">
                    {experience.location.city}, {experience.location.country} in {experience.location.continent}
                  </p>
                </TabsContent>
                
                <TabsContent value="wildlife" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Wildlife Types</h2>
                  <p className="text-gray-300 mb-6">
                    This sanctuary focuses on the conservation and rehabilitation of:
                  </p>
                  
                  <ul className="space-y-4 mb-6">
                    {experience.wildlifeTypes.map((type) => (
                      <li key={type} className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">{type}</h3>
                          <p className="text-gray-300 text-sm">
                            {type === 'Big Cats' && 'Including lions, tigers, cheetahs, and other endangered feline species.'}
                            {type === 'Primates' && 'Including various monkey species, apes, and lemurs.'}
                            {type === 'Elephants' && 'Asian elephants rescued from tourism and logging industries.'}
                            {type === 'Marine Life' && 'Sea turtles, coral reefs, and various marine ecosystems.'}
                            {type === 'Birds' && 'Various native and migratory bird species.'}
                            {type === 'General Wildlife' && 'A diverse range of animals including mammals, reptiles, and amphibians.'}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="tasks" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Volunteer Tasks</h2>
                  <p className="text-gray-300 mb-6">
                    As a volunteer, you'll participate in a variety of tasks that directly support 
                    the sanctuary's work. These may include:
                  </p>
                  
                  <ul className="space-y-4">
                    {experience.volunteerTasks.map((task) => (
                      <li key={task} className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">{task}</h3>
                          <p className="text-gray-300 text-sm">
                            {task === 'Food Preparation' && 'Preparing and distributing food for animals according to dietary requirements.'}
                            {task === 'Habitat Maintenance' && 'Cleaning enclosures, maintaining enrichment structures, and ensuring a safe environment.'}
                            {task === 'Animal Rehabilitation' && 'Assisting with care for injured or rescued animals under professional supervision.'}
                            {task === 'Research' && 'Collecting data, monitoring behavior, and supporting ongoing conservation studies.'}
                            {task === 'Education' && 'Participating in or supporting educational programs for visitors and local communities.'}
                            {task === 'Conservation' && 'Contributing to habitat restoration, anti-poaching initiatives, or other conservation efforts.'}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="ethics" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Ethical Considerations</h2>
                  <p className="text-gray-300 mb-6">{experience.ethicalConsiderations}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">Our Commitment</h3>
                  <p className="text-gray-300 mb-6">
                    All sanctuaries in our network adhere to strict ethical guidelines that prioritize animal welfare above all else. 
                    We regularly audit our partner organizations to ensure compliance with international standards for wildlife care and conservation.
                  </p>
                </TabsContent>
                
                <TabsContent value="requirements" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Requirements & Eligibility</h2>
                  <p className="text-gray-300 mb-6">
                    To participate in this volunteer program, you'll need to meet the following requirements:
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {experience.requirements.map((requirement, index) => (
                      <li key={index} className="flex gap-2">
                        <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-3">Visa Information</h3>
                  <p className="text-gray-300">
                    Most volunteers will need a tourist visa for {experience.location.country}. Our team will provide 
                    guidance on visa requirements after your application is approved.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-900 border-gray-800 border rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-bold mb-2">
                  ${experience.pricing.amount} <span className="text-sm font-normal text-gray-400">/ {experience.pricing.period}</span>
                </h3>
                
                <p className="text-gray-400 mb-6">
                  Includes accommodation, meals, training, and program support
                </p>
                
                <Separator className="mb-6 bg-gray-700" />
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium">Duration</h4>
                    <p className="text-gray-400">
                      {experience.duration.minWeeks} - {experience.duration.maxWeeks || '12+'} weeks
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Start Dates</h4>
                    <p className="text-gray-400">Flexible, year-round availability</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Group Size</h4>
                    <p className="text-gray-400">Maximum 10 volunteers</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4 bg-gray-700 hover:bg-gray-600 text-white" 
                  size="lg"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? "Processing..." : "Apply Now"}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  No commitment • Free cancellation up to 30 days before start date
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExperienceDetails;
