'use strict';

//Form Construction

function get_element(id: string) {
    return document.getElementById(id);
}

function named_input(name: string, size: number) {
    let input = document.createElement("input");
    input.id = name;
    input.size = size;
    input.name = name;
    return input;
}

function labeled_input(name: string) {
    let label = document.createElement("label");
    let input = named_input(name, 2);
    label.htmlFor = name;
    label.innerText = name;
    label.appendChild(input);
    return label;
}

function checkbox(name: string) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = name;
    checkbox.value = name;
    checkbox.checked = false;
    return checkbox;
}

function labeled_input_fields(names: string[]) {
    return names.map(labeled_input);
}

function checkboxes_for_labeld_input_fields(names: string[]) {
    return names.map(checkbox);
}

function append_labeled_input_field(name: string, html_element_id: string) {
    document.getElementById(html_element_id).appendChild(labeled_input(name));
}

function button(name: string, click_function: any) {
    var new_button = document.createElement("button");
    new_button.innerHTML = name;
    new_button.onclick = click_function;
    new_button.id = name;
    return new_button;
}

function append_button(name: string, click_function: any, target_div_name: string) {
    var new_button = button(name, click_function);
    document.getElementById(target_div_name).appendChild(new_button);
}

function named_textarea(name: string, rows: number) {
    let span = document.createElement("span");
    let textarea = document.createElement("textarea");
    span.title = name;
    textarea.id = name;
    textarea.innerText = name;
    textarea.rows = rows;
    span.appendChild(textarea);
    return span;
}

function selection_list(items: string[], first_option: string, id: string) {
    var selection = document.createElement("select");
    if (id) selection.id = id;
    if (first_option) {
        append_option(selection, first_option)
    }
    if (items) {
        for (var i = 0; i < items.length; i++) {
            append_option(selection, items[i])
        }
    }
    return selection;
}

function append_option(selection: any, item: string) {
    var option = document.createElement("option");
    option.text = item;
    selection.appendChild(option);
}

function append_named_textarea(name: string, rows: number, html_element_id: string) {
    document.getElementById(html_element_id).appendChild(named_textarea(name, rows));
}

function named_input_field(name: string, size: number) {
    let input = named_input(name, size);
    input.value = name;
    let span = document.createElement("span");
    span.title = name;
    span.appendChild(input);
    return span;
}

function weapon_stats_inputfields() {
    let weapon_num = Date.now();
    let weapon_div: any = document.createElement("div");
    weapon_div.id = weapon_num;
    let weapon_name_field = named_input_field("Waffe", 15);
    weapon_name_field.className = "weapon_name";
    let weapon_bonus_field = named_input_field("Bonus", 5);
    weapon_bonus_field.className = "weapon_bonus";
    let weapon_damage_field = named_input_field("SchadenUndArt", 15);
    weapon_damage_field.className = "weapon_damage";
    weapon_div.appendChild(weapon_name_field);
    weapon_div.appendChild(weapon_bonus_field);
    weapon_div.appendChild(weapon_damage_field);
    return weapon_div;
}

function table_row(list: any[]) {
    var row = document.createElement("tr");
    for (var k in list) {
        var data = table_data(list[k]);
        row.appendChild(data);
    }
    return row;
}

function table_data(item: any) {
    var td = document.createElement("td");
    td.appendChild(item);
    return td;
}

function attribute_table_row(attr: string) {
    var bez = document.createTextNode(attr);
    var inp = named_input(attr, 2);
    var mod = div(attr + "Modifikator");
    var bonus = div(attr + "Bonus");
    inp.onchange = generate_update_function_watch_input_change_div(attr, attr + "Bonus", attribute_bonus);
    var trained = checkbox(attr + "RWTrainiert");
    var rw = div(attr + "RW");
    var rw_mod = div(attr + "RWMod");
    return table_row([bez, inp, mod, bonus, trained, rw, rw_mod]);
}

function append_table_row(row: any, table_id: string) {
    var table = document.getElementById(table_id);
    table.appendChild(row);
}

function div(id: string) {
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
    let skills = [
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
    let inputs = labeled_input_fields(skills);
    var checkbox_names = skills.map(n => n + "_trainiert");
    var checkboxes = checkboxes_for_labeld_input_fields(checkbox_names);
    let skill_div = document.getElementById("skills");
    for (let i = 0; i < inputs.length; i++) {
        skill_div.appendChild(checkboxes[i]);
        skill_div.appendChild(inputs[i]);
        skill_div.appendChild(document.createElement("br"));
    }
}

function insert_race_selector() {
    var races = ["Volk", "Hochelf", "Waldelf", "Dunkelelf",
        "Halbling(Leichtfuß)", "Halbling(Stämmig)", "Mensch",
        "Gebirgszwerg", "Hügelzwerg",
        "Drachenblütig", "Felsengnom", "Waldgnom",
        "Halbelf", "Halbork", "Tiefling"];
    var selector = selection_list(races, "", "race_selector");
    get_element("race_selector_box").appendChild(selector);
}

insert_race_selector();
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

get_element("save_blank_and_delete_row").appendChild(table_data(button("speichern", store_current_hero_and_refresh)));
get_element("save_blank_and_delete_row").appendChild(table_data(button("Felder zurück setzen", clear_all_fields)));
get_element("save_blank_and_delete_row").appendChild(table_data(button("Held löschen", delete_hero_from_storage_and_refresh)));


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
                if (!hero_stats["Waffen"]) hero_stats["Waffen"] = Object();
                if (!hero_stats["Waffen"][weapon_id]) hero_stats["Waffen"][weapon_id] = Object();
                hero_stats["Waffen"][weapon_id][element.id] = element.value;
                console.log(hero_stats["Waffen"][weapon_id]);
            }
            else

                if (element.value != "" && element.value != element.id)
                    if (element.type != "checkbox" || element.checked)
                        hero_stats[element.id] = element.value;

        }
    });
    var checked_checkboxes = all_checkboxes().filter(x => x.checked);
    checked_checkboxes.forEach(x => hero_stats[x.id] = "on");
    var race_selector: any = get_element("race_selector");
    hero_stats["Volk"] = race_selector.value;
    return hero_stats;
}

