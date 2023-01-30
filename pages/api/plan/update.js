import { MongoClient } from "mongodb";

/**
 * adds a person to planning list
 * @param {*} req
 * @param {*} res
 */
async function update(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://<User>:<Password>@cluster0.ksego6x.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const planCollection = db.collection("plan");

    const result = await planCollection.updateOne(
      { date: data.date },
      {
        $set: {
          people: [...data.people],
        },
      }
    );

    client.close();

    res
      .status(201)
      .json({ message: "Plan information updated", result: result });
  } else {
    res.status(204).json({ message: "Api path exists" });
  }
}

export default update;
