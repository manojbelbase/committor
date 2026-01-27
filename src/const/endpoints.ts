export const OPENAI_API_URL = process.env.COMMITTOR_OPENAI_URL || "https://api.openai.com/v1/chat/completions";
export const OPENROUTER_API_URL = process.env.COMMITTOR_OPENROUTER_URL || "https://openrouter.ai/api/v1/chat/completions";
export const GROQ_API_URL = process.env.COMMITTOR_GROQ_URL || "https://api.groq.com/openai/v1";

export function getGeminiApiUrl(model: string, apiKey: string): string {
    const baseUrl = process.env.COMMITTOR_GEMINI_URL || "https://generativelanguage.googleapis.com/v1beta/models";
    return `${baseUrl}/${model}:generateContent?key=${apiKey}`;
}

export function getGeminiModelsUrl(apiKey: string): string {
    const baseUrl = process.env.COMMITTOR_GEMINI_URL || "https://generativelanguage.googleapis.com/v1beta/models";
    return `${baseUrl}?key=${apiKey}`;
}
