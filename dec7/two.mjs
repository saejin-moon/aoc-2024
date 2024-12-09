import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf-8")).trim();
    let sum = 0;    
    file.split("\n").forEach(line => {
        let [res, nums] = line.split(": ");
        res = Number(res);
        nums = nums.split(" ").map(Number);
        for (let i = 0, len = nums.length - 1; i < 3 ** len; i++) {
            let value = nums[0];
            let currentI = i;
            for (let j = 0; j < len; j++) {
                const op = currentI % 3;
                currentI = (currentI / 3) | 0;
                if (op === 0) {
                    value += nums[j + 1];
                } else if (op === 1) {
                    value *= nums[j + 1];
                } else {
                    value = +(String(value) + String(nums[j + 1]));
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
