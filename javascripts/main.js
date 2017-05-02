$(document).ready(() => {
	let apiKeys;
	let editId = "";

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
  $('#add-todo-button').click(() => {
      let newTodo = {
          isCompleted: false,
          task: $('#add-todo-text').val()
      };
    if(editId.length > 0){
      //edit
      FbAPI.editTodo(apiKeys, newTodo, editId).then(() => {
        $('#add-todo-text').val("");
        editId = "";
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbAPI.writeDom(apiKeys);
      }).catch((error) => {
        console.log("editTodo error", error);
      });
    } else{
      FbAPI.addTodo(apiKeys, newTodo).then(() => {
        $('#add-todo-text').val("");
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbAPI.writeDom(apiKeys);
      }).catch((error) => {
        console.log("addTodo error", error);
      });      
    }
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
	let editText = $(e.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
	editId = e.target.id;
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
		$('#add-todo-text').val(editText);
});

//complete todo
$('.main-container').on('click', 'input[type="checkbox"]', (e) =>{
	let myTodo = {
		isCompleted: e.target.checked,
		task: $(e.target).siblings('.task').html()
	};
	FbAPI.editTodo(apiKeys, myTodo, e.target.id).then(() => {
		FbAPI.writeDom(apiKeys);
		//countTask();
	}).catch((error) =>{
		console.log("Checker Error", error);
	});
});


});