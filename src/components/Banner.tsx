import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import "./Banner.css";
import { getAnimationStyle } from "../utils/AnimationUtils"; 

interface BannerProps {
  text: string;
  background: string;
  image: string;
  textColor?: string;
  height?: number;
  overlay?: number;
  fontSize?: number;
  fontWeight?: string;
  textShadow?: boolean;
  fontFamily?: string;
  letterSpacing?: number;
  textTransform?: string;
  borderRadius?: number;
  animation?: string;
  textAlign?: "left" | "center" | "right";
  backgroundPattern?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  text,
  background,
  image,
  textColor = "#ffffff",
  height = 300,
  overlay = 50,
  fontSize = 48,
  fontWeight = "bold",
  textShadow = true,
  fontFamily = "'Segoe UI', sans-serif",
  letterSpacing = 0,
  textTransform = "none",
  borderRadius = 0,
  animation = "none",
  textAlign = "center",
  backgroundPattern = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(!image);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (image) {
      setImageLoaded(false);
      setImageError(false);
      const img = new Image();
      img.src = image;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    } else {
      setImageLoaded(true);
      setImageError(false);
    }
  }, [image]);

  const containerStyle: React.CSSProperties = {
    background: backgroundPattern 
      ? `${background}, linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)`
      : background,
    backgroundSize: backgroundPattern ? "40px 40px" : "auto",
    height: `${height}px`,
    borderRadius: `${borderRadius}px`,
    transition: "all 0.3s ease"
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight,
    fontFamily,
    letterSpacing: `${letterSpacing}px`,
    textTransform: textTransform as "none" | "uppercase" | "lowercase" | "capitalize",
    textShadow: textShadow ? "2px 2px 4px rgba(0,0,0,0.5)" : "none",
    transition: "all 0.3s ease",
    textAlign,
    ...getAnimationStyle(animation)
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center text-center p-0 position-relative overflow-hidden banner-container shadow"
      style={containerStyle}
    >
      {image && !imageError && (
        <>
          {!imageLoaded && (
            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-50 shimmer">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <div
            className={`position-absolute w-100 h-100 top-0 start-0 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: overlay > 0 ? 1 - overlay / 100 : 1,
              transition: "opacity 0.5s ease"
            }}
          />
        </>
      )}
      {imageError && (
        <div className="position-absolute w-100 h-100 top-0 start-0 bg-danger bg-opacity-25 d-flex align-items-center justify-content-center">
          <span className="text-danger fs-6 fw-bold">Image failed to load</span>
        </div>
      )}
      <h1 className="position-relative m-0 p-2 banner-text" style={textStyle}>
        {text || <span className="text-muted fw-light fst-italic">Enter banner text</span>}
      </h1>
    </Container>
  );
};

export default Banner;