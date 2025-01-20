export default function mapRange(value, inputRange, outputRange) {
    // Helper function to check if a value is a valid number
    const isValidNumber = (num) => typeof num === 'number' && !isNaN(num) && isFinite(num);

    // Helper function to coerce to number and validate
    const coerceAndValidate = (val) => {
        const parsed = parseFloat(val);
        return isValidNumber(parsed) ? parsed : null;
    };

    // Coerce value and range elements to numbers
    const coercedValue = coerceAndValidate(value);
    const [inputMin, inputMax] = inputRange.map(coerceAndValidate);
    const [outputMin, outputMax] = outputRange.map(coerceAndValidate);

    // Check if all values are valid numbers
    if (coercedValue === null || inputMin === null || inputMax === null ||
        outputMin === null || outputMax === null) {
        return value;
    }

    // Ensure input range is valid
    if (inputMin === inputMax) {
        return value;
    }

    // Perform the mapping
    return (coercedValue - inputMin) * (outputMax - outputMin) / (inputMax - inputMin) + outputMin;
}
