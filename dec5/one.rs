use std::collections::HashMap;
use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input = fs::read_to_string("./input.txt")?;
    let binding = input.trim().replace("\r", "");
    let file_parts = binding.split("\n\n").collect::<Vec<_>>();
    
    let lookups = file_parts[1].lines().collect::<Vec<_>>();
    let mut rules: HashMap<i32, Vec<i32>> = HashMap::new();

    file_parts[0].lines().for_each(|rule| {
        let mut parts = rule.split("|").map(|s| s.trim().parse::<i32>().unwrap());
        let key = parts.next().unwrap();
        let value = parts.next().unwrap();
        rules.entry(key).or_insert_with(Vec::new).push(value);
    });

    let sum: i32 = lookups.iter()
        .map(|&line| {
            line.split(',')
                .map(|n| n.parse::<i32>().unwrap())
                .collect::<Vec<_>>()
        })
        .filter(|nums| {
            let mut past = vec![nums[0]];
            for &num in &nums[1..] {
                if let Some(rule_set) = rules.get(&num) {
                    let last = *past.last().unwrap();
                    if !rules.get(&last).map_or(false, |lst| lst.contains(&num)) {
                        return false;
                    }
                    if past.iter().any(|&n| rule_set.contains(&n)) {
                        return false;
                    }
                    past.push(num);
                } else {
                    continue;
                }
            }
            true
        })
        .map(|nums| nums[nums.len() / 2])
        .sum();

    println!("{}", sum);
    Ok(())
}
