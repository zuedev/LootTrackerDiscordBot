import { connect } from "../../controllers/mongo.js";

export default async ({ channelId, itemName, itemAmount }) => {
  const mongo = await connect();

  const data = await mongo
    .db("test")
    .collection(`channel-${channelId}`)
    .findOneAndUpdate(
      { itemName },
      { $inc: { itemAmount } },
      { upsert: true, returnDocument: "after" }
    );

  await mongo.close();

  return data.modifiedCount === 0 ? itemAmount : data.itemAmount;
};
