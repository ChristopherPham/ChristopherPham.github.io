import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const port = Number(process.env.PORT || 3001);
const model =
  process.env.BEDROCK_MODEL ||
  "gpt-4o-mini";
const bearerToken =
  process.env.AWS_bearer_token_bedrock ||
  process.env.AWS_BEARER_TOKEN_BEDROCK;
const baseURL =
  process.env.AWS_GATEWAY_BASE_URL ||
  process.env.AWS_BEDROCK_BASE_URL;

// Replace this with data from a database or CMS when the portfolio content grows.
let portfolioContext = `
You are the assistant for Christopher Pham's software engineering portfolio.
Use only the portfolio information included below and the conversation messages.
Do not invent employers, dates, project details, technologies, or achievements.
If the answer is not included, say that the information is not available yet.

Portfolio information:
- Name: Christopher Pham
- Role: Software Engineer and AI Developer
- The site is a React and TypeScript portfolio application.
- The site includes an AI portfolio assistant.
`;

try {
  portfolioContext = await readFile(
    new URL("./portfolio-context.txt", import.meta.url),
    "utf8",
  );
} catch (error) {
  console.warn(
    "portfolio-context.txt not found, falling back to default prompt.",
  );
}

const client = bearerToken
  ? new OpenAI({
      apiKey: bearerToken,
      ...(baseURL ? { baseURL } : {}),
    })
  : null;

const responseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(body),
  };
}

async function createChatResponse(requestBody) {
  if (!client) {
    return jsonResponse(500, {
      error: "AWS_bearer_token_bedrock is not configured on the server.",
    });
  }

  const messages = requestBody?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.some(
      (message) =>
        !message ||
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        !message.content.trim(),
    )
  ) {
    return jsonResponse(400, { error: "A valid messages array is required." });
  }

  try {
    const result = await client.responses.create({
      model,
      input: [
        { role: "developer", content: portfolioContext },
        ...messages,
      ],
    });

    return jsonResponse(200, { message: result.output_text });
  } catch (error) {
    console.error("Chat request failed:", {
      message: error?.message,
      status: error?.status,
      type: error?.type,
      model,
      baseURL,
    });
    return jsonResponse(500, {
      error: "The assistant could not respond. Check the model, API key, and gateway/base URL configuration.",
    });
  }
}

// Lambda handler for API Gateway HTTP API or REST API proxy integration.
export async function handler(event) {
  console.log("I am working!");
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.rawPath || event.path;

  if (method === "OPTIONS") {
    return jsonResponse(204, {});
  }

  if (method !== "POST" || (path && !path.endsWith("/api/chat"))) {
    return jsonResponse(404, { error: "Not found." });
  }

  if (!event.body || event.body.length > 100_000) {
    return jsonResponse(400, { error: "A valid JSON body is required." });
  }

  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    return await createChatResponse(JSON.parse(body));
  } catch (error) {
    console.error("Chat request parsing failed:", error);
    return jsonResponse(400, { error: "Request body must be valid JSON." });
  }
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, responseHeaders);
  response.end(JSON.stringify(body));
}

async function handleLocalRequest(request, response) {
  if (request.method !== "POST" || request.url !== "/api/chat") {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  try {
    const requestBody = await new Promise((resolve, reject) => {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
        if (body.length > 100_000) reject(new Error("Request body is too large."));
      });
      request.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error("Request body must be valid JSON."));
        }
      });
      request.on("error", reject);
    });

    const result = await createChatResponse(requestBody);
    sendJson(response, result.statusCode, JSON.parse(result.body));
  } catch (error) {
    console.error("Chat request parsing failed:", error);
    sendJson(response, 400, { error: "Request body must be valid JSON." });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = createServer(handleLocalRequest);
  server.listen(port, () => {
    console.log(`Chat server listening on http://localhost:${port}`);
  });
}

