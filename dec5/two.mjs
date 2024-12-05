import fs from "fs/promises";

(async function () {
    let file = (await fs.readFile("./input.txt", "utf-8")).trim().replaceAll("\r", "").split("\n\n");
    let lookups = file[1].split("\n");
    let rules = new Map();
    file[0].split("\n").map(rule => {
        let [key, value] = rule.split("|").map(Number);
        rules.get(key) ? rules.get(key).push(value) : rules.set(key, [value]);
    });
    let sum = lookups.map(l => l.split(",").map(Number)).filter(nums => {
        let past = [nums[0]];
        for(let i = 1; i < nums.length; i++){
            let num = nums[i];
            if(!rules.get(num)) continue;
            if(!rules.get(past[past.length - 1]).includes(num)) return true;
            if(past.some(n => rules.get(num).includes(n))) return true;
            past.push(num);
        }
        return false;
        }).map(el => el.sort((a, b) => {
            if(rules.get(a).includes(b)) return -1;
            else if(rules.get(b).includes(a)) return 1;
            else return 0;
        })).reduce((a, arr) => a + arr[(arr.length / 2) | 0], 0);

    console.log(sum);
})()