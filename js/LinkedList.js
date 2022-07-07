
// Variables 

let list = document.getElementById('list');
let nodes = document.getElementsByClassName('node');
let pointers = document.getElementsByClassName('pointer');

// Animation timeouts

let nodeTime;
let pointerTime;
let deleteTime;

const setAnimationTimeOuts = (animations) => {
    nodeTime = animations.nodeTime;
    pointerTime = animations.pointerTime;
    deleteTime = animations.deleteTime;
}

// Default
// Node: 1500
// Pointer: 1000
// Delete: 2000

const calculateNodesAnimationTimeout = (i) => { 
    return nodeTime * i + pointerTime * i // i -> Number of nodes & pointers
}

const calculatePointersTimeout = (i) => {
    return calculateNodesAnimationTimeout(i) + nodeTime // i -> number of pointers & nodes
}

// Add Animations

const animate = (from, to) => {
    for (let i = from; i <= to; i++) {
        setTimeout(() => {
            nodes[i].style.animationName = 'highlightNode'
            nodes[i].style.animationDuration = nodeTime / 1000 + "s";
            nodes[i].style.animationTimingFunction = 'ease';
        }, calculateNodesAnimationTimeout(i))
        
        let totalTimeout = calculatePointersTimeout(i)

        setTimeout(() => {
            pointers[i].style.animationName = 'highlightPointer'
            pointers[i].style.animationDuration = pointerTime / 1000 + "s";
            pointers[i].style.animationTimingFunction = 'ease';
        }, totalTimeout)
        
        //Delete animations

        setTimeout(() => {
            nodes[i].style.animation = null;
        }, totalTimeout)
        
        setTimeout(() => {
            pointers[i].style.animation = null;
        }, totalTimeout + pointerTime)
    }
}

// Adding Nodes

const add = (i, data) => {
  
    // Create DOM Elements

    let node = document.createElement('div');
    node.classList.add('node')
    
    let number = document.createElement('p');
    number.classList.add('number');
    
    let text = document.createTextNode(data);

    number.appendChild(text);
    node.appendChild(number);
  

    let pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.style.opacity = 0;

    let img = document.createElement('img');
    img.src = "img/pointer.png";
    
    pointer.appendChild(img);

    let nodesTime = calculateNodesAnimationTimeout(i)
    let pointersTime = calculatePointersTimeout(i)
    
    animate(0, i-1); // Animate previous nodes & pointers
            
    setTimeout(() => {
        list.appendChild(node)
        nodes[i].style.animationName = 'grow'
        nodes[i].style.animationDuration = nodeTime / 1000 + "s";
        nodes[i].style.animationTimingFunction = 'ease';
    }, nodesTime)

    setTimeout(() => {
        list.appendChild(pointer);
        pointer.style.opacity = 1;
        pointers[i].style.animationName = 'slide'
        pointers[i].style.animationDuration = pointerTime / 1000 + "s";
        pointers[i].style.animationTimingFunction = 'ease';
    }, pointersTime) 
}

// SET

const set = (i, data) => {

    animate(0, i - 1)
    
    setTimeout(() => {
        let numberSelected = nodes[i].getElementsByTagName('p')[0]
        numberSelected.style.animationName = 'fadeNumberOut';
        numberSelected.style.animationDuration = 1.5 + "s";
        numberSelected.style.animationTimingFunction = "ease";

        setTimeout(() => {
            numberSelected.remove()
            
            let number = document.createElement('p');
            number.classList.add('number');

            let text = document.createTextNode(data);
            number.appendChild(text);

            number.style.animationName = 'fadeNumberIn';
            number.style.animationDuration = 1.5 + "s";
            number.style.animationTimingFunction = "ease";

            nodes[i].appendChild(number)
        }, 1500)

    }, calculateNodesAnimationTimeout(i))
}

// Insert Animations

const animateBeforeInsert = (from, to) => {
    for (let j = parseInt(from); j < parseInt(to); j++) {
        nodes[j].style.animationName = 'moveRightNode'
        nodes[j].style.animationDuration = 2 + "s";
        nodes[j].style.animationTimingFunction = 'ease';
            
        pointers[j].style.animationName = 'moveRightNode'
        pointers[j].style.animationDuration = 2 + "s";
        pointers[j].style.animationTimingFunction = 'ease';
        
        //Delete animations

        setTimeout(() => {
            nodes[j].style.animation = null;
            pointers[j].style.animation = null;
        }, 2000)
    }
}

// Insert function

const insert = (i, data) => {
    // Animate before insert
    animate(0, i - 1)
    setTimeout(() => {
        animateBeforeInsert(parseInt(i), nodes.length)
        let node = document.createElement('div');
        node.classList.add('node')
    
        let number = document.createElement('p');
        number.classList.add('number');
    
        let text = document.createTextNode(data);

        number.appendChild(text);
        node.appendChild(number);
  

        let pointer = document.createElement('div');
        pointer.classList.add('pointer');
        pointer.style.opacity = 0;

        let img = document.createElement('img');
        img.src = "img/pointer.png";
    
        pointer.appendChild(img);

        
        list.insertBefore(pointer, nodes[i])
        list.insertBefore(node, pointer)
        
        nodes[i].style.animationName = 'grow'
        nodes[i].style.animationDuration = nodeTime / 1000 + "s";
        nodes[i].style.animationTimingFunction = 'ease';
        setTimeout(() => {
            pointer.style.opacity = 1;
            pointers[i].style.animationName = 'slide'
            pointers[i].style.animationDuration = pointerTime / 1000 + "s";
            pointers[i].style.animationTimingFunction = 'ease';
        }, pointerTime) 
        
    }, calculateNodesAnimationTimeout(i)) 
}

// Remove Index Function

const removeIndex = (index) => {
    animate(0, index-1)
    setTimeout(() => {
        let nodetoRemove = nodes[index];

        nodetoRemove.style.animationName = 'deleteNode'
        nodetoRemove.style.animationDuration = deleteTime / 1000 + "s"
        nodetoRemove.style.animationTimingFunction = 'ease'

        let pointertoRemove = pointers[index]
        
        pointertoRemove.style.animationName = 'deletePointer'
        pointertoRemove.style.animationDuration = deleteTime / 1000 + "s"
        pointertoRemove.style.animationTimingFunction = 'ease'
        setTimeout(() => {
            // Remove DOM elements after animation
            nodetoRemove.remove();
            pointertoRemove.remove();
        }, deleteTime)

    }, calculateNodesAnimationTimeout(index))
}




