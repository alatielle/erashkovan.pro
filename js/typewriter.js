(function() {
  document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.querySelector(".typewriter");

    const DEFAULT_PAUSE = 100;
    const PUNCTUATION_PAUSE = 350;
    const NEW_PARAGRAPH_PAUSE = 700;

    const dataText = [...typewriter.children]
      .filter(child => child instanceof HTMLParagraphElement)
      .map(p => p.innerHTML.trim().replace(/\s{2,}/g, " "));

    typewriter.innerHTML = "";

    function type(p, text, i, callback) {
      if (i < text.length) {
        let pause = DEFAULT_PAUSE;
        const currentChar = text.charAt(i);

        if (currentChar === "<") {
          let tagLength = text.substring(i, text.length).indexOf(">");

          if (tagLength !== -1) {
            i += tagLength;
            pause = 0;
          }
        } else if (currentChar === "&") {
          let mnenonicLength = text.substring(i, text.length).indexOf(";");

          if (mnenonicLength !== -1) {
            i += mnenonicLength;
            pause = 0;
          }
        } else if (/[,:;]/.test(currentChar)) {
          pause = PUNCTUATION_PAUSE;
        }

        p.innerHTML = text.substring(0, i + 1);

        setTimeout(() => {
          type(p, text, i + 1, callback);
        }, pause);
      } else {
        setTimeout(callback, NEW_PARAGRAPH_PAUSE);
      }
    }

    function startTextAnimation(i) {
      if (dataText[i] && i < dataText[i].length) {
        let p = document.createElement("p");

        typewriter.append(p);
        type(p, dataText[i], 0, () => startTextAnimation(i + 1));
      }
    }

    startTextAnimation(0);
  });
})();
