'use strict';

function named_input(name: string) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.id = name;
    input.name = name;
    input.size = 2;
    label.htmlFor = name;
    label.innerText = name;
    label.appendChild(input);
    return label;
}

function named_input_fields(names: string[]) {
    return names.map(named_input);
}

function append_named_input_field(name: string, html_element_id: string) {
    document.getElementById(html_element_id).appendChild(named_input(name));
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
    let inputs = named_input_fields(skills);
    let skill_div = document.getElementById("skills");
    for (let i = 0; i < inputs.length; i++) {
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