import axios from "axios";
import { COMMIT_SYSTEM_PROMPT, getCommitUserPrompt } from "../const/prompts";
import { extractCommitMessage } from "../utils/extractCommitMessage";
import { getGeminiApiUrl, getGeminiModelsUrl } from "../const/endpoints";

export async function generateCommitGemini(diff: string, apiKey: string, model: string = "gemini-1.5-flash"): Promise<string> {
    try {
        const response = await axios.post(
            getGeminiApiUrl(model, apiKey),
            {
                contents: [
                    {
                        parts: [
                            { text: `${COMMIT_SYSTEM_PROMPT}\n\n${getCommitUserPrompt(diff)}` }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const rawContent = response.data.candidates[0].content.parts[0].text || "No response from Gemini";
        return extractCommitMessage(rawContent);
    } catch (error: any) {
        let errorMessage = `Gemini API error: ${error.response?.data?.error?.message || error.message}`;

        if (error.response?.status === 404 || errorMessage.includes("not found") || errorMessage.includes("not supported")) {
            try {
                const modelsResponse = await axios.get(
                    getGeminiModelsUrl(apiKey)
                );
                const availableModels = modelsResponse.data.models
                    .map((m: any) => m.name.replace("models/", ""))
                    .join(", ");
                errorMessage += `\n\nAvailable models for your key: ${availableModels}`;
            } catch (listError) {
                errorMessage += "\n\n(Could not list available models to debug)";
            }
        }

        throw new Error(errorMessage);
    }
}
