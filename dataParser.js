// const treeToLeaf = (node:Tree) : Tree[]=>{
//     if (!("children" in node)) {
//         return [node]
//     }else{
//         return ([] as Tree[]).concat(...node.children.map(treeToLeaf));
//     }
// }
// const buildTreeWithChildren = () :
const sExpToTrees = (sexp) => {
    const tokens = sexp.replace(/\(|\)/g, " $& ").trim().split(/\s+/);
    console.log(tokens);
    const helper = (index) => {
        const trees = [];
        while (index < tokens.length && tokens[index] === "(") {
            let parenCount = 0;
            // while (tokens[index] === "(") {
            //     index++;
            //     parenCount++;
            // }
            if (tokens[index] === "(") {
                index++;
                parenCount++;
            }
            const label = tokens[index];
            index++;
            if (tokens[index] === "(") {
                const result = helper(index);
                const children = result.trees;
                index = result.index;
                trees.push({
                    label,
                    children,
                    // childrenを持っていないnode(leaf)まで行って、そのnodeが持っている'text'をconcatする
                    // text: ([] as Tree[]).concat(...children.map(treeToLeaf)).map((leaf) => leaf.text).join(" ")
                });
            }
            else {
                const word = tokens[index];
                index++;
                trees.push({
                    label,
                    text: word,
                });
            }
            while (parenCount > 0) {
                if (tokens[index] !== ")") {
                    throw new Error(`Expected ')' at token ${index}`);
                }
                index++;
                parenCount--;
            }
        }
        return { trees, index };
    };
    const { trees, index } = helper(0);
    if (index !== tokens.length) {
        throw new Error("Found additional tokens after last ')'");
    }
    return trees;
};
// const testString = "(SBARQ (WHADVP (WRB How)) (SQ (VBP are) (NP (PRP you)) (VP (VBG doing) (NP (NN today)))) (. ?))"
const testString = "(S (NP (JJ Economic) (NN news)) (VP (VBD had) (NP (NP (JJ little) (NN effect)) (PP (IN on) (NP (JJ financial) (NNS markets))))) (. .))";
const treeJson = document.getElementById("json");
const sentence = document.getElementById("sentence");
sentence.value = testString;
treeJson.textContent = JSON.stringify(sExpToTrees(sentence.value), undefined, 2);
// sentence.addEventListener("change",()=>{
//
// })
//# sourceMappingURL=dataParser.js.map