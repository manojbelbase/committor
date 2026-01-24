<p align="center">
  <img src="icon.png" width="128" alt="Committor Logo">
</p>

# 🚀 Committor: AI that writes your Git commits

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/ManojBelbase.committor?label=Marketplace&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=ManojBelbase.committor)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/ManojBelbase.committor?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=ManojBelbase.committor)

**Committor** is a powerful VS Code extension that generates meaningful, conventional commit messages instantly from your staged changes using state-of-the-art AI models.

[**Get it on the VS Code Marketplace**](https://marketplace.visualstudio.com/items?itemName=ManojBelbase.committor)

---

## ✨ Features

- **🤖 Multi-Provider Support**: Switch between OpenAI, Google Gemini, or OpenRouter with ease.
- **🆓 Free-to-Use Models**: Optimized for free models like DeepSeek R1 and Gemini 2.0 Flash via OpenRouter.
- **⚡ Auto-Population**: Automatically fills the Git Source Control input box for you.
- **🔐 Privacy First**: Your API keys never leave your machine; they are stored locally in VS Code's secure configuration.
- **🎨 Conventional Commits**: Strictly adheres to the Conventional Commits standard (`feat:`, `fix:`, `chore:`, etc.).
- **🛠️ Custom Models**: Manually input any model ID supported by your provider.

---

## 🚀 Installation & Setup

Using **Committor** is easy. Follow these steps to get started:

### 1. Install from Marketplace
1. Open **VS Code**.
2. Go to the **Extensions** view (`Ctrl+Shift+X`).
3. Search for **"Committor"**.
4. Click **Install**.

### 2. Configure Your API Key
1. **Stage your changes** first (`git add .`).
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Palette.
3. Type **"Committor: Generate Commit Message"** and press `Enter`.
4. Select your **AI Provider** (e.g., *OpenRouter* for free models).
5. Select your **Model** (e.g., *DeepSeek R1*).
6. When prompted, **paste your API Key**.
7. Select **"Yes"** when asked to save the key to settings for future use.

---

## 🔄 How it Works (Flow)

The following diagram illustrates the lifecycle of a commit message generation:

```mermaid
graph TD
    A[Start: committor.generate] --> B{Staged Changes?}
    B -- No --> C[Error: No changes staged]
    B -- Yes --> D{Provider Saved?}
    D -- No --> E[Prompt: Select Provider]
    E --> F[Prompt: Select Model]
    F --> G[Check/Prompt: API Key]
    D -- Yes --> H[Read Saved Settings]
    G --> I[Send Diff + Prompts to LLM]
    H --> I
    I --> J[Clean & Extract Message]
    J --> K[Populate Source Control Box]
    K --> L[Finish: Success Message]
```

---

## 📂 Folder Structure

The project is organized logically to separate concerns:

```text
committor/
├── src/
│   ├── commit/           # Core logic for commit generation
│   ├── config/           # Configuration management and key validation
│   ├── const/            # System-wide constants (prompts, endpoints)
│   ├── llms/             # Provider implementations (OpenAI, Gemini, OpenRouter)
│   ├── types/            # Centralized TypeScript interfaces
│   ├── ui/               # VS Code UI wrappers (pickers and selectors)
│   ├── utils/            # Shared utilities (Git helpers, error handlers)
│   └── extension.ts      # Main entry point and command registration
├── package.json          # Extension manifest and configuration schema
└── tsconfig.json         # TypeScript configuration
```

---

## ⚙️ Configuration

Settings are managed via VS Code's standard settings interface (`Ctrl+,`).

### Manual Setup via UI
1. Open **Settings** (`Ctrl+,`).
2. Type **"Committor"** in the search bar.
3. Configure your preferences:
   - **Default Provider**: Set your preferred AI.
   - **API Keys**: Manage keys for all providers.
   - **Default Models**: Choose your go-to model (Supports **o1**, **Gemini 2.5**, **DeepSeek R1**, etc.).

| Setting | Description |
|---------|-------------|
| `committor.defaultProvider` | Skip selection by setting a default AI. |
| `committor.openaiModel` | Default model for OpenAI (e.g., `gpt-4o`, `o1`). |
| `committor.openrouterModel` | Default model for OpenRouter (e.g., `deepseek-r1`). |
| `committor.geminiModel` | Default model for Gemini (e.g., `gemini-2.0-flash`, `gemini-2.5-pro`). |

---

## 🏛️ Architecture Overview

The following diagram precisely maps the project's internal dependencies:

```mermaid
graph TD
    subgraph "Entry Point"
        Ext["extension.ts"]
    end

    subgraph "UI"
        Selector["ui/selector.ts"]
    end

    subgraph "Core Logic"
        Generator["commit/commitGenerator.ts"]
    end

    subgraph "AI Engines"
        LLM["llms/ providers"]
        OpenAI["llms/openAI.ts"]
        OpenRouter["llms/openRouter.ts"]
        Gemini["llms/gemini.ts"]
    end

    subgraph "Storage & Config"
        Config["config/configuration.ts"]
    end

    subgraph "Resources"
        Prompts["const/prompts.ts"]
        Endpoints["const/endpoints.ts"]
    end

    subgraph "Helpers"
        Git["utils/gitUtils.ts"]
        Extract["utils/extractCommitMessage.ts"]
        Error["utils/errorHandler.ts"]
        Types["types/index.ts"]
    end

    Ext --> Selector
    Selector --> Generator
    Ext --> Config
    Generator --> Git
    Generator --> LLM
    Generator --> Error
    LLM --> OpenAI
    LLM --> OpenRouter
    LLM --> Gemini
    LLM --> Endpoints
    LLM --> Prompts
    LLM --> Extract
    Ext -.-> Types
    Generator -.-> Types
```

---

## ❓ Troubleshooting

### OpenRouter "Data Policy" Error
If using free models on OpenRouter, visit [OpenRouter Privacy Settings](https://openrouter.ai/settings/privacy) and enable **"Allow data usage for model improvement"**.

---

## 🗺️ Roadmap & Future Support

We are constantly working to improve **Committor**. Upcoming features include:

- **🚀 More LLM Providers**: Experimental support for **xAI Grok**, **Anthropic Claude**, and **Ollama** (for local models).
- **📝 Multi-line Commits**: Support for generating detailed commit bodies and footers.
- **🌐 Internationalization**: Localized commit messages for multiple languages.
- **🛠️ Custom Templates**: Allow users to define their own commit message formats.

---

## 👨‍💻 Contributing

We welcome contributions!
- **Repository**: [https://github.com/ManojBelbase/committor](https://github.com/ManojBelbase/committor)

---

**Enjoying Committor?** Please rate us ⭐⭐⭐⭐⭐ in the marketplace!
