// Background Service Worker for The Agent The Agent Extension
// Handles AI task execution and browser automation logic

class BrowserAgent {
    constructor() {
        this.setupMessageListener();
        this.initializeAgent();
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'executeTask') {
                this.executeTask(request.task)
                    .then(result => {
                        sendResponse({ success: true, result });
                    })
                    .catch(error => {
                        sendResponse({ success: false, error: error.message });
                    });
                return true; // Keep the message channel open for async response
            }
        });
    }

    initializeAgent() {
        console.log('Browser Agent initialized');
        // Load configuration from storage
        chrome.storage.sync.get(['apiKey', 'model', 'autoMode'], (result) => {
            this.config = {
                apiKey: result.apiKey || '',
                model: result.model || 'gpt-4-turbo',
                autoMode: result.autoMode || false
            };
        });
    }

    async executeTask(task) {
        try {
            // Get current active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Step 1: Analyze the task
            const analysis = await this.analyzeTask(task);
            console.log('Task Analysis:', analysis);

            // Step 2: Get page context
            const pageContext = await this.getPageContext(tab.id);
            console.log('Page Context:', pageContext);

            // Step 3: Generate action plan
            const actionPlan = await this.generateActionPlan(task, analysis, pageContext);
            console.log('Action Plan:', actionPlan);

            // Step 4: Execute actions
            const result = await this.executeActions(tab.id, actionPlan);
            console.log('Execution Result:', result);

            return result;
        } catch (error) {
            console.error('Task execution error:', error);
            throw error;
        }
    }

    async analyzeTask(task) {
        // This is a simplified analysis. In production, you would use an LLM API
        // For now, we'll use basic keyword matching and pattern recognition

        const keywords = {
            search: ['search', 'find', 'look for', 'query'],
            click: ['click', 'select', 'choose', 'open'],
            type: ['type', 'enter', 'write', 'input'],
            scroll: ['scroll', 'down', 'up', 'page'],
            wait: ['wait', 'pause', 'hold'],
            extract: ['extract', 'get', 'retrieve', 'show', 'find']
        };

        const taskLower = task.toLowerCase();
        const actions = [];

        for (const [action, words] of Object.entries(keywords)) {
            if (words.some(word => taskLower.includes(word))) {
                actions.push(action);
            }
        }

        return {
            task,
            detectedActions: actions,
            complexity: this.estimateComplexity(task),
            timestamp: new Date().toISOString()
        };
    }

    estimateComplexity(task) {
        const length = task.length;
        if (length < 30) return 'simple';
        if (length < 100) return 'medium';
        return 'complex';
    }

    async getPageContext(tabId) {
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, { action: 'getPageContext' }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error('Failed to get page context'));
                } else {
                    resolve(response || {});
                }
            });
        });
    }

    async generateActionPlan(task, analysis, pageContext) {
        // Generate a simple action plan based on analysis
        const plan = {
            task,
            steps: [],
            expectedOutcome: ''
        };

        if (analysis.detectedActions.includes('search')) {
            plan.steps.push({
                type: 'search',
                query: this.extractSearchQuery(task),
                priority: 'high'
            });
            plan.expectedOutcome = 'Search results displayed';
        }

        if (analysis.detectedActions.includes('extract')) {
            plan.steps.push({
                type: 'extract',
                target: 'main-content',
                priority: 'high'
            });
            plan.expectedOutcome = 'Information extracted from page';
        }

        if (analysis.detectedActions.includes('click')) {
            plan.steps.push({
                type: 'click',
                selector: this.findClickTarget(task, pageContext),
                priority: 'medium'
            });
        }

        return plan;
    }

    extractSearchQuery(task) {
        // Simple extraction of search query from task
        const searchMatch = task.match(/(?:search|find|look for)\s+(?:for\s+)?(.+?)(?:\s+and|\s+on|\s+in|$)/i);
        return searchMatch ? searchMatch[1] : task;
    }

    findClickTarget(task, pageContext) {
        // Simple heuristic for finding click targets
        return 'button, a, [role="button"]';
    }

    async executeActions(tabId, actionPlan) {
        const results = [];

        for (const step of actionPlan.steps) {
            try {
                const result = await this.executeAction(tabId, step);
                results.push({
                    step: step.type,
                    success: true,
                    result
                });
            } catch (error) {
                results.push({
                    step: step.type,
                    success: false,
                    error: error.message
                });
            }
        }

        return {
            success: results.every(r => r.success),
            steps: results,
            summary: `Executed ${results.length} steps. ${results.filter(r => r.success).length} succeeded.`
        };
    }

    async executeAction(tabId, action) {
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, { action: 'executeAction', actionData: action }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(`Failed to execute action: ${action.type}`));
                } else {
                    resolve(response);
                }
            });
        });
    }
}

// Initialize the browser agent
const agent = new BrowserAgent();

// Log service worker activation
console.log('Background service worker loaded');
