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
