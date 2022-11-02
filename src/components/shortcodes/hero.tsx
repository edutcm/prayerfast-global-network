// import libs
import React from "react";
import { convertToBgImage } from "gbimage-bridge";
import { getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { useAppContext } from "../../services/app";

// import components
import BackgroundImage from "gatsby-background-image";

interface HeroProps {
  children: React.ReactNode;
  image: IGatsbyImageData;
  ctaLabel?: string;
  ctaLink?: string;
}

export const Hero = ({ children, image, ctaLabel, ctaLink }: HeroProps) => {
  const localImage = getImage(image);
  const bgImage = convertToBgImage(localImage);
  const { locale } = useAppContext();

  return (
    <BackgroundImage {...bgImage}>
      <div className="bg-gray-900/[85%] text-white flex justify-center items-center pt-28 pb-16 px-5 md:py-20 box-border md:min-h-[50vh]">
        <div className="lg:w-3/5 text-center">
          <div className="text-xl md:text-2xl">{children}</div>
          {ctaLabel && ctaLink && (
            <Link
              className="block rounded-md px-4 py-3 bg-emerald-600 hover:bg-emerald-500 mt-5 max-w-[200px] mx-auto leading-5"
              to={`/${locale}${ctaLink}`}
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </BackgroundImage>
  );
};
