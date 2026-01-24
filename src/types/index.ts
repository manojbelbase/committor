export interface AIProvider {
    label: string;
    value: string;
}

export interface AIModel {
    label: string;
    value: string;
}

export type LLMGenerator = (diff: string, apiKey: string, model?: string) => Promise<string>;
