function renderKatex() {
    $('.katexMath').each(function() {
        const pElement = $(this).find('p');
        katex.render(pElement.html(), pElement[0], { displayMode: true, throwOnError: false });
    });
}

function katexReady() {
    renderKatex();
}