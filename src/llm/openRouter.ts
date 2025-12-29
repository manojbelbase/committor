import axios from "axios";

export async function generateCommitOpenRouter(diff: string, apiKey: string, model: string = "gpt-4") {
    const response = await axios.post(
        "https://api.openrouter.ai/v1/completions",
        {
            model: model,  // required
            prompt: `Generate a concise git commit message for these changes:\n${diff}`,
            max_tokens: 100
        },
        { headers: { "Authorization": `Bearer ${apiKey}` } }
    );

    return response.data.choices[0].text || "No response from OpenRouter";
}
