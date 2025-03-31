
import { useState, useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFeatured } from "@/modules/properties/hooks/useFeatured";

// const featuredProperties = [
//   {
//     _id: "1",
//     title: "Ático de lujo con vistas panorámicas",
    
//     location: {
//       country: "Mexico",
//       city: "Polanco",
//       address: "Polanco - Mexico"
//     },
//     price: 3500000,
//     images: ["https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp"],
//     bedrooms: 3,
//     bathrooms: 2,
//     area: 150,
//     featured: true,
//     isNew: true,
//   },
//   {
//     _id: "2",
//     title: "Apartamento moderno en zona exclusiva",
//     location: {
//       country: "Mexico",
//       city: "Condesa",
//       address: "Condesa - Mexico"
//     },
//     price: 2200000,
//     images: ["https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp"],
//     bedrooms: 2,
//     bathrooms: 2,
//     area: 120,
//     isNew: true,
//     featured: false,
//   },
//   {
//     _id: "3",
//     title: "Penthouse con terraza privada",
//     location: {
//       country: "Mexico",
//       city: "Santa Fé",
//       address: "Santa Fé - Mexico"
//     },
//     price: 4100000,
//     images: ["https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp"],
//     bedrooms: 4,
//     bathrooms: 3,
//     area: 220,
//     featured: true,
//     isNew: false,
//   },
//   {
//     _id: "4",
//     title: "Apartamento con diseño contemporáneo",
//     location: {
//       country: "Mexico",
//       city: "Roma Norte",
//       address: "Roma Norte - Mexico"
//     },
//     price: 1900000,
//     images: ["https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp"],
//     bedrooms: 2,
//     bathrooms: 1,
//     area: 95,
//     isNew: true,
//     featured: true,
//   },
//   {
//     _id: "5",
//     title: "Dúplex con amenidades exclusivas",
//     location: {
//       country: "Mexico",
//       city: "Tijuana",
//       address: "Tijuana - Mexico"
//     },
//     price: 5200000,
//     images: ["https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp"],
//     bedrooms: 4,
//     bathrooms: 3,
//     area: 280,
//     featured: true,
//     isNew: true,
//   },
// ];

const PropertiesCarousel = () => {
  const { data } = useFeatured();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsToShow = 3;
  const carouselRef = useRef<HTMLDivElement>(null);
  // Responsive settings
  const [slideItems, setSlideItems] = useState(itemsToShow);
  const slideCount = Math.ceil((data?.length ?? 0) / slideItems);
  
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlideItems(1);
      } else if (window.innerWidth < 1024) {
        setSlideItems(2);
      } else {
        setSlideItems(itemsToShow);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isPaused, slideCount]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${activeIndex * 100/slideCount}%)`;
    }
  }, [activeIndex]);

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ width: `${slideCount * 100}%` }}
      >
        {Array.from({ length: slideCount }).map((_, slideIndex) => (
          <div 
            key={slideIndex}
            style={{ width: `${100 / slideCount}%` }}
          >
            <div className="flex flex-wrap">
              {data?.slice(
                  slideIndex * slideItems,
                  (slideIndex + 1) * slideItems
                )
                .map((property) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const {contractType, ...propertyFormated} = property || {}
                  return (
                    <div
                      key={property?._id}
                      className="w-full sm:w-1/2 lg:w-1/3 p-4"
                      style={{ 
                        width: `${100 / Math.min(slideItems, data?.length - (slideIndex * slideItems))}%` 
                      }}
                    >
                      <PropertyCard {...propertyFormated} />
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={prevSlide}
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        onClick={nextSlide}
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-estate-primary" : "bg-estate-primary/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesCarousel;
