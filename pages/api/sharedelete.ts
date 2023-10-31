import { database } from "@/utils/appwrite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data.id);
    try {
      const promise = database.deleteDocument(
        "64fb507e57d794c91f2f",
        "64fb511ad635c541e6cf",
        `${data.id}`
      );
      promise.then(
        function (response) {
          console.log(response);
          res.status(200).json("Successfully Deleted");
        },
        function (error) {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(405).json("There is some error");
  }
}
