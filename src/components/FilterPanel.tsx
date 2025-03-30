
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { FilterOptions, WildlifeType, VolunteerTask, Continent } from "@/types";
import { Filter, X } from "lucide-react";

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const FilterPanel = ({ filters, onFilterChange, className = "" }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  
  const wildlifeTypes: WildlifeType[] = ['Big Cats', 'Primates', 'Elephants', 'Marine Life', 'Birds', 'General Wildlife'];
  const volunteerTasks: VolunteerTask[] = ['Food Preparation', 'Habitat Maintenance', 'Animal Rehabilitation', 'Research', 'Education', 'Conservation'];
  const continents: Continent[] = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];

  const handleWildlifeTypeChange = (type: WildlifeType, checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      wildlifeTypes: checked
        ? [...(prev.wildlifeTypes || []), type]
        : (prev.wildlifeTypes || []).filter(t => t !== type)
    }));
  };

  const handleVolunteerTaskChange = (task: VolunteerTask, checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      volunteerTasks: checked
        ? [...(prev.volunteerTasks || []), task]
        : (prev.volunteerTasks || []).filter(t => t !== task)
    }));
  };

  const handleContinentChange = (continent: Continent, checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      continent: checked
        ? [...(prev.continent || []), continent]
        : (prev.continent || []).filter(c => c !== continent)
    }));
  };

  const handleDurationChange = (value: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      duration: {
        min: value[0],
        max: value[1]
      }
    }));
  };

  const handleAccessibleChange = (checked: boolean) => {
    setLocalFilters(prev => ({
      ...prev,
      accessible: checked
    }));
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const resetFilters = () => {
    const resetFilters: FilterOptions = {};
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden sticky top-16 z-30 bg-background p-4 border-b">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </div>
          {(localFilters.wildlifeTypes?.length || localFilters.volunteerTasks?.length || localFilters.continent?.length) && (
            <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {(localFilters.wildlifeTypes?.length || 0) + 
               (localFilters.volunteerTasks?.length || 0) + 
               (localFilters.continent?.length || 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Filter panel - desktop always visible, mobile conditional */}
      <div className={`${className} ${isOpen ? 'fixed inset-0 z-40 bg-background p-4 overflow-auto' : 'hidden md:block'}`}>
        <div className="md:hidden flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Wildlife Types */}
          <div>
            <h3 className="font-medium mb-3">Wildlife Types</h3>
            <div className="space-y-2">
              {wildlifeTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`wildlife-${type}`}
                    checked={localFilters.wildlifeTypes?.includes(type) || false}
                    onCheckedChange={(checked) => handleWildlifeTypeChange(type, !!checked)}
                  />
                  <label htmlFor={`wildlife-${type}`} className="text-sm cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Volunteer Tasks */}
          <div>
            <h3 className="font-medium mb-3">Volunteer Tasks</h3>
            <div className="space-y-2">
              {volunteerTasks.map((task) => (
                <div key={task} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`task-${task}`}
                    checked={localFilters.volunteerTasks?.includes(task) || false}
                    onCheckedChange={(checked) => handleVolunteerTaskChange(task, !!checked)}
                  />
                  <label htmlFor={`task-${task}`} className="text-sm cursor-pointer">
                    {task}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Continents */}
          <div>
            <h3 className="font-medium mb-3">Location</h3>
            <div className="space-y-2">
              {continents.map((continent) => (
                <div key={continent} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`continent-${continent}`}
                    checked={localFilters.continent?.includes(continent) || false}
                    onCheckedChange={(checked) => handleContinentChange(continent, !!checked)}
                  />
                  <label htmlFor={`continent-${continent}`} className="text-sm cursor-pointer">
                    {continent}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Duration */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Duration (weeks)</h3>
              <p className="text-sm text-muted-foreground">
                {localFilters.duration?.min || 1} - {localFilters.duration?.max || 12}+
              </p>
            </div>
            <Slider 
              defaultValue={[localFilters.duration?.min || 1, localFilters.duration?.max || 12]} 
              min={1} 
              max={12} 
              step={1}
              onValueChange={handleDurationChange}
              className="my-6"
            />
          </div>

          <Separator />

          {/* Beginner Friendly */}
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accessible"
                checked={localFilters.accessible || false}
                onCheckedChange={(checked) => handleAccessibleChange(!!checked)}
              />
              <label htmlFor="accessible" className="text-sm cursor-pointer">
                Beginner Friendly
              </label>
            </div>
          </div>

          <div className="pt-6 flex flex-col gap-2">
            <Button onClick={applyFilters} className="w-full">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters} className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
