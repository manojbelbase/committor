import OpenAI from "openai";
import { COMMIT_SYSTEM_PROMPT, getCommitUserPrompt } from "../const/prompts";
import { extractCommitMessage } from "../utils/extractCommitMessage";
import { getReadableError } from "../utils/errorHandler";
import { GROQ_API_URL } from "../const/endpoints";

export async function generateCommitGroq(diff: string, apiKey: string, model: string = "openai/gpt-oss-120b"): Promise<string> {
    try {
        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: GROQ_API_URL,
        });
        const response = await (client as any).responses.create({
            model: model,
            input: `${COMMIT_SYSTEM_PROMPT}\n\n${getCommitUserPrompt(diff)}`,
        });

        const rawContent = response.output_text || "No response from Groq";
        return extractCommitMessage(rawContent);
    } catch (error: any) {
        throw new Error(getReadableError(error, "Groq"));
    }
}
