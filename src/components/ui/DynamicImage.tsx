"use client";

import type { ImgHTMLAttributes } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import type { SiteImageKey } from "@/data/content";

type DynamicImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
  siteImage?: SiteImageKey;
  worldId?: string;
};

export default function DynamicImage({ src, siteImage, worldId, ...imageProps }: DynamicImageProps) {
  const { content } = useSiteContent();
  const { alt = "", ...imageAttributes } = imageProps;
  const dynamicSrc = worldId
    ? content.worldCovers[worldId] ?? src ?? ""
    : siteImage
      ? content.siteImages[siteImage] || src || ""
      : src || "";

  return <img src={dynamicSrc} alt={alt} {...imageAttributes} />;
}