//二分搜索树节点类
class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
/**
 * 二分搜索树类API：
 * 1. add(val)          //向二分搜索树中添加新的元素val
 * 2. preOrder()        //二分搜索树的前序遍历
 * 3. inOrder()         //二分搜索树的中序遍历
 * 4. postOrder()       //二分搜索树的后序遍历
 * 5. getEchartsData()  //将二分搜索树转换为echarts可以使用的json数据
 */
class BST {
    //构造函数
    constructor() {
        this.root = null;
        this.size = 0;
    }

    // 向二分搜索树中添加新的元素val
    add(val) {
        this.root = this.addNode(this.root, val)
    }
    addNode(node, val) {
        if (node === null) {
            this.size++;
            return new Node(val)
        }
        if (node.val>val) {
            node.left = this.addNode(node.left, val)
        } else if (node.val<val) {
            node.right = this.addNode(node.right, val)
        }
        return node;
    }

    // 二分搜索树的前序遍历
    preOrder() {
        this.preOrderNode(this.root)
    }
    preOrderNode(node) {
        if (node === null) {
            return;
        }
        // 重点是这个 console 的位置
        console.log(node.val)
        this.preOrderNode(node.left)
        this.preOrderNode(node.right)
    }

    // 二分搜索树的中序遍历
    inOrder() {
        this.inOrderNode(this.root)
    }
    inOrderNode(node) {
        if (node === null) {
            return;
        }
        this.inOrderNode(node.left)
        console.log(node.val)
        this.inOrderNode(node.right)
    }

    // 二分搜索树的后序遍历
    postOrder() {
        this.postOrderNode(this.root)
    }
    postOrderNode(node) {
        if (node === null) {
            return;
        }
        this.postOrderNode(node.left)
        this.postOrderNode(node.right)
        console.log(node.val)
    }

    //将二分搜索树转换为echarts可以使用的json数据
    getEchartsData() {
        //使用中序遍历
        return this.inOrderEchartsDataNode(this.root, 'Root');
    }
    inOrderEchartsDataNode(node, type) {
        let obj = {
            //使用type表示节点类型（Root：根节点；R：右节点；L：左节点）
            name: type + '：' + node.val, 
            value: node.val
        }
        /**
         * 在echarts数据中：
         * 1. 叶子节点中不能有children数组。
         * 2. 非叶子节点中，只有左节点或右节点时，children数组中就只放一个对象。
         */
        if (node.left == null && node.right != null) {
            obj.children = [this.inOrderEchartsDataNode(node.right, 'R')];
        } else if (node.left != null && node.right == null) {
            obj.children = [this.inOrderEchartsDataNode(node.left, 'L')];
        } else if (node.left != null && node.right != null){
            obj.children = [
                this.inOrderEchartsDataNode(node.left, 'L'),
                this.inOrderEchartsDataNode(node.right, 'R')
            ];
        }
        return obj;
    }
}