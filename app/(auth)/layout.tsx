// import Header from "@/components/shared/header";

import React from "react";

export default function AutLayOut({ children }: { children: React.ReactNode }) {
  return <div className="flex-center min-h-screen w-full">{children}</div>;
}
