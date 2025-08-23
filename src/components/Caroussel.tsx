"use client";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

// Définition d'un type pour les éléments du carrousel
interface CarouselItem {
  color: string;
}

interface CarouselProps {
  scrollDirection?: "up" | "down"; // Prop pour définir la direction du défilement
  startDelay?: number; // Délai initial en millisecondes avant le début du défilement
  images?: (keyof typeof IMAGES)[];
}

const Carousel: React.FC<CarouselProps> = ({
  scrollDirection = "down",
  startDelay = 0,
  images,
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [_, setCurrentIndex] = useState<number>(0);

  // Définition des éléments du carrousel
  const items: CarouselItem[] = [
    { color: "bg-black" },
    { color: "bg-red-500" },
    { color: "bg-violet-500" },
    { color: "bg-green-500" },
    { color: "bg-orange-500" },
    { color: "bg-yellow-500" },
    { color: "bg-red-500" },
    { color: "bg-gray-500" },
    { color: "bg-blue-500" },
    { color: "bg-indigo-500" },
    { color: "bg-purple-500" },
    { color: "bg-pink-500" },
    { color: "bg-gray-500" },
    { color: "bg-green-500" },
    { color: "bg-orange-500" },
    { color: "bg-yellow-500" },
    { color: "bg-red-500" },
    { color: "bg-violet-500" },
    { color: "bg-gray-500" },
    { color: "bg-green-500" },
    { color: "bg-yellow-500" },
    { color: "bg-red-500" },
    { color: "bg-violet-500" },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    const totalItems = images ? images.length : items.length;
    const itemHeight = 700 / 3; // Hauteur d'un élément (1/3 de la hauteur totale)
    const delay = 600; // Délai entre les défilements (en millisecondes)

    const startTimeout = setTimeout(() => {
      const scrollInterval = setInterval(() => {
        if (slider) {
          setCurrentIndex((prevIndex) => {
            let newIndex: number;

            if (scrollDirection === "down") {
              newIndex = prevIndex + 1;

              if (newIndex >= totalItems - 2) {
                // Lorsque le dernier élément est visible, défiler complètement vers le bas
                slider.scrollTo({
                  top: (totalItems - 3) * itemHeight,
                  behavior: "smooth",
                });

                setTimeout(() => {
                  // Puis revenir au début
                  slider.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setCurrentIndex(0);
                }, delay);

                return newIndex;
              }
            } else {
              newIndex = prevIndex - 1;

              if (newIndex < 0) {
                // Lorsque le premier élément est atteint, défiler complètement vers le haut
                slider.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

                setTimeout(() => {
                  // Puis revenir à la fin
                  slider.scrollTo({
                    top: (totalItems - 3) * itemHeight,
                    behavior: "smooth",
                  });
                  setCurrentIndex(totalItems - 3);
                }, delay);

                return newIndex;
              }
            }

            slider.scrollTo({
              top: newIndex * itemHeight,
              behavior: "smooth",
            });

            return newIndex;
          });
        }
      }, delay);

      return () => clearInterval(scrollInterval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [items.length, scrollDirection, startDelay, images]);

  return (
    <div className="h-[700px] overflow-hidden relative w-full">
      <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div ref={sliderRef} className="h-full overflow-y-hidden relative ">
        {images &&
          images.map((image, index) => (
            <div key={index} className={`h-[233.33px] p-4`}>
              <Image
                src={IMAGES[image]}
                alt={image}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        {!images &&
          items.map((item, index) => (
            <div key={index} className={`h-[233.33px] p-4`}>
              <div
                className={`rounded-xl h-full w-full ${item.color}`} // Utilisation de la couleur de l'élément
              ></div>
            </div>
          ))}
      </div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent z-10"></div>
    </div>
  );
};

export default Carousel;
