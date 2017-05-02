$(document).ready(() => {
	let apiKeys;

	$('#new-item').click(() => {
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
	});

	$('#list-items').click(() => {
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');	
	});


FbAPI.firebaseCredentials().then((keys)=>{
	apiKeys = keys;
	firebase.initializeApp(apiKeys);
	FbAPI.writeDom(apiKeys);
	//countTask();
}).catch((error)=>{
	console.log("keys error", error);
});


// add todo
$('#add-todo-button').click(() =>{
	let newTodo = {
		isCompleted: false,
		task: $('#add-todo-text').val()
	};
	console.log('newTodo', newTodo);
	FbAPI.addTodo(apiKeys, newTodo).then(() =>{
		$('#add-todo-text').val("");
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');	
		FbAPI.writeDom(apiKeys);
		//countTask();
	}).catch((error) => {
		console.log("addTodo Error", error);
	});
});


//delete todo - click event in main
$('.main-container').on("click", ".delete", (e) => {
	FbAPI.deleteTodo(apiKeys, e.target.id).then(() => {
		FbAPI.writeDom(apiKeys);
		//countTask();
	}).catch((error) => {
		console.log("error in deleteTodo", error);
	});
});


//edit todo
$('.main-container').on("click", ".edit", (e) => {
	let editText = $(apiKeys, e.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
	FbAPI.editTodo(e.target.id).then(()=>{
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
		$('#add-todo-text').val(editText);
	}).catch((error)=>{
		console.log("editTodo error",error);
	});
});

//complete todo
$('.main-container').on('click', 'input[type="checkbox"]', (e) =>{
	console.log("event", e.target.id);
	FbAPI.checker(apiKeys, e.target.id).then(() => {
		FbAPI.writeDom(apiKeys);
		//countTask();
	}).catch((error) =>{
		console.log("Checker Error", error);
	});
});


});