'use strict';

//Form Construction

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

function labeled_input_fields(names: string[]) {
    return names.map(labeled_input);
}

function append_labeled_input_field(name: string, html_element_id: string) {
    document.getElementById(html_element_id).appendChild(labeled_input(name));
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
    let weapon_damage_field = named_input_field("Schaden/Art", 15);
    weapon_damage_field.className = "weapon_damage";
    weapon_div.appendChild(weapon_name_field);
    weapon_div.appendChild(weapon_bonus_field);
    weapon_div.appendChild(weapon_damage_field);
    return weapon_div;
}

function add_new_weapon() {
    document.getElementById("weapons").appendChild(weapon_stats_inputfields());
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
    let skill_div = document.getElementById("skills");
    for (let i = 0; i < inputs.length; i++) {
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
            hero_stats[element.id] = element.value;
        }
    });
    return hero_stats;
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
