import { createServer } from "node:http";
import OpenAI from "openai";

const port = Number(process.env.PORT || 3001);
const region = process.env.AWS_REGION || "us-west-2";
const model = process.env.BEDROCK_MODEL || "openai.gpt-oss-20b-1:0";

const client = process.env.AWS_BEARER_TOKEN_BEDROCK
  ? new OpenAI({
      apiKey: process.env.AWS_BEARER_TOKEN_BEDROCK,
      baseURL: `https://bedrock-mantle.us-east-2.api.aws/v1`,
    })
  : null;

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) reject(new Error("Request is too large."));
    });
    request.on("end", () => resolve(JSON.parse(body)));
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, { "Access-Control-Allow-Origin": "http://localhost:5173" });
    response.end();
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/chat") {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  if (!client) {
    sendJson(response, 500, { error: "AWS_BEARER_TOKEN_BEDROCK is not configured on the server." });
    return;
  }

  try {
    const { messages } = await readBody(request);
    const validMessages = Array.isArray(messages)
      ? messages
          .filter(
            (message) =>
              message &&
              (message.role === "user" || message.role === "assistant") &&
              typeof message.content === "string",
          )
          .map((message) => ({ role: message.role, content: message.content.slice(0, 4_000) }))
      : [];

    if (validMessages.length === 0) {
      sendJson(response, 400, { error: "At least one message is required." });
      return;
    }

    const completion = await client.chat.completions.create({
      model,
      messages: validMessages.slice(-20),
      max_tokens: 500,
    });
    sendJson(response, 200, { message: completion.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "The assistant is temporarily unavailable." });
  }
});

server.listen(port, () => {
  console.log(`Chat API listening on http://localhost:${port}`);
});