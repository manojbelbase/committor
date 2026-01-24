export function extractCommitMessage(text: string): string {
    let cleaned = text.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '').trim();

    cleaned = cleaned.replace(/^["']|["']$/g, '').trim();
    const lines = cleaned.split('\n');
    const commitRegex = /^(feat|fix|docs|style|refactor|perf|test|chore|release|ci|build|hotfix)(\([a-z0-9_\-\/]+\))?: .+/i;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (commitRegex.test(trimmedLine)) {
            return trimmedLine;
        }
    }
    return cleaned;
}
