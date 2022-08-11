// imports
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

// mongodb
import { MongoClient, ServerApiVersion, WithId, Document } from "mongodb";

// props
interface GeodataProps {
  _id: any;
  lat: number;
  lon: number;
  city: string;
  cityId: string;
  areaId: string;
  country: string;
  cont: string;
  tz: string;
  tzCode: string;
  tzOffset: number;
  langKey: string;
  key?: string;
  count?: number;
}

// function
export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // get the mongodb secret
  const secret = process.env.GATSBY_MONGODB_SECRET;

  const uri = `mongodb+srv://pgnadmin:${secret}@prayerfastgn.rwtdz.mongodb.net/?retryWrites=true&w=majority`;

  // check for secret
  if (typeof secret === "undefined" || secret === "") {
    return res.status(500).json({
      error:
        "The GATSBY_MONGODB_SECRET environment variable is not set, exiting.",
    });
  }

  // mongodb client
  const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  };
  const client = new MongoClient(uri, mongodbOptions);

  // geodata collection
  const collection = client.db("prayerfast").collection("geodata").find({});
  const cursor = await collection.toArray();

  const geodata: WithId<Document>[] = [];

  cursor.forEach((doc) => {
    geodata.push(doc);
  });

  client.close();

  return res.send(geodata);
}
