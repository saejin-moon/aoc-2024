import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf8")).trim();
    let nums = file.split(' ').map(Number)
    for(let _ = 25; _--;){
        let arr = [];
        for(let i = 0; i < nums.length; i++){
            let num = nums[i];
            let str = num.toString();
            if(num === 0){
                arr.push(1);
            }
            else if(str.length % 2 === 0){
                arr.push(+str.slice(0, str.length / 2));
                arr.push(+str.slice(str.length / 2));
            }
            else {
                arr.push(num * 2024);
            }
        }
        nums = arr;
    }
    console.log(nums.length);
})()