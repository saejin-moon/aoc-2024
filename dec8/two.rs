use std::fs;
use std::collections::{HashMap, HashSet};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let content = fs::read_to_string("./input.txt")?;
    let file = content.trim();
    let lines: Vec<&str> = file.split('\n').collect();
    let mut map: HashMap<char, Vec<(usize, usize)>> = HashMap::new();

    for (i, line) in lines.iter().enumerate() {
        for (j, ch) in line.chars().enumerate() {
            if ch != '.' {
                map.entry(ch).or_insert_with(Vec::new).push((j, i));
            }
        }
    }

    let mut set: HashSet<String> = HashSet::new();
    let max_x = lines[0].len();
    let max_y = lines.len();

    for (_ch, entries) in &map {
        for i in 0..entries.len() {
            for j in 0..entries.len() {
                if i != j {
                    let dx = entries[i].0 as isize - entries[j].0 as isize;
                    let dy = entries[i].1 as isize - entries[j].1 as isize;
                    let mut px = entries[i].0 as isize;
                    let mut py = entries[i].1 as isize;

                    while px >= 0 && px < max_x as isize && py >= 0 && py < max_y as isize {
                        set.insert(format!("{},{}", px, py));
                        px += dx;
                        py += dy;
                    }

                    px = entries[i].0 as isize;
                    py = entries[i].1 as isize;

                    while px >= 0 && px < max_x as isize && py >= 0 && py < max_y as isize {
                        set.insert(format!("{},{}", px, py));
                        px -= dx;
                        py -= dy;
                    }
                }
            }
        }
    }

    println!("{}", set.len());

    Ok(())
}