let resultField = document.getElementById('result');
    let lastInputWasOperator = false;
    let isError = false;

    function appendToResult(value) {
        if (isError) {
            resultField.value = '';
            isError = false;
        }
        resultField.value += value;
        lastInputWasOperator = false;
    }

    function appendOperator(operator) {
        if (isError) return;

        if (lastInputWasOperator) {
            resultField.value = resultField.value.slice(0, -1) + operator;
        } else {
            resultField.value += operator;
        }
        
        lastInputWasOperator = true;
    }

    function clearResult() {
        resultField.value = '';
        isError = false;
        lastInputWasOperator = false;
    }

    function deleteLast() {
        if (isError) return;
        resultField.value = resultField.value.slice(0, -1);
        lastInputWasOperator = false;
    }

    function calculateResult() {
        if (lastInputWasOperator) {
            return; 
        }

        try {
            let result = resultField.value;

            if (result.includes('%')) {
                result = result.replace('%', '/100');
            }

            result = result.replace(/(\d+)\s*\*\s*-\s*/g, "$1 * -");
            resultField.value = eval(result) || '';
            lastInputWasOperator = false;

        } catch (e) {
            resultField.value = 'Error';
            isError = true;
        }
    }

    function toggleSign() {
        if (isError) return;
        if (resultField.value.charAt(0) === '-') {
            resultField.value = resultField.value.substring(1);
        } else {
            resultField.value = '-' + resultField.value;
        }
    }