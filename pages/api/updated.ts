// pages/api/appwrite.js

import { database } from "@/utils/appwrite";
import { NextRequest, NextResponse } from "next/server";

interface Model_Account {
  body: any;
  method: string;
  $id?: string;
  Name: string;
  BOID: string;
  AccountNumber: string;
  Email: string;
  PhoneNumber: string;
  ClientCode: string;
  Ref_Id?: string;
  Meroshare_Id: string;
}

export default async function handler(req: Model_Account, res: any) {
  if (req.method === "POST") {
    try {
      const editedData = req.body;

      // Check if editedData is not null
      if (editedData !== null) {
        // Make a request to the Appwrite API using your server-side API key
        const promise = database.updateDocument(
          "64fb507e57d794c91f2f",
          "650579d559b127c0998a",
          `${editedData.$id || ""}`, // Use the $id from editedData if available
          editedData
        );

        promise.then(
          function (response) {
            console.log(response); // Success
            res.status(200).json(response); // Send a JSON response back
          },
          function (error) {
            console.log(error); // Failure
            const errorMessage = error.message || "An error occurred";
            res.status(500).json({ error: errorMessage }); // Send the error message as part of the response
          }
        );
      } else {
        res.status(400).json({ error: "Invalid payload" }); // Handle the case where editedData is null
      }
    } catch (error: any) {
      console.error("Error updating document:", error);
      const errorMessage = error.message || "An error occurred";
      res.status(500).json({ error: errorMessage }); // Send the error message as part of the response
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
