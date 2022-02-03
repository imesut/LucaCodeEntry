window.onload = () => {

    chrome.storage.local.get(["lucaData"], (result) => {
        result = result.lucaData;
        console.log(result);
        let length = Object.keys(result).length;
        for (var i = 1; i < length; i++) {
            drawBox();
        }
        for (var i = 0; i < length; i++) {
            fillBox(i, result);
        }
    })

    let fillBox = (id, result) => {
        document.getElementById("company_name_" + id).innerText = result[id].title;
        var codeString = "";
        result[id].codes.forEach(pair => {
            codeString += pair[0] + ", " + pair[1] + "\n";
        });
        codeString = codeString.substring(0, codeString.length - 1);
        document.getElementById("company_codes_" + id).innerHTML += codeString;
    }

    last_id = 0
    var company_holder = document.getElementById("company_holder");

    // let drawBox = () => {
    //     var company_holder = document.getElementById("company_holder");
    //     let template = document.getElementById("-1");

    //     var new_company = template.cloneNode(true);
    //     let new_id = last_id + 1;
    //     new_company.id = new_id;
    //     new_company.classList.remove("template");
    //     new_company.classList.add("company")
    //     new_company.getElementsByTagName("input")[0].id = "company_name_" + new_id;
    //     new_company.getElementsByTagName("textarea")[0].id = "company_codes_" + new_id;
    //     var delete_button = new_company.getElementsByTagName("a")[0];
    //     delete_button.id = "delete_" + new_id;
    //     delete_button.setAttribute("onclick", "deleteBox(" + new_id + ")");

    //     company_holder.innerHTML += new_company.outerHTML;
    //     last_id += 1;
    // }

    let drawBox = () => {
            last_id += 1;
            var new_company = cloner(last_id);
            company_holder.innerHTML += new_company.outerHTML;
        }

    let cloner = (id) => {
        //let template = document.getElementById("-1");
        abstractContainer = document.createElement("div");
        //newEl = template.outerHTML.toString();
        newEl = `<div class="template" id="-1"><textarea id="company_name_-1" rows="1" placeholder="Şirket Adı"></textarea><br><a style="font-size: 12px; color: red;" href="#" class="delete" id="delete_-1">Bu şirketi sil</a><br><textarea id="company_codes_-1" rows="10" placeholder="101, Arge giderleri
102, Keyfi giderler"></textarea><br><hr></div>`;
        newEl = newEl.replace("template", "company");
        for (let i = 0; i < 5; i++){
            newEl = newEl.replace("-1", id);
        }
        abstractContainer.innerHTML = newEl;
        return abstractContainer.getElementsByTagName("div")[0];
    }

    // Add a new empty company box
    document.getElementById("newCompany").addEventListener("click", () => {
        drawBox();
    })

    document.getElementById("save").addEventListener("click", () => {

        var data = []
        let companies = document.getElementsByClassName("company");

        Array.prototype.forEach.call(companies, (company) => {
            console.log(company);
            console.log(companies);
            var companyObj = {
                "id": company.id,
                "title": getText(company, 0),
                "codes": []
            }
            var codes = getText(company, 1).split(/\r?\n/);
            console.log(codes);
            codes.forEach((line) => {
                field_code = line.split(", ")[0]
                description = line.split(", ")[1]
                companyObj["codes"].push([field_code, description])
            })

            data.push(companyObj);
        });

        chrome.storage.local.set({
            lucaData: data
        }, () => {
            document.getElementById("heading").innerText += " - Güncellendi";
        })
    })


    document.addEventListener("click", (e) => {
        e = e || window.event;
        //0: a element
        //1: container of the a element: company box
        id = e.path[1].id;
        if (e.path[0].tagName=="A"){
            deleteBox(id);
            last_id -= 1;
            resetIds(document.getElementById("company_holder"));
        }
    });


}

let resetIds = (container) => {
    for (let id = 0; id < container.children.length; id++) {
        container.children[id].id = id;
    }
}

let getText = (el, order) => {
    return el.getElementsByTagName("textarea")[order].value;
}

let deleteBox = (id) => {
    document.getElementById(id).remove();
}

