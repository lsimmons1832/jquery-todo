$(document).ready(() => {

	$('#new-item').click(() => {
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
	});

	$('#list-items').click(() => {
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');	
	});


 FbAPI.getTodos().then(() => {
 		FbAPI.writeDom();
 }).catch((error) => {
 			console.log("getTodos Error", error);
 });

// add todo
$('#add-todo-button').click(() =>{
	let newTodo = {
		isCompleted: false,
		task: $('#add-todo-text').val()
	};
	console.log('newTodo', newTodo);
	FbAPI.addTodo(newTodo).then(() =>{
		$('#add-todo-text').val("");
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');	
		FbAPI.writeDom();
	}).catch((error) => {
		console.log("addTodo Error", error);
	});
});


//delete todo



//edit todo



//complete todo

});
