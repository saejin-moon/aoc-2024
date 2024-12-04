use std::fs;

fn main () -> Result<(), Box<dyn std::error::Error>> {
    let file = fs::read_to_string("./input.txt")?;
    let mut text = file.trim().lines();
    let mut count = 0;
    let directions: [(i32, i32); 4] = [(-1, -1), (-1, 1), (1, -1), (1, 1)];
    
    for (i, line) in text.clone().enumerate() {
        for (j, character) in line.chars().enumerate() {
            if character == 'M' {
                for (dx, dy) in directions.iter() {
                    if find(&mut text, dx, dy, j, i, 0) {
                        if find(&mut text, &-dx, dy, ((j as i32) + 2 * dx) as usize, i, 0) {
                            count += 1;
                        }
                        if find(&mut text, dx, &-dy, j, ((i as i32) + 2 * dy) as usize, 0) {
                            count += 1;
                        }
                    }
                }
            }
        }
    }
    
    println!("{}", count / 2);
    Ok(())
}

fn find(text: &mut std::str::Lines, dx: &i32, dy: &i32, x: usize, y: usize, i: i32) -> bool {
    let binding = "MAS".to_string();
    let string = binding.chars();
    if i == string.clone().count() as i32 {
        return true;
    }
    let x = x as i32;
    let y = y as i32;
    if x < 0 || y < 0 || x >= text.clone().nth(0).unwrap().len() as i32 || y >= text.clone().collect::<Vec<_>>().len() as i32 {
        return false;
    }
    if text.clone().nth(y as usize).unwrap().as_bytes()[x as usize] as char != string.clone().nth(i as usize).unwrap() {
        return false;
    }
    return find(text, dx, dy, (x + dx) as usize, (y + dy) as usize, i + 1);
}