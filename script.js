let clickCount = 0;
let cps = 0;
let interval;
let countdownInterval;
let totalClicks = 0;
let timeLimit = 10; // Default time set to 10 seconds

const clickArea = document.getElementById('clickArea');
const clickCountDisplay = document.getElementById('clickCount');
const cpsDisplay = document.getElementById('cpsDisplay');
const timeButtons = document.querySelectorAll('.time-btn');
const instructions = document.querySelector('.instructions');

clickArea.addEventListener('click', () => {
  if (timeLimit > 0) {
    totalClicks++;
    clickCountDisplay.textContent = totalClicks;
  }
});

timeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    timeLimit = parseInt(button.getAttribute('data-time'));
    resetTest();
    instructions.textContent = `Test set for ${timeLimit}s! Click inside the box to start.`;
  });
});

function startTest() {
  totalClicks = 0;
  clickCountDisplay.textContent = totalClicks;
  cpsDisplay.textContent = "CPS: 0.0";
  let elapsedTime = 0;
  
  interval = setInterval(() => {
    elapsedTime++;
    cps = totalClicks / (elapsedTime || 1);  // Prevent division by 0
    cpsDisplay.textContent = `CPS: ${cps.toFixed(2)}`;
    
    if (elapsedTime >= timeLimit) {
      clearInterval(interval);
    }
  }, 1000);
}

function resetTest() {
  clearInterval(interval);
  clearInterval(countdownInterval);
  clickCount = 0;
  totalClicks = 0;
  clickCountDisplay.textContent = 0;
  cpsDisplay.textContent = "CPS: 0.0";
  instructions.textContent = `Click inside the box to start the test for ${timeLimit}s.`;
  
  clickArea.addEventListener('click', () => {
    startTest();
    instructions.textContent = `Test running... Time left: ${timeLimit}s`;
  });
}
