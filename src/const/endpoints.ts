export const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
export const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export function getGeminiApiUrl(model: string, apiKey: string): string {
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
}

export function getGeminiModelsUrl(apiKey: string): string {
    return `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
}
