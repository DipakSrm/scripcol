import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://the-value-crew.github.io/nepse-api/data/companies.json"
    );
    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
