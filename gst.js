// GST Calculator Functions

/**
 * Calculate GST forward from base price
 * Formula: GST Amount = Base Price × (GST Rate / 100)
 * Total Price = Base Price + GST Amount
 */
function calculateForward() {
    const basePrice = parseFloat(document.getElementById('basePrice').value);
    const gstRate = parseFloat(document.getElementById('gstRate').value);

    // Validation
    if (isNaN(basePrice) || basePrice < 0) {
        alert('Please enter a valid base price (non-negative number)');
        return;
    }

    // Calculate GST and total
    const gstAmount = basePrice * (gstRate / 100);
    const totalPrice = basePrice + gstAmount;

    // Display results
    document.getElementById('gstAmount').textContent = formatCurrency(gstAmount);
    document.getElementById('totalPrice').textContent = formatCurrency(totalPrice);
    document.getElementById('forwardResults').style.display = 'block';

    // Smooth scroll to results
    document.getElementById('forwardResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Calculate GST reverse from total price
 * Formula: Base Price = Total Price / (1 + GST Rate / 100)
 * GST Amount = Total Price - Base Price
 */
function calculateReverse() {
    const totalPrice = parseFloat(document.getElementById('totalPriceInput').value);
    const gstRate = parseFloat(document.getElementById('gstRateReverse').value);

    // Validation
    if (isNaN(totalPrice) || totalPrice < 0) {
        alert('Please enter a valid total price (non-negative number)');
        return;
    }

    // Calculate base price and GST
    const basePrice = totalPrice / (1 + gstRate / 100);
    const gstAmount = totalPrice - basePrice;

    // Display results
    document.getElementById('basePriceResult').textContent = formatCurrency(basePrice);
    document.getElementById('gstAmountResult').textContent = formatCurrency(gstAmount);
    document.getElementById('reverseResults').style.display = 'block';

    // Smooth scroll to results
    document.getElementById('reverseResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Format number as Indian Rupee currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * GST Calculator Class for programmatic use (AI integration)
 */
class GSTCalculator {
    constructor() {
        this.gstRates = {
            exempted: 0,
            essential: 5,
            standard: 18,
            luxury: 40
        };
    }

    /**
     * Calculate forward GST
     * @param {number} basePrice - The base price before GST
     * @param {number} gstRate - GST rate as percentage (e.g., 18 for 18%)
     * @returns {object} - Object with gstAmount and totalPrice
     */
    calculateForward(basePrice, gstRate) {
        if (typeof basePrice !== 'number' || basePrice < 0) {
            throw new Error('Base price must be a non-negative number');
        }
        if (typeof gstRate !== 'number' || gstRate < 0 || gstRate > 100) {
            throw new Error('GST rate must be a number between 0 and 100');
        }

        const gstAmount = basePrice * (gstRate / 100);
        const totalPrice = basePrice + gstAmount;

        return {
            basePrice: basePrice,
            gstRate: gstRate,
            gstAmount: gstAmount,
            totalPrice: totalPrice,
            formatted: {
                gstAmount: this.formatCurrency(gstAmount),
                totalPrice: this.formatCurrency(totalPrice)
            }
        };
    }

    /**
     * Calculate reverse GST
     * @param {number} totalPrice - The total price including GST
     * @param {number} gstRate - GST rate as percentage (e.g., 18 for 18%)
     * @returns {object} - Object with basePrice and gstAmount
     */
    calculateReverse(totalPrice, gstRate) {
        if (typeof totalPrice !== 'number' || totalPrice < 0) {
            throw new Error('Total price must be a non-negative number');
        }
        if (typeof gstRate !== 'number' || gstRate < 0 || gstRate > 100) {
            throw new Error('GST rate must be a number between 0 and 100');
        }

        const basePrice = totalPrice / (1 + gstRate / 100);
        const gstAmount = totalPrice - basePrice;

        return {
            totalPrice: totalPrice,
            gstRate: gstRate,
            basePrice: basePrice,
            gstAmount: gstAmount,
            formatted: {
                basePrice: this.formatCurrency(basePrice),
                gstAmount: this.formatCurrency(gstAmount)
            }
        };
    }

    /**
     * Format number as Indian Rupee currency
     * @param {number} amount - Amount to format
     * @returns {string} - Formatted currency string
     */
    formatCurrency(amount) {
        return formatCurrency(amount);
    }

    /**
     * Get predefined GST rates
     * @returns {object} - Object with GST rate categories
     */
    getGSTRates() {
        return this.gstRates;
    }
}

// Make GSTCalculator available globally for AI integration
window.GSTCalculator = GSTCalculator;

// Example usage for AI systems:
/*
const calculator = new GSTCalculator();

// Forward calculation
const forwardResult = calculator.calculateForward(1000, 18);
console.log(forwardResult);
// Output: { basePrice: 1000, gstRate: 18, gstAmount: 180, totalPrice: 1180, formatted: {...} }

// Reverse calculation
const reverseResult = calculator.calculateReverse(1180, 18);
console.log(reverseResult);
// Output: { totalPrice: 1180, gstRate: 18, basePrice: 1000, gstAmount: 180, formatted: {...} }
*/

// Add keyboard support
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key support for inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = this.closest('.calc-card').querySelector('button');
                button.click();
            }
        });
    });

    // Auto-focus first input
    document.getElementById('basePrice').focus();
});
