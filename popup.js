var last_item_id;

// If the page has related field, add listeners
if ($('input[name="MIKTAR"]').length > 0) {

    optionElId = "option_el_accounting_codes";
    selectElId = "selected_accounting_codes"

    // Options for Hodii
    optionsForHodii =   '<option style="height: 25px;" value="110">110 YGA Genel - Genel Yönetim</option>' +
                        '<option style="height: 25px;" value="120">120 YGA Genel - Genel Bağışlar</option>' +
                        '<option style="height: 25px;" value="211">211 Liderlik Programları - Yıldızlar Liderlik Okulu</option>' +
                        '<option style="height: 25px;" value="212">212 Liderlik Programları - Anadoluya Bilim Göçü</option>' +
        				'<option style="height: 25px;" value="220">220 Liderlik Okulu</option>' +
        				'<option style="height: 25px;" value="221">221 Liderlik Okulu - Lise</option>' +
        				'<option style="height: 25px;" value="222">222 Liderlik Okulu - Üniversite</option>' +
        				'<option style="height: 25px;" value="223">223 Uluslararası Liderlik Okulu</option>' +
        				'<option style="height: 25px;" value="230">230 YGA Zirvesi</option>' +
        				'<option style="height: 25px;" value="240">240 Ofis & Mezun Programı</option>' +
        				'<option style="height: 25px;" value="250">250 Uluslararası Saha</option>' +
        				'<option style="height: 25px;" value="260">260 Content Development</option>' +
        				'<option style="height: 25px;" value="310">310 WeWALK</option>' +
        				'<option style="height: 25px;" value="320">320 Hayal Ortağım</option>' +
        				'<option style="height: 25px;" value="410">410 Bilim Seferberliği</option>' +
        				'<option style="height: 25px;" value="510">510 Gönüllendirin</option>' +
        				'<option style="height: 25px;" value="520">520 Teknoloji</option>' +
        				'<option style="height: 25px;" value="530">530 Uluslararası İş Geliştirme</option>' +
        				'<option style="height: 25px;" value="610">610 Arıkovanı</option>' +
        				'<option style="height: 25px;" value="620">620 Wemove</option>' +
        				'<option style="height: 25px;" value="630">630 WeTALK</option>';

    // Options for Tyt
    optionsForTyt =     '<option style="height: 25px;" value="100">100-TYT-GENEL YÖNETİM</option>' +
        			    '<option style="height: 25px;" value="105">105-TYT-HYDROSOLAR BÜYÜKÇEKMECE</option>' +
        				'<option style="height: 25px;" value="106">106-TYT-MEDİNE HAVALİMANI</option>' +
        				'<option style="height: 25px;" value="104">104-TYT-DİĞER PROJELER</option>';

    const loadOptionBox = new Promise(function (resolve, reject) {

        // Option panel
        var optionEl = document.createElement('div');
        optionEl.id = optionElId;
        optionEl.style.cssText = 'width: 200px; height: 300px; position: sticky; border: 1px solid #eee; background-color: #fdfdfd; left: 0px; bottom: 0px; padding: 10px;display: none';

        // Hodii is default project
        optionEl.innerHTML = '<select id="' + selectElId + '" class="hodii" style="width: 200px" size="10">' +
            optionsForHodii +
            '</select>' +
            '<button id="changeCorp" style="font-size: 10px;margin-top: 15px;">Şirket Değiştir</button>';
        document.body.appendChild(optionEl);

        resolve('option box loading is done');
    });


    loadOptionBox.then(function () {
        optionDiv = document.getElementById(optionElId);
        selectElement = document.getElementById(selectElId);

        // Project Change Button
        document.getElementById("changeCorp").addEventListener("click", function () {

            clickedProject = selectElement.className;

            // change to hodii codes
            if (clickedProject == "hodii") {
                selectElement.innerHTML = optionsForTyt;
                selectElement.className = "tyt";

                // change to tyt codes
            } else if (clickedProject == "tyt") {
                selectElement.innerHTML = optionsForHodii;
                selectElement.className = "hodii";
            }
        });

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