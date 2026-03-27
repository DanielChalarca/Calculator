# Calculator

A retro-styled browser calculator built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies — just the web platform.

## Overview

The calculator supports basic arithmetic operations through both mouse clicks and keyboard input. The UI is designed around a physical calculator aesthetic with a D-pad style operator layout and a green LCD-style display.

## Project Structure

```
calculator/
└── src/
    ├── index.html
    ├── styles.css
    ├── main.js
    └── img/
        └── background.jpg
```

## Features

- Addition, subtraction, multiplication, and division
- Keyboard support (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Escape`)
- Clear button to reset the display
- Input validation — only numeric expressions are evaluated

## Usage

Open `src/index.html` directly in any modern browser. No build step or server required.

## Keyboard Shortcuts

| Key       | Action              |
|-----------|---------------------|
| `0–9`     | Input digit         |
| `+ - * /` | Input operator      |
| `Enter`   | Evaluate expression |
| `Escape`  | Clear display       |

## Security

User input is validated against a strict allowlist (`/^[0-9+\-*/×÷.\s]+$/`) before evaluation. Raw `eval()` is not used.

## Browser Support

Compatible with all modern browsers (Chrome, Firefox, Safari, Edge).
