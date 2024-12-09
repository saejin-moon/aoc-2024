import fs from "fs/promises";

(async function main () {
    const file = (await fs.readFile("input.txt", "utf-8")).trim();
    let sum = 0;    
    file.split("\n").forEach(line => {
        let [res, nums] = line.split(": ");
        res = Number(res);
        nums = nums.split(" ").map(Number);
        const numOps = nums.length - 1;
        for (let i = 0; i < 1 << numOps; i++) {
            let value = nums[0];
            for (let j = 0; j < numOps; j++) {
                if ( (i >> j) & 1 ) {
                    value += nums[j + 1];
                } else {
                    value *= nums[j + 1];
                }
            }
            if (value === res) {
                sum += res;
                break;
            }
        }
    });
    console.log(sum);
})();
