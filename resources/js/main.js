const loadPage = function (page) {
    if (currentPage != page) {
        $('.collapse').collapse('hide');
        fetch("resources/html/" + page + ".html")
            .then(response => {
                return response.text()
            })
            .then(data => {
                $('#container').html(data);
            });
        $('.nav-item').removeClass('nav-item-disabled');
        $('#navbar-' + page).addClass('nav-item-disabled');
        if (page == 'contact') {
            $('footer').addClass('d-none');
        } else {
            $('footer').removeClass('d-none');
        }
        if (page == 'art' || page == 'main') {
            $('body').css('background-color', 'black');
            $('.nav-item,.navbar-brand').css('color', 'white');
            $('#footer-fb-img').attr("src", "resources/img/icons/fb-white.png")
            $('#footer-mail-img').attr("src", "resources/img/icons/mail-white.png")
            $('#footer-ig-img').attr("src", "resources/img/icons/ig-white.png")
            $('.navbar-toggler-icon').css('background-image', 'url("' + "data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(255,255,255)' stroke-width='2' stroke-linecap='square' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E" + '")');
        } else {
            $('body').css('background-color', 'white');
            $('.nav-item,.navbar-brand').css('color', 'black');
            $('#footer-fb-img').attr("src", "resources/img/icons/fb-black.png")
            $('#footer-mail-img').attr("src", "resources/img/icons/mail-black.png")
            $('#footer-ig-img').attr("src", "resources/img/icons/ig-black.png")
            $('.navbar-toggler-icon').css('background-image', 'url("' + "data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(0,0,0)' stroke-width='2' stroke-linecap='square' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E" + '")');
        }
        if (page != 'main') {
            history.pushState(null, 'Ivana Castro | ' + page.charAt(0).toUpperCase() + name.slice(1), page);
            $(document).attr("title", 'Ivana Castro | ' + page.charAt(0).toUpperCase() + page.slice(1));
        } else {
            history.pushState(null, 'Ivana Castro', '/');
            $(document).attr("title", 'Ivana Castro');
        }
        currentPage = page;
    }
};

$(window).scroll((e) => {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop) {
        $('nav').css('top', '-63px');
        if (scrollTop > 30) {
            if (currentPage == 'art' || currentPage == 'main') {
                $('nav').css('background-color', 'rgb(0,0,0)');
            } else {
                $('nav').css('background-color', 'rgb(255,255,255)');
            }
            $('nav').css('box-shadow', '0 2px 2px -2px rgba(0,0,0,.2)');
        }
        $('.collapse').collapse('hide');
    } else {
        $('nav').css('top', '0px');
        if (scrollTop < 30) {
            $('nav').css('background-color', 'transparent');
            $('nav').css('box-shadow', 'none');
        }
    }
    lastScrollTop = scrollTop;
});

$(window).bind('popstate', () => {
    if (location.pathname.length == 1) {
        loadPage('main');
    } else {
        loadPage(location.pathname.substring(1, location.pathname.length));
    }
}
);

$('.navbar-brand').click(() => {
    loadPage('main');
});

$('#navbar-bio').click(() => {
    loadPage('bio');
});

$('#navbar-art').click(() => {
    loadPage('art');
});

$('#navbar-exhibitions').click(() => {
    loadPage('exhibitions');
});

$('#navbar-contact, #footer-mail').click(() => {
    loadPage('contact');
});

let lastScrollTop = 0;
let currentPage = '';

//Carousel exhibitions Fichas
let exhibitionsFichasImgs = [];
for (let i = 0; i < 10; i++) {
    exhibitionsFichasImgs.push("resources/img/exhibitions/raf/" + (i + 1) + ".jpg");
}
let exhibitionsFichasImgsIndex = 0;

window.onload = () => {
    switch (localStorage.getItem('pathname')) {
        case '/bio':
            loadPage('bio');
            break;
        case '/art':
            loadPage('art');
            break;
        case '/exhibitions':
            loadPage('exhibitions');
            break;
        case '/contact':
            loadPage('contact');
            break;
        default:
            loadPage('main');
            break;
    }
};
