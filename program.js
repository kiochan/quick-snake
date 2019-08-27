const mapWidth = 64
const mapheight = 20
const defaultSnakeLength = 3
const gameLoogInterval = 1000 / 4

const map = [] // [mapheight][mapWidth]
for (let i = 0; i < mapheight; i++) {
    const map2 = []
    for (let j = 0; j < mapWidth; j++) {
        map2.push(0)
    }
    map.push(map2)
}

map[1][3] = '3'
map[1][2] = '2'
map[1][1] = '1'

const data = {
    keyState: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    },
    action: {
        direction: 'right' // 'none', 'up', 'down', 'left', 'right'
    },
    snakeLength: defaultSnakeLength,
    /**
     * map 里的状态
     * 0 没有蛇
     * >0 有蛇 并且表示 蛇的存活时间
     */
    map: map

}

window.document.body.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': {
            data.keyState.ArrowUp = true
            keyEventCallback()
            return
        }
        case 'ArrowDown': {
            data.keyState.ArrowDown = true
            keyEventCallback()
            return
        }
        case 'ArrowLeft': {
            data.keyState.ArrowLeft = true
            keyEventCallback()
            return
        }
        case 'ArrowRight': {
            data.keyState.ArrowRight = true
            keyEventCallback()
            return
        }
        default: {
            return
        }
    }
})

window.document.body.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp': {
            data.keyState.ArrowUp = false
            keyEventCallback()
            return
        }
        case 'ArrowDown': {
            data.keyState.ArrowDown = false
            keyEventCallback()
            return
        }
        case 'ArrowLeft': {
            data.keyState.ArrowLeft = false
            keyEventCallback()
            return
        }
        case 'ArrowRight': {
            data.keyState.ArrowRight = false
            keyEventCallback()
            return
        }
        default: {
            return
        }
    }
})

function keyEventCallback () {
    // console.log(data.keyState)
}

function updateInput () {
    const keyState = data.keyState
    const action = data.action
    if (keyState.ArrowUp) {
        action.direction = 'up'
        return
    }
    if (keyState.ArrowDown) {
        action.direction = 'down'
        return
    }
    if (keyState.ArrowLeft) {
        action.direction = 'left'
        return
    }
    if (keyState.ArrowRight) {
        action.direction = 'right'
        return
    }
    return
}

function updateGameState () {
    const map = data.map
    const snakeLength = data.snakeLength
    for (let i = 0; i < map.length; i++) {
        const thisRow = map[i];
        for (let j = 0; j < thisRow.length; j++) {
            let currentCell = +thisRow[j]
            if (currentCell === snakeLength) {
                switch (data.action.direction) {
                    case 'up': {
                        map[i - 1][j] = -snakeLength
                        break
                    }
                    case 'down': {
                        map[i + 1][j] = -snakeLength
                        break
                    }
                    case 'left': {
                        map[i][j - 1] = -snakeLength
                        break
                    }
                    case 'right': {
                        map[i][j + 1] = -snakeLength
                        break
                    }
                }
            }

            if (currentCell > 0) {
                map[i][j] -= 1
                currentCell -= 1
            }
        }
    }

    for (let i = 0; i < map.length; i++) {
        const thisRow = map[i];
        for (let j = 0; j < thisRow.length; j++) {
            let currentCell = +thisRow[j]
            if (currentCell < 0 ) {
                thisRow[j] = -thisRow[j]
            }
        }
    }
}

const container = window.document.getElementById('container')

function render () {
    let glc = ''
    const map = data.map
    for (let i = 0; i < map.length; i++) {
        const thisRow = map[i];
        for (let j = 0; j < thisRow.length; j++) {
            const currentCell = thisRow[j];
            if (+currentCell > 0) glc += thisRow[j]
            else glc += ' '
        }
        glc += '\n'
    }
    container.innerText = glc
}

function gameLoop () {
    updateInput()
    updateGameState()
    render()
}

setInterval(gameLoop, gameLoogInterval)
