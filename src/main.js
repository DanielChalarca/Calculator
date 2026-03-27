// DOM references
const display = document.querySelector('.resultados');
const keys = document.querySelectorAll('.teclas');
const equalBtn = document.querySelector('.igual');
const clearBtn = document.querySelector('.clear');
const operatorBtns = document.querySelectorAll('.signos');
const bootScreen = document.querySelector('.boot-screen');

// Boot sequence — scanline animation plays for 3.2s then fades out
window.addEventListener('DOMContentLoaded', () => {
  if (!bootScreen) return;

  bootScreen.style.opacity = '1';

  const roar = new Audio('./audio/freesound_community-dragon-quick-roar-mammel-94666.mp3');

  // Browsers block autoplay without prior user interaction
  const playRoar = () => {
    roar.play();
    window.removeEventListener('click', playRoar);
    window.removeEventListener('keydown', playRoar);
  };

  window.addEventListener('click', playRoar, { once: true });
  window.addEventListener('keydown', playRoar, { once: true });

  setTimeout(() => {
    bootScreen.classList.add('fade-out');
    setTimeout(() => bootScreen.remove(), 800);
  }, 3200);
});

// Digit input
keys.forEach(key => {
  key.addEventListener('click', () => {
    display.textContent += key.textContent;
  });
});

// Operator input
operatorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    display.textContent += btn.textContent;
  });
});

equalBtn.addEventListener('click', evaluate);

clearBtn.addEventListener('click', () => {
  display.textContent = '';
});

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'Enter') {
    evaluate();
  } else if (key === 'Escape') {
    display.textContent = '';
  } else if (/[0-9+\-*/.×÷]/.test(key)) {
    display.textContent += key;
  }
});

// Validates input against an allowlist, maps display symbols to JS operators,
// then evaluates using Function() to avoid eval()'s global scope exposure
function evaluate() {
  try {
    const raw = display.textContent;

    if (!/^[0-9+\-*/×÷.\s]+$/.test(raw)) {
      display.textContent = 'Error';
      return;
    }

    const expression = raw
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    display.textContent = new Function('return ' + expression)();
  } catch {
    display.textContent = 'Error';
  }
}
