"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface PostFile {
  uid: string;
  file_name: string;
  file_url: string;
  contentType: string | null;
}

export function ImageCarousel({ images }: { images: PostFile[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomLevel(1);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 1));
  };

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative w-full aspect-square max-h-96 overflow-hidden rounded-lg">
            <Image
              src={images[currentImageIndex].file_url}
              alt={images[currentImageIndex].file_name}
              fill
              className="object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative w-full h-[80vh]">
            <Image
              src={images[currentImageIndex].file_url}
              alt={images[currentImageIndex].file_name}
              fill
              className="object-contain"
              style={{ transform: `scale(${zoomLevel})` }}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="secondary" size="sm" onClick={handleZoomIn}>
                Zoom In
              </Button>
              <Button variant="secondary" size="sm" onClick={handleZoomOut}>
                Zoom Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black/50 px-2 py-1 rounded">
            {currentImageIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}