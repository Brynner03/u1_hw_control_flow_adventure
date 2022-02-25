const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}



function startGame() {
    state = {}
    showTextNode(1)
}
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}
const textNodes = [
    {
        id: 1,
        text: "You wake up alone in the middlle of the woods after going to the bar with some friends.",
    options: [
        {
            text: 'Look around',
            setState: { lookAround: true },
            nextText: 2
        },
        {
            text: 'Stand up',
            nextText: 7
        }
    ]
    },
    
    {
        id: 2,
        text: 'You hear branches breaking from the distance, getting closer and closer',
        options: [
            {
                text: "Take out your phone and see what's coming",
                requiredState: (currentState) => currentState.lookAround,
                setState: { lookAround: true, standUp: false },
                nextText: 3
            },
            {
                text: "Run away from the sound!",
                setState: { runAway: true },
                nextText: 3
            },
            {
                text: "Go back to sleep",
                setState: { sleepAway: true },
                nextText: 5
            }
        ]
            },
        {
            id: 3,
            text: 'You notice that your index finger is hanging from your hand',
            options: [
                {
                    text: "Rip the finger off",
                    setstate: { fingerOut: true},
                    nextText: 8
                },
                {
                    text: "Take your scarf off and tie it around your finger",
                    setstate: { scarfOn: true},
                    nextText: 8
                },
                {
                    text: "Leave it hanging",
                    setstate: { fingHang: true},
                    nextText: 7
                },
            ]
        },
        {
            id: 5,
            text: 'You fell back to sleep, and have gotten mauled by a wild bear!',
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                },
            ]
        },
        {
            id: 7,
            text: 'You notice a black figure roaming the woods',
            options: [
                {
                    text: 'Take out your phone and bring out the flashlight?',
                    nextText: 8
                },
                {
                    text: "You're always prepared, want to reach for your gun?",
                    nextText: 9
                },
            ]
        },
        {
            id: 9,
            text: 'Oh no! as you reached for your gun, the wild bear sneaked up on you and ripped your head off.',
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                },
            ]
        },
        {
            id: 8,
            text: " You weren't paying attention and got mauled by the wild bear!",
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                },
            ]
        },

        ]
   
startGame()
