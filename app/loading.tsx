import React from "react";
import Image from "next/image";
import loader from "@/assets/loader.gif";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Image src={loader} alt="loading" height={150} width={150} />
    </div>
  );
}
