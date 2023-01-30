import { MongoClient } from "mongodb";

async function add(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://<User>:<Password>@cluster0.ksego6x.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const childrenCollection = db.collection("children");

    const result = await childrenCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Family information inserted" });
  } else {
    res.status(204).json({ message: "Api path exists" });
  }
}

export default add;
