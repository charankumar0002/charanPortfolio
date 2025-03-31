import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
    });
  }, []);

  return (
    <div ref={titleRef} className="text-center mb-16">
      <h2 className="text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
