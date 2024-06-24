class Node {
    constructor(x, y, index){
        this.node = [x, y];
        this.adjacencyList = this.getAdjList();
        this.index = index;
    }

    getAdjList() {  
        let x = this.node[0];
        let y = this.node[1];
        let list = []

        if (x < 7 && y < 6)
            list.push([x + 1, y + 2])
        if (x < 6 && y < 7)
            list.push([x + 2, y + 1])
        if (x < 6 && y > 0)
            list.push([x + 2, y - 1])
        if (x < 7 && y > 1)
            list.push([x + 1, y - 2])
        if (x > 0 && y > 1)
            list.push([x - 1, y - 2])
        if (x > 1 && y > 0)
            list.push([x - 2, y - 1])
        if (x > 1 && y < 7)
            list.push([x - 2, y + 1])
        if (x > 0 && y < 6)
            list.push([x - 1, y + 2])

        return list;
    }
}

class Chessboard{
    
    constructor() {
        this.board = Chessboard.generateChessBoard();
    }
    
    static generateChessBoard = () => {
        let board = []
        let index = 0;
        for (let i = 0; i < 8; i++) {
            
            for (let j = 0; j < 8; j++) {
                const node = new Node(i, j, index++);
                board.push(node);
            }
        }
        return board;
    }

    static bfs(board, source, target, par, dist) {
        const queue = [];
        dist[source.index] = 0;

        queue.push(source);
        
        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (currentNode === target) {
                break;
            }

            for (const neighbor of currentNode.adjacencyList) {
                const neighborNode = Chessboard.findNode(board, neighbor[0], neighbor[1]);
                if (dist[neighborNode.index] === Infinity) {
                    par[neighborNode.index] = currentNode.index;
                    dist[neighborNode.index] = dist[currentNode.index] + 1;
                    queue.push(neighborNode);
                }
            }
        }
    }

    static findNode(board, x, y, i = 0) {
        if (x === board[i].node[0] && y === board[i].node[1]) {
            return board[i];
        }
        return Chessboard.findNode(board, x, y, i + 1);
    }

    static findNodeByIndex(board, index) {
        for (const node of board) {
            if (node.index === index) {
                return node;
            }
        }
    }

    static findPath(board, source, target) {
        const par = Array(64).fill(-1);
        const dist = Array(64).fill(Infinity);
        Chessboard.bfs(board, source, target, par, dist);

        const path = [];
        let currentNode = target;
        path.push(target);
        while(par[currentNode.index] !== -1) {
            let parNode = Chessboard.findNodeByIndex(board, par[currentNode.index]);
            path.push(parNode);
            currentNode = parNode;
        }
        let processPath = [];
        path.forEach(node => {
            processPath.push(node.node);
        });
        return processPath.reverse();
    }

    knightMoves(start, target) {
        let startNode = Chessboard.findNode(this.board, start[0], start[1]);
        let targetNode = Chessboard.findNode(this.board, target[0], target[1]);
        startNode.dist = 0;
        let result = Chessboard.findPath(this.board, startNode, targetNode)
        return result
    }
}

const chessBoard = new Chessboard();

const move = chessBoard.knightMoves([0,0], [7,7])
console.log(move)
