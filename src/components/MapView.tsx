
import { useState, useEffect, useRef } from "react";
import { Experience } from "@/types";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

interface MapViewProps {
  experiences: Experience[];
  onSelectExperience?: (experienceId: string) => void;
}

const MapView = ({ experiences, onSelectExperience }: MapViewProps) => {
  const [showMap, setShowMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMap || !mapContainerRef.current) return;

    // In a real application, you would initialize a map library here
    // For this demo, we'll just show a placeholder
    console.log("Map would initialize with", experiences.length, "markers");

  }, [showMap, experiences]);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="mb-4 flex items-center gap-2"
        onClick={() => setShowMap(!showMap)}
      >
        <Map className="h-4 w-4" />
        <span>{showMap ? "Hide Map" : "Show Map"}</span>
      </Button>

      {showMap && (
        <div 
          ref={mapContainerRef}
          className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center mb-6"
        >
          <div className="text-center p-6">
            <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
            <p className="text-muted-foreground mb-4">
              In a real application, this would display an interactive map with markers for each experience location.
            </p>
            <p className="text-sm">
              Found {experiences.length} experiences across {new Set(experiences.map(e => e.location.continent)).size} continents
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
