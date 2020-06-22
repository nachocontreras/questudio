$('#career-selector').change((e) => {
    var careerName = $('#career-selector').val();
    const selection = document.getElementById('selection')
    const children = selection.children;
    var careers = [];
    for (var i = 0; i < children.length; i++) {
        careers.push(children[i].innerHTML)
    }
    if (!careers.includes(careerName) && careerName != 'all' && careerName != "") {
        if (selection.firstChild && selection.firstChild.innerHTML == 'Todas las carreras') {
            $('#selection').empty()
        }
        $('#selection').append(`<div class="selected-career">${careerName}</div>`)
        $('#interests').val(interests);
    } else if (careerName == 'all' && careerName != '') {
        $('#selection').empty()
        $('#selection').append(`<div class="selected-career">Todas las carreras</div>`)
    } else if (careerName == '') {
        $('#selection').empty();
    }
    const newSelection = document.getElementById('selection')
    var interests = ""
    for (var i = 0; i < newSelection.children.length; i++) {
        interests += newSelection.children[i].innerHTML + ","
    }
    $('#interests').val(interests)
    console.log($('#interests').val())
})