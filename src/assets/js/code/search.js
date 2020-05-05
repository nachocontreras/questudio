$( document ).ready(function() {

    $("#search-form").submit(function(e) {
        e.preventDefault();
        let text = $('#search-box').val();
        console.log(text);
        $("#search-results").empty();   
        var x = $("#search-box").position();
        var z = $("#search-box").width();
        var y = $(".topnav").height();
        $("#search-results").css({top: x.top + y, left: x.left, width: Math.min(2 * z, window.innerWidth), display: 'block'});
        searchFunction(text);
    });

    $(document).mouseup(function(e) {
        var container = $("#search-results");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            container.hide();
        }
    });


});

function searchFunction(query) {

    let _request = $.ajax({
        url: "/search",
        method: 'GET',
        data: {
            text: query,
        }
    });

    //Este bloque se ejecutará si no hay error en la petición
    _request.done(function(respuesta) {
        $("#search-results").css({background: 'white'});
        if (respuesta.amount != 0) {
            if (respuesta.data["Universidades"].length != 0) {
                $("#search-results").append(`
                <div class='search-title'>
                Universidades
                </div>`);
                while (respuesta.data["Universidades"].length != 0) {
                    let university = respuesta.data["Universidades"].shift();
                    $("#search-results").append(`
                    <a href='/universities/${university.id}'>
                        <div class='search-element'>
                        ${university.name}
                        </div>
                    </a>`);
                }
            }
            if (respuesta.data["Carreras"].length != 0) {
                $("#search-results").append(`
                <div class='search-title'>
                Carreras
                </div>`);
                while (respuesta.data["Carreras"].length != 0) {
                    let career = respuesta.data["Carreras"].shift();
                    $("#search-results").append(`
                    <a href='/careers/${career.id}'>
                    <div class='search-element'>
                    ${career.name}
                    </div>
                    </a`);
                }
            }
        } else {
            $("#search-results").append(`
                <div class='search-no-results'>
                Sin resultados
                </div>`);
        }
    });

    //Este bloque se ejecuta si hay un error
    _request.fail(function(jqXHR, textStatus) {
        alert("Hubo un error: " + textStatus);
    });

}