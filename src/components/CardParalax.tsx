"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const CardParalax = ({
  i,
  title,
  description,
  src,
  color,
  range,
  targetScale,
  progress,
}: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]); //image zoom out animation
  const scale = useTransform(progress, range, [1, targetScale]); //stacking effect

  return (
    <div
      ref={container}
      className="cardContainer h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        className="card flex flex-col relative xl:h-[500px] w-[1000px] rounded-3xl p-12"
        style={{
          scale,
          backgroundColor: color,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <h2 className="text-center m-0 text-xl">{title}</h2>
        <div className="xl:flex h-full mt-12 gap-12">
          <div className="desc xl:w-[40%] relative top-[10%]">
            <p className="text-base first-letter:text-2xl">{description}</p>
          </div>
          <div className="imgContainer relative xl:w-[60%] h-full rounded-3xl overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <Image
                width={500}
                height={500}
                src={src}
                alt="image"
                className="object-cover h-5/6"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardParalax;
