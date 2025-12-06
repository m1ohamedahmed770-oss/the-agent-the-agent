// Content Script for The Agent The Agent Extension
// Injects into web pages to interact with DOM and collect page information

class PageInteractor {
    constructor() {
        this.setupMessageListener();
        this.observePageChanges();
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'getPageContext') {
                sendResponse(this.getPageContext());
            } else if (request.action === 'executeAction') {
                this.executeAction(request.actionData)
                    .then(result => sendResponse({ success: true, result }))
                    .catch(error => sendResponse({ success: false, error: error.message }));
                return true;
            }
        });
    }

    getPageContext() {
        return {
            url: window.location.href,
            title: document.title,
            description: this.getMetaDescription(),
            headings: this.getHeadings(),
            links: this.getLinks(),
            inputs: this.getInputElements(),
            buttons: this.getButtons(),
            images: this.getImages(),
            timestamp: new Date().toISOString()
        };
    }

    getMetaDescription() {
        const meta = document.querySelector('meta[name="description"]');
        return meta ? meta.getAttribute('content') : '';
    }

    getHeadings() {
        return Array.from(document.querySelectorAll('h1, h2, h3'))
            .slice(0, 10)
            .map(h => ({
                level: h.tagName,
                text: h.textContent.trim()
            }));
    }

    getLinks() {
        return Array.from(document.querySelectorAll('a[href]'))
            .slice(0, 20)
            .map(a => ({
                text: a.textContent.trim(),
                href: a.href,
                title: a.title
            }))
            .filter(link => link.text.length > 0);
    }

    getInputElements() {
        return Array.from(document.querySelectorAll('input, textarea, select'))
            .slice(0, 10)
            .map(input => ({
                type: input.type || input.tagName.toLowerCase(),
                name: input.name,
                placeholder: input.placeholder,
                value: input.value
            }));
    }

    getButtons() {
        return Array.from(document.querySelectorAll('button, [role="button"]'))
            .slice(0, 15)
            .map(btn => ({
                text: btn.textContent.trim(),
                type: btn.type || 'button',
                ariaLabel: btn.getAttribute('aria-label')
            }))
            .filter(btn => btn.text.length > 0);
    }

    getImages() {
        return Array.from(document.querySelectorAll('img'))
            .slice(0, 10)
            .map(img => ({
                src: img.src,
                alt: img.alt,
                title: img.title
            }));
    }

    async executeAction(actionData) {
        switch (actionData.type) {
            case 'search':
                return await this.performSearch(actionData.query);
            case 'click':
                return await this.clickElement(actionData.selector);
            case 'type':
                return await this.typeText(actionData.selector, actionData.text);
            case 'extract':
                return await this.extractContent(actionData.target);
            case 'scroll':
                return await this.scrollPage(actionData.direction);
            default:
                throw new Error(`Unknown action type: ${actionData.type}`);
        }
    }

    async performSearch(query) {
        // Try to find a search input and submit
        const searchInput = document.querySelector(
            'input[type="search"], input[placeholder*="search" i], input[aria-label*="search" i]'
        );

        if (searchInput) {
            searchInput.focus();
            searchInput.value = query;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.dispatchEvent(new Event('change', { bubbles: true }));

            // Try to find and click search button
            const searchBtn = searchInput.closest('form')?.querySelector('button[type="submit"]');
            if (searchBtn) {
                searchBtn.click();
                await this.waitForPageLoad(2000);
            }

            return { success: true, message: `Searched for "${query}"` };
        }

        throw new Error('Search input not found on page');
    }

    async clickElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await this.delay(300);
            element.click();
            await this.waitForPageLoad(1500);
            return { success: true, message: `Clicked element: ${selector}` };
        }

        throw new Error(`Element not found: ${selector}`);
    }

    async typeText(selector, text) {
        const element = document.querySelector(selector);
        if (element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
            element.focus();
            element.value = text;
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            return { success: true, message: `Typed text in ${selector}` };
        }

        throw new Error(`Input element not found: ${selector}`);
    }

    async extractContent(target) {
        let element;

        if (target === 'main-content') {
            element = document.querySelector('main, article, [role="main"], .content, .main-content');
        } else {
            element = document.querySelector(target);
        }

        if (element) {
            return {
                success: true,
                content: element.textContent.trim().substring(0, 1000),
                html: element.innerHTML.substring(0, 2000)
            };
        }

        throw new Error(`Content target not found: ${target}`);
    }

    async scrollPage(direction) {
        const scrollAmount = 500;
        if (direction === 'down') {
            window.scrollBy(0, scrollAmount);
        } else if (direction === 'up') {
            window.scrollBy(0, -scrollAmount);
        }

        await this.delay(500);
        return { success: true, message: `Scrolled ${direction}` };
    }

    observePageChanges() {
        // Monitor DOM changes for dynamic content
        const observer = new MutationObserver(() => {
            // Page content changed, could trigger re-analysis
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    waitForPageLoad(timeout = 3000) {
        return new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                const handler = () => {
                    if (document.readyState === 'complete') {
                        document.removeEventListener('readystatechange', handler);
                        resolve();
                    }
                };
                document.addEventListener('readystatechange', handler);
                setTimeout(resolve, timeout);
            }
        });
    }
}

// Initialize page interactor
const interactor = new PageInteractor();
console.log('Content script loaded');
