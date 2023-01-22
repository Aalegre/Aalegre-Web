function Translate() {
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.slice(0, 2);
    console.log("The language is: " + userLang);
    var url = window.location.href;
    var host = window.location.host;
    var newUrl = url.replace(host, replaceAll(host, ".", "-") + ".translate.goog") + "?_x_tr_sl=en&_x_tr_tl=" + userLang.slice(0, 2);
    console.log(newUrl);
    if (userLang === "en")
        userLang = "es";
    window.location.href = newUrl;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function scrollOffset(element, offset) {
    window.scrollTo({ top: (element.getBoundingClientRect().top + window.pageYOffset + offset), behavior: 'smooth' });
}