import simpleGit, { SimpleGit } from "simple-git";
import * as vscode from "vscode";

let gitInstance: SimpleGit | undefined;

export async function getStagedChanges(): Promise<string> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error("No workspace folder found. Please open a folder first.");
    }

    const workingDir = workspaceFolder.uri.fsPath;

    if (!gitInstance) {
        gitInstance = simpleGit(workingDir);
    }

    try {
        const isRepo = await gitInstance.checkIsRepo();
        if (!isRepo) {
            throw new Error("Not a git repository. Please initialize git first.");
        }

        const diff = await gitInstance.diff(["--cached"]);

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
