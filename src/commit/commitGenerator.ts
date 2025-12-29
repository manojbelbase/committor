import { getStagedChanges } from "../git/gitUtils";
import { generateCommitOpenAI } from "../llm/openAI";
import { generateCommitOpenRouter } from "../llm/openRouter";
import { generateCommitGemini } from "../llm/gemini";
import * as vscode from "vscode";

export async function generateCommit(apiProvider: string, apiKey?: string, model?: string): Promise<string> {
    const diff = await getStagedChanges();

    // If API key not provided, read from settings
    if (!apiKey) {
        const config = vscode.workspace.getConfiguration("committor");
        apiKey = config.get<string>(`${apiProvider}Key`) || "";
    }

    switch (apiProvider.toLowerCase()) {
        case "openai":
            return generateCommitOpenAI(diff, apiKey);
        case "openrouter":
            return generateCommitOpenRouter(diff, apiKey, model); case "gemini":
            return generateCommitGemini(diff, apiKey);
        default:
            throw new Error("Unsupported API provider");
    }
}
