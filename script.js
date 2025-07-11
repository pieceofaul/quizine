const questions = [
  {
    image: "src/peyeum.jpeg",
    text: "This traditional snack from Bandung is made from fermented cassava. It has a sweet, soft texture and a slightly alcoholic flavor. What snack is it?",
    options: ["A. Gehu", "B. Comro", "C. Peyeum", "D. Getuk"],
    answers: [false, false, true, false]
  },
  {
    image: "src/cilok.jpeg",
    text: "This snack has a chewy ball texture because it is made from tapioca flour, and is usually served with spicy/sweet peanut sauce, what is this snack called?",
    options: ["A. Batagor", "B. Cilok", "C. Cimol", "D. Lotek"],
    answers: [false, true, false, false]
  },
  {
    image: "src/rendang.jpeg",
    text: "This dish comes from West Sumatra, where it is a slow-cooked meat with coconut milk and spices, and has a spicy flavor, what's the name of this food?",
    options: ["A. Rendang", "B. Ayam Pop", "C. Nasi Goreng", "D. Mie Goreng"],
    answers: [true, false, false, false]
  },
  {
    image: "src/gado-gado.jpeg",
    text: "This Indonesian dish is similar to a salad, but it is served with a rich peanut sauce. What is the name of this traditional food?",
    options: ["A. Lotek", "B. Rujak", "C. Gado-gado", "D. Bakwan"],
    answers: [false, false, true, false]
  },
  {
    image: "src/soto betawi.jpeg",
    text: "This traditional soup from Jakarta is made with beef in a creamy coconut milk broth. It’s rich, savory, and often served with rice, tomatoes, and lime. What is the name of this dish?",
    options: ["A. Soto Bandung", "B. Soto Betawi", "C. Cream Soup", "D. Bakso"],
    answers: [false, true, false, false]
  },
  {
    image: "src/nasi lemak.jpg",
    text: "This national dish of Malaysia features coconut milk rice, sambal, ikan bilis, egg, peanuts, and cucumber. It’s often wrapped in banana leaf. What is it called?",
    options: ["A. Nasi Lemak", "B. Nasi Campur", "C. Nasi Kerabu", "D. Nasi Kuning"],
    answers: [true, false, false, false]
  },
  {
    image: "src/abc.png",
    text: "This colorful shaved ice dessert is a Malaysian favorite. It includes red beans, sweet corn, cendol, and rose syrup. What is this dessert called?",
    options: ["A. Ice Cendol", "B. Ais Batu Campur (ABC)", "C. Ice Kacang", "D. Air Bandung"],
    answers: [false, true, false, false]
  },
  {
    image: "src/kuih bahulu.png",
    text: "This soft and fluffy sponge cake is a traditional Malay snack baked in brass molds over charcoal. It is often served during Eid.",
    options: ["A. Kuih Bahulu", "B. Kuih Cara", "C. Kuih Apam", "D. Kuih Seri Muka"],
    answers: [true, false, false, false]
  },
  {
    image: "src/nasi kerabu.png",
    text: "This Malaysian dish features blue rice colored with butterfly pea flower, served with ulam (raw veggies), sambal, and fried fish. What is it?",
    options: ["A. Nasi Dagang", "B. Nasi Lemak", "C. Nasi Kerabu", "D. Nasi Kandar"],
    answers: [false, false, true, false]
  },
  {
    image: "src/kuih bingka.jpg",
    text: "5. This traditional snack is made from steamed cassava or sweet potato, cut into cubes, and rolled in grated coconut. What is it?",
    options: ["A. Ondeh-Ondeh", "B. Kuih Talam", "C. Kuih Kosui", "D. Kuih Bingka"],
    answers: [false, false, false, true]
  }
];

let currentIndex = 0;
let correctAnswers = 0;
let answeredQuestions = [];

function loadQuestion() {
  questions.forEach(q => {
    const img = new Image();
    img.src = q.image;
  });

  const oldFinishBtn = document.querySelector(".finish-button");
  if (oldFinishBtn) {
    oldFinishBtn.remove();
  }
  
  const questionBox = document.querySelector(".question-box");
  const q = questions[currentIndex];

  document.querySelector(".question-image").src = q.image;
  document.querySelector(".question-text").innerText = q.text;
  document.querySelector(".question-number").innerText = `${currentIndex + 1} out of ${questions.length}`;

  const optionsContainer = document.querySelector(".options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.innerText = option;
    btn.dataset.index = index;
    btn.id = `option-${index}`;
    optionsContainer.appendChild(btn);
  });

  // Disable buttons appropriately
  document.getElementById("back-button").disabled = currentIndex === 0;
  document.getElementById("next-button").disabled = currentIndex === questions.length - 1;

  // Add event listeners after creating buttons
  const buttons = document.getElementsByClassName("option-button");
  
  if (answeredQuestions[currentIndex]) {
    for (let i = 0; i < q.answers.length; i++) {
      const optionBtn = document.getElementById(`option-${i}`);
      optionBtn.classList.add(q.answers[i] ? "correct" : "incorrect");
      optionBtn.disabled = true;
    }
    document.getElementById("next-button").disabled = false;
  }
  
  for (let btn of buttons) {
    btn.addEventListener("click", () => {
      let buttonIndex = parseInt(btn.dataset.index);
      answeredQuestions[currentIndex] = true;
      if (q.answers[buttonIndex]) {
        correctAnswers++;
      }
      // Apply green or red border
      for (let i = 0; i < q.answers.length; i++) {
        const optionBtn = document.getElementById(`option-${i}`);
        optionBtn.classList.add(q.answers[i] ? "correct" : "incorrect");
        optionBtn.disabled = true;
      }
      if (currentIndex != questions.length - 1) 
        document.getElementById("next-button").disabled = false;
    }); 

  }

  if (currentIndex === questions.length - 1) {
    const finishBtn = document.createElement("button");
    finishBtn.innerText = "Finish";
    finishBtn.className = "finish-button";
    finishBtn.style.display = "inline-block";
    finishBtn.style.padding = "10px";
    finishBtn.style.border = "3px solid black";
    finishBtn.style.borderRadius = "15px";
    finishBtn.style.fontFamily = "'Press Start 2P', cursive";

    questionBox.appendChild(finishBtn);

    finishBtn.addEventListener("click", () => {
      localStorage.setItem("correctAnswers", correctAnswers);
      window.location.href = "result.html";
    });
  }
  document.getElementById("next-button").disabled = !answeredQuestions[currentIndex];
}

window.onload = function () {
  const path = window.location.pathname;
  if (path.includes("questions.html")) {
    loadQuestion();
    
    document.getElementById("next-button").addEventListener("click", () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
      }
    });

    document.getElementById("back-button").addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
      }
    });
  } else if (path.includes("result.html")) {
    const points = document.getElementById("points");
    if (!points) return;
    
    const storedCorrectAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;
    points.innerText = `${storedCorrectAnswers} out of ${questions.length}`;

    const allTiers = document.querySelectorAll(".score-tier");
    allTiers.forEach(tier => tier.style.display = "none");
    allTiers.forEach(tier => tier.classList.add("show"));

    if (storedCorrectAnswers >= 9) {
      allTiers[0].style.display = "block"; // Rasa Royalty
    } else if (storedCorrectAnswers >= 6) {
      allTiers[1].style.display = "block"; // Spicy Scholar
    } else {
      allTiers[2].style.display = "block"; // Beginner Baker
    }
  }
}