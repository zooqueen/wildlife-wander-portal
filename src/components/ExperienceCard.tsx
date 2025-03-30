
import { Link } from "react-router-dom";
import { Experience } from "@/types";
import { Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { id, title, location, images, description, wildlifeTypes, pricing, rating, reviewsCount } = experience;
  
  return (
    <Link to={`/experiences/${id}`} className="experience-card group block rounded-xl overflow-hidden shadow-sm border hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
          <Badge variant="secondary" className="rounded-full">
            {wildlifeTypes[0]}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span>{rating}</span>
            <span className="text-muted-foreground">({reviewsCount})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{location.city}, {location.country}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="pt-2 flex items-center justify-between border-t border-border">
          <p className="font-medium">
            ${pricing.amount} <span className="text-sm text-muted-foreground font-normal">/ {pricing.period}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
