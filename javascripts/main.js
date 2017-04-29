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


});
