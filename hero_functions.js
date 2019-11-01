'use strict';
function get_old_heroes() {
    if (localStorage.heroes)
        return JSON.parse(localStorage.heroes);
    else
        return [];
}
function hero(name) {
    return JSON.parse(localStorage[name]);
}
function get_hero_data_from_form() {
    var hero_stats = Object();
    var stat_names = ["charname", "charrace", "chardescription", "strength", "dexterity", "constitution",
        "intelligence", "wisdom", "charisma", "hitpoints"];
    for (var i = 0; i < stat_names.length; i++) {
        var input_field = document.getElementById(stat_names[i]);
        hero_stats[stat_names[i]] = input_field.value;
    }
    hero_stats["classes"] = get_classes_from_form();
    return hero_stats;
}
function get_classes_from_form() {
    var classes = Object();
    var classes_div = document.getElementById("classes");
    for (var i = 4; i <= classes_div.childNodes.length; i++) {
        var cinput = document.getElementById("class_" + i);
        var sinput = document.getElementById("stufe_" + i);
        classes[cinput.value] = sinput.value;
    }
    return classes;
}
function store_hero_data_on_client(hero) {
    //test if hero is allready registered (name is stored under localStorage.heroes)
    localStorage[hero.name] = JSON.stringify(hero);
}
function hero_selection_menue() {
    var heroes = get_old_heroes();
    heroes.push("neuer Held");
    return selection_menue(heroes);
}
function selection_menue(values) {
    var selectList = document.createElement("select");
    for (var i = 0; i < values.length; i++) {
        var option = document.createElement("option");
        option.value = values[i];
        option.text = values[i];
        selectList.appendChild(option);
    }
    return selectList;
}
function update_hero(hero, item, value) {
    hero[item] = value;
    console.log(hero);
}
function update_hero_class_changed(hero, class_number, class_name, class_level) {
    if (typeof hero["classes"] == 'undefined') {
        hero["classes"] = Object();
    }
    ;
    if (typeof hero["classes"][class_number] == 'undefined') {
        hero["classes"][class_number] = Object();
    }
    ;
    hero["classes"][class_number]["name"] = class_name;
    hero["classes"][class_number]["level"] = class_level;
    console.log(hero);
}
function view_add_new_class() {
    var class_div = document.getElementById("classes");
    var new_div = document.createElement("div");
    new_div.innerHTML = '<label for="class_1_name">Klasse: <input id="class_1_name" name="class_1_name" onchange="update_hero_class_changed(hero_data,1,class_1_name.value,class_1_level.value)"></label><label for="class_1_level">Stufe:<input id="class_1_level" name="class_1_level" onchange="update_hero_class_changed(hero_data,1,class_1_name.value,class_1_level.value)"></label>';
    class_div.appendChild(new_div);
}
//when class input field is empty it shall be removed from the form
function delete_class_and_level_field(class_input_field) {
    console.log(div_containing_class_and_level(class_input_field));
}
//helper funtion to get the div containing both the class name input field 
//and the corresponding level input field
function div_containing_class_and_level(class_name_input_field) {
    return class_name_input_field.parentNode.parentNode;
}
//https://stackoverflow.com/questions/17001961/how-to-add-drop-down-list-select-programmatically
function create_class_selector_and_level_field() {
    var classes_div = document.getElementById("classes");
    var class_div = document.createElement("div");
    classes_div.appendChild(class_div);
    var classes = ["Barbar", "Barde", "Druide", "Hexenmeister",
        "Kämpfer", "Kleriker", "Magier", "Mönch",
        "Paladin", "Schurke", "Waldläufer", "Zauberer", "löschen"];
    var selectList = selection_menue(classes);
    var class_number = classes_div.childNodes.length;
    selectList.id = "class_" + class_number;
    class_div.appendChild(selectList);
    var label = document.createElement("label");
    label.innerHTML = "Stufe";
    class_div.appendChild(label);
    var input = document.createElement("input");
    input.type = "number";
    input.id = "stufe_" + class_number;
    label.appendChild(input);
}
//document.querySelector('#add_class').addEventListener('click', add_new_class);
var hero_form = document.getElementById("hero_stats");
hero_form.insertBefore(hero_selection_menue(), hero_form.childNodes[0]);
document.getElementById('add_class').addEventListener('click', create_class_selector_and_level_field);
