import { connect } from "../../controllers/mongo.js";

export default async ({ channelId, itemName }) => {
  const mongo = await connect();

  const data = await mongo
    .db("test")
    .collection(`channel-${channelId}`)
    .findOne({ itemName });

  await mongo.close();

  return data ? data.itemAmount : 0;
};
