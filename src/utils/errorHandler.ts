export function getReadableError(error: any, providerLabel?: string): string {
    if (typeof error === "string") return error;

    if (error.response?.data?.error?.message) {
        return `${providerLabel ? `${providerLabel}: ` : ""}${error.response.data.error.message}`;
    }

    if (error.response?.data?.message) {
        return `${providerLabel ? `${providerLabel}: ` : ""}${error.response.data.message}`;
    }

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
        return "Network connection failed. Please check your internet.";
    }

    if (error.code === "ETIMEDOUT") {
        return "Request timed out. The AI provider is taking too long to respond.";
    }

    if (error.message?.includes("staged changes")) {
        return "No staged changes found. Use 'git add' to stage files first.";
    }

    return error.message || "An unexpected error occurred.";
}
