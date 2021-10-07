import React from "react";
import { BannerButton, BannerImage } from "./styles";

type BannerProps = {
  item: any;
  onClick: any;
};

export default function Banner({ item, onClick }: BannerProps) {
  return (
    <BannerButton
      activeOpacity={0.8}
      onPress={() => onClick(item)}
    >
      <BannerImage
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }}
      />
    </BannerButton>
  );
}