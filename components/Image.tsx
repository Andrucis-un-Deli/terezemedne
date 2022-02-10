import React, { useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import cx from "classnames";

import defaultImageLoader from "../loaders/imageLoader";
import defaultResizedLoader, {
  ResizedLoader,
  UploadSrc,
} from "../loaders/resizedLoader";

export type ImageProps = NextImageProps & {
  src: UploadSrc;
  containHeight?: boolean;
  resizedLoader?: ResizedLoader;
};

export const Image = ({
  className,
  src: uploadSrc,
  resizedLoader = defaultResizedLoader,
  containHeight = true,
  width: containerWidth,
  height: containerHeight,
  loader = defaultImageLoader,
  ...rest
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { width, height, src } = resizedLoader({ src: uploadSrc as UploadSrc });

  return (
    <div
      className={cx([
        "opacity-0 transition-opacity duration-1000",
        { "opacity-100": isLoaded },
        className,
        "w-full",
        { "image-contain-height": containHeight },
      ])}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <NextImage
        {...rest}
        src={src}
        width={width}
        height={height}
        layout="responsive"
        objectFit="contain"
        loader={loader}
        onLoadingComplete={() => {
          setIsLoaded(true);
        }}
      />
    </div>
  );
};
