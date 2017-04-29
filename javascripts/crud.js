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

	return oldCrap;
})(FbAPI || {});