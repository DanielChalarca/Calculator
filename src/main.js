const display = document.querySelector('.resultados');
const keys = document.querySelectorAll('.teclas');
const equalBtn = document.querySelector('.igual');
const clearBtn = document.querySelector('.clear');
const operatorBtns = document.querySelectorAll('.signos');
const bootScreen = document.querySelector('.boot-screen');

window.addEventListener('DOMContentLoaded', () => {
  if (!bootScreen) return;

  bootScreen.style.opacity = '1';

  const roar = new Audio('./audio/freesound_community-dragon-quick-roar-mammel-94666.mp3');

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

// Operator symbol map to safe JS equivalents
const operatorMap = { '×': '*', '÷': '/' };

keys.forEach(key => {
  key.addEventListener('click', () => {
    display.textContent += key.textContent;
  });
});

operatorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    display.textContent += btn.textContent;
  });
});

equalBtn.addEventListener('click', evaluate);

clearBtn.addEventListener('click', () => {
  display.textContent = '';
});

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

function evaluate() {
  try {
    const raw = display.textContent;

    // Only allow safe characters: digits, operators, dots, and spaces
    if (!/^[0-9+\-*/×÷.\s]+$/.test(raw)) {
      display.textContent = 'Error';
      return;
    }

    // Replace display symbols with JS operators
    const expression = raw
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Use Function constructor instead of eval for slightly safer scope isolation
    const result = new Function('return ' + expression)();
    display.textContent = result;
  } catch {
    display.textContent = 'Error';
  }
}
