// class Hero {

// }


let hero = document.getElementById('hero'); //히어로
let heart;

let startBgd = document.querySelector('.start-bg'); //시작버튼이 있는 배경
let startBtn = document.querySelector('.start-btn'); //시작버튼

let gameBgd = document.querySelector('#bg'); //게임 배경

let score = 0;  //로드시 첫 스코어값
let yourScore = document.getElementsByClassName('yourScore')[0]; //업데이트 되는 score값 입력되는 곳
let highScore = document.querySelector('.high');    //최고점수 입력되는 곳



//     시작시 , 스타트버튼 누를시 작동하는 함수
let start = () => {
    startBgd.style.display ="none";         //시작시 흐려진 배경을 꺼주고
    hero.style.visibility = "visible";      //히어로를 보이게 만들어준다.
    hero.style.left = "382.52px";           //히어로 위치   
    heart = 3;                              //시작시 하트수 초기화
    score = 0;                              //스코어 초기화
    yourScore.innerHTML= score;             //초기화된 스코어 HTML에 입력
    highScore.innerHTML = sessionStorage.getItem("highscore");  //세션스토리지에 저장된 highscore 를 high HTML에 입력
    for(i = 0; i < 3; i++){                             //하트의 배경 포지션 전부 왼쪽으로 해서 채워진 하트.
        heartGet[i].style.backgroundPosition = "left";
    }
    setInterval(() => new Enemy("left", "right"), 1000);    //setInterval함수는 일정 시간간격으로 즉시 실행하는 함수.
    document.addEventListener('keydown', move);        //끝났을때 멈춘 이벤트 리스너를 켜준다.
}

//   죽었을 때 함수.
let end = () => {                           
    startBgd.style.display = "flex";        //시작시 흐려진 배경을 켜주고
    startBtn.innerHTML= "<div>RESTART</div>";   //start를 Restart로 바꿔준다.
    document.removeEventListener('keydown', move);  //키보드 이벤트 리스너를 꺼주고
    if(highScore.innerHTML < score){                //현재 적힌 highScore가 현 Score보다 작은지 판단.
        highScore.innerHTML = score;            //작다면 hightscore에 현 Score 입력
        sessionStorage.setItem("highscore", score);    //세션 스토리지 "highscore"에 현 score값을 입력
    }
}



// var audio = new Audio();       오디오는 넣었는데 계속 오류가 발생해서 시끄러워서 뺌 ..



startBtn.addEventListener('click', start);


// 히어로 공격 함수

let attack = (px) => {              
    let bombDiv = document.createElement("div");
    hero.style.backgroundImage = "url(images/attack.png)";
    bombDiv.className = "bomb";
    bombDiv.style.left = px + 12.5 + "px";
    bombDiv.style.bottom = "54px";    //캐릭터 위에 위치.
    gameBgd.appendChild(bombDiv);
    setInterval(() => {                                                 //위로 올라가게.
        let bombup = bombDiv.offsetTop;
        if(bombup < -17 ){
            bombDiv.remove();
        } else{   
            bombMove = bombup - 4 + "px";
            bombDiv.style.top = bombMove;
            let enemyList = document.getElementsByClassName("enemy");
            for(i = 0; i < enemyList.length; i++){
                if(bombDiv.offsetLeft + 10 > enemyList[i].offsetLeft && bombDiv.offsetLeft < enemyList[i].offsetLeft+ 45 && bombDiv.offsetTop < enemyList[i].offsetTop+54){
                    // audio.src = "audio/dying.wav";
                    // audio.play();
                    // audio.loop = false;
                    bombDiv.remove();
                    enemyList[i].style.transition = "none";
                    enemyList[i].style.backgroundPosition="right center";
                    score += 10;
                    yourScore.innerHTML = score;
                }
            }    
        }}, 10);
}

// 히어로 움직임 함수
let move = (e) => {
    let heroPxLeft = hero.offsetLeft;
    if(e.keyCode === 37 && heroPxLeft > 7){
        hero.style.left = heroPxLeft - 25 + "px";
        hero.style.backgroundPosition = "70px";
    }
    else if(e.keyCode === 39  && heroPxLeft < 757){
        hero.style.left = heroPxLeft + 25 + "px";
        hero.style.backgroundPosition = "35px";
    }
    else if(e.keyCode === 38){
        hero.style.backgroundPosition = "105px";
    }
    else if(e.keyCode === 40){
        hero.style.backgroundPosition = "0px";
    }
    else if(e.keyCode === 32){
        attack(heroPxLeft);
    }
}



let afterAttack = (ev) => {
    if(ev.keyCode === 32){
        hero.style.backgroundImage = "url(images/hero.png)";
        hero.style.backgroundPosition = "105px";
    }
}


document.addEventListener('keyup', afterAttack);