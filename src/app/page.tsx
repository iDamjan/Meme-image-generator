"use client";

import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
export default function Home() {
  const [filePath, setFilePath] = useState("");
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

  const onError = (error: any) => {
    console.error("Error uploading image:", error);
  };

  const onSuccess = (response: any) => {
    console.log(response);
    setFilePath(response.filePath);
    console.log("Image uploaded successfully:", response);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    ></ImageKitProvider>
  );
}
