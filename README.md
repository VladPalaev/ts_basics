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
Можно создавать пользовательские типы. Они похожи на осознаные читательские пользовательские алиасы, то есть бывает ситуация, когда нужно написать несколько вариантов типов в переменной, ID может быть и строкой и числом и вот чтобы каждый раз не городить это в общей коде, можно создать пользовательский тип и его уже юзать
`export type ID = string | number;`
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

## Создание типов для класса

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
### Наследование

Создание статических методов или свойств класса, достаточно добавить ключевое слово static. Причем каждый из эксепляров класса получить доступ к этому свойству.
```
class User {
    static secret: string = 'secret user';

    constructor(
        public name: string,
        public age?: number
    ){}
}
```
Не забывать вызывать метод super в конструкторе вызова, если мы что-то меняем
```
 class User {
    static secret: string = 'my secret'
    protected nickName: string = 'webDev'

    constructor(
        public name: string,
        public age: number
    ){}

    getPass(): string {
        return `${this.name} | ${User.secret}`
    }
 }

class Vlad extends User {
    name: string = 'vladislav'

    constructor(age: number) {
        super(name, age) // вызвали родительский конструктор
    }
}

const test = new Vlad(45);
```
Важно помнить! Что мы можем поставить модификатор readonly свойстве, для защиты от перезаписи значения, но на самом деле, в момент создание экзепляра класса, когда вызывается метод constructor - мы можем перезаписать эти свойства. пример
```
class Car {
    readonly car: string
    readonly whells: number = 4

    constructor(car: string) {
        this.car = car
    }
}
```
  

