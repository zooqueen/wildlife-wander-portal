
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import FilterPanel from "@/components/FilterPanel";
import MapView from "@/components/MapView";
import { FilterOptions, Experience } from "@/types";
import { experiences } from "@/data/experiencesData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Grid3X3, LayoutList } from "lucide-react";

enum ViewMode {
  GRID = 'grid',
  LIST = 'list'
}

const Experiences = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(experiences);

  // Get initial filters from URL parameters
  useEffect(() => {
    const initialFilters: FilterOptions = {};
    
    const continent = searchParams.get("continent");
    if (continent) {
      initialFilters.continent = [continent as any];
    }
    
    const wildlifeType = searchParams.get("wildlifeType");
    if (wildlifeType) {
      initialFilters.wildlifeTypes = [wildlifeType as any];
    }
    
    const search = searchParams.get("search");
    if (search) {
      // In a real app, this would be handled differently
      console.log("Search query:", search);
    }
    
    setFilters(initialFilters);
  }, [searchParams]);

  // Apply filters when they change
  useEffect(() => {
    let results = [...experiences];
    
    // Filter by continent
    if (filters.continent && filters.continent.length > 0) {
      results = results.filter(exp => 
        filters.continent!.includes(exp.location.continent)
      );
    }
    
    // Filter by wildlife types
    if (filters.wildlifeTypes && filters.wildlifeTypes.length > 0) {
      results = results.filter(exp => 
        exp.wildlifeTypes.some(type => filters.wildlifeTypes!.includes(type))
      );
    }
    
    // Filter by volunteer tasks
    if (filters.volunteerTasks && filters.volunteerTasks.length > 0) {
      results = results.filter(exp => 
        exp.volunteerTasks.some(task => filters.volunteerTasks!.includes(task))
      );
    }
    
    // Filter by duration
    if (filters.duration) {
      if (filters.duration.min) {
        results = results.filter(exp => exp.duration.minWeeks >= filters.duration!.min!);
      }
      if (filters.duration.max) {
        results = results.filter(exp => 
          exp.duration.minWeeks <= filters.duration!.max! || 
          (exp.duration.maxWeeks && exp.duration.maxWeeks <= filters.duration!.max!)
        );
      }
    }
    
    // Filter by accessibility (beginner friendly)
    // This is a mock implementation since we don't have this data in our model
    if (filters.accessible) {
      results = results.filter(exp => exp.requirements.length <= 3);
    }
    
    setFilteredExperiences(results);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-4 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Wildlife Volunteer Experiences</h1>
          <p className="text-muted-foreground mb-6">
            Find your perfect wildlife volunteer opportunity from {experiences.length} programs worldwide
          </p>
          
          <MapView experiences={filteredExperiences} />
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter sidebar */}
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              className="md:w-64 shrink-0"
            />
            
            {/* Results area */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Found <span className="font-medium text-foreground">{filteredExperiences.length}</span> experiences
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === ViewMode.GRID ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode(ViewMode.GRID)}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant={viewMode === ViewMode.LIST ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode(ViewMode.LIST)}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              {filteredExperiences.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No experiences match your filters</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters to find more options</p>
                  <Button onClick={() => setFilters({})}>Clear All Filters</Button>
                </div>
              ) : (
                <div className={
                  viewMode === ViewMode.GRID 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-6"
                }>
                  {filteredExperiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Experiences;
