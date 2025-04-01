document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    const fromEmailInput = document.getElementById('fromEmail');
    const toEmailInput = document.getElementById('toEmail');
    const resultDiv = document.getElementById('result');
    const generatedEmailEl = document.getElementById('generatedEmail');
    const copyBtn = document.getElementById('copyBtn');
    const mailtoLink = document.getElementById('mailtoLink');
    const resetBtn = document.getElementById('resetBtn');
    const copyMessage = document.getElementById('copyMessage');
    const themeToggle = document.getElementById('themeToggle');
    const themeMetaColor = document.getElementById('themeMetaColor');
    
    // Theme handling
    function setTheme(theme) {
        if (theme === 'auto') {
            localStorage.removeItem('theme');
            document.documentElement.removeAttribute('data-theme');
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            updateMetaThemeColor(systemTheme);
        } else {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateMetaThemeColor(theme);
        }
    }
    
    function updateMetaThemeColor(theme) {
        // Update the meta theme-color based on current theme
        if (theme === 'dark') {
            themeMetaColor.setAttribute('content', '#1d1d1f');
        } else {
            themeMetaColor.setAttribute('content', '#c13920');
        }
    }
    
    function getEffectiveTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function toggleTheme() {
        const currentTheme = getEffectiveTheme();
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateMetaThemeColor(savedTheme);
        } else {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemTheme);
            updateMetaThemeColor(systemTheme);
        }
        
        // Add system preference class for icon control
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark-mode-system');
        } else {
            document.documentElement.classList.add('light-mode-system');
        }
    }
    
    // Initialize theme
    initTheme();
    
    // Add theme toggle listener
    themeToggle.addEventListener('click', toggleTheme);

    // Add system theme change listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateMetaThemeColor(newTheme);
        }
    });

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fromEmail = fromEmailInput.value.trim();
        const toEmail = toEmailInput.value.trim();
        
        if (!isValidEmail(fromEmail) || !fromEmail.endsWith('@duck.com')) {
            alert('Please enter a valid DuckDuckGo email address ending with @duck.com');
            return;
        }
        
        if (!isValidEmail(toEmail)) {
            alert('Please enter a valid recipient email address');
            return;
        }
        
        const generatedEmail = generateDDGEmail(fromEmail, toEmail);
        
        // Display the result
        generatedEmailEl.value = generatedEmail;
        resultDiv.classList.remove('hidden');
        
        // Update mailto link
        mailtoLink.href = `mailto:${generatedEmail}`;
    });
    
    // Fixed to use .value instead of .textContent
    copyBtn.addEventListener('click', () => {
        copyToClipboard();
    });
    
    // Add click handler to the input field
    generatedEmailEl.addEventListener('click', () => {
        copyToClipboard();
    });
    
    // Helper function to copy and show message
    function copyToClipboard() {
        navigator.clipboard.writeText(generatedEmailEl.value)
            .then(() => {
                copyMessage.classList.remove('hidden');
                setTimeout(() => {
                    copyMessage.classList.add('hidden');
                }, 2000);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    }
    
    resetBtn.addEventListener('click', () => {
        emailForm.reset();
        resultDiv.classList.add('hidden');
        copyMessage.classList.add('hidden');
    });
    
    function generateDDGEmail(fromEmail, toEmail) {
        // Extract username from DDG email (part before @duck.com)
        const username = fromEmail.split('@')[0];
        
        // Format the "to" email by replacing @ with _at_
        const formattedTo = toEmail.replace('@', '_at_');
        
        // Construct the final email
        return `${formattedTo}_${username}@duck.com`;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
