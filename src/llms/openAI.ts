import axios from "axios";
import { COMMIT_SYSTEM_PROMPT, getCommitUserPrompt } from "../const/prompts";
import { extractCommitMessage } from "../utils/extractCommitMessage";
import { OPENAI_API_URL } from "../const/endpoints";
import { getReadableError } from "../utils/errorHandler";

export async function generateCommitOpenAI(diff: string, apiKey: string, model: string = "google/gemma-3n-e2b-it:free"): Promise<string> {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: model,
                messages: [
                    {
                        role: "system",
                        content: COMMIT_SYSTEM_PROMPT
                    },
                    { role: "user", content: getCommitUserPrompt(diff) }
                ],
                max_tokens: 500
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const rawContent = response.data.choices[0].message.content || "No response from OpenAI";
        return extractCommitMessage(rawContent);
    } catch (error: any) {
        throw new Error(getReadableError(error, "OpenAI"));
    }
}
