/**
 * @param apiKey The API key for the provider.
 * @param modelValue The selected model for the provider.
 * @param providerLabel The human-readable label of the provider.
 * @throws Error if the API key or model is missing.
 */
export function validateProviderConfig(
    apiKey: string | undefined,
    modelValue: string | undefined,
    providerLabel: string
): void {
    if (!apiKey) {
        throw new Error(`${providerLabel} is selected as the active provider but its API Key is missing. Please configure it in settings.`);
    }
    if (!modelValue) {
        throw new Error(`${providerLabel} is selected as the active provider but no model is selected. Please configure it in settings.`);
    }
}
