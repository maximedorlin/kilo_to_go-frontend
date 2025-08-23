"use client";
import Card from "@/components/CardParalax";

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export const projects = [
  {
    title: "Taper le Boutton payer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    src: "https://images.unsplash.com/photo-1719937206590-6cb10b099e0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#BBACAF",
  },
  {
    title: "Entrer le numéro de la quittance à payer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    src: "https://images.unsplash.com/photo-1719937206590-6cb10b099e0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#977F6D",
  },
  {
    title: "Proceder au paiement",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    src: "https://images.unsplash.com/photo-1719937206590-6cb10b099e0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#C2491D",
  },
];

export default function CardParalaxView() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time * 5000 * 60);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative">
      {projects.map((project, index) => {
        const targetScale = 1 - (projects.length - index) * 0.05;
        return (
          <Card
            key={index}
            i={index}
            {...project}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
