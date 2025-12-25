// Test suite for GST Calculator
// Run with: node test.js

class GSTCalculator {
    constructor() {
        this.gstRates = {
            exempted: 0,
            essential: 5,
            standard: 18,
            luxury: 40
        };
    }

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
            totalPrice: totalPrice
        };
    }

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
            gstAmount: gstAmount
        };
    }
}

// Test cases
function runTests() {
    const calculator = new GSTCalculator();
    let passed = 0;
    let failed = 0;

    console.log('🧪 Running GST Calculator Tests...\n');

    // Test cases for forward calculation
    const forwardTests = [
        { input: { basePrice: 1000, gstRate: 18 }, expected: { gstAmount: 180, totalPrice: 1180 } },
        { input: { basePrice: 500, gstRate: 5 }, expected: { gstAmount: 25, totalPrice: 525 } },
        { input: { basePrice: 2000, gstRate: 40 }, expected: { gstAmount: 800, totalPrice: 2800 } },
        { input: { basePrice: 100, gstRate: 0 }, expected: { gstAmount: 0, totalPrice: 100 } },
    ];

    console.log('📈 Forward Calculation Tests:');
    forwardTests.forEach((test, index) => {
        try {
            const result = calculator.calculateForward(test.input.basePrice, test.input.gstRate);
            const success = Math.abs(result.gstAmount - test.expected.gstAmount) < 0.01 &&
                          Math.abs(result.totalPrice - test.expected.totalPrice) < 0.01;

            if (success) {
                console.log(`  ✅ Test ${index + 1}: Base ₹${test.input.basePrice} + ${test.input.gstRate}% GST = ₹${result.totalPrice}`);
                passed++;
            } else {
                console.log(`  ❌ Test ${index + 1}: Expected GST: ₹${test.expected.gstAmount}, Total: ₹${test.expected.totalPrice}`);
                console.log(`      Got GST: ₹${result.gstAmount}, Total: ₹${result.totalPrice}`);
                failed++;
            }
        } catch (error) {
            console.log(`  ❌ Test ${index + 1}: Error - ${error.message}`);
            failed++;
        }
    });

    // Test cases for reverse calculation
    const reverseTests = [
        { input: { totalPrice: 1180, gstRate: 18 }, expected: { basePrice: 1000, gstAmount: 180 } },
        { input: { totalPrice: 525, gstRate: 5 }, expected: { basePrice: 500, gstAmount: 25 } },
        { input: { totalPrice: 2800, gstRate: 40 }, expected: { basePrice: 2000, gstAmount: 800 } },
        { input: { totalPrice: 100, gstRate: 0 }, expected: { basePrice: 100, gstAmount: 0 } },
    ];

    console.log('\n📉 Reverse Calculation Tests:');
    reverseTests.forEach((test, index) => {
        try {
            const result = calculator.calculateReverse(test.input.totalPrice, test.input.gstRate);
            const success = Math.abs(result.basePrice - test.expected.basePrice) < 0.01 &&
                          Math.abs(result.gstAmount - test.expected.gstAmount) < 0.01;

            if (success) {
                console.log(`  ✅ Test ${index + 1}: Total ₹${test.input.totalPrice} - ${test.input.gstRate}% GST = Base ₹${result.basePrice}`);
                passed++;
            } else {
                console.log(`  ❌ Test ${index + 1}: Expected Base: ₹${test.expected.basePrice}, GST: ₹${test.expected.gstAmount}`);
                console.log(`      Got Base: ₹${result.basePrice}, GST: ₹${result.gstAmount}`);
                failed++;
            }
        } catch (error) {
            console.log(`  ❌ Test ${index + 1}: Error - ${error.message}`);
            failed++;
        }
    });

    // Test error cases
    console.log('\n🚫 Error Handling Tests:');
    const errorTests = [
        { input: { basePrice: -100, gstRate: 18 }, type: 'forward' },
        { input: { basePrice: 100, gstRate: 150 }, type: 'forward' },
        { input: { totalPrice: -100, gstRate: 18 }, type: 'reverse' },
        { input: { totalPrice: 100, gstRate: -5 }, type: 'reverse' },
    ];

    errorTests.forEach((test, index) => {
        try {
            if (test.type === 'forward') {
                calculator.calculateForward(test.input.basePrice, test.input.gstRate);
            } else {
                calculator.calculateReverse(test.input.totalPrice, test.input.gstRate);
            }
            console.log(`  ❌ Error Test ${index + 1}: Should have thrown an error`);
            failed++;
        } catch (error) {
            console.log(`  ✅ Error Test ${index + 1}: Correctly caught error - ${error.message}`);
            passed++;
        }
    });

    // Round-trip test (forward then reverse should give original value)
    console.log('\n🔄 Round-trip Tests:');
    const roundTripTests = [
        { basePrice: 1234.56, gstRate: 18 },
        { basePrice: 999.99, gstRate: 5 },
        { basePrice: 5000, gstRate: 40 },
    ];

    roundTripTests.forEach((test, index) => {
        try {
            const forward = calculator.calculateForward(test.basePrice, test.gstRate);
            const reverse = calculator.calculateReverse(forward.totalPrice, test.gstRate);
            const success = Math.abs(reverse.basePrice - test.basePrice) < 0.01;

            if (success) {
                console.log(`  ✅ Round-trip Test ${index + 1}: ₹${test.basePrice} → ₹${forward.totalPrice} → ₹${reverse.basePrice}`);
                passed++;
            } else {
                console.log(`  ❌ Round-trip Test ${index + 1}: Expected ₹${test.basePrice}, got ₹${reverse.basePrice}`);
                failed++;
            }
        } catch (error) {
            console.log(`  ❌ Round-trip Test ${index + 1}: Error - ${error.message}`);
            failed++;
        }
    });

    // Summary
    console.log('\n📊 Test Summary:');
    console.log(`  ✅ Passed: ${passed}`);
    console.log(`  ❌ Failed: ${failed}`);
    console.log(`  📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

    if (failed === 0) {
        console.log('\n🎉 All tests passed! GST Calculator is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Please review the implementation.');
    }

    return failed === 0;
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GSTCalculator, runTests };
}
