const englishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const spanishAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const valencianAlphabet = ["a", "b", "c", "ç", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "a", "b", "c", "ç", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// DECODER

const caesarCipher = (function() {

  const decoder = (encodedStr, positions, alphabet) => {
    encodedStr = encodedStr.toLowerCase();
    let decoded = [];
    for (let char of encodedStr) {
      if (char === " ") {
        decoded.push(" ");
      } else {
        let charIndex = alphabet.indexOf(char);
        decoded.push(alphabet[charIndex + positions]);
      }
    }
    print.printDecoded(decoded.join(""));
    decoded.splice(0);
  }

  const printAll = (encodedStr, alphabet) => {
    let letters;

    if (alphabet === englishAlphabet) {
      letters = 25;
    } else if (alphabet === spanishAlphabet || alphabet === valencianAlphabet) {
      letters = 26;
    }

    for (let i = 0; i <= letters; i++) {
      print.printPosition(i);
      decoder(encodedStr, i, alphabet);
    }
  }
  return {
    printAll
  };
})();

// TAKE PARAMETERS FROM DOM AND CALL DECODER
const takeParameters = (function() {
  const encodedStr = document.querySelector("#encodedStr");
  const decodeButton = document.querySelector("#decodeButton");
  const restart = document.querySelector("#restart");

  const decode = () => {
    decodeButton.addEventListener("click", () => {
      let alphabetChoosed;
      if (document.getElementById("english").checked) {
        alphabetChoosed = englishAlphabet;
      } else if (document.getElementById("spanish").checked) {
        alphabetChoosed = spanishAlphabet;
      } else if (document.getElementById("valencian").checked) {
        alphabetChoosed = valencianAlphabet;
      }
      if (encodedStr.checkValidity()) {
        caesarCipher.printAll(encodedStr.value, alphabetChoosed);
      }
    }, {once: true});
  }
  restart.addEventListener("click", () => {
    cleaner.clean();
  });
  return {
    decode
  }
})();
takeParameters.decode();

const cleaner = (function() {
  const clean = () => {
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#encodedStr").value = "";
    document.getElementById("english").checked = false;
    document.getElementById("spanish").checked = false;
    document.getElementById("valencian").checked = false;
    takeParameters.decode();
  }
  return {
    clean
  }
})();

// PRINT RESULT TO DOM

const print = (function() {
  const results = document.querySelector("#results");

  const printPosition = (position) => {
    const index = document.createElement("h4");
    index.textContent = position;
    results.appendChild(index);
  }

  const printDecoded = (decodedText) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = decodedText;
    results.appendChild(paragraph);
  }
  return {
    printPosition,
    printDecoded
  }
})();
