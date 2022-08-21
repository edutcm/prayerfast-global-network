// import libs
import React from "react";
import { getImage, GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface ImageCardProps {
  children: React.ReactNode;
  image: IGatsbyImageData;
}

export const ImageCard = ({ children, image }: ImageCardProps) => {
  const localImage = getImage(image);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
      <div className="col-span-auto md:col-span-2">{children}</div>
      <div className="col-span-auto md:col-span-1">
        <div className="w-3/5 mx-auto md:w-full">
          <a
            href="https://www.amazon.com/Prayer-Fasting-Moving-Spirit-Churches/dp/1949921425/ref=sr_1_2?crid=HYWZMUFTN37P&keywords=prayer+and+fasting&qid=1658952220&sprefix=prayer+and+fasting%2Caps%2C96&sr=8-2"
            target="_blank"
            className="bg-slate-800 text-slate-400 p-2 mt-5 text-center flex items-center"
          >
            {localImage && (
              <GatsbyImage
                image={localImage}
                alt=""
                className="border-8 border-slate-900"
              />
            )}
          </a>
        </div>
      </div>
    </div>
  );
};
