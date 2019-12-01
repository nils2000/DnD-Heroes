'use strict';
//Form Construction
function named_input(name, size) {
    var input = document.createElement("input");
    input.id = name;
    input.size = size;
    input.name = name;
    return input;
}
function labeled_input(name) {
    var label = document.createElement("label");
    var input = named_input(name, 2);
    label.htmlFor = name;
    label.innerText = name;
    label.appendChild(input);
    return label;
}
function checkbox(name) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = name;
    checkbox.value = name;
    checkbox.checked = false;
    return checkbox;
}
function labeled_input_fields(names) {
    return names.map(labeled_input);
}
function checkboxes_for_labeld_input_fields(names) {
    return names.map(checkbox);
}
function append_labeled_input_field(name, html_element_id) {
    document.getElementById(html_element_id).appendChild(labeled_input(name));
}
function append_button(name, click_function, target_div_name) {
    var new_button = document.createElement("button");
    new_button.innerHTML = name;
    new_button.onclick = click_function;
    new_button.id = name;
    document.getElementById(target_div_name).appendChild(new_button);
}
function named_textarea(name, rows) {
    var span = document.createElement("span");
    var textarea = document.createElement("textarea");
    span.title = name;
    textarea.id = name;
    textarea.innerText = name;
    textarea.rows = rows;
    span.appendChild(textarea);
    return span;
}
function selection_list(items, first_option, id) {
    var selection = document.createElement("select");
    if (id)
        selection.id = id;
    if (first_option) {
        append_option(selection, first_option);
    }
    if (items) {
        for (var i = 0; i < items.length; i++) {
            append_option(selection, items[i]);
        }
    }
    return selection;
}
function append_option(selection, item) {
    var option = document.createElement("option");
    option.text = item;
    selection.appendChild(option);
}
function append_named_textarea(name, rows, html_element_id) {
    document.getElementById(html_element_id).appendChild(named_textarea(name, rows));
}
function named_input_field(name, size) {
    var input = named_input(name, size);
    input.value = name;
    var span = document.createElement("span");
    span.title = name;
    span.appendChild(input);
    return span;
}
function weapon_stats_inputfields() {
    var weapon_num = Date.now();
    var weapon_div = document.createElement("div");
    weapon_div.id = weapon_num;
    var weapon_name_field = named_input_field("Waffe", 15);
    weapon_name_field.className = "weapon_name";
    var weapon_bonus_field = named_input_field("Bonus", 5);
    weapon_bonus_field.className = "weapon_bonus";
    var weapon_damage_field = named_input_field("SchadenUndArt", 15);
    weapon_damage_field.className = "weapon_damage";
    weapon_div.appendChild(weapon_name_field);
    weapon_div.appendChild(weapon_bonus_field);
    weapon_div.appendChild(weapon_damage_field);
    return weapon_div;
}
function table_row(list) {
    var row = document.createElement("tr");
    for (var k in list) {
        var data = document.createElement("td");
        data.appendChild(list[k]);
        row.appendChild(data);
    }
    return row;
}
function attribute_table_row(attr) {
    var bez = document.createTextNode(attr);
    var inp = named_input(attr, 2);
    var mod = div(attr + "Modifikator");
    var bonus = div(attr + "Bonus");
    var trained = checkbox(attr + "RWTrainiert");
    var rw = div(attr + "RW");
    var rw_mod = div(attr + "RWMod");
    return table_row([bez, inp, mod, bonus, trained, rw, rw_mod]);
}
function append_table_row(row, table_id) {
    var table = document.getElementById(table_id);
    table.appendChild(row);
}
function div(id) {
    var div_element = document.createElement("div");
    div_element.id = id;
    return div_element;
}
function add_new_weapon() {
    var weapon_form = weapon_stats_inputfields();
    document.getElementById("weapons").appendChild(weapon_form);
    return weapon_form;
}
function add_skills() {
    var skills = [
        "Athletik(Str)",
        "Akrobatik(Ges)",
        "Fingerfertigkeit(Ges)",
        "Heimlichkeit(Ges)",
        "Arkane Kunde(Int)",
        "Geschichte(Int)",
        "Nachforschungen(Int)",
        "Naturkunde(Int)",
        "Religion(Int)",
        "Heilkunde(Wei)",
        "Mit Tieren umgehen(Wei)",
        "Motiv erkennen(Wei)",
        "Überlebenskunst(Wei)",
        "Wahrnehmung(Wei)",
        "Auftreten(Cha)",
        "Einschüchtern(Cha)",
        "Täuschen(Cha)",
        "Überzeugen(Cha)"
    ];
    var inputs = labeled_input_fields(skills);
    var checkbox_names = skills.map(function (n) { return n + "_trainiert"; });
    var checkboxes = checkboxes_for_labeld_input_fields(checkbox_names);
    var skill_div = document.getElementById("skills");
    for (var i = 0; i < inputs.length; i++) {
        skill_div.appendChild(checkboxes[i]);
        skill_div.appendChild(inputs[i]);
        skill_div.appendChild(document.createElement("br"));
    }
}
add_skills();
append_labeled_input_field("passive Weisheit (Wahrnehmung)", "passive_wisdom");
append_named_textarea("weitere Übung und Sprachen", 12, "practice_and_languages");
append_named_textarea("Persönlichkeitsmerkmale", 5, "personality");
append_named_textarea("Ideale", 5, "ideals");
append_named_textarea("Bindungen", 5, "ties");
append_named_textarea("Makel", 5, "taint");
append_named_textarea("Merkmale", 40, "characteristics");
append_labeled_input_field("RK", "combat_stats");
append_labeled_input_field("Initiative", "combat_stats");
append_labeled_input_field("Bewegung", "combat_stats");
document.getElementById("combat_stats").appendChild(document.createElement("br"));
append_labeled_input_field("TP max", "combat_stats");
append_labeled_input_field("TP", "combat_stats");
append_labeled_input_field("TP temp", "combat_stats");
append_labeled_input_field("KM", "money");
append_labeled_input_field("SM", "money");
append_labeled_input_field("EM", "money");
document.getElementById("money").appendChild(document.createElement("br"));
append_labeled_input_field("GM", "money");
append_labeled_input_field("PM", "money");
append_named_textarea("Ausrüstung", 30, "equipment");
append_hero_selector();
document.getElementById("upper_left_box")
    .appendChild(document.createElement("br"));
