'use strict';

const questionSet = [
    {
        number: 1,
        text:`What style of game (genre) is Dota 2?`,
        ans1:`FPS (First Person Shooter)`,
        ans2:`MOBA (Multiplayer Online Battle Arena)`,
        ans3:`Adventure Game`,
        ans4:`MMO (Massively Multiplayer Online)`,
        ans5:`Fighting Game`
    },
    {
        number: 2,
        text: `How much is Dota 2 to purchase?`,
        ans1:`$9.99`,
        ans2:`$19.99`,
        ans3:`$14.99`,
        ans4:`$4.99`,
        ans5:`Free to play`
    },
    {
        number: 3,
        text:`What are the correct items to build Arcane Boots?`,
        ans1:`Boots of Speed + Ring of Basilius`,
        ans2:`Boots of speed + Points Booster`,
        ans3:`Boots of Speed + Void Stone`,
        ans4:`Boots of speed + Energy Booster`,
        ans5:`Boots of Speed + Arcane Boots Recipe`,
    },
    {
        number: 4,
        text:`Which one of these is not a Dota 2 Character?`,
        ans1:`Dark Seer`,
        ans2:`Elder Titan`,
        ans3:`Oracle`,
        ans4:`Visage`,
        ans5:`Flame Spirit`,
    },
    {
        number: 5,
        text:`Which one of these items grants the ability to see invisible units?`,
        ans1:`Gem of True Sight`,
        ans2:`Ultimate Orb`,
        ans3:`Observer Ward`,
        ans4:`Smoke of Deceit`,
        ans5:`Eye of Skadi`
    },
    {
        number: 6,
        text:`What does "Dota" stand for?`,
        ans1:`Defense of the Aliens`,
        ans2:`Farming Simulator Rage Edition`,
        ans3:`Defense of the Ancients`,
        ans4:`Noobs and Rage Quitters Everywhere`,
        ans5:`Defense of the Asians`
    },
    {
        number: 7,
        text:`Who is the Maker of Dota 2?`,
        ans1:`Valve`,
        ans2:`Blizzard Entertainment`,
        ans3:`Lucas Arts`,
        ans4:`20th Century Fox`,
        ans5:`4K0F Gaming`
    },
    {
        number: 8,
        text:`What level do you get your ultimate ability?`,
        ans1:`5`,
        ans2:`8`,
        ans3:`4`,
        ans4:`10`,
        ans5:`6`
    },
    {
        number: 9,
        text:`What is Roshan?`,
        ans1:`Keeper to the Dungeon of Death`,
        ans2:`Holder of the Great Sword of Destiny`,
        ans3:`Holder of the Aegis of Immortality`,
        ans4:`A Cute Passive Hero`,
        ans5:`A Huge Statue at the Center of the Map.`
    },
    {
        number: 10,
        text:`How many lanes are there to farm lane creeps?`,
        ans1:`5`,
        ans2:`2`,
        ans3:`4`,
        ans4:`3`,
        ans5:`6`
    }
];

const ANSWERS = [
    `MOBA (Multiplayer Online Battle Arena)`,
    `Free to play`,
    `Boots of speed + Energy Booster`,
    `Flame Spirit`,
    `Gem of True Sight`,
    `Defense of the Ancients`,
    `Valve`,
    `6`,
    `Holder of the Aegis of Immortality`,
    `3`
];

let questionNum = 1;

let correctAnswers = 0;

let score = 0;

function homePage() {
    return `
    <header role= "banner" class ="navlogo">
        <div>
            <a href="index.html">
            <img src="https://static.wixstatic.com/media/3aec40_4c37028bbd9c4ee6a0626178aa4554d7.gif" 
            alt="bounty rune button">
            </a>
        </div>
    </header>
    <div id="container">
        <section role="main" id="startQuiz">
            <div class="first">
                <h1>Dota 2 Quiz</h1>      
                <h2>Ready to prove that you're a 9k player??</h2>
            </div>
        </section>
        <button id="js-start-button"> Let's go!!</button>
    </div> `;
}

