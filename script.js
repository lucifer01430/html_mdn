// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Sidebar Toggle for Mobile
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Simulate Hover Effect for Sidebar Toggle on Mobile
sidebarToggle.addEventListener('touchstart', () => {
    sidebarToggle.classList.add('hovered');
});

sidebarToggle.addEventListener('touchend', () => {
    sidebarToggle.classList.remove('hovered');
});

// For desktop hover (optional, as CSS already handles this)
sidebarToggle.addEventListener('mouseover', () => {
    sidebarToggle.classList.add('hovered');
});

sidebarToggle.addEventListener('mouseout', () => {
    sidebarToggle.classList.remove('hovered');
});

// Search Functionality
const searchBar = document.getElementById('search-bar');
const navLinks = document.querySelectorAll('#nav-list a');

searchBar.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    navLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.parentElement.style.display = text.includes(searchText) ? 'block' : 'none';
    });
});

// Add Pulse Animation After Sidebar Navigation and Close Sidebar on Mobile
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                targetSection.classList.add('pulse');
            }, 600);

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    });
});

// Code Playground Functionality
const codeInput = document.getElementById('code-input');
const codeOutput = document.getElementById('code-output');
const runCodeBtn = document.getElementById('run-code');

runCodeBtn.addEventListener('click', () => {
    const userCode = codeInput.value;
    const doc = codeOutput.contentDocument || codeOutput.contentWindow.document;
    doc.open();
    doc.write(userCode);
    doc.close();
});

// Handle Show Output Buttons with Debugging for Mobile
const showOutputButtons = document.querySelectorAll('.show-output');

showOutputButtons.forEach(button => {
    const pre = button.previousElementSibling;
    const outputDiv = button.nextElementSibling;

    if (pre.tagName.toLowerCase() === 'pre' && pre.textContent.includes('<!DOCTYPE html>')) {
        button.setAttribute('data-state', 'hidden');

        const decodeHtml = (html) => {
            const txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        };

        const handleOutputToggle = () => {
            console.log('Show Output button clicked/touched');
            const state = button.getAttribute('data-state');
            
            if (state === 'hidden') {
                const decodedCode = decodeHtml(pre.textContent);
                console.log('Rendering output:', decodedCode);
                outputDiv.innerHTML = decodedCode;
                outputDiv.classList.add('visible');
                button.setAttribute('data-state', 'visible');
                button.textContent = 'Hide Output';
            } else {
                console.log('Hiding output');
                outputDiv.classList.remove('visible');
                setTimeout(() => {
                    outputDiv.innerHTML = '';
                }, 300);
                button.setAttribute('data-state', 'hidden');
                button.textContent = 'Show Output';
            }
        };

        button.addEventListener('click', handleOutputToggle);
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleOutputToggle();
        });
    }
});

// Add Copy to Clipboard Functionality for All <pre> Tags
const preTags = document.querySelectorAll('pre');

preTags.forEach(pre => {
    // Create the copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-btn';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');

    // Append the button to the <pre> tag
    pre.appendChild(copyButton);

    // Add click event listener to copy the code
    copyButton.addEventListener('click', () => {
        const code = pre.textContent;

        // Use Clipboard API if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
                // Visual feedback
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.classList.remove('copied');
                }, 2000); // Revert after 2 seconds
            }).catch(err => {
                console.error('Failed to copy:', err);
                copyButton.textContent = 'Error';
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Fallback copy failed:', err);
                copyButton.textContent = 'Error';
            }
            document.body.removeChild(textarea);
        }
    });
});

// Section Animations with Intersection Observer
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Scroll to Top Functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top on click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});