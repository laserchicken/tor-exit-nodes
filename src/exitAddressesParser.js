const parse = (data) => {
  const lines = data.trim().split("\n");
  const aggregated = [];
  let node = {};

  while (lines.length > 0) {
    const line = lines.shift();
    const words = line.split(" ");
    const key = words[0];
    const value = words.slice(1).join(" ");
    if (key === "ExitNode") {
      node.exitNode = value;
    }
    if (key === "Published") {
      node.published = value;
    }
    if (key === "LastStatus") {
      node.lastStatus = value;
    }
    if (key === "ExitAddress") {
      node.exitAddress = words[1]; //only ip part of it
      aggregated.push(node);
      node = {};
    }
  }
  return aggregated;
};

module.exports = parse;
