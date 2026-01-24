import * as vscode from "vscode";
import { generateCommit } from "./commit/commitGenerator";
import { selectProvider, selectModel } from "./ui/selector";
import { ensureApiKey } from "./config/configuration";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand("committor.generate", async () => {
		try {
			const config = vscode.workspace.getConfiguration("committor");
			let defaultProvider = config.get<string>("defaultProvider");

			if (!defaultProvider) {
				const keys = [
					{ provider: "openrouter", key: config.get<string>("openrouterKey") },
					{ provider: "openai", key: config.get<string>("openaiKey") },
					{ provider: "gemini", key: config.get<string>("geminiKey") }
				].filter(k => k.key && k.key.length > 0);

				if (keys.length === 1) {
					defaultProvider = keys[0].provider;
				}
			}

			let apiProvider;
			let selectedModel;
			let apiKey;

			if (defaultProvider) {
				const providerLabel = defaultProvider === "openai" ? "OpenAI" : (defaultProvider === "openrouter" ? "OpenRouter" : "Gemini");
				apiProvider = { label: providerLabel, value: defaultProvider };

				const modelValue = config.get<string>(`${defaultProvider}Model`);
				selectedModel = { label: modelValue || "Default", value: modelValue || "" };

				apiKey = config.get<string>(`${defaultProvider}Key`);

				if (!apiKey || !modelValue) {
					apiProvider = undefined;
				}
			}

			if (!apiProvider) {
				apiProvider = await selectProvider();
				if (!apiProvider) return;

				selectedModel = await selectModel(apiProvider);
				if (!selectedModel) return;

				apiKey = await ensureApiKey(apiProvider, selectedModel.value);
				if (!apiKey) return;

				if (!defaultProvider) {

				}
			}

			if (!apiProvider || !selectedModel || !apiKey) return;

			vscode.window.showInformationMessage("Generating commit message...");
			const commitMessage = await generateCommit(
				apiProvider.value,
				apiKey,
				selectedModel.value
			);

			try {
				const gitExtension = vscode.extensions.getExtension('vscode.git');
				if (gitExtension) {
					const git = gitExtension.exports.getAPI(1);
					if (git.repositories.length > 0) {
						git.repositories[0].inputBox.value = commitMessage;
					}
				}
			} catch (error) {
			}

			await vscode.env.clipboard.writeText(commitMessage);
			vscode.window.showInformationMessage(
				`✓ Commit message generated with ${apiProvider.label} (${selectedModel.label}) and populated in Source Control!`
			);
		} catch (err: any) {
			const errorMessage = `Committor Error: ${err.message}`;

			if (err.message.includes("data policy") || err.message.includes("Free model publication")) {
				const action = "Configure Privacy Settings";
				const selection = await vscode.window.showErrorMessage(errorMessage, action);
				if (selection === action) {
					vscode.env.openExternal(vscode.Uri.parse("https://openrouter.ai/settings/privacy"));
				}
			} else {
				vscode.window.showErrorMessage(errorMessage);
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
