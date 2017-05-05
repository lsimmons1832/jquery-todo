var FbAPI = ((oldCrap) =>{ //this is an augmenter

	oldCrap.getTodos = (apiKeys)=>{
		let items = [];
		return new Promise((resolve, reject) =>{
			let uid = FbAPI.credentialsCurrentUser().uid;
			$.ajax(`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`)
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

	oldCrap.addTodo = (apiKeys, newTodo) =>{
		return new Promise ((resolve, reject) => { //this is not required when using Firebase
				$.ajax({
				method:'POST',
				url: `${apiKeys.databaseURL}/items.json`,
				data: JSON.stringify(newTodo)
			}).done(()=>{
				resolve();
			}).fail((error)=>{
				reject(error);
			});		
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

	oldCrap.editTodo = (apiKeys, editTodo, id) => {
		return new Promise((resolve, reject) => {
				$.ajax({
				method:'PUT',
				url: `${apiKeys.databaseURL}/items/${id}.json`,
				data: JSON.stringify(editTodo)
			}).done(()=>{
				resolve();
			}).fail((error)=>{
				reject(error);
			});		
		});
	};

	return oldCrap;
})(FbAPI || {});