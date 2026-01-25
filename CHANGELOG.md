# Change Log

All notable changes to the "committor" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.5] - 2026-01-25

### Added
- **MIT License**: Formally added the MIT license to the project.

### Fixed
- **Repository Optimization**: Optimized `.gitignore` and removed unnecessary tracked files to reduce package size.

### Changed
- Updated project version to 1.0.5 in `package.json`.

## [1.0.4] - 2026-01-24

### Added
- **Gemini 2.0 Flash** and **DeepSeek R1** support.
- **Conventional Commits** standardization for all AI providers.
- **Improved AI Selection**: New UI prompt to choose between OpenAI, OpenRouter, and Gemini.
- **Smart API Configuration**: Automatic detection and guiding for API key setup.
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