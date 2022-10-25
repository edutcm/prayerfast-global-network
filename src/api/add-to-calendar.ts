// imports
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { rest } from "lodash";

// mongodb
import { MongoClient, ServerApiVersion } from "mongodb";

interface DataProps {
  week: number;
  day: number;
  time: string;
}

interface RequestBody {
  data: DataProps;
}

// function
export default async function handler(
  req: GatsbyFunctionRequest<RequestBody>,
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

  if (!req.body.data) {
    return res.status(500).json({ error: "No data found" });
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
    const collection = client.db("prayerfast").collection("calendar");

    // data
    const data = req.body.data;

    // get the document
    const document = await collection.findOne({
      week: data.week,
      day: data.day,
      time: data.time,
    });

    if (!document) {
      const doc = {
        week: data.week,
        day: data.day,
        time: data.time,
        count: 1,
      };
      const result = await collection.insertOne(doc);
      client.close();
      return res.send(result);
    } else {
      const filter = {
        week: data.week,
        day: data.day,
        time: data.time,
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
