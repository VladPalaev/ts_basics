

function isNumber(str) {
	if (!str.trim() ) {
		return {valid: false}
	}

	if ( isNaN(str) ) {
		return {valid: false}
	}

	return {valid: true, int: Number(str)}
}


console.log(isNumber('45'));
console.log(isNumber('   45'));
console.log(isNumber('   '));
console.log(isNumber('45d'));
