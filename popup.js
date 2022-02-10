div = document.createElement("div");
div.style.width = "220px";
div.style.height = "300 px";
div.style.position = "sticky";
div.style.height = "300 px";
div.style.left = "0px";
div.style.bottom = "0px";
div.style.padding = "10px";
div.style.backgroundColor="#fdfdfd"
div.style.border = "1px solid #eee"
div.innerHTML = '<select size="16" id="selected_accounting_codes" style="width: 200px; border: 1px solid #eee;"></select>';
div.innerHTML += '<select style="width: 200px;" id="changeCorp2"></select>';
div.style.display = "none";
div.id = "container_plugin";
document.body.appendChild(div);

// window.onload = () => {


// }


var last_item_id;
var lucaData = {};

let getData = new Promise((resolve, reject) => {
    chrome.storage.local.get(["lucaData"], (result) => {
        lucaData = result.lucaData;
        resolve();
    })
});

getData.then(() => {
    frame();
    setListOfCompany(0);

})

let frame = () => {
    list = document.getElementById("changeCorp2");

    let length = Object.keys(lucaData).length;
    for (var i = 0; i < length; i++) {
        option = document.createElement("option");
        company = lucaData[i];
        option.value = company.id;
        option.innerHTML = company.title;
        list.appendChild(option);
    }
}

chrome.storage.local.get(["lucaLastSelectedCompany"], (result) => {
    var id = result.lucaLastSelectedCompany;
    console.log("ıdd"+id);
    setSelectedCompany(id);
})

let selectEl = document.getElementById("changeCorp2");
selectEl.addEventListener("change", function () {
    val = selectEl.value;
    setListOfCompany(val);
    chrome.storage.local.set({
        lucaLastSelectedCompany: val
    })
});

let setSelectedCompany = (id) => {
    let selectEl = document.getElementById("changeCorp2");
    children = selectEl.children;
    for (let i = 0; i < children.length; i++) {
        el = children[i];
        if (el.value == id) {
            el.selected = "selected";
        };
    }
}

let setListOfCompany = (id) => {
    let optionBox = document.getElementById("selected_accounting_codes");
    optionBox.innerHTML = "";
    lucaData[id].codes.forEach(pair => {
        var option = document.createElement("option");
        option.style = "height: 20px;"
        option.value = pair[0];
        option.innerHTML = pair[0] + " - " + pair[1];
        optionBox.appendChild(option);
    });

}



lucaMiktarId = "";

// If the page has related field, add listeners
if ($('input[name="MIKTAR"]').length > 0) {

    optionElId = "option_el_accounting_codes";
    selectElId = "selected_accounting_codes"

    //optionList = ""

    // liste = liste.split("\n");

    // for (var index in liste) {
    //     if (liste[index].length > 0) {
    //         var code = liste[index].split(",")
    //         optionList += '<option style="height: 25px" value="' + code[0] + '">' + code[0] + ' ' + code[1] + '</option>\n';
    //     }
    // }


    const loadOptionBox = new Promise(function (resolve, reject) {

        // // Option panel
        // var optionEl = document.createElement('div');
        // optionEl.id = optionElId;
        // optionEl.style.cssText = 'width: 200px; height: 300px; position: sticky; border: 1px solid #eee; background-color: #fdfdfd; left: 0px; bottom: 0px; padding: 10px;display: none';

        // // Hodii is default project
        // optionEl.innerHTML = '<select id="' + selectElId + '" class="hodii" style="width: 200px" size="10">' + optionList + '</select>';

        // changeCorp2 = document.getElementById("changeCorp2");
        document.getElementById("container_plugin").style.display = "block";
        console.log(document.getElementById("container_plugin"));

        resolve('option box loading is done');
    });


    loadOptionBox.then(function () {

        box = document.getElementById("container_plugin");

        // optionDiv = document.getElementById(optionElId);
        selectElement = document.getElementById("selected_accounting_codes");

        // // Event listeners on options
        selectElement.addEventListener("change", function () {
            document.getElementById(lucaMiktarId).value = selectElement.value;
        });

        // When an option selected with Enter key
        selectElement.addEventListener('keyup', function (e) {
            if (e.which == 13) {
                box.style.display = "none";
                document.getElementById(lucaMiktarId).focus();
            }
        });
        // Open option panel when related field focused with tab (or any) key
        document.addEventListener("keyup", function (e) {
            if (e.path[0].name == "MIKTAR") {
                box.style.display = "block";
                console.log(e.path[0].id);
                lucaMiktarId = e.path[0].id;
                selectElement.focus();
            }
        });

        // Open option panel when related field clicked
        document.addEventListener("click", function (e) {
            e = e || window.event;
            if (e.path[0].name == "MIKTAR") {
                box.style.display = "block";
                lucaMiktarId = e.path[0].id;
                selectElement.focus();
            }

            // If option panel and elements inside clicked
            else if (e.path[0].id == optionElId || e.path[2].id == optionElId) {
                // do nothing
            } else if (e.path[0].id == "changeCorp2") {
                // do nothing; keep view available
            } else {
                box.style.display = "none";
            }
        });
    });
}