import * as vscode from "vscode";

export interface AIProvider {
    label: string;
    value: string;
}

export interface AIModel {
    label: string;
    value: string;
}

const PROVIDERS: AIProvider[] = [
    { label: "OpenAI", value: "openai" },
    { label: "OpenRouter", value: "openrouter" },
    { label: "Gemini", value: "gemini" }
];

const MODEL_OPTIONS: { [key: string]: AIModel[] } = {
    openai: [
        { label: "GPT-4o", value: "gpt-4o" },
        { label: "GPT-4o mini", value: "gpt-4o-mini" },
        { label: "GPT-4", value: "gpt-4" },
        { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
        { label: "o1 Preview", value: "o1-preview" },
        { label: "o1 Mini", value: "o1-mini" },
        { label: "Custom Model...", value: "__custom__" }
    ],
    openrouter: [
        { label: "DeepSeek R1 (Reasoning/Free)", value: "deepseek/deepseek-r1:free" },
        { label: "Gemini 2.0 Flash (Fast/Free)", value: "google/gemini-2.0-flash-exp:free" },
        { label: "Mistral Small 24B (Free)", value: "mistralai/mistral-small-24b-instruct-2501:free" },
        { label: "Llama 3.3 70B (Fast/Free)", value: "meta-llama/llama-3.3-70b-instruct:free" },
        { label: "Mistral 7B (Fast/Free)", value: "mistralai/mistral-7b-instruct:free" },
        { label: "Gemma 2 9B (Free)", value: "google/gemma-2-9b-it:free" },
        { label: "Microsoft Phi-3 Medium (Free)", value: "microsoft/phi-3-medium-128k-instruct:free" },
        { label: "OpenChat 7B (Free)", value: "openchat/openchat-7b:free" },
        { label: "Custom Model...", value: "__custom__" }
    ],
    gemini: [
        { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" },
        { label: "Custom Model...", value: "__custom__" }
    ]
};

export async function selectProvider(): Promise<AIProvider | undefined> {
    const selected = await vscode.window.showQuickPick(PROVIDERS, {
        placeHolder: "Select your AI provider"
    });
    return selected;
}

export async function selectModel(provider: AIProvider): Promise<AIModel | undefined> {
    const models = MODEL_OPTIONS[provider.value];
    if (!models) return undefined;

    const selected = await vscode.window.showQuickPick(models, {
        placeHolder: `Select model for ${provider.label}`
    });

    if (!selected) return undefined;

    if (selected.value === "__custom__") {
        return await handleCustomModel(provider);
    }

    return selected;
}

async function handleCustomModel(provider: AIProvider): Promise<AIModel | undefined> {
    const customModel = await vscode.window.showInputBox({
        prompt: `Enter custom ${provider.label} model name`,
        placeHolder: provider.value === "openrouter"
            ? "e.g., anthropic/claude-3.5-sonnet, meta-llama/llama-3.1-405b-instruct"
            : provider.value === "openai"
                ? "e.g., gpt-4, gpt-3.5-turbo"
                : "e.g., gemini-1.5-flash, gemini-pro",
        validateInput: (value) => {
            if (!value || value.trim() === "") {
                return "Model name cannot be empty";
            }
            return null;
        }
    });

    if (!customModel) return undefined;

    return {
        label: customModel.trim(),
        value: customModel.trim()
    };
}
