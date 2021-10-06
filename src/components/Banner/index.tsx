import React from "react";
import { BannerButton, BannerImage } from "./styles";

type BannerProps = {
  item: any;
  handleBanner: any;
};

export default function Banner({ item, handleBanner }: BannerProps) {
  return (
    <BannerButton
      activeOpacity={0.8}
      onPress={handleBanner}
    >
      <BannerImage
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }}
      />
    </BannerButton>
  );
}