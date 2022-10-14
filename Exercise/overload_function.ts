/*
Перегрузка функции на практике.
*/


function padding(all: number);
function padding(topAndBottom: number, rightAndLeft: number);
function padding(top: number, right: number, bottom: number, left: number);
function padding(a: number, b?: number, c?: number, d?: number) {
	if (b === undefined && c === undefined && d === undefined) {
		d = c = b = a;
	} else if (c === undefined && d === undefined) {
		c = a;
		d = b;
	}
	return {
		top: a,
		right: b,
		bottom: c,
		left: d
	}
}

// Еще один пример
interface Overloaded {
	(value: string): string
	(value: number): number
}

function stringOrNumber(value: number): number;
function stringOrNumber(value: string): string;
function stringOrNumber(value: any) {
	if (typeof value === 'string') {
		return `hello ${value}`
	}

	return value ** 2
}

const overloaded: Overloaded = stringOrNumber;

// пример использования
const str = overloaded(''); // тип `str` подразумевает `строку`
const num = overloaded(123); // тип`num` подразумевает `число`