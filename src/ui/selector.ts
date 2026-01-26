import * as vscode from "vscode";
import { AIProvider, AIModel } from "../types";

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
        { label: "o1", value: "o1" }
    ],
    openrouter: [
        // dont change value only label
        { label: "Llama 3.3 70B (Fast/Free)", value: "meta-llama/llama-3.3-70b-instruct:free" },
        { label: "GLM 4.5 Air (Free)", value: "z-ai/glm-4.5-air:free" },
        { label: "Google Gemma 3 27B (Free)", value: "google/gemma-3-27b-it:free" },
        { label: "DeepSeek R1T2 Chimera (Free)", value: "tngtech/deepseek-r1t2-chimera:free" },
        { label: "Nvidia Nemotron 3 Nano 30B A3B (Free)", value: "nvidia/nemotron-3-nano-30b-a3b:free" },

    ],
    gemini: [
        { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
        { label: "Gemini 1.5 Flash-8B", value: "gemini-1.5-flash-8b" },
        { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" },
        { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" },
        { label: "Gemini 2.0 Flash Lite", value: "gemini-2.0-flash-lite" },
        { label: "Gemini 2.0 Pro Experimental", value: "gemini-2.0-pro-exp-02-05" }
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

    return selected;
}


