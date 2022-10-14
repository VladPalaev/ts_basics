/*
Создать класс итератор Frame, который возвращает instance Component-а. Правильно 
прописать типы IterableIterator<T> и IteratorResult<T>
NOTE: Есть отдельный тип Iterator<T>, но есть тип IterableIterator<T> 
в котором ты должен реализовать метод [Symbol.iterator] и метод next()
*/

{
	class Component {
		constructor(
			protected name: string
		) {}
	}

	class Frame implements IterableIterator<Component> {
		private count: number = 0;

		constructor(
			public name: string,
			protected components: Array<Component>
		) {}

		[Symbol.iterator]() {
			this.count = 0;
			return this;
		}

		public next(): IteratorResult<Component> {
			if (this.count < this.components.length) {
				return { done: false, value: this.components[this.count++] }
			}
			return { done: true, value: null }
		}
	}

	const test = new Frame('test', [new Component('vlad'), new Component('asya')]);
	const item = Array.from(test);

	console.log(item);
}