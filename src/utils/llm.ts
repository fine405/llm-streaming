import OpenAI from "openai";

export type StreamResponse = ReturnType<typeof streamLlm>;

export async function streamLlm(prompt: string, abortSignal?: AbortSignal) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  try {
    const response = await client.chat.completions.create(
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: prompt }],
        stream: true,
      },
      {
        signal: abortSignal,
      }
    );

    return response;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request was aborted");
      }
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
}
