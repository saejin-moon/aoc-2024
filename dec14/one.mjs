import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf-8")).trim();

    const lines = file.split("\n");
    const points = lines.map(line => line.match(/p=(-?\d+),(-?\d+)/).slice(1).map(Number));
    const velocities = lines.map(line => line.match(/v=(-?\d+),(-?\d+)/).slice(1).map(Number));
    const height = Math.max(...points.map(p => p[1])) - Math.min(...points.map(p => p[1])) + 1;
    const width = Math.max(...points.map(p => p[0])) - Math.min(...points.map(p => p[0])) + 1;
    const heightMedian = Math.floor(height / 2);
    const widthMedian = Math.floor(width / 2);
    const quads = [ 0, 0, 0, 0 ];

    for(let i = 0; i < points.length; i++) {
        const vel = velocities[i];
        for(let j= 0; j < 100; j++){
            points[i][0] += vel[0];
            points[i][1] += vel[1];
            points[i][0] %= width;
            points[i][1] %= height;
            if(points[i][0] < 0) points[i][0] += width;
            if(points[i][1] < 0) points[i][1] += height;
        }
        if(points[i][0] < widthMedian && points[i][1] < heightMedian) quads[0]++;
        else if(points[i][0] > widthMedian && points[i][1] < heightMedian) quads[1]++;
        else if(points[i][0] < widthMedian && points[i][1] > heightMedian) quads[2]++;
        else if(points[i][0] > widthMedian && points[i][1] > heightMedian) quads[3]++;
    }
    const res = quads.reduce((a, b) => a * b, 1);
    console.log(res);
})()