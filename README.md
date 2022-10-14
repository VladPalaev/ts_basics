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

**Декораторы можно повестить на 4 типа**  
+ Класс
+ Свойство класса
+ Метод класса
+ Аксессор

Стоит отметить что каждый из перечисленных декоратов для каждого типа принимает свои аргументы  

__Для класса__ @decorator(constructor: Function) --> constructor возврщает сам класс.  
__Для свойства__ @decorator(target: any, propName: string | Symbol) --> target - это текущий instance, а propName - свойство.
__Для метода__ @decorator(target: any, propName: string | Symbol, descriptor :ProtertyDescriptor) --> descriptor возвращает всю инфу о методе(его дескрипторы) и саму функцию. Сама функция будет лежать в descriptor.value.
__Для аксессоров__ Тут аналогично, как и для метода.
```

```


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
+ Readonly<Array<string>> / ReadonlyArray<string>(сокр. запись) / Readonly<НашИнтрефейс>
> Полезная вещь когда у нас есть массив и мы хотим сделать его не изменным
+ as
> Когда мы прописали типы и хотим создать пустой объект и не сразу его пополнить. На насильно создаем тип, при этом даже не соблюдая поля типа при заполнение.
+ is
> При создание функций для проверки пользовательский типов, нужна при возвращение этой функци , если функция возвращает true;
`const isUser = (obj: any): obj is IUser => obj.usertype !== undefined`
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
+ 3

Задача. Есть функция аксессор, которая на вход получает объект, вторым аргументом его возможный ключ. Нужно сделать так, чтобы когда мы вызывали функцию, передавая второй аргумент, мы знали какие есть у него ключи, чтобы не было возможности передать какой-то ключ которого нет в этом объекте.
```
// Я решил это так, но тут есть ошибка. В плане того, что я могу принимать первым аргументом любой тип данных, поэтому нужно указать ограничения.

function getObjectsKey<T>(obj: T, key: keyof T) {
    return obj[key];
}
// Вот так верно

function getObjectsKey2<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
```
+ 4

Задача. Создать класс Коллекция, данный класс может хранить разные типы однообразных данных, кроме объектов. То есть внутри массива должны быть любо все, стороки, либо числа и тд.
```
// Вначале создаем тип ограничитель
type PrimitiveType = number | string | boolean;

// Благодаря джинерикам, они автоматом будут подставлять данные которые мы передадим перед созданием класса.

class Collection<T extends PrimitiveType> {
    constructor(
        private _items: Array<T>
    ){}

    add(data: T) {
        this._items.push(data);
    }

    remove(data: T): T[] {
        return this._items = this._items.filter( (i) => i !== data)
    }

    get myItems(): T[] {
        return this._items;
    }
}

const test = new Collection<string>([]);
```
+ 5

Задача. Создать функцию, которая будет возвращать интерфейс, но при этом внутри функции мы создаем пустой объект, в которой потом будет пополнять валидированные данные.
```
// благодаря операторы as, можно создавать пустые объект, а потом пополнять свойствами

interface ICar {
    model: string,
    year: number
}

function createCar(model: string, year: number): ICar {
    const car = {} as ICar;
    if (model.length > 3) car.model = model;
    if (year > 2000) car.year = year;

    return car; 
}
```
+ 6

Задача. Создать массив чтобы его значения были не изменны.
```
const staticList: ReadonlyArray<string> = ['audi', 'bmw'];
// Фишка в том, что теперь мы не можем ни добавлять, ни удалять элементы массива
```
+ 7

Задача. У нас есть готовый интерфейс, при создание нового объекта с этими поля из интерфейса, мы хотим, чтобы у нас не было возможности перезатирать значения. Это можно сделать с помощью джинерика
```
interface ICar {
    model: string,
    year: number
}

const ford: Readonly<ICar> = {
    model: 'bmw',
    year: 2011
}
```
+ 8

Задача. Создать декоратор компонента для класса. Реализация похожа на декоратор из Angular @Component
```
interface IComponent {
    selector: string,
    template: string,
}

type IsClass = new(...args: any[]) => object; // тут определяем правило для определение класса, можно было сделать и через объект

function Component(config: IComponent) {
    return function<T extends IsClass>(Constructor: T) {
        return class extends Constructor {
            constructor(...arg: any[]) {
                super(...arg);

                const innerContainer: HTMLElement = document.getElementById(config.selector)!;
                innerContainer.innerHTML = config.template;
            }
        }
    }
}

@Component({
    selector: '#root',
    template: '<div>Hello world!</div>'
})
class CardComponent {
    constructor(
        public name: string,
    ){}

    logInfo() {
        console.log(`This is components: ${this.name}`);
    }
}
```
Снала создаем интерфейс для декоратора, это нужно для того, чтобы понять какими данными нужно наполнять декоратор.  
Декоратор это посути функция обертка, которая вызывается со своими данными и замыкает их в себе, и возвращает класс, который потом в ходе  программы создаст новый инстанс с доступом к области видимости декоратора.  
Так как это обертка, ей нужно передать данные , которые как раз мы замкнем. Эта обертка должна вернуть функцию с определенными параметрами(зависит от декоратора класса/свойства/метода). Так как в эту функцию мы передали метод constructor - что есть по факту объект нашего класса, мы должны достать его. По факту получается, что наша функция декторатора возвращает анонимный класс, который extend-ит класс Constructor. При этом стоит не забыть вызвать метод инициализации constructor(){}, где будет вызван родительский constructor с помощью метода super(). При все этом не забывая передовать аргументы для родительского метода super. Это можно сделать путем сбора в рест параметр всех аргументов и потом передать это массив предварительно распарсив его. Ну и так же мы можем делать нашу логику внутри constructora анонимного класса.

