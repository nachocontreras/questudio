$(document).ready(function() {

	$("#comment-form").submit(function(event) {
		event.preventDefault()
		let text = $("#comment-description").val();
		let _careerId = $("#comment-careerId").val();
		let _userId = $("#comment-userId").val();
		let _previousCommentId = $("#comment-previousCommentId").val();

		let req = $.ajax({
			url: `/comments/${_careerId}/create`,
			method: "POST",
			data: { description: text , userId: _userId,  careerId: _careerId, previousCommentId: _previousCommentId },
		})
		req.done(function(response) {
			location.reload(true);
		})
        req.fail(function(jqXHR, textStatus) {
            alert("Hubo un error: " + textStatus);
        });
	})

})