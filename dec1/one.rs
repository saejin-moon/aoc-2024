use std::fs;

fn main () {
    let file = fs::read_to_string("input.txt").unwrap();
    let mut one = Vec::new();
    let mut two = Vec::new();
    for line in file.lines() {
        let arr: Vec<&str> = line.split_whitespace().collect();
        one.push(arr[0].parse::<i32>().unwrap());
        two.push(arr[1].parse::<i32>().unwrap());
    }
    one.sort();
    two.sort();
    let mut sum = 0;
    for i in 0..one.len() {
        sum += (one[i] - two[i]).abs();
    }
    println!("{}", sum);
}