
export const animationStyles = {
    fade: { animation: "fadeIn 1.5s ease-in-out" },
    slide: { animation: "slideIn 1s ease-out" },
    bounce: { animation: "bounceIn 1s ease-out" },
    pulse: { animation: "pulse 1.5s infinite" },
    rotate: { animation: "rotateIn 1s ease-out" },
    flip: { animation: "flipIn 1s ease-out" },
    shake: { animation: "shake 0.5s ease-in-out" }, 
    swing: { animation: "swing 1s ease-in-out" }   
  };
  
  export const getAnimationStyle = (animation: string): React.CSSProperties => {
    return animationStyles[animation as keyof typeof animationStyles] || {};
  };