append_button("speichern", store_current_hero_and_refresh, "upper_left_box");
append_button("Felder zurück setzen", clear_all_fields, "upper_left_box");
append_button("Held löschen", delete_hero_from_storage_and_refresh, "upper_left_box");
//AttributeTable
// <tr>
//                 <th>Attribute</th>
//                 <th><!--Werte--></th>
//                 <th>Mod.</th>
//                 <th>Bonus</th>
//                 <th><!--RW_trained--></th>
//                 <th>RW</th>
//                 <th>Mod.</th>
//             </tr>
var attribute = ["Stärke", "Geschick", "Con", "Int", "Weisheit", "Charisma"];
for (var a in attribute)
    append_table_row(attribute_table_row(attribute[a]), "Attribute");
//Data retrieval
function get_hero_data_from_form() {
    var hero_stats = Object();
    //var stat_names = ["charname","charrace","chardescription","strength","dexterity","constitution",
    //"intelligence","wisdom","charisma","hitpoints"];
    //for(var i = 0; i< stat_names.length;i++){
    //var input_field:any = document.getElementById(stat_names[i]);
    //hero_stats[stat_names[i]] = input_field.value;
    //}
    //hero_stats["classes"] = get_classes_from_form();
    var ids = document.querySelectorAll('[id]');
    //Array.prototype.forEach.call(ids,function(element,i){console.log(element.id,i)});
    Array.prototype.forEach.call(ids, function (element, i) {
        //console.log(element.tagName,i);
        if (element.tagName == "INPUT" || element.tagName == "TEXTAREA") {
            if (element.id == "Waffe" || element.id == "SchadenUndArt" || element.id == "Bonus") 
            //TODO: Waffen als seperate Objekte speichern 
            {
                var weapon_id = element.parentNode.parentNode.id;
                if (!hero_stats["Waffen"])
                    hero_stats["Waffen"] = Object();
                if (!hero_stats["Waffen"][weapon_id])
                    hero_stats["Waffen"][weapon_id] = Object();
                hero_stats["Waffen"][weapon_id][element.id] = element.value;
                console.log(hero_stats["Waffen"][weapon_id]);
            }
            else if (element.value != "" && element.value != element.id)
                if (element.type != "checkbox" || element.checked)
                    hero_stats[element.id] = element.value;
        }
    });
    var checked_checkboxes = all_checkboxes().filter(function (x) { return x.checked; });
    checked_checkboxes.forEach(function (x) { return hero_stats[x.id] = "on"; });
    return hero_stats;
}
function react_to_hero_selector_changes() {
    var selector = document.getElementById("select_char");
    get_and_load_into_form(selector.value);
}
function get_and_load_into_form(hero_name) {
    var hero = get_hero_from_storage(hero_name);
    //TODO: blank fields
    //location.reload(true); not working
    clear_all_fields();
    load_hero_data_into_form(hero);
}
function load_hero_data_into_form(hero) {
    //TODO: treat weapons differently
    //TODO: restore checkboxes
    console.log(hero);
    for (var k in hero) {
        if (hero[k] == "on") {
            set_checkbox(k);
        }
        else {
            if (k != "Waffen" && k != "weapons")
                display_value(k, hero[k]);
            if (k === "Waffen") {
                var w = hero["Waffen"];
                console.log(w);
                for (var waffe in w) {
                    console.log(w[waffe]);
                    var w_form = add_new_weapon();
                    w_form.querySelector("#Waffe").value = w[waffe]["Waffe"];
                    w_form.querySelector("#Bonus").value = w[waffe]["Bonus"];
                    w_form.querySelector("#SchadenUndArt").value = w[waffe]["SchadenUndArt"];
                }
            }
        }
    }
}
function display_value(key, value) {
    var input = document.getElementById(key);
    //console.log(key,value);
    input.value = value;
}
function set_checkbox(key) {
    var checkbox = document.getElementById(key);
    checkbox.checked = true;
}
function display_hero_data() {
    var display = document.getElementById("json_export_field");
    display.innerHTML = JSON.stringify(get_hero_data_from_form());
}
// function prepare_download() {
//     //blog shinglyu.com 2019/02/09
//     var link = document.getElementById("export");
//     link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(get_hero_data_from_form())));
//     link.setAttribute('download', "test.json");
//     link.innerText = "download";
//     //link.style.display = 'none';
//     //var export_div = document.getElementById("export");
//     //export_div.appendChild(link);
//     link.click();
//     //export_div.removeChild(link);
//     //download
//     //var text = JSON.stringify(get_hero_data_from_form());
//     //    var data = new Blob([text],{type: 'application/json'});
//     //    var url = window.URL.createObjectURL(data);
//     //    var anchor:any = document.getElementById('download_link');
//     //    anchor.href = url;
// }
//(function() {
//// 'global' variable to store reference to the database
//var db;
//databaseOpen(function() {
//alert("The database has been opened");
//});
//function databaseOpen(callback) {
//// Open a database, specify the name and version
//var version = 1;
//var request = indexedDB.open('heroes', version);
//// Run migrations if necessary
//request.onupgradeneeded = function(e:any) {
//db = e.target.result;
//e.target.transaction.onerror = databaseError;
//db.createObjectStore('heroes', { keyPath: 'timeStamp' });
//};
//request.onsuccess = function(e:any) {
//db = e.target.result;
//callback();
//};
//request.onerror = databaseError;
//}
//function databaseError(e) {
//console.error('An IndexedDB error has occurred', e);
//}
//}());
function store_hero(hero) {
    localStorage.setItem(hero.Name, JSON.stringify(hero));
    var heroes = localStorage.getItem("heroes");
    if (!heroes) {
        localStorage.setItem("heroes", JSON.stringify([hero.Name]));
    }
    else {
        var hero_list = JSON.parse(heroes);
        if (!hero_list.includes(hero.Name)) {
            hero_list.push(hero.Name);
        }
        localStorage.setItem("heroes", JSON.stringify(hero_list));
    }
}
function delete_hero_from_storage_and_refresh(hero) {
    var heroes = localStorage.getItem("heroes");
    var hero_list = JSON.parse(heroes);
    localStorage.setItem("heroes", JSON.stringify(hero_list.splice(hero_list.indexOf(hero.name), 1)));
    localStorage.removeItem(hero.Name);
    refresh_hero_selector();
    clear_all_fields();
}
function store_current_hero_and_refresh() {
    store_hero(get_hero_data_from_form());
    refresh_hero_selector();
}
function get_hero_from_storage(hero_name) {
    return JSON.parse(localStorage.getItem(hero_name));
}
function get_list_of_stored_heroes() {
    return JSON.parse(localStorage.getItem("heroes"));
}
function append_hero_selector() {
    var selector = selection_list(get_list_of_stored_heroes(), "Charakter auswählen", "select_char");
    selector.onchange = react_to_hero_selector_changes;
    var save_button = document.getElementById("speichern");
    document.getElementById("upper_left_box").insertBefore(selector, save_button);
}
function refresh_hero_selector() {
    var box = document.getElementById("upper_left_box");
    var selector = document.getElementById("select_char");
    box.removeChild(selector);
    append_hero_selector();
}
function remove_weapon_fields() {
    var weapons = Array.prototype.slice.call(document.querySelectorAll('#Waffe'));
    weapons.forEach(function (element) {
        var weapon_div_node = element.parentNode.parentNode;
        var weapon_div_parent_node = weapon_div_node.parentNode;
        weapon_div_parent_node.removeChild(weapon_div_node);
    });
}
function all_checkboxes() {
    var chkbx = Array.prototype.slice.call(document.querySelectorAll('[id]'));
    return chkbx.filter(function (x) { return x.type == "checkbox"; });
}
function clear_all_fields() {
    remove_weapon_fields();
    var ids = Array.prototype.slice.call(document.querySelectorAll('[id]'));
    var checkboxes = ids.filter(function (x) { return x.type == "checkbox"; });
    checkboxes.forEach(function (element) {
        element.checked = false;
    });
    var small_fields = ids.filter(function (x) { return x.size == 2; });
    small_fields.forEach(function (element) {
        element.value = "";
    });
    var textareas = ids.filter(function (x) { return x.tagName == "TEXTAREA"; });
    textareas.forEach(function (element) { return element.value = element.id; });
    var normal_input = ids.filter(function (x) { return x.tagName == "INPUT"; })
        .filter(function (x) { return x.size != 2; });
    normal_input.forEach(function (element) { return element.value = element.id; });
}
