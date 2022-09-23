const express = require("express");
const { Client } = require("@notionhq/client");
const cors = require("cors");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
require("dotenv").config();
const databaseId = process.env.NOTION_API_DATABASE;
const databaseId_2 = process.env.NOTION_API_DATABASE_2;
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const { getDatabase } = require("./modules/notion");

const app = express();
app.use(cors());

const PORT = 4000;
const HOST = "localhost";

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//------> 1. Add Answers to Notion DB --- req
app.post("/submitFormToNotion", jsonParser, async (req, res) => {
    const nickname = req.body.Nickname;
    const content = req.body.Content;

    try {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Nickname: {
            title: [
              {
                text: {
                  content: nickname,
                },
              },
            ],
          },
          Content: {
            rich_text: [
              {
                text: {
                  content: content,
                },
              },
            ],
          },
        },
      });
      res.send('post data');
    } catch (err) {
      console.log(err);
    }
});

app.post("/submitFormToNotion_2", jsonParser, async (req, res) => {
  const nickname = req.body.Nickname;
  const content = req.body.Content;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId_2 },
      properties: {
        Nickname: {
          title: [
            {
              text: {
                content: nickname,
              },
            },
          ],
        },
        Content: {
          rich_text: [
            {
              text: {
                content: content,
              },
            },
          ],
        },
      },
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

//---> 2. Fetch the data ---- res 
app.get("/list", async (req, res) => {
  const datalist = await getDatabase();
  res.json(datalist);
});

app.listen(PORT, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + PORT);
});