+ 9

Задача. Есть некий класс, у него есть классный метод, но для работы использует контекст this. Мы хотим чтобы контекст автоматом менялся на тот, в которым вызывается. Создать декоратор bind.
```
function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originFn = descriptor.value;
    return {
        enumerable: false,
        writable: true,
        get() {
            return originFn.bind(this);
        }
    }
}
class CardComponent {
    constructor(
        public name: string,
    ){}

    @Bind
    logInfo() {
        console.log(`This is components: ${this.name}`);
    }
}

const myComponent = new CardComponent('my Components');
const btn: HTMLElement = document.querySelector('.btn')!;
btn.addEventListener('click', myComponent.logInfo);
```
Мы вешаем декоратор на метод, не вызывая его, то есть декоратор будет выполняться только в моммент вызова данного метода. Так как мы работаем с мотодом класса, но обязательно 3 парметром берем аргумент descriptor: PropertyDescriptor. Он нужен для того, чтобы из него вытащить value, то есть его непосредственно функцию. На декоратор вешаем возврат PropertyDescription. Получается мы берем его value, что-то с ним делаем и возврщаем его не много модифицированным. Внутри функции возвращаем объект {} со свойствами PropertyDescription. Обязательно у объекта реализуем метод get() , так как в прямом смысле говорим, если кто-то вызовет тебя по твоему имени верни то, что указано в методе get.

+ 10

Задача. Представьте, что есть объект Frame, который содержит список элементов Component. С помощью интерфейса Iterator вы можете получить каждый Component из этого объекта Frame, как показано ниже:

```
interface IteratorResult1<T> {
    done: boolean;
    value: T
}
interface Iterator1<T> {
    next: (value?: any) => IteratorResult1<T>;
    return?: (value?: any) => IteratorResult1<T>;
    throw?: (value?: any) => IteratorResult1<T>;
}

class Component {
    constructor(
        public name: string,
    ){}
}

class Frame implements Iterator1<Component> {
    private point: number = 0;

    constructor(
        public name: string,
        public components: Array<Component>
        ){}
    
    next(): IteratorResult1<Component> {
        if ( this.point < this.components.length ) {
            return {value: this.components[this.point++], done: false}
        }
        return {done: true, value: null!} 
    }
}

const test = new Frame('test1', [new Component('one Component'), new Component('two Component')]);

console.log(test.next())
console.log(test.next())
console.log(test.next())
```
Есть джинерики из коробки Iterator<T> и IteratorResult<T>.  
У этого решение есть минус, он является итерируемым объектом. Вот решение
```
class Frame implements Iterator1<Component>{
    private pointer = 0;

    constructor(
        public name: string,
        public components: Array<Component>
    ){}
    [Symbol.iterator]() {
        return this;
    }

    next(): IteratorResult1<Component> {
        if (this.pointer < this.components.length) {
            return {
                done: false, 
                value: this.components[this.pointer++]
            }
        }
        this.pointer = 0; // Не забыть обнулить счетчик
        return {
            done: true,
            value: null!
        }
    }
}

const test = new Frame('my Frame', [new Component('one'), new Component('two'), new Component('tree')]);
console.log(test.next())

for (let item of test) {
    console.log(item)
}

for (let item of test) {
    console.log(item)
}
```
+ 11

Задача. У нас есть пользовательский тип или интерфейс, у нас есть общая функция, которая может принимать два разных интерфейса, но мы должны проверить внутри функции с каким мы работаем типом именно.
```
interface Foo {
    foo: number;
    common: string;
}

interface Bar {
    bar: number;
    common: string;
}

function isFoo(obj: any): obj is Foo {
    return obj.foo !== undefined;
}

function createTest(obj: Foo | Bar) {
    if (isFoo(obj)) {
        return obj.foo;
    }
    return obj.bar;
}
```
+ 12

Задача. Создать свой тип , который есть в реакте FunctionalComponent
```
type FunctionComponent<T extends object = object> = (props: T & {children?: any}) => any;

interface IUser {
    name: string;
    age: number;
}

const App: FunctionComponent<IUser> = (props) => {
    console.log(props.name)
}
```














TODO: не понял про enum и перезагрузка функций, досмотреть у минина курс для продвитуных, остановился на декораторе bind