use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut map: Vec<Vec<char>> = fs::read_to_string("./input.txt")?
        .lines()
        .map(|line| line.chars().collect())
        .collect();

    let dirs = [
        ('^', (0, -1), (1, 0)),
        ('v', (0, 1), (-1, 0)),
        ('<', (-1, 0), (0, -1)),
        ('>', (1, 0), (0, 1)),
    ];

    let (mut y, mut x, mut dir) = map.iter().enumerate().find_map(|(i, row)| {
        row.iter().enumerate().find_map(|(j, &c)| {
            if "^v<>".contains(c) {
                Some((i, j, c))
            } else {
                None
            }
        })
    }).unwrap();

    let mut steps = 1;
    loop {
        map[y][x] = '+';
        let &(_, (dx, dy), (tx, ty)) = dirs.iter().find(|&&(d, _, _)| d == dir).unwrap();
        let (nx, ny) = (x as isize + dx, y as isize + dy);
        if ny < 0 || ny >= map.len() as isize || nx < 0 || nx >= map[0].len() as isize {
            break;
        }
        match map[ny as usize][nx as usize] {
            '#' => dir = dirs.iter().find(|&&(_, (dx, dy), _)| dx == tx && dy == ty).unwrap().0,
            _ => {
                x = nx as usize;
                y = ny as usize;
                if map[y][x] != '+' {
                    steps += 1;
                }
            }
        }
    }
    println!("{}", steps);
    Ok(())
}
