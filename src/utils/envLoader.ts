import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function loadEnv() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    const rootPath = workspaceFolders[0].uri.fsPath;
    const envPaths = [
        path.join(rootPath, '.env'),
        path.join(rootPath, 'src', '.env')
    ];

    for (const envPath of envPaths) {
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const lines = envContent.split('\n');

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine || trimmedLine.startsWith('#')) continue;

                const [key, ...valueParts] = trimmedLine.split('=');
                if (key) {
                    const value = valueParts.join('=').trim();
                    const cleanValue = value.replace(/^["'](.*)["']$/, '$1');
                    process.env[key.trim()] = cleanValue;
                }
            }
        }
    }
}
