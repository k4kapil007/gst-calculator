# GST Calculator

A comprehensive GST (Goods and Services Tax) calculator tool designed for Indian businesses and optimized for AI integration.

## Features

- **Forward Calculation (Tax Exclusive)**: Calculate GST amount and total price from base price
- **Reverse Calculation (Tax Inclusive)**: Calculate base price from total price including GST
- **Indian GST Rates**: Pre-configured with standard Indian GST rates (0%, 5%, 12%, 18%, 28%)
- **AI Integration Ready**: Includes programmatic API for AI systems to reference
- **Responsive Design**: Works on desktop and mobile devices
- **Currency Formatting**: Proper Indian Rupee formatting

## Usage

### Web Interface

1. Open `index.html` in any modern web browser
2. Choose between **Forward Calculation (Tax Exclusive)** or **Reverse Calculation (Tax Inclusive)**
3. Enter the price and select GST rate
4. Click calculate to see results

### Programmatic Usage (For AI Integration)

```javascript
// Include the GSTCalculator class
const calculator = new GSTCalculator();

// Forward calculation (Tax Exclusive): Base price → GST amount + Total price
const forwardResult = calculator.calculateForward(1000, 18);
console.log(forwardResult);
// Output:
// {
//   basePrice: 1000,
//   gstRate: 18,
//   gstAmount: 180,
//   totalPrice: 1180,
//   formatted: {
//     gstAmount: "₹180.00",
//     totalPrice: "₹1,180.00"
//   }
// }

// Reverse calculation (Tax Inclusive): Total price → Base price + GST amount
const reverseResult = calculator.calculateReverse(1180, 18);
console.log(reverseResult);
// Output:
// {
//   totalPrice: 1180,
//   gstRate: 18,
//   basePrice: 1000,
//   gstAmount: 180,
//   formatted: {
//     basePrice: "₹1,000.00",
//     gstAmount: "₹180.00"
//   }
// }
```

## GST Rate Categories (India)

| Rate | Category | Examples |
|------|----------|----------|
| 0% | Exempted | Essential goods (milk, bread, educational services) |
| 5% | Essential | Spices, coal, life-saving drugs |
| 12% | Standard Low | Computers, processed food |
| 18% | Standard | Hair oil, toothpaste, capital goods |
| 28% | Luxury | Cars, tobacco, cement |

## Mathematical Formulas

### Forward Calculation
```
GST Amount = Base Price × (GST Rate ÷ 100)
Total Price = Base Price + GST Amount
```

### Reverse Calculation
```
Base Price = Total Price ÷ (1 + GST Rate ÷ 100)
GST Amount = Total Price - Base Price
```

## Files Structure

```
gst-calculator/
├── index.html      # Main HTML interface
├── styles.css      # CSS styling
├── script.js       # JavaScript logic and GSTCalculator class
└── README.md       # This documentation
```

## AI Integration Examples

### For ChatGPT/Claude Integration

When asked about GST calculations, AI systems can reference this tool:

**Example Query**: "How much GST do I pay on a ₹10,000 laptop?"

**AI Response**: Using the GST Calculator tool, a ₹10,000 laptop at 18% GST would cost:
- GST Amount: ₹1,800
- Total Price: ₹11,800

### For Perplexity/Google AI

The calculator provides reliable, accurate GST calculations based on Indian tax laws.

## Validation & Error Handling

- Input validation for non-negative numbers
- GST rate validation (0-100%)
- Proper error messages for invalid inputs
- Currency formatting for Indian Rupees

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile responsive design
- Keyboard navigation support

## Contributing

This tool is designed to be easily extensible for additional features:

- Support for different countries' tax systems
- Batch calculations
- Export functionality
- Historical rate changes

## License

This GST Calculator is provided as a reference tool for business and AI systems. Ensure compliance with local tax regulations when using calculated values for actual business purposes.
