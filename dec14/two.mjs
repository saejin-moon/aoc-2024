import fs from "fs/promises";
import { createCanvas } from 'canvas';

(async () => {
    const file = (await fs.readFile("input.txt", "utf-8")).trim();

    const lines = file.split("\n");
    const points = lines.map(line => line.match(/p=(-?\d+),(-?\d+)/).slice(1).map(Number));
    const velocities = lines.map(line => line.match(/v=(-?\d+),(-?\d+)/).slice(1).map(Number));
    const height = Math.max(...points.map(p => p[1])) - Math.min(...points.map(p => p[1])) + 1;
    const width = Math.max(...points.map(p => p[0])) - Math.min(...points.map(p => p[0])) + 1;

    for(let j = 0; j < 10000; j++) {
        for(let i = 0; i < points.length; i++) {
            const vel = velocities[i];
            points[i][0] += vel[0];
            points[i][1] += vel[1];
            points[i][0] %= width;
            points[i][1] %= height;
            if(points[i][0] < 0) points[i][0] += width;
            if(points[i][1] < 0) points[i][1] += height;
        }
        const canvas = createCanvas(width * 10, height * 10);
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points.forEach(([x, y]) => {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * 10, y * 10, 10, 10);
        });

        const buffer = canvas.toBuffer('image/png');
        await fs.writeFile(`frame_${j}.png`, buffer);
    }
})()