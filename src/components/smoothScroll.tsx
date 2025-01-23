import gsap from 'gsap';

export const smoothScroll = (target: string, duration = 1, offset = 0) => {
  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: offset
    },
    ease: "power2.inOut"
  });
};
