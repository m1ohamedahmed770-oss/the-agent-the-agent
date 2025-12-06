// Popup Script for The Agent The Agent Extension
// Handles user input and communicates with background service worker

class AgentPopup {
    constructor() {
        this.taskInput = document.getElementById('task-input');
        this.executeBtn = document.getElementById('execute-btn');
        this.settingsBtn = document.getElementById('settings-btn');
        this.output = document.getElementById('output');
        this.isExecuting = false;

        this.initializeEventListeners();
        this.loadSettings();
    }

    initializeEventListeners() {
        this.executeBtn.addEventListener('click', () => this.executeTask());
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.taskInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.executeTask();
            }
        });
    }

    async executeTask() {
        const task = this.taskInput.value.trim();

        if (!task) {
            this.addLog('Please enter a task', 'error');
            return;
        }

        if (this.isExecuting) {
            this.addLog('Task already executing...', 'error');
            return;
        }

        this.isExecuting = true;
        this.executeBtn.disabled = true;
        this.clearOutput();
        this.addLog('Starting task execution...', 'success');
        this.updateStatus('loading', 'Processing...');

        try {
            // Send message to background service worker
            const response = await chrome.runtime.sendMessage({
                action: 'executeTask',
                task: task
            });

            if (response.success) {
                this.addLog('Task completed successfully!', 'success');
                this.addLog(response.result, 'success');
                this.updateStatus('success', 'Completed');
            } else {
                this.addLog('Task failed: ' + response.error, 'error');
                this.updateStatus('error', 'Failed');
            }
        } catch (error) {
            this.addLog('Error: ' + error.message, 'error');
            this.updateStatus('error', 'Error');
        } finally {
            this.isExecuting = false;
            this.executeBtn.disabled = false;
        }
    }

    openSettings() {
        chrome.runtime.openOptionsPage();
    }

    addLog(message, type = 'info') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        this.output.appendChild(entry);
        this.output.scrollTop = this.output.scrollHeight;
    }

    clearOutput() {
        this.output.innerHTML = '';
    }

    updateStatus(status, message) {
        const statusDiv = this.output.querySelector('.status');
        if (statusDiv) {
            const indicator = statusDiv.querySelector('.status-indicator');
            indicator.className = `status-indicator ${status}`;
            statusDiv.querySelector('span:last-child').textContent = message;
        }
    }

    loadSettings() {
        chrome.storage.sync.get(['apiKey', 'model'], (result) => {
            if (result.apiKey) {
                console.log('Settings loaded');
            }
        });
    }
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AgentPopup();
});
