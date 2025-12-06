// Options Page Script for The Agent The Agent Extension
// Handles settings management and user preferences

class SettingsManager {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.setupEventListeners();
    }

    initializeElements() {
        this.elements = {
            apiProvider: document.getElementById('api-provider'),
            apiKey: document.getElementById('api-key'),
            model: document.getElementById('model'),
            autoMode: document.getElementById('auto-mode'),
            verboseLogging: document.getElementById('verbose-logging'),
            timeout: document.getElementById('timeout'),
            maxRetries: document.getElementById('max-retries'),
            customInstructions: document.getElementById('custom-instructions'),
            saveBtn: document.getElementById('save-btn'),
            resetBtn: document.getElementById('reset-btn'),
            statusMessage: document.getElementById('status-message')
        };
    }

    setupEventListeners() {
        this.elements.saveBtn.addEventListener('click', () => this.saveSettings());
        this.elements.resetBtn.addEventListener('click', () => this.resetToDefaults());
    }

    loadSettings() {
        const defaultSettings = this.getDefaultSettings();

        chrome.storage.sync.get(defaultSettings, (result) => {
            this.elements.apiProvider.value = result.apiProvider;
            this.elements.apiKey.value = result.apiKey;
            this.elements.model.value = result.model;
            this.elements.autoMode.checked = result.autoMode;
            this.elements.verboseLogging.checked = result.verboseLogging;
            this.elements.timeout.value = result.timeout;
            this.elements.maxRetries.value = result.maxRetries;
            this.elements.customInstructions.value = result.customInstructions;
        });
    }

    saveSettings() {
        const settings = {
            apiProvider: this.elements.apiProvider.value,
            apiKey: this.elements.apiKey.value,
            model: this.elements.model.value,
            autoMode: this.elements.autoMode.checked,
            verboseLogging: this.elements.verboseLogging.checked,
            timeout: parseInt(this.elements.timeout.value),
            maxRetries: parseInt(this.elements.maxRetries.value),
            customInstructions: this.elements.customInstructions.value
        };

        chrome.storage.sync.set(settings, () => {
            this.showMessage('Settings saved successfully!', 'success');
            console.log('Settings saved:', settings);
        });
    }

    resetToDefaults() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            const defaults = this.getDefaultSettings();
            chrome.storage.sync.set(defaults, () => {
                this.loadSettings();
                this.showMessage('Settings reset to defaults', 'success');
            });
        }
    }

    getDefaultSettings() {
        return {
            apiProvider: 'openai',
            apiKey: '',
            model: 'gpt-4-turbo',
            autoMode: false,
            verboseLogging: false,
            timeout: 60,
            maxRetries: 3,
            customInstructions: ''
        };
    }

    showMessage(message, type) {
        this.elements.statusMessage.textContent = message;
        this.elements.statusMessage.className = `status-message ${type}`;

        setTimeout(() => {
            this.elements.statusMessage.className = 'status-message';
        }, 3000);
    }
}

// Initialize settings manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SettingsManager();
});
