import axios from "axios";
import { COMMIT_SYSTEM_PROMPT, getCommitUserPrompt } from "../const/prompts";
import { extractCommitMessage } from "../utils/extractCommitMessage";
import { OPENROUTER_API_URL } from "../const/endpoints";
import { getReadableError } from "../utils/errorHandler";

export async function generateCommitOpenRouter(diff: string, apiKey: string, model: string = "openai/gpt-oss-120b:free"): Promise<string> {
    try {
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: model,
                messages: [
                    {
                        role: "system",
                        content: COMMIT_SYSTEM_PROMPT
                    },
                    { role: "user", content: getCommitUserPrompt(diff) }
                ],
                max_tokens: 4000
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://github.com/ManojBelbase/committor",
                    "X-Title": "Committor VS Code Extension"
                }
            }
        );

        if (!response.data || !response.data.choices || response.data.choices.length === 0) {
            throw new Error(`Invalid response from OpenRouter: ${JSON.stringify(response.data)}`);
        }

        const choice = response.data.choices[0];
        const content = choice.message?.content?.trim();
        const reasoning = (choice as any).message?.reasoning?.trim();

        if (!content) {
            if (reasoning && response.data.choices[0].finish_reason === "length") {
                throw new Error(`OpenRouter model hit token limit during reasoning. Please try a shorter diff or a model with higher limits. (Reasoning was: ${reasoning.substring(0, 100)}...)`);
            }
            throw new Error(`Empty content from OpenRouter. Full response: ${JSON.stringify(response.data)}`);
        }

        return extractCommitMessage(content);
    } catch (error: any) {
        throw new Error(getReadableError(error, "OpenRouter"));
    }
}
