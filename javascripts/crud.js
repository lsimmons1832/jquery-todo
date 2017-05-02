var FbAPI = ((oldCrap) =>{ //this is an augmenter

	oldCrap.getTodos = (apiKeys)=>{
		let items = [];
		return new Promise((resolve, reject) =>{
			$.ajax(`${apiKeys.databaseURL}/items.json`)
			.done((data) => { //this is grabbing the key and pushing the value into an array
				let response = data;
				Object.keys(response).forEach((key) =>{
					console.log("key", key);
					response[key].id = key;
					items.push(response[key]);
				});
				//FbAPI.setTodos(items); //calling main iife & passing in data
				resolve(items);
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

	oldCrap.checker = (apiKeys, id) =>{
		return new Promise((resolve, reject) =>{
			FbAPI.setChecked(id);
			resolve();
		});
	};

	oldCrap.deleteTodo = (apiKeys, id) => {
		return new Promise((resolve, reject) =>{
			$.ajax({
				method:'DELETE',
				url: `${apiKeys.databaseURL}/items/${id}.json`
			}).done(()=>{
				resolve();
			}).fail((error)=>{
				console.log(error);
			});
		});
	};

	oldCrap.editTodo = (apiKeys, id) => {
		return new Promise((resolve, reject) => {
			FbAPI.delete(id);
			resolve();
		});
	};

	return oldCrap;
})(FbAPI || {});