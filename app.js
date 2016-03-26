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
  html: true,
  xhtmlOut: true
});

domready(() => {
  const write = (content) => {
    document.body.innerHTML = content;
    document.body.style.whiteSpace = 'normal';
  };
  const stored = window.localStorage.getItem(window.location.pathname);

  if (null !== stored) {
    try {
      const page = JSON.parse(stored);

      if (page.lastModified === document.lastModified) {
        return write(page.content);
      }
    } catch (__) {}
  }

  const page = {
    lastModified: document.lastModified,
    content: md.render(document.body.innerHTML.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1'))
  };
  window.localStorage.setItem(window.location.pathname, JSON.stringify(page));

  return write(page.content);
});
