import simpleGit from "simple-git";
import * as vscode from "vscode";

export async function getStagedChanges(): Promise<string> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error("No workspace folder found. Please open a folder first.");
    }

    const git = simpleGit(workspaceFolder.uri.fsPath);

    try {
        const isRepo = await git.checkIsRepo();
        if (!isRepo) {
            throw new Error("Not a git repository. Please initialize git first.");
        }

        const diff = await git.diff(["--cached"]);

        if (!diff || diff.trim() === "") {
            throw new Error("No staged changes detected. Please stage your changes first using 'git add'.");
        }

        return diff;
    } catch (error: any) {
        if (error.message.includes("Not a git repository") || error.message.includes("No staged changes")) {
            throw error;
        }
        throw new Error(`Git error: ${error.message}`);
    }
}
