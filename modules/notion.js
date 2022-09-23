require('dotenv').config();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;
const databaseId_2 = process.env.NOTION_API_DATABASE_2;

extraInfo = "Extra Info"
number = "Phone Number"

module.exports = {
  getDatabase: async () => {
    const response = await notion.databases.query({ database_id: databaseId });
    return response.results.map((page) => {
      return {
        nickname: page.properties.Nickname.title[0]?.plain_text,
        content: page.properties.Content.rich_text[0]?.plain_text,
        id: page.id,
      };
    });
  },
};