function questionTemplate(correctAnswers, question, questionAnswered) {
    return `
    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/10</span>
    </div>
    <main role="main"> 
        <form>
            <fieldset>
                <legend id="question">${question.text}</legend>
                <label>
                    <input class="answer" type="radio" name="option" checked></input>
                    <span class="checkmark">${question.ans1}</span>
                </label>

                <label>
                    <input class="answer" type="radio" name="option" required></input>
                    <span class="checkmark">${question.ans2}</span>
                </label>

                <label>
                    <input class="answer" type="radio" name="option" required></input>
                    <span class="checkmark">${question.ans3}</span>
                </label>

                <label>
                    <input class="answer" type="radio" name="option" required></input>
                    <span class="checkmark">${question.ans4}</span>
                </label>

                <label>
                    <input class="answer" type="radio" name="option" required></input>
                    <span class="checkmark">${question.ans5}</span>
                </label>
            </fieldset>
            <button id="js-submit-button">Submit</button>
        </form>
    </main>
    `;
}

function handleStartButton() {
    $('#js-start-button').click(function(event) {
        nextQuestion();
    });
}

function handleSubmitButton() {
    $('#container').on('click', '#js-submit-button', function(event) {
        event.preventDefault()
        
        const answer = $('input:checked').siblings('span');

        const userIsCorrect = checkUserAnswer(answer);
        
        if(userIsCorrect) {
            generateCorrectFeedback();
            
        } else {
            generateIncorrectFeedback();
        }
    });
}

function handleNextButton() {
    $('#container').on('click', '#js-next-button', function(event) {
  
        if(questionNum === 10) {
            createResultsPage(correctAnswers);
        } else {
            renderQuestion();
            nextQuestion();
        }
    });
}

function handleRestartButton() {
    $('#container').on('click', '#js-restart-button', function(event) {
        questionNum = 1;

        correctAnswers = 0;

        nextQuestion();
  });
}

function nextQuestion() {
    const question = questionSet[questionNum - 1];
    
    const questionsAnswered = questionNum - 1;
    
    $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
    if(answer.text() === ANSWERS[questionNum - 1]) {
        return true;
    } else {
        return false;
    }
}

function generateCorrectFeedback() {
    $('#container').html(correctFeedback);
    renderCorrectAnswers();
}

const correctFeedback = `
    <section class="feedback-page" role="main">
        <h2>That's Right!</h2>
        <img src="https://thumbs.gfycat.com/ScholarlyLividFish-max-1mb.gif" alt ="AntiMage dancing!">
    </section>
    <button id="js-next-button">Next</button>
`;

function generateIncorrectFeedback() {
    $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
    return `
    <section class="feedback-page" role="main">
        <h2>Awhh So Close! It was ${ANSWERS[questionNum - 1]}!</h2>
        <img src="https://steamuserimages-a.akamaihd.net/ugc/401181547227153035/037CADB27F8BBF3775CFE424610972F03DA322DA/" alt="Axe Dying!">
    </section>
    <button id="js-next-button">Next</button>
  `;
}


function changeQuestionNumber () {
    questionNum ++;
  $('.questionNumber').text(questionNum+1);
}

function changeScore () {
  score ++;
  $('.score').text(score);
}



function renderQuestion() {
    questionNum++;
}
  
function renderCorrectAnswers() {
    correctAnswers++;
}

function createResultsPage(correctAnswers) {
    $('#container').html(`
    <main role="main">
        <section class="result">
            <div class="image">
                <img src="https://i.imgur.com/8KBwmLc.gif" alt="Hero Smiling!">
            </div>
            <h2>Are you that 9k player or do you need to practice with more bots???</h2>
            <p class="finalScore"> Final Score: <span class="score">${correctAnswers}</span>/10</p>
        </section>
        <button role="button" id="js-restart-button">Try Again??</button>
    </main>
    `);
}

function handleButtons() {
    handleStartButton();
    handleSubmitButton();
    handleNextButton();
    handleRestartButton();
}
  
handleButtons();


