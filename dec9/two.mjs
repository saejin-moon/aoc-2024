import fs from "fs/promises";

(async () => {
    const file = (await fs.readFile("input.txt", "utf-8")).trim();
    let id = 0
    let arr = []
    for (let i = 0; i < file.length; i += 2) {
        if(file[i] > 0) arr.push({ id: id++, val: +file[i], i: i });
        if(file[i + 1] > 0) arr.push({ space: true, val: +file[i + 1], i: i + 1 });
    }
    let ids = arr.filter(el => !el.space).reverse();
    let spaces = arr.filter(el => el.space);

    for(let idsI = 0; idsI < ids.length - 1; idsI++){
        let { val: idVal, i: idArrayIndex } = ids[idsI];
        spaces = spaces.sort((a, b) => a.i - b.i);
        for(let spaceI = 0; spaceI < spaces.length; spaceI++){
            let { val: spaceVal, i: spaceArrayIndex } = spaces[spaceI];
            if( idArrayIndex > spaceArrayIndex){
                if(idVal < spaceVal){
                    arr[spaceArrayIndex].val -= idVal;
                    arr = arr.slice(0, spaceArrayIndex).concat(ids[idsI], arr.slice(spaceArrayIndex));
                    arr.splice(Math.min(idArrayIndex + 1, arr.length - 1), 1, { space: true, val: idVal, i: idArrayIndex });
                    updateIndex(arr);
                    break;
                }
                else if(idVal === spaceVal){
                    arr.splice(spaceArrayIndex, 1, ids[idsI]);
                    arr.splice(idArrayIndex, 1, spaces[spaceI]);
                    updateIndex(arr);
                    break;
                }
            }
        }
    }
    let sumIndex = 0;
    let sum = arr.reduce((a, b, i) => {
        if(b.space){
            sumIndex += b.val;
            return a;
        }
        for(let i = b.val; i--;){
            a += sumIndex * b.id;
            sumIndex++;
        }
        return a;
    }, 0);
    console.log(sum);
})()

function updateIndex (arr, id) {
    for(let i = arr.length; i--;){
        arr[i].i = i;
    }
    return arr.findIndex(el => el.val === id);
}