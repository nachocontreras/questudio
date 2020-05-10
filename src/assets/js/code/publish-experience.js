$(document).ready(function() {

	$("#experience-form").submit(function(event) {
		event.preventDefault()
		let text = $("#experience-comment").val();
		let _careerId = $("#experience-careerId").val();
		let _userId = $("#experience-userId").val();

		let req = $.ajax({
			url: `/experiences/${_careerId}/create`,
			method: "POST",
			data: { description: text , careerId: _careerId, userId: _userId},
		})
		req.done(function(response) {
			location.reload(true);
		})
        req.fail(function(jqXHR, textStatus) {
            alert("Hubo un error: " + textStatus);
        });
	})

})