import { MongoClient } from "mongodb";

async function get(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://<User>:<Password>@cluster0.ksego6x.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const childrenCollection = db.collection("plan");
  // get all data
  const result = await childrenCollection.find().toArray();
  client.close();
  res.status(201).json(JSON.stringify(result));
}

export default get;
