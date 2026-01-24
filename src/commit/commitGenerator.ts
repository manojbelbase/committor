import { getStagedChanges } from "../utils/gitUtils";
import { generateCommitOpenAI } from "../llms/openAI";
import { generateCommitOpenRouter } from "../llms/openRouter";
import { generateCommitGemini } from "../llms/gemini";
import { LLMGenerator } from "../types";
import * as vscode from "vscode";

const PROVIDER_MAP: Record<string, LLMGenerator> = {
    openai: generateCommitOpenAI,
    openrouter: generateCommitOpenRouter,
    gemini: generateCommitGemini,
};

export async function generateCommit(apiProvider: string, apiKey?: string, model?: string): Promise<string> {
    const diff = await getStagedChanges();
    const config = vscode.workspace.getConfiguration("committor");
    const providerLower = apiProvider.toLowerCase();

    const finalApiKey = apiKey || config.get<string>(`${providerLower}Key`);
    const finalModel = model || config.get<string>(`${providerLower}Model`);

    if (!finalApiKey) {
        throw new Error(`No API key found for ${apiProvider}. Please configure it in settings.`);
    }

    const generator = PROVIDER_MAP[providerLower];

    if (!generator) {
        throw new Error(`Unsupported API provider: ${apiProvider}`);
    }

    return generator(diff, finalApiKey, finalModel);
}
