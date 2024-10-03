let operation = '';
let shouldResetScreen = false;

const appendNumber = (number) => {
    const result = document.getElementById('result');
    if (result.value === '0' || shouldResetScreen) {
        resetScreen();
    }
    result.value += number;
    operation += number;
};

const appendOperator = (operator) => {
    const result = document.getElementById('result');
    result.value += ` ${operator} `;
    operation += ` ${operator} `;
    shouldResetScreen = false;
};


const calculateResult = () => {
    const result = document.getElementById('result');
    if (!operation || operation.trim() === '') {
        result.value = '0'; 
        return;
    }

    try {
        const formattedOperation = formatOperation(operation);
        const calcResult = executeOperation(formattedOperation);

        
        if (isNaN(calcResult)) {
            result.value = 'Error';
            operation = '';
        } else {
            result.value = calcResult;
            operation = calcResult;
        }
    } catch (e) {
        result.value = 'Error';
        operation = '';
    }
};


const formatOperation = (operationString) => {
    return operationString.split(' ').filter(item => item !== '');
};


const executeOperation = (formattedOperation) => {
    let result = parseFloat(formattedOperation[0]);
    for (let i = 1; i < formattedOperation.length; i += 2) {
        const operator = formattedOperation[i];
        const nextNumber = parseFloat(formattedOperation[i + 1]);

        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                if (nextNumber === 0) {
                    throw new Error('Division by zero');
                }
                result /= nextNumber;
                break;
            default:
                throw new Error('Invalid operator');
        }
    }
    return result;
};

const clearResult = () => {
    document.getElementById('result').value = '';
    operation = '';
};

const deleteLast = () => {
    const result = document.getElementById('result');
    if (result.value) {
        result.value = result.value.slice(0, -1);
        operation = operation.slice(0, -1);
    }
};

const resetScreen = () => {
    document.getElementById('result').value = '';
    shouldResetScreen = false;
};
