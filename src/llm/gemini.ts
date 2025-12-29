import axios from "axios";

export async function generateCommitGemini(diff: string, apiKey: string): Promise<string> {
    const response = await axios.post(
        "https://api.gemini.ai/v1/generate",
        {
            model: "gemini-1",
            input: `Generate a git commit message for these changes:\n${diff}`
        },
        { headers: { "Authorization": `Bearer ${apiKey}` } }
    );

    return response.data.output || "No response from Gemini";
}
