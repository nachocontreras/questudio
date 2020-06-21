$(document).ready(function() {
    $("#confirm-pass").hide();
    $("#firstPassword").change(e => $("#confirm-pass").hide());
    $("#confirmPassword").change(e => $("#confirm-pass").hide());
    $("#edit-password-form").submit(function(e) {
        if ( $("#firstPassword").val() !== $("#confirmPassword").val()){
            e.preventDefault();
            $("#confirm-pass").show();
        }
    });
});



