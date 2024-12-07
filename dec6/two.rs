use std::fs;
use std::collections::{HashSet};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let file = fs::read_to_string("./input.txt")?;
    let map: Vec<Vec<char>> = file.trim().lines().map(|line| line.chars().collect()).collect();

    #[derive(Copy, Clone, Eq, PartialEq, Hash)]
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    impl Direction {
        fn delta(self) -> (isize, isize) {
            match self {
                Direction::Up => (0, -1),
                Direction::Down => (0, 1),
                Direction::Left => (-1, 0),
                Direction::Right => (1, 0),
            }
        }

        fn turn(self) -> Direction {
            match self {
                Direction::Up => Direction::Right,
                Direction::Right => Direction::Down,
                Direction::Down => Direction::Left,
                Direction::Left => Direction::Up,
            }
        }

        fn from_char(c: char) -> Option<Direction> {
            match c {
                '^' => Some(Direction::Up),
                'v' => Some(Direction::Down),
                '<' => Some(Direction::Left),
                '>' => Some(Direction::Right),
                _ => None,
            }
        }
    }

    let height = map.len();
    let width = map[0].len();

    let initial_y = map.iter().position(|row| row.contains(&'^')).expect("No '^' found");
    let initial_x = map[initial_y].iter().position(|&c| c == '^').unwrap();
    let initial = (initial_x, initial_y);

    let initial_direction = Direction::from_char(map[initial_y][initial_x]).unwrap();

    let mut map_marks = vec![vec![' '; width]; height];
    let mut x = initial_x;
    let mut y = initial_y;
    let mut direction = initial_direction;

    loop {
        map_marks[y][x] = '-';
        let (dx, dy) = direction.delta();
        let next_x = x as isize + dx;
        let next_y = y as isize + dy;

        if next_x < 0 || next_x >= width as isize || next_y < 0 || next_y >= height as isize {
            break;
        }

        let next = map[next_y as usize][next_x as usize];
        if next == '#' {
            direction = direction.turn();
        } else {
            x = next_x as usize;
            y = next_y as usize;
        }
    }

    let dash_positions: Vec<(usize, usize)> = map_marks.iter().enumerate()
        .flat_map(|(i, row)| row.iter().enumerate().filter_map(move |(j, &c)| if c == '-' { Some((j, i)) } else { None }))
        .collect();

    fn simulate(
        map: &Vec<Vec<char>>,
        initial: (usize, usize),
        initial_direction: Direction,
        obstruction: (usize, usize),
        width: usize,
        height: usize,
    ) -> bool {
        let mut x = initial.0;
        let mut y = initial.1;
        let mut direction = initial_direction;
        let mut visited: HashSet<(usize, usize, Direction)> = HashSet::new();

        loop {
            let (dx, dy) = direction.delta();
            let next_x = x as isize + dx;
            let next_y = y as isize + dy;

            if next_x < 0 || next_x >= width as isize || next_y < 0 || next_y >= height as isize {
                break;
            }

            let next_pos = (next_x as usize, next_y as usize);

            let obstructed = next_pos == obstruction;

            let next_cell = map[next_pos.1][next_pos.0];
            if next_cell == '#' || obstructed {
                direction = direction.turn();
            } else {
                x = next_pos.0;
                y = next_pos.1;
            }

            if !visited.insert((x, y, direction)) {
                return true;
            }
        }

        false
    }

    let mut count = 0;
    for &(x_obstr, y_obstr) in &dash_positions {
        if simulate(&map, initial, initial_direction, (x_obstr, y_obstr), width, height) {
            count += 1;
        }
    }

    println!("{}", count);
    Ok(())
}