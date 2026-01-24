import { getStagedChanges } from "../utils/gitUtils";
import { generateCommitOpenAI } from "../llm/openAI";
import { generateCommitOpenRouter } from "../llm/openRouter";
import { generateCommitGemini } from "../llm/gemini";
import * as vscode from "vscode";

export async function generateCommit(apiProvider: string, apiKey?: string, model?: string): Promise<string> {
    const diff = await getStagedChanges();

    const config = vscode.workspace.getConfiguration("committor");

    if (!apiKey) {
        apiKey = config.get<string>(`${apiProvider}Key`) || "";
    }

    if (!model) {
        model = config.get<string>(`${apiProvider}Model`) || undefined;
    }

    if (!apiKey) {
        throw new Error(`No API key found for ${apiProvider}. Please configure it in settings.`);
    }

    switch (apiProvider.toLowerCase()) {
        case "openrouter":
            return generateCommitOpenRouter(diff, apiKey, model);
        case "openai":
            return generateCommitOpenAI(diff, apiKey, model);
        case "gemini":
            return generateCommitGemini(diff, apiKey, model);
        default:
            throw new Error("Unsupported API provider");
    }
}
