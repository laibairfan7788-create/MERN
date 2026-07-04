import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --green-dark: #1a6b2f;
    --green-mid: #2e8b47;
    --green-light: #4caf50;
    --green-pale: #e8f5e9;
    --gold: #f5a623;
    --dark: #111b13;
    --text: #2d3a2e;
    --muted: #6b7c6d;
    --white: #ffffff;
    --off-white: #f7faf7;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    color: var(--text);
    background: var(--white);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }

  .section-eyebrow {
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--green-mid);
    margin-bottom: .7rem;
  }
  .section-title {
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 900;
    color: var(--dark);
    line-height: 1.15;
  }
  .section-title span {
    color: var(--green-mid);
  }
  .divider {
    width: 52px;
    height: 4px;
    background: var(--gold);
    border-radius: 2px;
    margin: 1rem 0 1.5rem;
  }
  .divider-center {
    margin-left: auto;
    margin-right: auto;
  }
  .section-lead {
    color: var(--muted);
    font-size: 1.05rem;
    max-width: 600px;
    line-height: 1.7;
  }

  .fade-up {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity .65s ease, transform .65s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }
`