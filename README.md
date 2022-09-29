# Конспект

## Типы данных

### Простые типы
+ boolean | `let isComplited: boolean = false`  
+ number | `let count: number = 0`  
+ string | `let firstName: string = ''`  
+ null | `let n: null = null`  
+ object | `const testFN = (o: object | string): void`
+ undefined | `let u: undefined - undefined`  
+ void | `const getUser = (): void {...body fn}` Note: void значит ничего не возвращает  
### Сложные типы(или как-то так)

+ number[ ] or Array\<number>  
Говорим о том, что у нас в перменной будет массив состоящий из чисел.
	>`let list: number[] = [2, 3, 34]`  
	`let list: Array<number> = [2, 12, 455]`
+ [ number, string ] Typle Type  
У нас будет массив строго состоящий из такой последовательности элементов.
	> `let list: [string, number];`  
	`list = ['name', 34];`
+ any
В переменной может быть любой тип данных.
	> `let list: [any, any] = [45, 'name']`  
	`let userAge: any = 45;`
+ never
Говорит нам о том, что мы не получим от этой функции результата, либо получим ошибку
	>`const error = (message: string): never => throw new Error(message);`
+ enum 
Хз что это
+ type 
Можно создавать пользовательские типы
	> `type Name = string;`  
	`let userName: Name;`  
	`userName = 'vladislav';`


## Применение типов на практики

	const createFullName = (name: string, age: string): string => `${name} ${age};`  
---
	const createFullName = (name: string, age: string | number): string => `${name} ${age};`  
	// Когда нам нужно сказать аргументу, что он может быть одним и другим типом, это называется объединение типов с помощью знака |
---
	const createFullName = (name: string = 'нет имени', age: number | null = 0): string {}
	// Можем передать так же как ES6 аргумент по-умолчанию
---
	const createFullName = (name: string, age?: number): string => {}
	// опциональный аргумент с помощью знака "?"

---
	const createSkills = (name: string, ...skills: Array<string>): string => {};
	// Вот так, можно использовать REST оператор в ts, с помощью джинерика
---
	let newFn: (firstArg: string) => void;
	function oldFn(name: string): void {
		console.log(name);
	}

	newFn = oldFn;
	// кейс когда мы хотим в какую-ту перменную засунуть функцию
---
	const user: {name: string, age: number} = {
		name: 'vladislav',
		age: 26,
	}
	// Определение типов у объекта. Примечание: так как мы жеска задали типы объекту, то добавить новое свойство не можем. user.isAdmin = false приведет к ошибке
---


### Создание пользовательских типов

	type Person = {name: string, age; number, isAdmin: boolean};

	let user: Person {};
	let admin: Person {};
Очень удобно создавать абстракции. Но может быть ситуация, когда есть какие-то небольшие отличия у разных объектов. То тогда можно в общий тип ввести опциональные параметры  
	
	type Person = {
		name: string,
		age: number,
		nickName?: string,
		getPass?: () => string,
	}
---

### Создание типов для класса

	class User {
		name: string
		age: number

		constructor(name: string, age: number) {
			this.name = name;
			this.age = age;
		}
	}
Нужно сперва указать внутри класса какие есть свойства и их типы и потом повторно не забыть еще раз указать типы для функции конструктора

### 4 модификатора доступа к свойствам класса
+ public - Значение по умолчанию. Данное свойство или метод имеет свободный доступ.
+ private - Данный модификатор не доступен извне, он нужен только для работы внутри класса, не экземпляторы, не наследники класса не могут использовать это свойство.
+ protected - Свойства с этим модификатором могут пользовать только наследники класса, а вот экзепляторы класса не могут.
+ readonly - свойства с этим модификатором доступны только для чтения.
```
class User {
    public name: string
    private isAdmin: boolean
    protected pass: string
    readonly time: string

    constructor(name: string, isAdmin: boolean, pass: string, time: string) {
        this.name = name;
        this.isAdmin = isAdmin;
        this.pass = pass;
        this.time = time;
    }
}
```
Можно задавать значения свойствам не через конструктор, а через значения по умолчанию
```
class User {
    public name: string
    readonly age: number = 18 // вот так!
    private isAdmin: boolean = false // вот так!

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return `name: ${this.name} | age: ${this.isAdmin}`
    }
}
```
Чтобы не дублировать код как в примере выше, можно определять типы внутри конструктора. Тут нужно будет в конструкторе обязательно указывать модификаторы, даже public, который хоть и по-умолчанию.
```
class User {
	constructo(
		public name: string,
		public age: number,
		private isAdmin: boolean = false,
	){}
}
```
Можно часть перменных, которые private определить типы внутри класса, а public в конструкторе
```
class User {
    private isAdmin: boolean = false;
    constructor(
        public name: string,
    ){}

    getIsAdmin(): boolean {
        return this.isAdmin === true;
    }
}
```
Бывает необходимость изменить приватное свойство у класса, это возможно через сеттеры или метода. Основное отличие сеттера от метода, в том, что сеттер просто вызывает свойство класса и перезатирает новым значением, а метод реализует внутренний механизм измение свойства класса.
```
class User {
    private age: number = 18

    constructor(
        public name: string
    ){}

    set myAge(age: number) {
        this.age = age;
    }
    setAge(age: number) {
        this.age = age;
    }
}

const test1 = new User('asya');
const test2 = new User('vlad');

console.log(test1, test2);

test1.myAge = 45;
test2.setAge(120);

console.log(test1, test2);
```
Так же в класс можем добавить статические свойства
```
class User {
	static secret: string = 'my new secrets'

	constructor(
		public name: string,
		public age: number
	)
	getSecret(): string {
		return `${this.name} его секрет ${User.secret}`
	}
}
```

