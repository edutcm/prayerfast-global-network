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
  const pass = process.env.GATSBY_MONGODB_PASS;
  const user = process.env.GATSBY_MONGODB_USER;
  const url = process.env.GATSBY_MONGODB_URL;

  // build the mongodb connection url
  const uri = `mongodb+srv://${user}:${pass}@${url}/?retryWrites=true&w=majority&compressors=zstd`;

  // check for url
  if (typeof url === "undefined" || url === "") {
    return res.status(500).json({
      error: "The GATSBY_MONGODB_URL environment variable is not set, exiting.",
    });
  }

  // check for user
  if (typeof user === "undefined" || user === "") {
    return res.status(500).json({
      error:
        "The GATSBY_MONGODB_USER environment variable is not set, exiting.",
    });
  }

  // check for pass
  if (typeof pass === "undefined" || pass === "") {
    return res.status(500).json({
      error:
        "The GATSBY_MONGODB_PASS environment variable is not set, exiting.",
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
