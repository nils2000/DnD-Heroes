'use strict';
//Form Construction
function named_input(name) {
    var label = document.createElement("label");
    var input = document.createElement("input");
    input.id = name;
    input.name = name;
    input.size = 2;
    label.htmlFor = name;
    label.innerText = name;
    label.appendChild(input);
    return label;
}
function named_input_fields(names) {
    return names.map(named_input);
}
function append_named_input_field(name, html_element_id) {
    document.getElementById(html_element_id).appendChild(named_input(name));
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
function append_named_textarea(name, rows, html_element_id) {
    document.getElementById(html_element_id).appendChild(named_textarea(name, rows));
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
    var inputs = named_input_fields(skills);
    var skill_div = document.getElementById("skills");
    for (var i = 0; i < inputs.length; i++) {
        skill_div.appendChild(inputs[i]);
        skill_div.appendChild(document.createElement("br"));
    }
}
add_skills();
append_named_textarea("weitere Übung und Sprachen", 12, "practice_and_languages");
append_named_textarea("Persönlichkeitsmerkmale", 5, "personality");
append_named_textarea("Ideale", 5, "ideals");
append_named_textarea("Bindungen", 5, "ties");
append_named_textarea("Makel", 5, "taint");
append_named_textarea("Merkmale", 40, "characteristics");
append_named_input_field("RK", "combat_stats");
append_named_input_field("Initiative", "combat_stats");
append_named_input_field("Bewegung", "combat_stats");
document.getElementById("combat_stats").appendChild(document.createElement("br"));
append_named_input_field("TP max", "combat_stats");
append_named_input_field("TP", "combat_stats");
append_named_input_field("TP temp", "combat_stats");
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
function prepare_download() {
    //blog shinglyu.com 2019/02/09
    var link = document.createElement('a');
    link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(get_hero_data_from_form())));
    link.setAttribute('download', "test.json");
    link.style.display = 'none';
    var export_div = document.getElementById("export");
    export_div.appendChild(link);
    link.click();
    export_div.removeChild(link);
    //download
    //var text = JSON.stringify(get_hero_data_from_form());
    //    var data = new Blob([text],{type: 'application/json'});
    //    var url = window.URL.createObjectURL(data);
    //    var anchor:any = document.getElementById('download_link');
    //    anchor.href = url;
}
