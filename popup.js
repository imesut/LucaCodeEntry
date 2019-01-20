var last_item_id;

// If the page has related field, add listeners
if ($('input[name="MIKTAR"]').length > 0) {

    // Option panel
    var optionEl = document.createElement('div');
    optionEl.id = "option_el_accounting_codes";
    optionEl.style.cssText = 'width: 200px; height: 300px; position: sticky; border: 1px solid #eee; background-color: #fdfdfd; left: 0px; bottom: 0px; padding: 10px;display: none';

    // Options
    optionEl.innerHTML = '<select id="selected_accounting_codes" style="width: 200px" name="cars" size="4"><option style="height: 30px;" value="100">100 - Volvo</option><option style="height: 30px;" value="200">200 - Saab</option><option style="height: 30px;" value="300">300 - Fiat</option><option style="height: 30px;" value="400">400 - Audi</option></select>';
    document.body.appendChild(optionEl);

    // Event listeners on options
    var selected_code = document.getElementById("selected_accounting_codes");
    selected_code.addEventListener("change", function () {
        document.getElementById(last_item_id).value = selected_code.value;
    });

    // When an option selected with Enter key
    selected_code.addEventListener('keyup', function (e) {
        if (e.which == 13) {
            document.getElementById("option_el_accounting_codes").style.display = "none";
            document.getElementById(last_item_id).focus();
        }
    });
}

// Open option panel when related field focused with tab (or any) key
document.addEventListener("keyup", function (e) {
    if (e.path[0].name == "MIKTAR") {
        optionEl.style.display = "block";
        last_item_id = e.path[0].id;
        document.getElementById("selected_accounting_codes").focus();
    }
});

// Open option panel when related field clicked
document.addEventListener("click", function (e) {
    e = e || window.event;
    if (e.path[0].name == "MIKTAR") {
        optionEl.style.display = "block";
        last_item_id = e.path[0].id;
        document.getElementById("selected_accounting_codes").focus();
    }
    // If option panel and elements inside clicked
    else if (e.path[0].id == "option_el_accounting_codes" || e.path[2].id == "option_el_accounting_codes") {

    } else {
        optionEl.style.display = "none";
    }
});