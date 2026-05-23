# Change Log

All notable changes to the "committor" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.1.2] - 2026-05-23

### Changed

## [1.1.1] - 2026-01-27

### Added

- **Contact & Support Channel**: Added a direct email feedback link mechanism in README for streamlined bug reporting and feature requests.
- Update docs to remove radio button terminology and add contact section.

### Changed

- Updated project version to 1.1.1.

## [1.1.0] - 2026-01-27

### Added

- **Active Provider Selection**: Refactored `defaultProvider` to `activeProvider` for a clear style selection of the active AI.
- **Auto-Detection Logic**: Automatically selects the active provider if none is set, based on configured API keys.
- **Switch AI Provider Command**: New command to quickly swap between AI providers and models from the command palette.
- **Robust Error Handling**: Added specific error messages for missing API keys or unselected models when a provider is active.

### Changed

- Updated project version to 1.1.0.

## [1.0.9] - 2026-01-27

### Added

- **UI Enhancements**: Added a dedicated "Generate Commit" button to the Source Control title bar.
- **Custom Visuals**: Replaced the standard sparkle icon with a vibrant, custom-designed gold/yellow sparkle SVG.
- **Improved Visibility**: Command title updated to "Committor: Generate Commit Message" for better clarity in menus and search.

### Changed

- Updated project version to 1.0.9.

## [1.0.8] - 2026-01-27

### Added

- **Groq SDK Migration**: Switched to the official `openai` SDK for Groq integration.
- **New Groq Models**: Added support for `openai/gpt-oss-120b`, `llama-3.3-70b-versatile`, `qwen/qwen3-32b`, and more.
- **Groq Responses API**: Implementation now uses the latest `/responses` endpoint for improved performance.

### Changed

- Updated project version to 1.0.8.

## [1.0.7] - 2026-01-27

### Changed

- Aligned `package.json` model enums and `README.md` configuration details with current code implementation.
- Updated project version to 1.0.6.
-

## [1.0.5] - 2026-01-25

### Added

- **MIT License**: Formally added the MIT license to the project.

### Fixed

- **Repository Optimization**: Optimized `.gitignore` and removed unnecessary tracked files to reduce package size.

### Changed

- Updated project version to 1.0.5 in `package.json`.

## [1.0.4] - 2026-01-24

### Added

- **Gemini 2.0 Flash** and- **Auto-Population**: Automatically fills the Git Source Control input box for you.
- **Quick Access**: Dedicated **"Generate Commit"** button with a vibrant gold ✨ (sparkle) icon in the Source Control title bar.
- **Privacy First**: Your API keys never leave your machine; they are stored locally in VS Code's secure configuration.
  API key setup.
- **New Branding**: High-resolution icon and updated documentation assets.

### Fixed

- **OpenRouter Stability**: Resolved issues with empty responses and token limit handling.
- **Package Integrity**: Migrated to `npm` to ensure reliable bundling for VS Code Marketplace.
- **Command Discovery**: Fixed activation issues where commands were not properly registered.

### Changed

- Refactored core logic for better provider extensibility.
- Enhanced `README.md` with detailed setup and feature guides.

## [1.0.0] - 2026-01-20

- Initial release with basic OpenAI support.
