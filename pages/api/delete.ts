import { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/utils/appwrite";
import { useState } from "react";
import { Query } from "appwrite";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const arr: string[] = [];
  if (req.method == "POST") {
    const data = req.body;
    console.log("this is back data", data);

    const promise1 = await database.listDocuments(
      "64fb507e57d794c91f2f",
      "64fb511ad635c541e6cf",
      [Query.equal("Ref_Id", [`${data.id}`])]
    );
    console.log("this is promise 1", promise1.documents);
    console.log("this is promise 1", promise1.documents.length);
    promise1.documents.map(item => arr.push(item.$id));
    console.log("this is the new array", arr);
    arr.map((item: string) => {
      const promise2 = database.deleteDocument(
        "64fb507e57d794c91f2f",
        "64fb511ad635c541e6cf",
        item
      );
      promise2.then(
        function (response) {
          console.log(response);
        },
        function (error) {
          console.log(error);
        }
      );
    });
    try {
      const promise = database.deleteDocument(
        "64fb507e57d794c91f2f",
        "650579d559b127c0998a",
        `${data.id}`
      );

      promise.then(
        function (response) {
          console.log(response);
          res.status(200).json(response); // Success
        },
        function (error) {
          console.log(error);
          res.status(400); // Failure
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(405).end();
  }
}
