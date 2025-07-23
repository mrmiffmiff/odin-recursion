// While a bit more complex, it's generally a bit more efficient space-wise to have one single buffer for mergesort rather than creating temporary arrays at each step
// So the initial call to a mergeSort function needs to initialize such a buffer, then call a helper function that will make use of it
// Either way we can make the ultimate edits in the original input array, so we'll return that after the changes are made in-place
// Technically this is not a true in-place algorithm
function mergeSort(array) {
    let buffer = new Array(array.length);
    mergeSortHelper(array, buffer, 0, array.length - 1); // initially need to cover the entire array, of course
    return array;
}

// This is what will be called by the initial function and is the actual recursive function
function mergeSortHelper(array, buffer, left, right) {
    // Base case would be left === right; since our edits our occurring on the original array we don't actually need to return anything
    // The size-1 section is already sorted
    // Will also include left > right for safety, but it shouldn't happen
    if (left >= right) return;

    // Now need to calculate a midpoint
    /* Traditionally midpoint would be calculated by (left + right) / 2
    This is actually wrong, see https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/
    It doesn't account for extremely large arrays that may exceed the size of an int or number in whatever language is being used
    The best way to fix this is left + ((right - left) / 2) so that's what I'll do
    Since this is JS I also have to use Math.floor... other languages would automatically truncate decimals since integers are what they are
    But JS doesn't do that */
    let mid = Math.floor(left + ((right - left) / 2));
    // Now we make the recursive calls, left side then right side
    mergeSortHelper(array, buffer, left, mid);
    mergeSortHelper(array, buffer, mid + 1, right);
    // Then we finally merge things together
    merge(array, buffer, left, mid, right);
}

// This actually merges the subsequences
/* There are two ways we could do this. We could copy a properly merged order of things into the buffer, then copy that back into the original array
Or we could copy the appropriate contents of the original array into the buffer, then copy the sorting back into the original.
I will do the latter as it feels more natural to me. */
function merge(array, buffer, left, mid, right) {
    // First iterate through the section of the array we're sorting and copy its contents into the buffer in the same positions
    for (let i = left; i <= right; i++) {
        buffer[i] = array[i];
    }

    // Then we need to initialize pointers for the left side of the section (already itself sorted) and the right side (same)
    // We'll call them lsp and rsp (left-side pointer and right-side pointer)
    let lsp = left, rsp = mid + 1;
    // And finally we need a pointer for where we are in the original array, initializing at global left
    let aPointer = left;

    // While we're still looking at both sides, need to check both lsp and rsp haven't exceeded the bounds
    while (lsp <= mid && rsp <= right) {
        // Here we do our evaluations... in the case of equality, we default to the left side to keep the algorithm stable
        // Have to make sure to iterate appropriate pointers
        if (buffer[lsp] <= buffer[rsp]) {
            array[aPointer] = buffer[lsp];
            lsp++;
        }
        else {
            array[aPointer] = buffer[rsp];
            rsp++;
        }
        aPointer++;
    }

    // The above loop exits when one side is done. We need to make sure the other side finishes, if present. Only one of these loops should run in any given call to this function
    // First, left
    while (lsp <= mid) {
        array[aPointer] = buffer[lsp];
        lsp++;
        aPointer++;
    }

    // Then, right
    while (rsp <= right) {
        array[aPointer] = buffer[rsp];
        rsp++;
        aPointer++;
    }
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));
console.log(mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, 50]));
console.log(mergeSort([12, 14, 18, 22, 38, 52]));
console.log(mergeSort([12, 14, 18, 22, 38, 52, 5]));