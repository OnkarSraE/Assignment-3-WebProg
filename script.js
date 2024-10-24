const startBtn = document.getElementById('start');
const infoBox = document.getElementById('infobox');
const continueBtn = document.getElementById('continue');
const quitBtn = document.getElementById('quit');
const quizBox = document.getElementById('quizbox');
const optionList = document.getElementById('optionlist');


//if start quiz button is clicked

startBtn.onclick = () => {
    infoBox.classList.add("activeInfo");
}

//if exit button is clicked
quitBtn.onclick = () => {
    infoBox.classList.remove("activeInfo");
}

//if continue button is clicked
continueBtn.onclick = () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    questionCounter(1);
}

let quesCount = 0;
let quesNum = 1;

const nextBtn = document.getElementById('nextbtn');

//on clicking next button
nextBtn.onclick = () => {
    if(quesCount < questions.length -1){
        quesCount++;
        quesNum++;
        showQuestions(quesCount);
        questionCounter(quesNum);
    }else {
        console.log("Questions completed");
        
    }
    
}

//getting ques and options from question.js

function showQuestions(index){
    const quesText = document.getElementById('questext');
    const optionList = document.getElementById('optionlist');
    let quesTag = '<span>' + questions[index].num + ". " + questions[index].question + '</span>';
    let optionTag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    quesText.innerHTML = quesTag;
    optionList.innerHTML = optionTag;

    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[quesCount].answer;
    let allOptions = optionList.children.length;
    if(userAnswer == correctAnswer){
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        //show correct answer if chosen wrong answer 
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }

    }

    //after answer is selcted disable all other options
    for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
    }
}


//for question counter
function questionCounter(index) {
    const quesCounter = document.getElementById('questioncounter');
    let quesCounterTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>'
    quesCounter.innerHTML = quesCounterTag;
}
