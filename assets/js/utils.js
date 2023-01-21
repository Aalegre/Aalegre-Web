function Translate() {
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.slice(0, 2);
    console.log("The language is: " + userLang);
    var url = window.location.href;
    var host = window.location.host;
    var newUrl = url.replace(host, host.replace(".", "-") + ".translate.goog") + "?_x_tr_sl=en&_x_tr_tl=" + userLang.slice(0, 2);
    console.log(newUrl);
    if (userLang === "en")
        return;
    window.location.href = newUrl;
}