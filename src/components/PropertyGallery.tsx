import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
}

const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  console.log(images)
  const [currentImage, setCurrentImage] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
  };

  if (images?.length === 0) {
    return (
      <div className="bg-slate-100 rounded-lg h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-lg shadow-sm">
        <div className="relative aspect-video md:aspect-[16/9] bg-slate-100 overflow-hidden">
          <img
            src={images[currentImage]}
            alt={`Property view ${currentImage + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={prevImage}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={nextImage}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative cursor-pointer overflow-hidden rounded-md aspect-video ${
                index === currentImage
                  ? "ring-2 ring-estate-primary"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {showFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-white/20 hover:bg-white/30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="relative max-w-6xl max-h-full">
            <img
              src={images[currentImage]}
              alt={`Property view ${currentImage + 1} fullscreen`}
              className="max-w-full max-h-[calc(100vh-2rem)] object-contain"
            />
            
            <Button
              onClick={prevImage}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={nextImage}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImage ? "w-6 bg-white" : "bg-white/30"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;