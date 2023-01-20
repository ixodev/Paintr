const brain = require("brain.js");

const net = new brain.NeuralNetwork({
    hiddenLayers: [100, 200],
});

function fn(x) { return 2 * x + 4 };
let list = [];
for (let i = 0; i < 50; i++) list.push({ input: i, output: { result: fn(i) } });


async function run() {
    net.train(list);

    // f(x) = 2x+4

    // 7
    console.log(net.run(7));
    // => 18


    // 22
    console.log(net.run(22));
    // => 48

    // 55
    console.log(net.run(55));
    // => 114
};
run();