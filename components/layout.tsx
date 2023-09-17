import { ReactNode } from "react";
import Navbar from "./navbar";
import Box from "./box";
import { database } from "@/utils/appwrite";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
