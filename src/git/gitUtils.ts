import simpleGit from "simple-git";

const git = simpleGit();

export async function getStagedChanges(): Promise<string> {
    const diff = await git.diff(["--cached"]);
    return diff || "No staged changes detected";
}
