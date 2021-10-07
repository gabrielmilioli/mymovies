import React from "react";
import { Title, BackButton } from "./styles";
import { Feather } from "@expo/vector-icons";
import WebView from "react-native-webview";

type ModalLinkProps = {
  item: any;
  onClose: any;
};

export default function ModalLink({ item, onClose }: ModalLinkProps) {
  return (
    <>
      <BackButton
        onPress={onClose}
      >
        <Feather name="x" size={32} color="#fff" />
        <Title
          numberOfLines={1}
        >
          {item.title}
        </Title>
      </BackButton>

      <WebView
        source={{ uri: item.homepage }}
      />

    </>
  );
}