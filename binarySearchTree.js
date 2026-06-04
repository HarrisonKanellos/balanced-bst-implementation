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
        if (value === rootNode.data) {
            return true;
        }
        if (rootNode === null) {
            return false;
        }
        if (value < rootNode.data) {
            return includes(value, root.left);
        }
        return includes(value, root.right);
    }

    return { 
        root, 
        includes,
    }
}