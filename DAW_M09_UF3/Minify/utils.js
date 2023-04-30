
function getId(element) {
    if (element instanceof Element) {
        element = element.id;
        return element;
    }
    else if (element instanceof jQuery) {
        element = $(element).attr('id');
        return element;
    }
    return element;
}
function getIdJquery(element) {
    if (element instanceof Element) {
        element = "#" + element.id;
        return element;
    }
    else if (element instanceof jQuery) {
        element = "#" + $(element).attr('id');
        return element;
    }
    return element;
}

$(document).ready(function () {
    SyncValuesSetup();
    LoadCheckbox();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
});

function LoadCheckbox() {
    $("span.form-check > input").addClass("form-check-input");
    $("span.form-check.disabled > input").addClass("disabled").prop("disabled", true);
    $("span.form-check > label").addClass("form-check-label");
}

function SyncValuesSetup() {
    $("input.sync").each(function (index) {
        var id = "#MainContent_" + $(this).attr('id');
        SyncValues(id, this);
        $(this).change(function () {
            SyncValues(this, id);
        });

    });
}

function SyncValues(from, to) {
    console.log(to);
    $(to).prop("checked", $(from).prop("checked"));
}


function dropDownToArray(dropdown) {
    dropdown = getIdJquery(dropdown);
    array = [];
    $(dropdown + " option").each(function () {
        // Add $(this).val() to your list
        array.push(prepareString_HtmlReverse($(this).val()));
    });
    return array;
}
function dropDownToArrayUnique(dropdown) {
    dropdown = getIdJquery(dropdown);
    array = [];
    $(dropdown + " option").each(function () {
        // Add $(this).val() to your list
        if (!array.includes(prepareString_HtmlReverse($(this).val())))
            array.push(prepareString_HtmlReverse($(this).val()));
    });
    return array;
}
function dropDownToArrayText(dropdown) {
    dropdown = getIdJquery(dropdown);
    array = [];
    $(dropdown + " option").each(function () {
        // Add $(this).val() to your list
        array.push(prepareString_HtmlReverse($(this).html()));
    });
    return array;
}
function dropDownToArrayTextUnique(dropdown) {
    dropdown = getIdJquery(dropdown);
    array = [];
    $(dropdown + " option").each(function () {
        // Add $(this).val() to your list
        if (!array.includes(prepareString_HtmlReverse($(this).html())))
            array.push(prepareString_HtmlReverse($(this).html()));
    });
    return array;
}
function getDropDownVal(dropdown) {
    return $(dropdown).children("option:selected").val();
}
function getDropDownText(dropdown) {
    try {
        return prepareString_HtmlReverse($(dropdown).children("option:selected").html());
    } catch (ex) {
        return "";
    }
}
function setDropDownIndex(dropdown, val) {
    $(dropdown)[0].selectedIndex = val;
}

function setDropDownVal(dropdown, val) {
    dropdown = getIdJquery(dropdown);
    $(dropdown + " option").each(function () {
        if ($(this).val() == val) {
            $(this).prop('selected', true);
            $(this).click();
            $(dropdown).trigger("change");
            return;
        } else {
            $(this).prop('selected', false);
        }
    });
}
function setDropDownValNoIndex(dropdown, val) {
    dropdown = getIdJquery(dropdown);
    var setted = false;
    $(dropdown + " option").each(function () {
        if (!setted && $(this).val().split(";")[1] == val) {
            $(this).prop('selected', true);
            $(this).click();
            $(dropdown).trigger("change");
            setted = true;
            return;
        } else {
            $(this).prop('selected', false);
        }
    });
}

function setDropDownText(dropdown, val) {
    dropdown = getIdJquery(dropdown);
    val = prepareString_Html(val);
    $(dropdown + " option").each(function () {
        if (prepareString_Simple($(this).html()) == val) {
            $(this).prop('selected', true);
            $(this).click();
            $(dropdown).trigger("change");
            return;
        } else {
            $(this).prop('selected', false);
        }
    });
}

function prepareString_Simple(val) {
    return val.replace(/&amp;/g, "&");
}
function prepareString_SimpleReverse(val) {
    return val.replace(/&/g, "&amp;");
}
function prepareString_Html(val) {
    return val.replace(/\u00a0/g, "&nbsp;");
}
function prepareString_HtmlReverse(val) {
    return val.replace(/&nbsp;/g, "\u00a0");
}
var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

function TypeaheadSelect(input, select, reloadvalue = false, unique = true, gettext = false, clearonclick = true, denyincomplete = true, settext = false) {
    var values;
    var selected;
    if (gettext === true) {
        var selected = getDropDownText(select);
        if (unique === true) {
            values = dropDownToArrayText(select);
        } else {
            values = dropDownToArrayTextUnique(select);
        }
    } else {
        var selected = getDropDownText(select);
        if (unique === true) {
            values = dropDownToArray(select);
        } else {
            values = dropDownToArrayUnique(select);
        }
    }
    if (reloadvalue === true) {
        $(input).val(selected);
    }
    $(input).typeahead({
        hint: true,
        highlight: true,
        minLength: 0
    },
        {
            name: 'values',
            limit: 1000,
            source: substringMatcher(values)
        }).focus(function () {
            var val = $(this).val();
            if (clearonclick) {
                $(input).val('');
                $(this).val('');
                $(this).typeahead('val', '');
            }
        }).blur(function () {
            var val = $(this).val();
            if (denyincomplete === true) {
                if (!transportista.includes(val)) {
                    $(input).val('');
                    $(this).val('');
                    $(this).typeahead('val', '');
                    val = "";
                } else {

                }
            } else {

            }
            if (settext === true) {
                setDropDownText(select, val);
            } else {
                setDropDownValue(select, val);
            }
        });
}