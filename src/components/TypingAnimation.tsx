import { useEffect, useState } from "react";

interface TypingAnimationProps {
  texts: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}

function TypingAnimation({
  texts,
  className = "",
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1800,
}: TypingAnimationProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = texts[index];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === full) delay = pause;

    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, texts, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className} aria-label={texts[index]}>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="caret ml-0.5 text-cyan-400">
        |
      </span>
    </span>
  );
}

export default TypingAnimation;
