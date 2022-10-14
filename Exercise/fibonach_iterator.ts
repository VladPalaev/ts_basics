/*
Создать класс для решение последовательности чисел финобачи, так нужно реализовать
две фичи
1- Возврат итератора финобачи с максимальным число в последовательности.
2- Создание экземпляра класса без максимального числа в последовательности. Но мы 
должны иметь метод, который может высчивать следующее число последовательности.
*/

{
	/**
	 * @class Создает итератор чисел фибоначи
	 * 
	 */
	class Fib implements IterableIterator<number> {
		private a1: number = 0;
		private b2: number = 1;

		constructor(
			private maxNumber?: number // Ограничитель на последовательность
		) { }

		[Symbol.iterator]() {
			this.a1 = 0; // Обнуляем значения перед новым for of
			this.b2 = 1;
			return this; // Возращаем объект с методом next()
		}

		public next(): IteratorResult<number> {
			const template = this.a1 + this.b2;
			this.a1 = this.b2;
			this.b2 = template;

			// Проверка на maxNumber, если он не объявлен, то мы можем
			// ручками вызывать next(), нет ограничения на число фибоначи
			if (template >= this.maxNumber! && this.maxNumber != null) {
				return { done: true, value: null }
			}
			return { done: false, value: template }
		}
	}

	const test = Array.from(new Fib(45));
	console.log(test);
	for (let item of test) {
		console.log(item);
	}
	console.log(test);
	for (let item of test) {
		console.log(item);
	}
}