// Content script for Fake Filler
// This script runs on all web pages and can be used for additional functionality

console.log('Fake Filler content script loaded');

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillFields') {
        fillAllFields().then(() => {
            sendResponse({ success: true });
        }).catch(error => {
            sendResponse({ success: false, error: error.message });
        });
        return true; // Keep the message channel open for async response
    }

    if (request.action === 'clearFields') {
        clearAllFields();
        sendResponse({ success: true });
    }
});

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl+Shift+F to fill fields
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        fillAllFields();
    }

    // Ctrl+Shift+C to clear fields
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        clearAllFields();
    }
});

// Function to be called by popup script (duplicate for content script context)
async function fillAllFields() {
    try {
        const response = await fetch('http://localhost:5000/api/fake-data');
        const fakeData = await response.json();

        let filledCount = 0;

        // Fill text inputs and textareas
        const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="password"], input:not([type]), textarea');
        textInputs.forEach((input, index) => {
            if (!input.readOnly && !input.disabled) {
                const fieldName = (input.name || input.id || input.placeholder || '').toLowerCase();
                let value = '';

                if (fieldName.includes('email') || input.type === 'email') {
                    value = fakeData.email;
                } else if (fieldName.includes('phone') || fieldName.includes('tel') || input.type === 'tel') {
                    value = fakeData.phone;
                } else if (fieldName.includes('name') || fieldName.includes('first')) {
                    value = fakeData.first_name;
                } else if (fieldName.includes('last')) {
                    value = fakeData.last_name;
                } else if (fieldName.includes('address')) {
                    value = fakeData.address;
                } else if (fieldName.includes('city')) {
                    value = fakeData.city;
                } else if (fieldName.includes('state')) {
                    value = fakeData.state;
                } else if (fieldName.includes('zip') || fieldName.includes('postal')) {
                    value = fakeData.zip_code;
                } else if (fieldName.includes('country')) {
                    value = fakeData.country;
                } else if (fieldName.includes('company') || fieldName.includes('organization')) {
                    value = fakeData.company;
                } else if (fieldName.includes('age')) {
                    value = fakeData.age.toString();
                } else if (input.type === 'password') {
                    value = fakeData.password;
                } else {
                    value = fakeData.random_text;
                }

                input.value = value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                filledCount++;
            }
        });

        // Fill select dropdowns
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            if (!select.disabled && select.options.length > 1) {
                const randomIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1;
                select.selectedIndex = randomIndex;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                filledCount++;
            }
        });

        // Fill radio buttons
        const radioGroups = {};
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            const groupName = radio.name || 'unnamed';
            if (!radioGroups[groupName]) {
                radioGroups[groupName] = [];
            }
            radioGroups[groupName].push(radio);
        });

        Object.values(radioGroups).forEach(group => {
            if (group.length > 0) {
                const randomRadio = group[Math.floor(Math.random() * group.length)];
                if (!randomRadio.disabled) {
                    randomRadio.checked = true;
                    randomRadio.dispatchEvent(new Event('change', { bubbles: true }));
                    filledCount++;
                }
            }
        });

        // Fill checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.disabled) {
                checkbox.checked = Math.random() > 0.5;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                filledCount++;
            }
        });

        // Fill date inputs
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(dateInput => {
            if (!dateInput.disabled) {
                dateInput.value = fakeData.date;
                dateInput.dispatchEvent(new Event('change', { bubbles: true }));
                filledCount++;
            }
        });

        // Fill number inputs
        const numberInputs = document.querySelectorAll('input[type="number"]');
        numberInputs.forEach(numberInput => {
            if (!numberInput.disabled) {
                const min = parseInt(numberInput.min) || 1;
                const max = parseInt(numberInput.max) || 100;
                numberInput.value = Math.floor(Math.random() * (max - min + 1)) + min;
                numberInput.dispatchEvent(new Event('change', { bubbles: true }));
                filledCount++;
            }
        });

        console.log(`Fake Filler: Filled ${filledCount} fields`);

    } catch (error) {
        console.error('Error filling fields:', error);
    }
}

function clearAllFields() {
    let clearedCount = 0;

    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="password"], input[type="date"], input[type="number"], input:not([type]), textarea');
    textInputs.forEach(input => {
        if (!input.readOnly && !input.disabled) {
            input.value = '';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            clearedCount++;
        }
    });

    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        if (!select.disabled) {
            select.selectedIndex = 0;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            clearedCount++;
        }
    });

    const radioCheckboxes = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    radioCheckboxes.forEach(input => {
        if (!input.disabled) {
            input.checked = false;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            clearedCount++;
        }
    });

    console.log(`Fake Filler: Cleared ${clearedCount} fields`);
}