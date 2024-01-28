// made with Ai gpt 3.5 and 4 by (c)2024  dirk luberth dijkman bangert 30 andijk the netherlands
// maybe shows a bit more as chromium inspect dev. tools 
// like class index number

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

    // Add details about the tag name
    var tagListItem = document.createElement('li');
    tagListItem.textContent = 'Tag: ' + element.tagName.toLowerCase();
    detailsList.appendChild(tagListItem);

    // Check if the element is an input and display its type
    if (element.tagName.toLowerCase() === 'input') {
        var inputTypeListItem = document.createElement('li');
        inputTypeListItem.textContent = 'Input Type: ' + (element.type ? element.type : 'text'); // Default to 'text' if type is not specified
        detailsList.appendChild(inputTypeListItem);
    }

    // Add details like ID
    var idListItem = document.createElement('li');
    idListItem.textContent = 'ID: ' + (element.id ? element.id : 'None');
    detailsList.appendChild(idListItem);

    // Add details about the classes with index across the whole document
    var classListItem = document.createElement('li');
    if (element.classList.length > 0) {
        var allElementsWithClasses = Array.from(document.querySelectorAll('*'));
        var classText = Array.from(element.classList).map(className => {
            var elementsWithClass = allElementsWithClasses.filter(el => el.classList.contains(className));
            var index = elementsWithClass.indexOf(element); // Find the index of the current element
            return className + ' Index ' + index;
        }).join(', ');

        classListItem.textContent = 'Class: ' + classText;
    } else {
        classListItem.textContent = 'Class: None';
    }
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
    Array.from(document.styleSheets).forEach(sheet => {
        try {
            Array.from(sheet.rules || sheet.cssRules).forEach(rule => {
                if (element.matches(rule.selectorText)) {
                    var cssText = rule.style.cssText.split(';');
                    cssText.forEach(styleProperty => {
                        if (styleProperty.trim().length > 0) {
                            var styleListItem = document.createElement('li');
                            styleListItem.textContent = styleProperty.trim();
                            detailsList.appendChild(styleListItem);
                        }
                    });
                }
            });
        } catch (e) {
            //console.warn('Cannot read styles from: ', sheet);
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
        // IE8 and below
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

// Function to attach or detach tooltip event listeners
function toggleTooltipEventListeners(enable) {
    document.querySelectorAll('*').forEach(element => {
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
    button.style.right = '10px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#3498db';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1010';
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
