class Graph {
  constructor() {
    this.nodes = new Map();
  }
  addNode(node) {
    this.nodes.set(node, new Map());
  }
  addEdge(node1, node2, weight) {
    this.nodes.get(node1).set(node2, weight);
    this.nodes.get(node2).set(node1, weight);
  }
  shortestPath(startNode, endNode) {
    const distances = new Map();
    const previous = new Map();
    const queue = new PriorityQueue();
    for (const node of this.nodes.keys()) {
      distances.set(node, Infinity);
      previous.set(node, null);
    }
    distances.set(startNode, 0);
    queue.enqueue(startNode, 0);
    while (!queue.isEmpty()) {
      const [currentNode, currentDistance] = queue.dequeue();
      if (currentNode === endNode) {
        const path = [];
        let node = currentNode;
        while (node !== null) {
          path.unshift(node);
          node = previous.get(node);
        }
        return path;
      }
      if (currentDistance > distances.get(currentNode)) {
        continue;
      }

      const neighbors = this.nodes.get(currentNode);
      for (const [neighbor, weight] of neighbors.entries()) {
        const distance = currentDistance + weight;

        if (distance < distances.get(neighbor)) {
          distances.set(neighbor, distance);
          previous.set(neighbor, currentNode);
          queue.enqueue(neighbor, distance);
        }
      }
    }

    return null;
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.sort();
  }

  dequeue() {
    return this.queue.shift().element;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
const graph = new Graph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");

graph.addEdge("A", "B", 5);
graph.addEdge("A", "C", 3);
graph.addEdge("B", "D", 2);
graph.addEdge("C", "D", 1);
graph.addEdge("D", "E", 4);

const shortestPath = graph.shortestPath("A", "E");
console.log("Shortest path:", shortestPath);
