// import libs
import React from "react";
import { convertToBgImage } from "gbimage-bridge";
import { getImage, IGatsbyImageData } from "gatsby-plugin-image";

// import components
import BackgroundImage from "gatsby-background-image";

interface HeroProps {
  children: React.ReactNode;
  image: IGatsbyImageData;
}

export const Hero = ({ children, image }: HeroProps) => {
  const localImage = getImage(image);
  const bgImage = convertToBgImage(localImage);

  return (
    <BackgroundImage {...bgImage}>
      <div className="bg-slate-900/[85%] text-white flex justify-center items-center px-5 py-20 box-border md:min-h-[50vh]">
        <div className="lg:w-3/5 text-center">
          <div className="text-2xl md:text-2xl">{children}</div>
        </div>
      </div>
    </BackgroundImage>
  );
};
