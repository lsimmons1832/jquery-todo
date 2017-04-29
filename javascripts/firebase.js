var FbAPI = (()=>{	//this is the main iife
	let todos = [];
	return { //in the main iife you have to return everything
		todoGetter: () => {
			return todos;
		},
		setTodos: (newArray) => {
			todos = newArray;
		},
		setSingleTodo: (newObject) => {
			todos.push(newObject);
		}
	};
})();