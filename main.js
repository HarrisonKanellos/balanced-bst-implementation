import { createTree } from "./binarySearchTree.js";

const randArrayOfLen = (len) => {
    const array = [];
    for (let i = 0; i < len; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
};

const randArray = randArrayOfLen(12);
console.log(randArray);

const bst = createTree(randArray);
