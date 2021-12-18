// const sExpToTrees = require('./dataParser').sExpToTrees();

let root = d3.hierarchy(sExpToTrees(sentence.value)[0]).sort((a, b) => b.depth - a.depth)

// set the size of Tree drawing
const treeLayout = d3.tree().size([580, 300]);
treeLayout(root);

const svg = d3.select("#Tree");

// the furthest value on x-axis
let furthestX = 0
const links = svg.select('g.links')
    .selectAll('line.link')
    .data(root.links())
    .enter().append('line')

links.attr('x1', function(d) {return d.source.x;})
    .attr('y1', function(d) {return d.source.y;})
    .attr('x2', function(d) {
        furthestX = Math.max(furthestX,d.target.x)
        return d.target.x;})
    .attr('y2', function(d) {return d.target.y;})
    .attr('class', function(d) {if(d.target.data.label==='.') return "EOF"})
    .attr('stroke', "darkgray")
    .attr('stroke-width', 2)


let bottom_y = 0

// mouse over effect
function handleMouseOver(d, i) {  // Add interactivity
    // Use D3 to select element, change color and size
    d3.select(this).attr({
        fill: "orange",
    });

    // Specify where to put label of text
    svg.append("text").attr({
        id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
        x: function() { return xScale(d.x) - 30; },
        y: function() { return yScale(d.y) - 15; }
    })
        .text(function() {
            return [d.x, d.y];  // Value of the text
        });
}

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this).attr({
        fill: "black",
    });

    // Select text by id and then remove
    d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
}

// adds the text to the node
nodes = svg.select('g.nodes')
    .selectAll('circle.node')
    .data(root.descendants())
    .enter().append("text")


    .attr('x', function(d) {
        return d.x;})
    .attr('y', function(d) {
        bottom_y = Math.max(d.y,bottom_y)
        return d.y + 20;
    })
    .attr("class",function(d) {return (d.data.label === '.') ? "label EOF" : "label";})
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.label;})
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);


svg.select('g.nodes')
    .selectAll('circle.node')
    .data(root.descendants())
    .enter().append("text")
    .attr('x', function(d) {return d.x;})
    .attr('y', function(d) {return d.y+40;})
    .attr("class",function(d) {if(d.data.label === '.') return "EOF";})
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.text;});


// redraw the line of sentence closer
endingNodes = d3.selectAll(".EOF")._groups[0]
endingNodes.forEach(node=>{
    if (node.tagName === "text"){
        node.setAttribute('x',furthestX + 30)
    }
    if (node.tagName === "line"){
        node.setAttribute('x2',furthestX + 30)
    }
})

labelNodes = d3.selectAll(".label")._groups[0]


endingNodes = d3.selectAll(".EOF")._groups[0]

endingNodes.forEach(node=>{
    if (node.tagName === "text"){
        node.setAttribute('x',furthestX + 30)
    }
    if (node.tagName === "line"){
        node.setAttribute('x2',furthestX + 30)
    }
})