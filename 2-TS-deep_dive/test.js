// function inifialList(value) {
// 	return {
// 		value,
// 		next: null
// 	}
// }

// function addValue(list, value) {
// 	if (list.next === null) {
// 		return list.next = {
// 			value,
// 			next: null
// 		}
		
// 	}

// 	addValue(list.next, value);
// 	return list;
// }

// function findValue(list, searchInfo) {
// 	if (list.value === searchInfo) {
// 		list.value = 'заменил value'
// 		return
// 	}

// 	findValue(list.next, searchInfo);
// 	return list;
// }


// const list = inifialList('vlad');
// addValue(list, 'asya');
// addValue(list, 'alla');
// console.log(addValue(list, 'pech'))

// console.log(findValue(list, 'alla'));
// console.log(list.next.next)

class NewNode {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
}

class List {
	constructor() {
		this.tail = null;
		this.head = null;
	}

	append(value) {
		const newNode = new NewNode(value);

		if (!this.head || !this.tail) {
			this.head = newNode;
			this.tail = newNode;

			return this;
		}

		this.tail.next = newNode;
		this.tail = newNode;
		return this;
	}
	prepend(value) {
		const newNode = new NewNode(value, this.head)

		this.head = newNode;

		if (!this.tail) {
			this.tail = newNode;
		}

		return this;
	}

	find(value) {
		if (!this.head) {
			return null
		}

		let currentlyNode = this.head;
		while(currentlyNode) {
			if (currentlyNode.value === value) {
				return currentlyNode;
			}

			currentlyNode = currentlyNode.next;
		}

		return null;
	}

	deleteTail() {
		const currentlyTail = this.tail;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
			return currentlyTail;
		}
		let currentNode = this.head;

		while (currentNode.next) {
			if (currentNode.next.next == null) {
				currentNode.next = null;
			} else {
				currentNode = currentNode.next;
			}
		}

		this.tail = currentNode
		return currentlyTail
	}
}

const test = new List();
test.append('vlad');
test.append('asya');
test.append('alla');
test.prepend('putin')
console.log(test)

console.log('---------------\n');
console.log(test.find('alla'))
console.log('---------------\n');
console.log(test.deleteTail());
console.log('---------------\n');

console.log(test.tail)