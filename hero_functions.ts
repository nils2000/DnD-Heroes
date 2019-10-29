'use strict';

function update_hero(hero,item:string,value:string){
    hero[item]=value;
    console.log(hero);
    }
    
function update_hero_class_changed(hero,class_number:number,class_name:string,class_level:number){
    if (typeof hero["classes"] == 'undefined'){hero["classes"] = Object();};
    if (typeof hero["classes"][class_number] == 'undefined'){hero["classes"][class_number] = Object();};
    hero["classes"][class_number]["name"] = class_name;
    hero["classes"][class_number]["level"] = class_level;
    console.log(hero);
    }
