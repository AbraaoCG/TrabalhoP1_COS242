// Javascript code to implement priority-queue
// using array implementation of
// binary heap
class Heap(n){}
var H = Array(50).fill(0);
var size = -1;
 
// Function to return the index of the
// parent node of a given node
function parent(i)
{
    return parseInt((i - 1) / 2);
}
 
// Function to return the index of the
// left child of the given node
function leftChild(i)
{
 
    return parseInt((2 * i) + 1);
}
 
// Function to return the index of the
// right child of the given node
function rightChild(i)
{
 
    return parseInt((2 * i) + 2);
}
 
// Function to shift up the node in order
// to maintain the heap property
function shiftUp( i)
{
    while (i > 0 && H[parent(i)] < H[i]) {
 
        // Swap parent and current node
        swap(parent(i), i);
 
        // Update i to parent of i
        i = parent(i);
    }
}
 
function swap(i, j)
{
    var temp = H[i];
    H[i] = H[j];
    H[j] = temp;
}
 
// Function to shift down the node in
// order to maintain the heap property
function shiftDown( i)
{
    var maxIndex = i;
 
    // Left Child
    var l = leftChild(i);
 
    if (l <= size && H[l] > H[maxIndex]) {
        maxIndex = l;
    }
 
    // Right Child
    var r = rightChild(i);
 
    if (r <= size && H[r] > H[maxIndex]) {
        maxIndex = r;
    }
 
    // If i not same as maxIndex
    if (i != maxIndex) {
        swap(i, maxIndex);
        shiftDown(maxIndex);
    }
}
 
// Function to insert a new element
// in the Binary Heap
function insert( p)
{
    size = size + 1;
    H[size] = p;
 
    // Shift Up to maintain heap property
    shiftUp(size);
}
 
// Function to extract the element with
// maximum priority
function extractMax()
{
    var result = H[0];
 
    // Replace the value at the root
    // with the last leaf
    H[0] = H[size];
    size = size - 1;
 
    // Shift down the replaced element
    // to maintain the heap property
    shiftDown(0);
    return result;
}
 
// Function to change the priority
// of an element
function changePriority(i, p)
{
    var oldp = H[i];
    H[i] = p;
 
    if (p > oldp) {
        shiftUp(i);
    }
    else {
        shiftDown(i);
    }
}
 
// Function to get value of the current
// maximum element
function getMax()
{
 
    return H[0];
}
 
// Function to remove the element
// located at given index
function remove(i)
{
    H[i] = getMax() + 1;
 
    // Shift the node to the root
    // of the heap
    shiftUp(i);
 
    // Extract the node
    extractMax();
}
 
// Driver Code
/*         45
        /      \
       31      14
      /  \    /  \
     13  20  7   11
    /  \
   12   7
Create a priority queue shown in
example in a binary max heap form.
Queue will be represented in the
form of array as:
45 31 14 13 20 7 11 12 7 */
// Insert the element to the
// priority queue
insert(45);
insert(20);
insert(14);
insert(12);
insert(31);
insert(7);
insert(11);
insert(13);
insert(7);
var i = 0;
// Priority queue before extracting max
document.write( "Priority Queue : ");
while (i <= size) {
    document.write( H[i] + " ");
    i++;
}
document.write( "<br>");
// Node with maximum priority
document.write( "Node with maximum priority : "
     + extractMax() + "<br>");
// Priority queue after extracting max
document.write( "Priority queue after "
     + "extracting maximum : ");
var j = 0;
while (j <= size) {
    document.write( H[j] + " ");
    j++;
}
document.write( "<br>");
 
// Change the priority of element
// present at index 2 to 49
changePriority(2, 49);
document.write( "Priority queue after "
     + "priority change : ");
var k = 0;
while (k <= size) {
    document.write( H[k] + " ");
    k++;
}
document.write( "<br>");
 
// Remove element at index 3
remove(3);
document.write( "Priority queue after "
     + "removing the element : ");
var l = 0;
while (l <= size) {
    document.write( H[l] + " ");
    l++;
}
 
// This code is contributed by noob2000.