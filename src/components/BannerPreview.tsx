
import React, { useRef } from "react";
import Banner from "./Banner";
import { Button, Container } from "react-bootstrap";
import { BannerSettings } from "./ControlForm";
import html2canvas from "html2canvas"; 

interface BannerPreviewProps {
  settings: BannerSettings;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ settings }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    if (bannerRef.current) {
      html2canvas(bannerRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "banner.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <Container fluid className="px-0 mb-4">
      <div ref={bannerRef}>
        <Banner
          text={settings.text}
          background={settings.background}
          image={settings.image}
          textColor={settings.textColor}
          height={settings.height}
          overlay={settings.overlay}
          fontSize={settings.fontSize}
          fontWeight={settings.fontWeight}
          textShadow={settings.textShadow}
          fontFamily={settings.fontFamily}
          letterSpacing={settings.letterSpacing}
          textTransform={settings.textTransform}
          borderRadius={settings.borderRadius}
          animation={settings.animation}
          textAlign={settings.textAlign}
          backgroundPattern={settings.backgroundPattern}
        />
      </div>
      <div className="text-center mt-2">
        <Button variant="success" onClick={handleExport}>
          Export as PNG
        </Button>
      </div>
    </Container>
  );
};

export default BannerPreview;