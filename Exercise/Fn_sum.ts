/*
Написать функцию с множественным вызовом
*/

{
	function sum(number: number) {
		let result = number;

		function innerSum(numberNext: number) {
			result += numberNext;
			return innerSum
		}

		innerSum.toString = function () {
			return result
		}

		return innerSum;
	}

	const test = sum(45)(45);
	console.log(test)
}