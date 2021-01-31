var last_item_id;

// If the page has related field, add listeners
if ($('input[name="MIKTAR"]').length > 0) {

    optionElId = "option_el_accounting_codes";
    selectElId = "selected_accounting_codes"

    optionList = ""

    liste = liste.split("\n");

    for (var index in liste) {
        if (liste[index].length > 0) {
            var code = liste[index].split(",")
            optionList += '<option style="height: 25px" value="' + code[0] + '">' + code[0] + ' ' + code[1] + '</option>\n';
        }
    }


    const loadOptionBox = new Promise(function (resolve, reject) {

        // Option panel
        var optionEl = document.createElement('div');
        optionEl.id = optionElId;
        optionEl.style.cssText = 'width: 200px; height: 300px; position: sticky; border: 1px solid #eee; background-color: #fdfdfd; left: 0px; bottom: 0px; padding: 10px;display: none';

        // Hodii is default project
        optionEl.innerHTML = '<select id="' + selectElId + '" class="hodii" style="width: 200px" size="10">' + optionList + '</select>';
        document.body.appendChild(optionEl);

        resolve('option box loading is done');
    });


    loadOptionBox.then(function () {
        optionDiv = document.getElementById(optionElId);
        selectElement = document.getElementById(selectElId);

        // Event listeners on options
        selectElement.addEventListener("change", function () {
            document.getElementById(last_item_id).value = selectElement.value;
        });

        // When an option selected with Enter key
        selectElement.addEventListener('keyup', function (e) {
            if (e.which == 13) {
                optionDiv.style.display = "none";
                document.getElementById(last_item_id).focus();
            }
        });
        // Open option panel when related field focused with tab (or any) key
        document.addEventListener("keyup", function (e) {
            if (e.path[0].name == "MIKTAR") {
                optionDiv.style.display = "block";
                last_item_id = e.path[0].id;
                selectElement.focus();
            }
        });

        // Open option panel when related field clicked
        document.addEventListener("click", function (e) {
            e = e || window.event;
            if (e.path[0].name == "MIKTAR") {
                optionDiv.style.display = "block";
                last_item_id = e.path[0].id;
                selectElement.focus();
            }

            // If option panel and elements inside clicked
            else if (e.path[0].id == optionElId || e.path[2].id == optionElId) {
                // do nothing
            } else if (e.path[0].id == "changeCorp") {
                // do nothing; keep view available
            } else {
                optionDiv.style.display = "none";
            }
        });
    });
}