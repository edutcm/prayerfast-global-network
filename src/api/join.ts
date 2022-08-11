// imports
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

// mongodb
import { MongoClient, ServerApiVersion } from "mongodb";

interface GeodataProps {
  lat: number;
  lon: number;
  city: string;
  cityGeo: number;
  areaGeo: number;
  countryGeo: number;
  country: string;
  cont: string;
  tz: string;
  tzCode: string;
  tzOffset: number;
  langKey: string;
  key?: string;
  count?: number;
}

interface RequestBody {
  geodata: GeodataProps;
}

// function
export default async function handler(
  req: GatsbyFunctionRequest<RequestBody>,
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

  if (!req.body.geodata) {
    return res.status(500).json({ error: "No geodata found" });
  }

  try {
    // mongodb client
    const mongodbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    };
    const client = new MongoClient(uri, mongodbOptions);

    // define the collection
    const collection = client.db("prayerfast").collection("geodata");

    // geodata
    const geodata = req.body.geodata;

    // get the document
    const document = await collection.findOne({
      lat: geodata.lat,
      lon: geodata.lon,
    });

    // if no document, insert data
    if (!document) {
      const result = await collection.insertOne(geodata);
      client.close();
      return res.send(result);
    }
    // if document exists, update data
    else {
      const filter = {
        lat: geodata.lat,
        lon: geodata.lon,
      };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          count: document.count + 1,
        },
      };
      const result = await collection.updateOne(filter, updateDoc, options);
      client.close();
      return res.send(result);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
