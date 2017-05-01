var FbAPI = ((oldCrap) =>{ //this is an augmenter

	oldCrap.getTodos = ()=>{
		let items = [];
		return new Promise((resolve, reject) =>{
			$.ajax('./database/seed.json')
			.done((data) => { //this is grabbing the key and pushing the value into an array
				let response = data.items;
				Object.keys(response).forEach((key) =>{
					console.log("key", key);
					response[key].id = key;
					items.push(response[key]);
				});
				FbAPI.setTodos(items); //calling main iife & passing in data
				resolve();
			})
			.fail((error) =>{
				reject(error);
			});
		});
	};

	oldCrap.addTodo = (newTodo) =>{
		return new Promise ((resolve, reject) => { //this is not required when using Firebase
			newTodo.id = `item${FbAPI.todoGetter().length}`;
			console.log("newTodo", newTodo);
			FbAPI.setSingleTodo(newTodo);
			resolve();
		});
	};

	oldCrap.checker = (id) =>{
		return new Promise((resolve, reject) =>{
			FbAPI.setChecked(id);
			resolve();
		});
	};

	oldCrap.deleteTodo = (id) => {
		return new Promise((resolve, reject) =>{
			FbAPI.delete(id);
			resolve();
		});
	};

	return oldCrap;
})(FbAPI || {});