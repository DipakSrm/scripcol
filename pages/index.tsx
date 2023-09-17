import Layout from "@/components/layout";
import SignUpForm from "./signup";
import Home from "@/components/home";
import { useEffect, useState } from "react";
import { database } from "@/utils/appwrite";

import { Query } from "appwrite";
import { useAuth } from "./hooks/authenication"; // Corrected the import
interface Model_Account {
  $id?: string;
  Name: string;
  BOID: string;
  AccountNumber: string;
  Email: string;
  PhoneNumber: string;
  ClientCode: string;
  Ref_Id?: string;
}

export default function index() {
  const { user, loading, signOut } = useAuth();
  const [data, setData] = useState<Model_Account[]>([]); // Declare data as an array of Model_Account

  useEffect(() => {
    if (user) {
      getdata();
    }
  }, [user]);

  const getdata = async () => {
    try {
      if (user) {
        const response: any = await database.listDocuments(
          "64fb507e57d794c91f2f",
          "650579d559b127c0998a",
          [Query.equal("Ref_Id", [`${user.id}`])]
        );

        setData(response.documents); // Update the state with an array of Model_Account
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
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
          <Layout>{data ? <Home data={data} /> : null}</Layout>
        </>
      )}
    </>
  );
}
