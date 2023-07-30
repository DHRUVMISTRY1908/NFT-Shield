import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res : NextApiResponse) {


  const uri = req.body;
  console.log(uri)

  res.send(uri)
    // Then save the post data to a database
   // res.status(200).json({message : uri});
  }