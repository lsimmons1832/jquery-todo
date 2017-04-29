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
 		countTask(); //this function needs to be called everywhere that we call writeDOM
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
		countTask();
	}).catch((error) => {
		console.log("addTodo Error", error);
	});
});


//delete todo



//edit todo



//complete todo
$('.main-container').on('click', 'input[type="checkbox"]', (e) =>{
	console.log("event", e.target.id);
	FbAPI.checker(e.target.id).then(() => {
		FbAPI.writeDom();
		countTask();
	}).catch((error) =>{
		console.log("Checker Error", error);
	});
});

//add counter
 let countTask = () =>{
 	let remainingTasks = $('#incomplete-tasks li').length;
 	$('#counter').hide().fadeIn(300).html(remainingTasks);
 };

});