**Абстрактные классы** нужные для создание какой-то общий сущности, которую потом будут наследовать другие наследники и где потом каждый наследник сможет реализовать свои собственные свойства(методы) или заменить свойства родителя. Важное правило, что напрямую абстракные классы нельзя вызвать.
```
abstract class User {
    constructor(
        public name: string,
        public age: number,
    ){}

    great(): void {
        console.log(this.name);
    }

    abstract getPass(): string
}

class Vlad extends User {
    public name: string = 'vladislav'

    constructor(age: number) {
        super(name, age);
    }
}
```
Тут будет небольшая ошибка, так как в абстрактном классе у метода getPass мы указали ключевое слово abstract, ЧТО ЗНАЧИТ обязательное правило реализации(описание) данного метода у потомка и она так же должна возврщает string , как было указано у родителя.
Поэтому нужно добавить данную реализацию.
```
class Vlad extends User {
	public name: string = 'vladislav'

	constructor(age: number) {
		super(name, age);
	}

	getPass(): string {
		return this.name + this.age;
	}
}
```
## Namespaces
---
Данный подход строиться на изолированности переменных. НО сам реакт и лругие инстременты, говорят , что лучше использовать import/export синтаксиса ES6
## Interface
---
```
interface User {
    name: string,
    age: number,
}

type UserClone = {
    name: string,
    age: number
}
```
На первый взгляд , что type, что interface как будто одно и то же. Но type по своей логике намного проще , чем сложная логика interface. Type лучше применять на примитивах и простых объектах, но если нам нужно расширять или наследовать типы, то для этой задачи есть Interface
```
interface User {
	name: string,
	age?: number // можем указывать опциональность некоторых свойств
	readonly isAdmin: boolean // можем ставить модификатор только для чтения на свойство

}

const user: User = {
	name: 'vlad',
	city: 'lagan', // тут будет ошибка, так как у нас не задекларирован данный тип
}
```
Бывает ситуация когда у нас может объект пополняться в разные моменты свойствами и чтобы избежать данную ошибку мы можем указать [propName: string]: any
```
interface User {
	name: string,
	[propName: string]: any // говорим компиляторы, что мы будем пополнять наш объект разными типами с строковым ключом
}
```
Мы можем соединить наш interface с классами. с помощью ключевого слова implements. Причем если вдруг какой-то тип не прописан в interface, а в классе он есть, то это не беда
```
interface User {
    name: string,
    age: number,
}
class Vlad implements User {
    name: string = 'vlad'
    age: number = 45
}
```
Так же можно расширять интерфейсы.
```
interface User {
	name: string
}
interface Admin extends User {
	isAdmin: boolean
}

class Admin implements Admin {}
```
Так очень ВАЖНО! Бывают случаи, когда в начале нашей функции нам нужно создать пустой объект, но в ходе функции мы его будем наполнять данными, которые определили в interface
```
interface IUser {
	name: string,
	age?: number
}

const test1: IUser = {} // приведет к ошибке, так как нужно передать данные name
const test2 = {} as IUser; // вот так нормально, есть еще старая версия записи. внизу
const test3 = <IUser>{}; 

```
### Generic
---
Бывают случаи когда мы не знаем какой тип аргумента будет прилетать в функцию. Мы могли сделать так.  
```
const getter = (data: any): any => data
```
Но есть проблемы в следующем
```
getter(10).length // тут ошибка, так как автоматом тип не подхватывается
getter('vlad').length // тут все работает
```
С помощью джинерика мы можем сделать автоматический подхват возвращаемого типа. То есть мы объявляем джинерик <T> потом говорим в аргументе функции, то что принимаем джинерик (data: T) и возвращаем его же тип (data: T): T => data
```
function getter<T>(data: T): T {
    return data
}
or
const getter = <T>(data: T): T => data;
```
Создание джинериков у классов.
```
class User<T> {
    constructor(public name: T, public age: T) {}

    getPass(): string {
        return `${this.name} ${this.age}`;
    }
}

const test1 = new User('vlad', 45); // вот так не работает, потому что у нас указан один джинерик, значит имеется ввиду что два аргумента будут одного типа
const test2 = new User('asya', 'is working it');
```
Чтобы создать джинерики разных типов, нужно просто указать что их два. Теперь мы можем передавать аргументом как разные типы, так и ОДИНАКОВЫЕ
```
class User<T, K> {
    constructor(public name: T, public age: K) {}

    getPass(): string {
        return `${this.name} ${this.age}`;
    }
}

const test1 = new User('vlad', 45); // вот так не работает, потому что у нас указан один джинерик, значит имеется ввиду что два аргумента будут одного типа
const test2 = new User('asya', 'is working it');
```
Но стоит помнить, что если у нас внутри класса будет метод, который будет возводить один из свойств класса в число и возвращать число, может произойти ошибка. Пример
```
class User<T, K > {
    constructor(
        public name: T,
        public age: K
    ){}

    getPass(): string {
        return `${this.name} ${this.age}`
    }

    getSecret(): number {
        return this.age ** 2;
    }
}

const test = new User('vlad', 'sdf');
```
Чтобы это избежать в джинерики мы можем наследоваться от какого-то базового типа. например
```
class User<T, K extends number> {
    constructor(
        public name: T,
        public age: K
    ){}

    getPass(): string {
        return `${this.name} ${this.age}`
    }

    getSecret(): number {
        return this.age ** 2;
    }
}

const test = new User('vlad', 'sdf');
```

### Декораторы

Декораторы можно использовать на классах, на их методах, свойствах и тд. Декоратор по сути оборачивает какой-то метод(функцию) и может расширить ее функционал. Важно отменить, внутри декоратора функция не изменяется, а просто использует вычисление функции в которую обернули декоратор и потом уже внутри модифицирует полученное значение.  

Проверка аргументов — обычная практика в программировании. В таких языках, как Java, если функция ожидает два аргумента, а получает три, генерируется исключение. Но в JavaScript ошибки не будет, поскольку лишние параметры попросту игнорируются. Такое поведение функций иногда раздражает, но может быть и полезным.

Для того чтобы убедиться в допустимости аргументов, нужно проверить их на входе. Это простая операция, в которой проверяется, что у каждого параметра надлежащий тип данных, а их количество не превышает ожидаемого функцией.

Однако повторение одной и той же операции для нескольких функций может привести к повторению кода, поэтому для проверки аргументов лучше написать декоратор, который затем можно будет многократно использовать с любыми функциями.


