use std::fs;
use std::collections::{HashMap, HashSet};

fn main() {
    let file = fs::read_to_string("input.txt").expect("Failed to read file").trim().to_string();
    let lines: Vec<&str> = file.lines().collect();
    let mut map: HashMap<char, Vec<(isize, isize)>> = HashMap::new();

    for (i, line) in lines.iter().enumerate() {
        for (j, ch) in line.chars().enumerate() {
            if ch != '.' {
                map.entry(ch).or_insert(Vec::new()).push((j as isize, i as isize));
            }
        }
    }

    let mut set: HashSet<(isize, isize)> = HashSet::new();
    let max_x = lines[0].len() as isize;
    let max_y = lines.len() as isize;

    for positions in map.values() {
        for i in 0..positions.len() {
            for j in 0..positions.len() {
                if i != j {
                    let (x1, y1) = positions[i];
                    let (x2, y2) = positions[j];

                    let x = x1 + (x1 - x2);
                    let y = y1 + (y1 - y2);

                    if x >= 0 && x < max_x && y >= 0 && y < max_y {
                        set.insert((x, y));
                    }
                }
            }
        }
    }

    println!("{}", set.len());
}