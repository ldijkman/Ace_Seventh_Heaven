// Global variables
var tooltipsEnabled = true;
var tooltip; // Reference to the tooltip element
var lastActiveElement = null; // Track the last active element

// Function to create and append the tooltip element to the body
function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    return tooltip;
}

// Function to update and display the tooltip
function updateTooltip(element, tooltip, event) {
    tooltip.innerHTML = '';
    tooltip.style.display = 'block';

    var detailsList = document.createElement('ul');
    detailsList.style.listStyleType = 'none';
    tooltip.appendChild(detailsList);

    // Check if the element is an image and display its info
    if (element.tagName.toLowerCase() === 'img') {
        var srcListItem = document.createElement('li');
        srcListItem.textContent = 'Src: ' + (element.src ? element.src : 'None');
        detailsList.appendChild(srcListItem);

        var widthListItem = document.createElement('li');
        widthListItem.textContent = 'Width: ' + element.width + 'px';
        detailsList.appendChild(widthListItem);

        var heightListItem = document.createElement('li');
        heightListItem.textContent = 'Height: ' + element.height + 'px';
        detailsList.appendChild(heightListItem);
    }

    // Add details like ID and class with count
    var idListItem = document.createElement('li');
    idListItem.textContent = 'ID: ' + (element.id ? element.id : 'None');
    detailsList.appendChild(idListItem);

    var classListItem = document.createElement('li');
    var classText = element.classList.length > 0 ? Array.from(element.classList).join(', ') : 'None';
    var classCount = element.classList.length; // Count of classes
    classListItem.textContent = 'Class [' + classCount + ']: ' + classText;
    detailsList.appendChild(classListItem);

    // Inline styles
    var inlineStyles = element.style;
    if (inlineStyles.length > 0) {
        for (var i = 0; i < inlineStyles.length; i++) {
            var property = inlineStyles[i];
            var value = inlineStyles.getPropertyValue(property);
            var styleListItem = document.createElement('li');
            styleListItem.textContent = property + ': ' + value;
            detailsList.appendChild(styleListItem);
        }
    }

    // Styles from stylesheets
    Array.from(document.styleSheets).forEach((sheet) => {
        try {
            Array.from(sheet.rules || sheet.cssRules).forEach((rule) => {
                if (element.matches(rule.selectorText)) {
                    var cssText = rule.style.cssText.split(';');
                    cssText.forEach((styleProperty) => {
                        if (styleProperty.trim().length > 0) {
                            var styleListItem = document.createElement('li');
                            styleListItem.textContent = styleProperty.trim();
                            detailsList.appendChild(styleListItem);
                        }
                    });
                }
            });
        } catch (e) {
            console.warn('Cannot access stylesheet: ', sheet);
        }
    });

    // Position the tooltip
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    tooltip.style.left = (event.clientX + scrollLeft + 10) + 'px';
    tooltip.style.top = (event.clientY + scrollTop + 10) + 'px';
}

// Function to add styles for the tooltip
function addTooltipStyles() {
    var css = `
        .tooltip {
            position: absolute;
            padding: 8px;
            background: #f0f0f0;
            border: 1px solid #ccc;
            z-index: 999999;
            display: none;
            font-size: 14px;
            border-radius: 8px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            color: #333;
            max-width: 200px;
        }
        .tooltip ul {
            padding: 0;
            margin: 0;
        }
        .tooltip li {
            margin: 1px 0;
        }
    `;

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

// Function to attach or detach tooltip event listeners
function toggleTooltipEventListeners(enable) {
    document.querySelectorAll('*').forEach(function (element) {
        if (enable) {
            element.addEventListener('mouseover', onMouseOver);
            element.addEventListener('mouseout', onMouseOut);
        } else {
            element.removeEventListener('mouseover', onMouseOver);
            element.removeEventListener('mouseout', onMouseOut);
        }
    });
}

// Function to handle mouseover events
function onMouseOver(event) {
    event.stopPropagation();
    updateTooltip(this, tooltip, event);
    this.style.border = '2px solid red';
    lastActiveElement = this;
}

// Function to handle mouseout events
function onMouseOut() {
    tooltip.style.display = 'none';
    if (lastActiveElement) {
        lastActiveElement.style.border = '';
        lastActiveElement = null;
    }
}

// Function to initialize the tooltip functionality
function initializeTooltips() {
    addTooltipStyles();
    tooltip = createTooltip(); // Create the tooltip element
    toggleTooltipEventListeners(tooltipsEnabled); // Attach event listeners if enabled
}

// Function to create and append the toggle button to the body
function createToggleTooltipButton() {
    var button = document.createElement('button');
    button.id = 'toggle-tooltip-btn';
    button.textContent = 'Disable Tooltips'; // Default text when tooltips are enabled
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#3498db';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1010';
    button.style.opacity = '0.8'; // Make button a bit transparent
    document.body.appendChild(button);

    // Event listener for the toggle button
    button.addEventListener('click', function() {
        tooltipsEnabled = !tooltipsEnabled; // Toggle the state
        toggleTooltipEventListeners(tooltipsEnabled); // Add or remove event listeners
        // Hide the tooltip and remove border if disabling
        if (!tooltipsEnabled && lastActiveElement) {
            lastActiveElement.style.border = '';
            lastActiveElement = null;
            tooltip.style.display = 'none';
        }
        // Update button text based on the state
        button.textContent = tooltipsEnabled ? 'Disable Tooltips' : 'Enable Tooltips';
    });
}

// Initialize tooltips when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTooltips();
    createToggleTooltipButton();
});
