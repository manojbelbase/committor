import * as vscode from "vscode";
import { generateCommit } from "./commit/commitGenerator";
import { selectProvider, selectModel } from "./ui/selector";
import { ensureApiKey } from "./config/configuration";
import { getReadableError } from "./utils/errorHandler";
import { loadEnv } from "./utils/envLoader";
import { validateProviderConfig } from "./utils/validator";

export function activate(context: vscode.ExtensionContext) {
	loadEnv();
	const generateDisposable = vscode.commands.registerCommand("committor.generate", async (scm?: any) => {
		try {
			const config = vscode.workspace.getConfiguration("committor");
			let activeProvider = config.get<string>("activeProvider");
			let apiProvider;
			let selectedModel;
			let apiKey;

			if (!activeProvider) {
				const availableProviders: string[] = [];
				const providersToCheck = ["openai", "gemini", "openrouter", "groq"];

				for (const p of providersToCheck) {
					if (config.get<string>(`${p}Key`)) {
						availableProviders.push(p);
					}
				}

				if (availableProviders.length > 0) {
					activeProvider = availableProviders[0];
					await config.update("activeProvider", activeProvider, vscode.ConfigurationTarget.Global);
					vscode.window.showInformationMessage(`Auto-selected ${activeProvider.charAt(0).toUpperCase() + activeProvider.slice(1)} as active provider.`);
				}
			}

			if (activeProvider) {
				const providerLabel = activeProvider === "openai" ? "OpenAI" : (activeProvider === "openrouter" ? "OpenRouter" : (activeProvider === "groq" ? "Groq" : "Gemini"));
				apiProvider = { label: providerLabel, value: activeProvider };

				const modelValue = config.get<string>(`${activeProvider}Model`);
				apiKey = config.get<string>(`${activeProvider}Key`);

				validateProviderConfig(apiKey, modelValue, providerLabel);

				selectedModel = { label: modelValue!, value: modelValue! };
			}

			if (!apiProvider) {
				const openSettings = "Open Settings";
				const selection = await vscode.window.showErrorMessage(
					"No AI provider is configured. Please set an API Key in settings or select a provider to configure.",
					"Select Provider",
					openSettings
				);

				if (selection === openSettings) {
					vscode.commands.executeCommand("workbench.action.openSettings", "committor");
					return;
				} else if (selection === "Select Provider") {
					apiProvider = await selectProvider();
					if (!apiProvider) return;

					selectedModel = await selectModel(apiProvider);
					if (!selectedModel) return;

					const result = await ensureApiKey(apiProvider, selectedModel.value);
					if (!result) return;

					apiKey = result.key;

					if (result.saved) {
						await config.update("activeProvider", apiProvider.value, vscode.ConfigurationTarget.Global);
					}
				} else {
					return;
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
				if (scm && scm.inputBox) {
					scm.inputBox.value = commitMessage;
				} else {
					const gitExtension = vscode.extensions.getExtension('vscode.git');
					if (gitExtension) {
						const git = gitExtension.exports.getAPI(1);
						if (git.repositories.length > 0) {
							git.repositories[0].inputBox.value = commitMessage;
						}
					}
				}
			} catch (error) {
			}

			if (config.get<boolean>("copyToClipboard")) {
				await vscode.env.clipboard.writeText(commitMessage);
			}

			vscode.window.showInformationMessage(
				`✓ Commit message generated with ${apiProvider.label} (${selectedModel.label}) and populated in Source Control!`
			);
		} catch (err: any) {
			const errorMessage = getReadableError(err);

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

	const switchDisposable = vscode.commands.registerCommand("committor.switchProvider", async () => {
		const provider = await selectProvider();
		if (provider) {
			const config = vscode.workspace.getConfiguration("committor");
			await config.update("activeProvider", provider.value, vscode.ConfigurationTarget.Global);

			const model = await selectModel(provider);
			if (model) {
				await config.update(`${provider.value}Model`, model.value, vscode.ConfigurationTarget.Global);
			}

			const apiKey = config.get<string>(`${provider.value}Key`);
			if (!apiKey) {
				await ensureApiKey(provider, model?.value);
			}

			vscode.window.showInformationMessage(`Active provider switched to ${provider.label}`);
		}
	});

	context.subscriptions.push(generateDisposable, switchDisposable);
}

export function deactivate() { }
