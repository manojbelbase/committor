import * as vscode from "vscode";
import { generateCommit } from "./commit/commitGenerator";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand("committor.generateCommit", async () => {
		try {
			const apiProvider = await vscode.window.showQuickPick(
				["openai", "openrouter", "gemini"],
				{ placeHolder: "Select your AI provider" }
			);
			if (!apiProvider) return;

			const apiKey = await vscode.window.showInputBox({
				prompt: `Enter your ${apiProvider} API Key (leave blank to use saved key)`,
				password: true
			});

			const commitMessage = await generateCommit(apiProvider, apiKey || undefined);

			await vscode.env.clipboard.writeText(commitMessage);
			vscode.window.showInformationMessage("Commit message generated and copied to clipboard!");
		} catch (err: any) {
			vscode.window.showErrorMessage(`Error: ${err.message}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
