'use strict';
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