function react_to_hero_selector_changes() {
    var selector: any = document.getElementById("select_char");
    get_and_load_into_form(selector.value);
}

function get_and_load_into_form(hero_name: string) {
    var hero = get_hero_from_storage(hero_name);
    //TODO: blank fields
    //location.reload(true); not working
    clear_all_fields();
    load_hero_data_into_form(hero);
}

function load_hero_data_into_form(hero: any) {
    //TODO: treat weapons differently
    //TODO: restore checkboxes
    console.log(hero);
    for (var k in hero) {
        if (k == "Volk") {
            var race_selector: any = get_element("race_selector");
            race_selector.value = hero[k];
        } else
            if (hero[k] == "on") { set_checkbox(k); } else {
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

function display_value(key: string, value: string) {
    var input: any = document.getElementById(key);
    //console.log(key,value);
    input.value = value;
}

function set_checkbox(key: string) {
    var checkbox: any = document.getElementById(key);
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

function store_hero(hero: any) {
    localStorage.setItem(hero.Name, JSON.stringify(hero));
    var heroes = localStorage.getItem("heroes");
    if (!heroes) { localStorage.setItem("heroes", JSON.stringify([hero.Name])); }
    else {
        var hero_list = JSON.parse(heroes);
        if (!hero_list.includes(hero.Name)) {
            hero_list.push(hero.Name);
        }
        localStorage.setItem("heroes", JSON.stringify(hero_list));
    }
}

function delete_hero_from_storage_and_refresh() {
    var selector: any = document.getElementById("select_char");
    var hero_name = selector.value;
    var heroes = localStorage.getItem("heroes");
    var hero_list = JSON.parse(heroes);
    var index = hero_list.indexOf(hero_name);
    hero_list.splice(index, 1);
    localStorage.setItem("heroes", JSON.stringify(hero_list));
    localStorage.removeItem(hero_name);
    clear_all_fields();
    refresh_hero_selector();
}

function store_current_hero_and_refresh() {
    store_hero(get_hero_data_from_form());
    refresh_hero_selector();
}

function get_hero_from_storage(hero_name: string) {
    return JSON.parse(localStorage.getItem(hero_name));
}

function get_list_of_stored_heroes() {
    return JSON.parse(localStorage.getItem("heroes"));
}

function append_hero_selector() {
    var selector: any = selection_list(get_list_of_stored_heroes(), "Charakter auswählen", "select_char");
    selector.onchange = react_to_hero_selector_changes;
    get_element("selector_box").appendChild(selector);
}

function refresh_hero_selector() {
    var box = document.getElementById("selector_box");
    var selector = document.getElementById("select_char");
    box.removeChild(selector);
    append_hero_selector();
}

//form logic

function generate_update_function_watch_input_change_div(input_field: string, output_div: string, modifier_func: any) {
    return () => {
        var input: any = get_element(input_field);
        var output: any = get_element(output_div);
        output.innerHTML = modifier_func(input.value);
    }
}

function remove_weapon_fields() {
    var weapons = Array.prototype.slice.call(document.querySelectorAll('#Waffe'));
    weapons.forEach(element => {
        var weapon_div_node = element.parentNode.parentNode;
        var weapon_div_parent_node = weapon_div_node.parentNode;
        weapon_div_parent_node.removeChild(weapon_div_node);
    });
}

function all_checkboxes() {
    var chkbx = Array.prototype.slice.call(document.querySelectorAll('[id]'));
    return chkbx.filter(x => x.type == "checkbox");
}

function clear_all_fields() {
    remove_weapon_fields();
    var ids = Array.prototype.slice.call(document.querySelectorAll('[id]'));

    var checkboxes = ids.filter(x => x.type == "checkbox");
    checkboxes.forEach(element => {
        element.checked = false;
    });

    var small_fields = ids.filter(x => x.size == 2);
    small_fields.forEach(element => {
        element.value = "";
    });

    var textareas = ids.filter(x => x.tagName == "TEXTAREA");
    textareas.forEach(element => element.value = element.id);

    var normal_input = ids.filter(x => x.tagName == "INPUT")
        .filter(x => x.size != 2);
    normal_input.forEach(element => element.value = element.id);

    var race_selector: any = get_element("race_selector");
    race_selector.value = "Volk";
}

//document logic
//attribute bonuses
function attribute_bonus(attribute_value: number) {
    return Math.floor((attribute_value - 10) / 2);
}