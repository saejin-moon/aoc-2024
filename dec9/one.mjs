import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf-8")).trim();
    let str = ""
    let id = 48
    for (let i = 0; i < file.length; i += 2) {
        str += String.fromCharCode(id++).repeat(file[i]);
        str += ".".repeat(file[i + 1]);
    }
    str = str.split("")
    for(let i = 0; i < str.length; i++){
        if(str[i] === "." && findEnd(str) >= i){
            let j = findEnd(str);
            let copy = str[j];
            str[j] = ".";
            str[i] = copy;
        }
    }
    let sum = str.filter(el => el !== ".").reduce((a, b, i) => a + i * (b.charCodeAt(0) - 48), 0);
    console.log(sum);
})()

function findEnd(str){
    for(let i = str.length; i--;){
        if(str[i] !== "."){
            return i;
        }
    }
}