import * as vscode from "vscode";
import { AIProvider } from "../ui/selector";

export async function ensureApiKey(provider: AIProvider, selectedModel?: string): Promise<string | undefined> {
    const config = vscode.workspace.getConfiguration("committor");
    let apiKey = config.get<string>(`${provider.value}Key`);

    if (apiKey) {
        return apiKey;
    }

    apiKey = await vscode.window.showInputBox({
        prompt: `Enter your ${provider.label} API Key`,
        password: true,
        placeHolder: "Your API Key (will be saved for future use)",
        ignoreFocusOut: true
    });

    if (!apiKey) return undefined;

    const saveOption = await vscode.window.showQuickPick(
        [{ label: "Yes", description: "Save to settings" }, { label: "No", description: "Use once" }],
        { placeHolder: `Save ${provider.label} API Key${selectedModel ? ' and selected model' : ''} for next time?` }
    );

    if (saveOption?.label === "Yes") {
        await config.update(`${provider.value}Key`, apiKey, vscode.ConfigurationTarget.Global);
        if (selectedModel) {
            await config.update(`${provider.value}Model`, selectedModel, vscode.ConfigurationTarget.Global);
        }
        vscode.window.showInformationMessage(`${provider.label} settings saved!`);
    }

    return apiKey;
}
