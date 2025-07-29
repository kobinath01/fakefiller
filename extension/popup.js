document.addEventListener('DOMContentLoaded', function () {
    const fillBtn = document.getElementById('fillBtn');
    const clearBtn = document.getElementById('clearBtn');
    const status = document.getElementById('status');

    function showStatus(message, type = 'success') {
        status.textContent = message;
        status.className = `status ${type}`;
        setTimeout(() => {
            status.textContent = '';
            status.className = 'status';
        }, 3000);
    }

    function showLoading() {
        status.innerHTML = '<div class="loading"></div> Processing...';
        status.className = 'status';
    }

    fillBtn.addEventListener('click', async function () {
        try {
            showLoading();

            // Get the current active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Execute the fill script
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: fillAllFields
            });

            showStatus('✅ Fields filled successfully!');
        } catch (error) {
            console.error('Error filling fields:', error);
            showStatus('❌ Error filling fields', 'error');
        }
    });

    clearBtn.addEventListener('click', async function () {
        try {
            showLoading();

            // Get the current active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Execute the clear script
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: clearAllFields
            });

            showStatus('🗑️ Fields cleared successfully!');
        } catch (error) {
            console.error('Error clearing fields:', error);
            showStatus('❌ Error clearing fields', 'error');
        }
    });
});

// Function to be injected into the page
async function fillAllFields() {
    try {
        // Fetch fake data from Python backend
        const response = await fetch('http://localhost:5000/api/fake-data');
        const fakeData = await response.json();

        let filledCount = 0;

        // Fill text inputs and textareas
        const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="password"], input:not([type]), textarea');
        textInputs.forEach((input, index) => {
            if (!input.readOnly && !input.disabled) {
                const fieldName = (input.name || input.id || input.placeholder || '').toLowerCase();
                let value = '';

                // Smart field detection
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
                    // Default to random text for unrecognized fields
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

        // Fill radio buttons (select random option from each group)
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

        // Fill checkboxes (randomly check/uncheck)
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
        alert('Error connecting to Fake Filler backend. Make sure the Python server is running on localhost:5000');
    }
}

// Function to clear all fields
function clearAllFields() {
    let clearedCount = 0;

    // Clear text inputs and textareas
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="password"], input[type="date"], input[type="number"], input:not([type]), textarea');
    textInputs.forEach(input => {
        if (!input.readOnly && !input.disabled) {
            input.value = '';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            clearedCount++;
        }
    });

    // Reset select dropdowns
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        if (!select.disabled) {
            select.selectedIndex = 0;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            clearedCount++;
        }
    });

    // Uncheck radio buttons and checkboxes
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