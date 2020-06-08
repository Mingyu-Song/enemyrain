

let heartGet = document.getElementsByClassName("heart");        
let heartReduce = (n) => {
    if(n > -1){
        heartGet[n].style.backgroundPosition = "right";
    } else {
        toDoEnd = true;
        end();
    }
}





class Enemy {
    constructor(live, died){
        this.live = live;
        this.died = died;
        this.top = -54;
        let randomNum = Math.floor(Math.random()*755); 
        this.left = randomNum;
        this.makeEnemy();
        this.dropEnemy();
    }
    makeEnemy(){
        this.enemyDiv = document.createElement("div");
        this.enemyDiv.className = "enemy";
        gameBgd.appendChild(this.enemyDiv);
        this.enemyDiv.style.top = this.top + "px";
        this.enemyDiv.style.left = this.left + "px";
        this.enemyDiv.style.backgroundPosition = this.live;
    }
    dropEnemy(){
        setInterval(() => {
            if(this.enemyDiv.offsetTop < 600){
                if(this.enemyDiv.style.backgroundPosition == "right center"){
                    this.enemyDiv.style.transition = "1s 0s";
                    this.enemyDiv.style.opacity = "0.1";
                    setTimeout(() => {this.enemyDiv.remove()}, 600);
                    return
                } else if (hero.offsetLeft < this.enemyDiv.offsetLeft + 45 && hero.offsetLeft+35 > this.enemyDiv.offsetLeft && this.enemyDiv.offsetTop+54 > 546){
                    heart = heart - 1 ;
                    setTimeout(() => {this.enemyDiv.remove()}, 100);
                    heartReduce(heart);
                    return
                } else {let randomDown = Math.floor((Math.random()* 70) + 30);  
                    this.top += randomDown;
                    this.enemyDiv.style.top = this.top + "px";
                }
                    this.enemyDiv.style.transition = "1s";
            } else {
                heart = heart - 1 ;
                heartReduce(heart);
                this.enemyDiv.remove();
                return
            }
        }, 800)
    }
}






// let enemyNum = [];
// let createEnemy = () => {
    //     for(i = 0; i < 10; i++){
        //         enemyNum.push(enemyDiv);
        //         enemyNum[i].className = "enemy";
        //         enemyNum[i].style.left = randomNum+"px";
        //         enemyNum[i].style.top = "100px"; 
        //         let emy = enemyNum
        //         gameBgd.appendChild(enemyNum[i]);
        //     }
        // }
        // createEnemy();
        // console.log(enemyNum);
        