import Layout from "@/components/layout";
import SignUpForm from "./signup";
import Home from "@/components/home";
import { useEffect, useState } from "react";
import { database } from "@/utils/appwrite";

import { Query } from "appwrite";
import { useAuth } from "./hooks/authenication"; // Corrected the import

export default function index() {
  const { user, loading, signOut } = useAuth();




  if (loading) {
    return <p className="loading"></p>;
  }

  return (
    <>
      {!user && (
        <div className="flex flex-col gap-5 ">
          <SignUpForm />
        </div>
      )}
      {user && (
        <>
          <Layout><Home /></Layout>
        </>
      )}
    </>
  );
}
