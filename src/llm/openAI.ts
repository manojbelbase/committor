import axios from "axios";

export async function generateCommitOpenAI(diff: string, apiKey: string): Promise<string> {
    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a git commit assistant." },
                { role: "user", content: `Generate a concise commit message for these changes:\n${diff}` }
            ]
        },
        { headers: { "Authorization": `Bearer ${apiKey}` } }
    );

    return response.data.choices[0].message.content;
}
