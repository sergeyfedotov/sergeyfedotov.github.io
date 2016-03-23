import MarkdownIT from 'markdown-it';
import hljs from 'highlight.js';
import domready from 'domready';
import './app.css';

const md = new MarkdownIT({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  },
  xhtmlOut: true
});

domready(() => {
  document.body.innerHTML = md.render(document.body.textContent);
  document.body.style.whiteSpace = 'normal';
});
