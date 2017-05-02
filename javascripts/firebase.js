var FbAPI = (()=>{	//this is the main iife
	let todos = [];
	return { //in the main iife you have to return everything
		firebaseCredentials: () => {
			return new Promise((resolve, reject)=>{
				$.ajax("apiKeys.json")
				.done((data)=>{
					resolve(data);
				}).fail((error) => {
					reject(error);
				});
			});
		}
	};
})();