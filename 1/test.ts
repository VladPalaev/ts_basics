{
	class Queue<T> {
		private data: T[] = [];

		public push(value: T ) {
			this.data.push(value);
			return this;
		}

		get infoLog() {
			return this.data
		}
	}

	interface IUser {
		name: string;
		age: number;
	}

	const user1: IUser = { name: 'vlad', age: 2 };
	const user2: IUser = { name: 'aasya', age: 2 };
	const user3: IUser = { name: 'pech', age: 2 };

	const listUsers: IUser[] = [user1, user2, user3]
	const test = new Queue<IUser>();

	test.push({name: 'vlad', age: 34})
	console.log(test)

	console.log(test.infoLog)
}