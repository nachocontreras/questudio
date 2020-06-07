$("a.item").on('click', function() {
    $("a.item").removeClass("is-active");
    $(this).addClass("is-active");
    let name = $(this).attr("id").split("-item")[0];
    $('[id^="page-"]').hide();
    $("#page-" + name).css('display', 'block');
})