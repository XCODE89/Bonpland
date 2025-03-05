
import React, { useState, useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredProperties = [
  {
    id: 1,
    title: "Ático de lujo con vistas panorámicas",
    location: "Polanco, Ciudad de México",
    price: "$3,500,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 3,
    baths: 2,
    sqft: 150,
    featured: true,
  },
  {
    id: 2,
    title: "Apartamento moderno en zona exclusiva",
    location: "Condesa, Ciudad de México",
    price: "$2,200,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 2,
    baths: 2,
    sqft: 120,
    isNew: true,
  },
  {
    id: 3,
    title: "Penthouse con terraza privada",
    location: "Santa Fe, Ciudad de México",
    price: "$4,100,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 4,
    baths: 3,
    sqft: 220,
    featured: true,
  },
  {
    id: 4,
    title: "Apartamento con diseño contemporáneo",
    location: "Roma Norte, Ciudad de México",
    price: "$1,900,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 2,
    baths: 1,
    sqft: 95,
    isNew: true,
  },
  {
    id: 5,
    title: "Dúplex con amenidades exclusivas",
    location: "Lomas de Chapultepec, CDMX",
    price: "$5,200,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 4,
    baths: 3,
    sqft: 280,
    featured: true,
  },
];

const PropertiesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsToShow = 3;
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideCount = Math.ceil(featuredProperties.length / itemsToShow);
  
  // Responsive settings
  const [slideItems, setSlideItems] = useState(itemsToShow);
  
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
      carouselRef.current.style.transform = `translateX(-${activeIndex * 100}%)`;
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
            className="flex"
            style={{ width: `${100 / slideCount}%` }}
          >
            <div className="flex flex-wrap">
              {featuredProperties
                .slice(
                  slideIndex * slideItems,
                  (slideIndex + 1) * slideItems
                )
                .map((property) => (
                  <div
                    key={property.id}
                    className="w-full sm:w-1/2 lg:w-1/3 p-4"
                    style={{ 
                      width: `${100 / Math.min(slideItems, featuredProperties.length - (slideIndex * slideItems))}%` 
                    }}
                  >
                    <PropertyCard {...property} />
                  </div>
                ))}
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
