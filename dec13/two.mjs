import fs from "fs/promises";
import { Decimal } from "decimal.js";
Decimal.set({ precision: 20, rounding: 8 });

(async () => {
    const file = (await fs.readFile("input.txt")).toString();
    let tokens = 0;
    const machines = [];
    file.split("\n\n").map(line => line.split("\n")).forEach(([a, b, p]) => {
        const aX = new Decimal(a.match(/X\+(\d+)/)[1]);
        const aY = new Decimal(a.match(/Y\+(\d+)/)[1]);
        const bX = new Decimal(b.match(/X\+(\d+)/)[1]);
        const bY = new Decimal(b.match(/Y\+(\d+)/)[1]);
        const pX = new Decimal(p.match(/X=(\d+)/)[1]).add("10000000000000");
        const pY = new Decimal(p.match(/Y=(\d+)/)[1]).add("10000000000000");
        machines.push({ aX, aY, bX, bY, pX, pY });
    });

    for (const machine of machines) {
        const { aX, aY, bX, bY, pX, pY } = machine;
        const a = aX.div(aY).neg();
        const yFactor = a.mul(bY).add(bX);
        const y = pY.mul(a).add(pX).div(yFactor).mul(1000).round().div(1000);
        const x = pX.sub(bX.mul(y)).div(aX).mul(1000).round().div(1000);
        if(x.isInt() && y.isInt()) tokens += 3 * x.toNumber() + y.toNumber();
    }
    console.log(tokens);
})();