function createNode(data, left = null, right = null) {
    return { data, left, right };
}

function createTree(array) {
    const sortedArray = sortArray(array);
    const root = buildTree(sortedArray);

    function sortArray(array) {
        // Remove duplicate values
        array = [...new Set(array)];
        
        // Sort in ascending order
        array.sort((a, b) => a - b);
    }

    function buildTree(array) {
        if (array.length === 0) {
            return null;
        }

        const mid = Math.floor((array.length - 1) / 2);
        const rootNode = createNode(array[mid]);

        rootNode.left = buildTree(array.slice(0, mid))
        rootNode.right = buildTree(array.slice(mid, array.length));

        return rootNode;
    }

    function includes(value, rootNode = root) {
        if (rootNode === null) {
            return false;
        }
        if (value === rootNode.data) {
            return true;
        }
        if (value < rootNode.data) {
            return includes(value, root.left);
        }
        return includes(value, root.right);
    }

    function insert(value, rootNode = root) {
        // If value already exists do nothing
        if (value === rootNode.data) {
            return;
        }

        // If end of tree reached, return new node
        if (rootNode === null) {
            return createNode(value);
        }

        if (value < rootNode.data) {
            rootNode.left = insert(value, rootNode.left);
        } else {
            rootNode.right = insert(value, rootNode.right);
        }
        
        return rootNode;
    }

    function deleteItem(value, rootNode = root) {
        if (rootNode === null) {
            return rootNode;
        }
        
        if (value < rootNode.data) {
            rootNode.left = deleteItem(value, rootNode.left);
        } else if (value > rootNode.data) {
            rootNode.right = deleteItem(value, rootNode.right);
        } else {
            // 0 or 1 child nodes
            if (rootNode.left === null) {
                return rootNode.right;
            }
            if (rootNode.right === null) {
                return rootNode.left;
            }
            
            // 2 child nodes
            const replacement = rootNode.right;
            while (replacement !== null && replacement.left !== null) {
                replacement = replacement.left;
            }

            rootNode.data = replacement.data;
            rootNode.right = deleteItem(replacement.data, rootNode.right);
        }
        
        return rootNode;
    }

    function levelOrderForEach(callback) {
        if (arguments.length !== 1) {
            throw new Error("Callback argument is required.");
        }
        if (root === null) {
            return;
        }

        const q = [];
        q.push(root);

        while (q.length !== 0) {
            const current = q.splice(0, 1);
            callback(current.data);

            if (current.left !== null) {
                q.push(current.left);
            }
            if (current.right !== null) {
                q.push(current.right);
            }
        }

    }

    function levelOrderForEachRecursive(callback, nodes = [root]) {
        if (typeof arguments[0] !== "function") {
            throw new Error("Callback argument is required.");
        }
        if (root === null) {
            return;
        }
        if (nodes.length === 0) {
            return;
        }

        const childNodes = [];
        for (let i = 0; i <= nodes.length; i++) {
            callback(nodes[i].data);

            if (nodes[i].left !== null) {
                childNodes.push(nodes[i].left);
            }
            if (nodes[i].right !== null) {
                childNodes.push(nodes[i].right);
            }
        }

        levelOrderForEachRecursive(callback, childNodes);
    }

    function inOrderForEach(callback, rootNode = root) {
        if (typeof arguments[0] !== "function") {
            throw new Error("Callback argument is required.");
        }
        if (rootNode === null) {
            return;
        }

        inOrderForEach(callback, rootNode.left);
        callback(rootNode.data);
        inOrderForEach(callback, rootNode.right);
    }

    function preOrderForEach(callback, rootNode = root) {
        if (typeof arguments[0] !== "function") {
            throw new Error("Callback argument is required.");
        }
        if (rootNode === null) {
            return;
        }

        callback(rootNode.data);
        preOrderForEach(callback, rootNode.left);
        preOrderForEach(callback, rootNode.right);
    }

    function postOrderForEach(callback, rootNode = root) {
        if (typeof arguments[0] !== "function") {
            throw new Error("Callback argument is required.");
        }
        if (rootNode = null) {
            return;
        }

        postOrderForEach(callback, rootNode.left);
        postOrderForEach(callback, rootNode.right);
        callback(rootNode.data);
    }

    function height(value, rootNode = root) {
        if (rootNode === null) {
            return undefined;
        }

        while (true) {
            if (rootNode === null) {
                return undefined;
            } else if (value === rootNode.data) {
                break;
            } else if (value < rootNode.data) {
                rootNode = rootNode.left;
            } else {
                rootNode = rootNode.right;
            }
        }

        const q = [];
        q.push({
            rootNode, 
            height: 0,
        });

        while (q.length !== 0) {
            const current = q.splice(0, 1);

            if (current.rootNode.left !== null) {
                q.push({ 
                    rootNode: current.rootNode.left, 
                    height: current.height + 1,
                });
            }
            if (current.rootNode.right !== null) {
                q.push({
                    rootNode: current.rootNode.right,
                    height: current.height + 1,
                });
            }

            if (q.length === 0) {
                return current.height;
            }
        }
    }

    function depth(value, rootNode = root, count = 0) {
        if (rootNode === null) {
            return undefined;
        }
        if (value === rootNode.data) {
            return count;
        }
        if (value < rootNode.data) {
            return depth(value, rootNode.left, ++count);
        }
        return depth(value, rootNode.right, ++count);
    }

    function isBalanced(rootNode = root) {
        if (rootNode === null) {
            return true;
        }

        if (rootNode.left !== null &&
            rootNode.right !== null
        ) {
            return isBalanced(rootNode.left) && isBalanced(rootNode.right);
        }

        if (rootNode.left === null && 
            rootNode.right === null
        ) {
            return true;
        } else if (rootNode.left === null) {
            if (rootNode.right.left === null && 
                rootNode.right.right === null
            ) {
                return true;
            }
        } else if (rootNode.right === null) {
            if (rootNode.left.left === null && 
                rootNode.left.right === null
            ) {
                return true;
            }
        } else {
            return false;
        }
    }

    function rebalance() {
        const inputArray = [];

        inOrderForEach((value) => {
            inputArray.push(value);
        });

        root = buildTree(inputArray);
    }

    return { 
        root, 
        includes,
        insert,
        deleteItem,
        levelOrderForEach,
        levelOrderForEachRecursive,
        inOrderForEach,
        preOrderForEach,
        postOrderForEach,
        height,
        depth,
        isBalanced,
        rebalance,
    }
}