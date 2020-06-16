$('#search-career-form').keyup((e) => {
    e.preventDefault();
    $('.career-result').empty();
    const universityId = $('.career-result').attr('id');
    const req = $.ajax({
        url: `${universityId}/search`,
        method: 'GET',
        data: {
            text: $('#career-input').val(),
        },
    });

    req.done((response) => {
        if (response && response.careers.length > 0) {
            const { careers } = response;
            careers.forEach((career) => {
                $('.career-result').append(`
                <a href='/careers/${career.id}'>
                <div class="career-element">${career.name}</div>
                </a>
                `)
            })
        } else if (response) {
            $('.career-result').append(`
            <div class="career-element"> No se han encontrado carreras </div>
            `)
        }
    })

    req.fail((jqXHR, textStatus) => {
        // eslint-disable-next-line no-alert
        alert(`Hubo un error: ${textStatus}`);
    });
})