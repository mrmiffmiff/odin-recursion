// Iterative fibonacci
function fibs(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    let array = [0, 1];
    for (let i = 2; i < n; i++) {
        array.push(array[i - 2] + array[i - 1]);
    }
    return array;
}

console.log(fibs(-1));
console.log(fibs(0));
console.log(fibs(1));
console.log(fibs(2));
console.log(fibs(3));
console.log(fibs(4));
console.log(fibs(8));
console.log(fibs(20));

// Recursive fibonacci
function fibsRec(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    let extant = fibsRec(n - 1);
    return [...extant, extant[n - 3] + extant[n - 2]];
}

console.log(fibsRec(-1));
console.log(fibsRec(0));
console.log(fibsRec(1));
console.log(fibsRec(2));
console.log(fibsRec(3));
console.log(fibsRec(4));
console.log(fibsRec(8));
console.log(fibsRec(20));