### Guards
---
Бывают ситуация когда нас два класса, и мы хотим создать общую функцию, которая будет принимать либо, первый одни экземпляр класса, либо другой. От сюда появлятся необходимость проверять входные аргументы на принадлежность к определенному классу и тут на помочь приходит метод `instanceof`
```
class MyError {
    headers: string = ''
    message: string = ''
}
class MyResponce {
    headers: string = ''
    result: string = ''
}

function handler(res: MyError | MyResponce) {
    if (res instanceof MyResponce) {
        return {
            info: res.headers + res.result
        }
    } else {
        return {
            info: res.headers + res.message
        }
    }
}
```
Оказывается в type можно засовывать не только оф. типы, но еще и просто какие-то значения. Например
```
type Alert = 'warning' | 'dangerous' | 'successfully';

function alertMessage(type: Alert) {
    // какая-то логика
}

alertMessage('dangerous')
alertMessage('test') // тут будет ошибка так как типе Alert нет значения test
```
### Операторы
+ keyof 
> Получает все ключи из interface или type.
```
type User = {
    name: string,
    age: number
}

type Keys = keyof User;

const test: Keys = 'age' // ts будет подказывать что есть доступные значения 'name/age'
```
+ Exclude / Pick
> Бывает ситуация, когда есть большой тип или интерфейс, а в новом интерфейсе, нам нужно пару свойств(Pick) или наоборот нужно убрать одно свойство лишнее, а остальные пускай будут(Exlude)
```
type User = {
    name: string,
    age: number,
    email: string,
    pass: string,
    pin: number
};

type PublicDataUser = Exclude<keyof User, 'pin'| 'pass'> // исключили pin и pass
type SecretDataUser = Pick<User, 'pass' | 'pin'> // забрали ключи pass и pin и вернули объект с этими ключами

const user: PublicDataUser = "email"
```

---
## Advance ts Минин
---
+ 1  

Задача. Создать мердж функцию, которая принимает два объекта с произвольными свойства и возвращает новый мердж объект. Проблема в том, что при отработки функции, новая перменная с этим объектом автокомплит не видит свойства нового объекта.
```
type UserName = {
    name: string
}
type UserAge = {
    age: number
}
function mergeObject(a: UserName, b: UserAge) {
    return Object.assign({}, a, b);
}

const newObj = mergeObject({name: 'vlad'}, {age: 45});
```
Мое решение оказлось слишком в лоб, здесь нужно использовать джинерики. Джинерики подстраиваются под входящие данные автоматические.
```
function mergeObject<T, K>(a: T, b: K) {
    return Object.assign({}, a, b);
}

const newObj = mergeObject({name: 'vlad'}, {age: 45}); // все окей
const newTest = mergeObject('aaa', 'bbb') // ts не показывает, но тут есть Error
```
Из примера выше мы видим ошибку, так как мы используем автоматические джинерики, тем самым мы можем принимать любые типы данных в аргументе функции, что бы этого ИЗБЕЖАТЬ нужно джинерикам задать ОГРАНИЧЕНИЯ. Решается это так.
```
function mergeObject<T extends object, R extends object>(a: T, b: R) {
	return Object.assign({}, a, b);
}
// можно еще так явно сказать что мы возвращаем T & K в стрелочной функции

const testMerge = <T extends object, K extends object>(a: T, b: K): T & K => {
    return Object.assign({}, a, b);
}
```
+ 2  
Задача. Написать функцию, которая будет возращать объект из value, count. В одном из свойств объекта будет применять метод length. Проблем с входными данными из string | array не составит, но что если передадут другой тип данных у которого нет свойства length. Я опять решил в лоб. Минус в том, что мне приходиться ручками прописывать типы внутри функции.
```
function withCount(a: string | number[]): {value: string | number[], count: string} {
    return {
        value: a,
        count: `${a.length} символов`
    }
}
```
Вот best practice. Мы принимаем автоматический тип данных(джинерик) и так как у нас есть расширение от нашего пользовательского интерфейса, мы проверяем входной аргумент на наличие у него этого свойства length которая прописана в интерфейсе.
```
interface ILength {
    length: number
}

function withCount<T extends ILength>(value: T): {value: T, count: string} {
    return {
        value,
        count: `${value.length} символов`
    }
}
```








TODO: не понял про enum и перезагрузка функций