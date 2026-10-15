(function () {
    function load(id, url) {
        var el = document.getElementById(id);
        if (!el) return;
        fetch(url)
            .then(function (res) { return res.text(); })
            .then(function (html) {
                el.innerHTML = html;

                // ★ ここが重要：nav を再初期化する
                if (id === 'header-include') {
                    // Landed のメニュー初期化
                    $('#nav > ul').dropotron({
                        alignment: 'center'
                    });
                }
            })
            .catch(function (err) { console.error('include failed:', id, err); });
    }

    // Header nav
    load('header-include', '/partials/header.html');

    // Sidebar
    // load('sidebar-include', '/partials/sidebar.html');

    // Footer
    // load('footer-include', '/partials/footer.html');
})();