$(document).ready(function() {

	$(".reply-form").submit(function(event) {
		event.preventDefault();
		let text = $(this).find(".comment-description").val();
		let _careerId = $(this).find(".comment-careerId").val();
        let _userId = $(this).find(".comment-userId").val();
        let _previousCommentId = $(this).find(".comment-previousCommentId").val();

		let req = $.ajax({
			url: `/comments/${_careerId}/create`,
			method: "POST",
			data: { description: text , userId: _userId,  careerId: _careerId, previousCommentId: _previousCommentId},
		})
		req.done(function(response) {
			location.reload(true);
		})
        req.fail(function(jqXHR, textStatus) {
            alert("Hubo un error: " + textStatus);
        });
	})

})





// Auto expand reply comment textarea
$('.reply-comment').on('input', function(){
    $(this).height(1);
    var totalHeight = jQuery(this).prop('scrollHeight') - parseInt(jQuery(this).css('padding-top')) - parseInt(jQuery(this).css('padding-bottom'));
    jQuery(this).height(totalHeight);
});



// Reply button functionality
$('.reply-button').click(function() {
 let id = $(this).attr("id").split("button-")[1];
 $("#reply-" + id).toggle(); 
 jQuery('.reply-comment').focus();
});

