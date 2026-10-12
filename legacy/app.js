const LETTER = "hai princess nadira!💕first of all i want say sorry sebab baru nak mintak maaf kat nad,aya sebenarnya nak mintak maaf kat nad awal\"tapi di sebab kan nad dah unfollow aya semua cutoff aya semua so aya decide nak bagi masa kat nad dulu untuk tenangkan diri sblm aya mintakmaaf..tapi sekarang aya tengok nad dah okey dengan aya soap hai balik and like status aya memang terkejut gilaa aya happy sangat\"🥹tapi tak semestinya nad maafkan aya sepenuhnya right?aya nak mintak maaf sangat\" dekat nad cause mengumpt psl nad..aya tahu apa yg aya buat tu salah and tk sepatutnya cakap benda yg tk baik dkt blkng nad,aya sorok semua benda kat belakang korang and aya tak jujur langsung aya menipu..aya mintak maaf sangat🥹tolong semua maafkan aya balik?sorry sebab tk faham nadira langsung..sorry sebb tk faham keadaan fam nad macam mana..ik saying sorry won't change what i've done,but aya relly am sorry for everything..aya tk expect yg nad boleh terus maafkan aya macam nothing yg jadi sebab aya thu aya dh buat mistake,i hope one day nad betul\"maafkan aya and bagi peluang untuk betulkan semua bendani..honestly,aya rindu the old us and circle,i miss how we used to talk,laugh together,share stories and how everything used to be easy between us..aya nak kita macam dulu balik can?aya nak kita rapat balik like before this. aya thu benda ttkn terus jadi macam dulu dalam stu hari ,but im willing to try kalau nad pun masih nak..aya tanak kita dua ni  terys jdi strangers..sedangkan before this ni kita pernh rapat jadi macam hati aya tk tenangla..i miss those moments and i really wish we could start over again,with a better version of ourselves..and nad goodluck for you exam tau!i hope you can answer all the questions dengan dengan tenang and get yhe results that you've been dreaming of.do you best,jgn giveup and always believe in yourself.aya pray that your future will be filled with happiness,succes and so many beautiful things.semoga everything urusan nad di permudahkan,semoga berjaya dlm apa sahaja yg nad capai and semoga all your hard work pays off one day.i'? rooting for you,always!.i also pray for you and your whole fam,semoga family nadira setiasa faham nadira and beri kasih sayang sepenuhnya.lastly i hope nad sellu dikelilingi friends and bf yg ikhlas sygkan nad yg appreciate your existence,yg ada dengan kau masa kau happy or sad,you deserve to be loved properly,princess!.i hope lepasni kita pun boleh appreciate each other better.i'm sorry for hurting you,nadira, i can't promise that i'm perfect,but i can promise to learn from my mistakes and be a better friend.thank you for every memory we've shared.i really hope we can fix this slowly and be close again like we used to.i miss you nadira,i miss uss,and genuinely wish nothing the best for you. no matter what happens after this,i'll always pray for your happiness and succes.take care of you self okey?and goodluck for everything in your life,i hope sangat one day kita boleh macam dulu balik💕im so sorry for everything gemoynadira,tq sebab baca semua ni hihi!i love you so much !";
const PHOTO = "img/WhatsApp%20Image%202026-10-12%20at%205.18.23%20PM.jpeg";
const app = document.getElementById("app");
let screen = "opening";
const stack = [];

const pill = (label, action, extra = "") => `<button class="pill ${extra}" type="button" data-action="${action}">${label}</button>`;
const back = () => pill("Back", "back", "small back-inline");

const screens = {
  opening: () => `<section class="screen center opening"><h1 class="script"><span class="write">I'm Sorry, Love...</span></h1><p>A space to clear the air, share my heart, and bridge the gap between us</p>${pill("Start", "envelope")}</section>`,
  envelope: () => `<section class="screen center envelope-screen"><div class="envelope" role="img" aria-label="A closed letter"><span class="envelope-flap"></span></div><div class="choice-stack">${pill("Read", "letter", "small")}${pill("I need more time", "time", "small")}</div></section>`,
  time: () => `<section class="screen center space-screen"><h1 class="script"><span class="write">Take all the time you need to process, love</span></h1><div class="space-row"><p class="space-message">I respect your space. Please take the time you need.</p><div class="character-space" aria-hidden="true"></div></div>${back()}</section>`,
  letter: () => `<section class="screen letter-screen"><div class="letter-wrap"><h1 class="script"><span class="write">I'm Sorry</span></h1><figure class="memory"><img src="${PHOTO}" alt="Two people photographed together outdoors at night" /></figure><p class="letter-intro">For you, Nadira.</p><p class="letter-copy" id="letter-copy"></p><div class="letter-actions">${back()}${pill("Continue", "question", "small")}</div></div></section>`,
  question: () => `<section class="screen center question"><h1 class="script"><span class="write">Will you forgive me, my love?</span></h1><div class="question-row">${pill("Yes", "yes", "small")}<div class="character-space" aria-hidden="true"></div>${pill("I need more time", "time", "small")}</div>${back()}</section>`,
  yes: () => `<section class="screen center yes"><h1 class="script"><span class="write">Yesss!!!</span></h1><div class="character-space" aria-hidden="true"></div><p>Thank you, Nadira. We can take things slowly. 💙</p>${pill("Continue", "promise", "small")}${back()}</section>`,
  promise: () => `<section class="screen center promise"><h1 class="script"><span class="write">I Promise</span></h1><div class="character-space" aria-hidden="true"></div><p>I'll learn from my mistakes and try to be a better friend.</p>${back()}</section>`
};

function render(restoreScroll = 0) {
  app.innerHTML = screens[screen]();
  if (screen === "letter") document.getElementById("letter-copy").textContent = LETTER;
  requestAnimationFrame(() => window.scrollTo(0, restoreScroll));
}

app.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "back") {
    const previous = stack.pop();
    if (!previous) return;
    screen = previous.screen;
    render(previous.scroll);
    return;
  }
  stack.push({screen, scroll: window.scrollY});
  screen = action;
  render();
});

render();
