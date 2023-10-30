import { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/utils/appwrite";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = req.body;
    console.log("this is back data", data);
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
