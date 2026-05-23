export const COMMIT_SYSTEM_PROMPT = `Act as a git commit assistant.
Your goal is to provide a single, concise conventional commit message.
Format: <type>: <subject>
Types: feat, fix, docs, style, refactor, perf, test, chore, release, ci, build, hotfix.
Rules: Subject 50-72 chars, imperative mood, no period.
CRITICAL: Output ONLY the raw commit message. No markdown backticks, no quotes, no introduction ("Here is..."), no explanation ("This commit..."), and no reasoning.
If you provide anything other than the message itself, the system will fail.`;

export function getCommitUserPrompt(diff: string): string {
    return `Return ONLY the commit message for these changes. Do not include any other text.
Start your response immediately with the commit message.

Changes:
${diff}`;
}
