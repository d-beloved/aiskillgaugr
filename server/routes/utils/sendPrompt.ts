import { textGeneration } from "@huggingface/inference";

export const sendPrompt = (prompt: string) => {
  return textGeneration({
    accessToken: process.env.HUGGING_FACE_API_KEY,
    model: "google/gemma-2-2b-it",
    inputs: prompt,
    parameters: {
      max_new_tokens: 2048,
      temperature: 0.7,
      top_p: 0.95,
      return_full_text: false,
    },
  });
};
