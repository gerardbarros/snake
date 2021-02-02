document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div")
    const scoreDisplay = document.querySelector("span")
    const startButton = document.querySelector(".start")

    const width = 10
    let currentIndex = 0 // first div in our grid
    let appleIndex = 0 //first div in our grid
    let currentSnake = [2, 1, 0] // so the div in our grid being 2
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0 


    // TO START AND RESTART GAME
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove("snake"))
        squares[appleIndex].classList.remove("apple")
        clearInterval(interval)
        score = 0

        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add("snake"))
        interval = setInterval(moveOutcomes, intervalTime)
    }



    // FUNCTION THAT DEALS WITH ALL OUTCOMES OF THE SNAKE
    function moveOutcomes(){

        // FUNCTION THAT DEALS WITH SNAKE HITTING BORDER AND SELF
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //IF SNAKE HITS BOTTOM
            (currentSnake[0] % width === width -1 && direction === 1) || // IF SNAKE HITS RIGHT WALL
            (currentSnake[0] % width === 0 && direction -1 ) || //IF SNAKE HITS LEFT WALL
            (currentSnake[0] - width < 0 && direction === -width) || //IF SNAKE HITS THE TOP
            squares[currentSnake[0] + direction].classList.contains("snake") // IF SNAKE EATS ITSELF
        ) {
            return clearInterval(interval) //THIS WILL CLEAR INTERVAL IF ANY OF THE ABOVE HAPPEN
        }

        const tail = currentSnake.pop() //REMOVES LAST ITE OF THE ARRAY AND SHOWS IT
        squares[tail].classList.remove("snake") //REMOVES CLASS OF SNAKE FROM TAIL
        currentSnake.unshift(currentSnake[0] + direction) //GIVES DIRECTION TO THE HEAD OF THE ARRAY


        // FUNCTION THAT DEALS WITH SNAKE EATING APPLE
        if(squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple")
            squares[tail].classList.add("snake")
            currentSnake.push(tail) //PUT TAIL IN QUOTES TO KEEP TAIL IN THE GAME TO MAKE IT HARDER
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add("snake")
    }

    // GENERATE NEW APPLE ONCE APPLE IS EATEN
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains("snake")) //MAKING SURE APPLES DON'T APPEAR ON THE SNAKE
        squares[appleIndex].classList.add("apple")
    }

    // ASSIGN FUNCTION TO KEYCODES = GAME CONTROLS
    function control(e) {
        squares[currentIndex].classList.remove("snake") //REMOVES THE CLASS OF SNAKE

        if (e.keyCode === 39){
            direction = 1 // RIGHT ARROW MOVES SNAKE RIGHT 1 DIV
        } else if (e.keyCode === 38){
            direction = -width // UP ARROW MOVES SNAKE UP BY MAKING SNAKE GO BACK 10 DIVS
        } else if(e.keyCode === 37){
            direction = -1 // LEFT ARROW MOVES SNAKE LEFT 1 DIV
        } else if(e.keyCode === 40){
            direction = +width //DOWN MOVES SNAKE DOWN BY 10 DIVS FROM CURRENT POSITION 
        }
    }

    document.addEventListener("keyup", control)
    startButton.addEventListener("click", startGame)

})