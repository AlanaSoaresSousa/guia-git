lucide.createIcons();



// ----------- camada de outras guias -------
function irParaGithub() {
  window.open("https://github.com", "_blank");
} 


// ---------------------pagina Inicial---------------------


function codeHTML(lines) {
  return lines
    .map(([cls, text]) =>
      cls === "path-terminal"
        ? `<p><span class="path-terminal">${text}</span></p>`
        : `<p class="${cls}">${text}</p>`,
    )
    .join("");
}

const commands = {
  status: {
    title: "git status",
    description:
      "Exibe o estado atual do diretório de trabalho e mostra quais arquivos foram modificados, preparados ou ainda não rastreados.",
    code: [
      ["path-terminal", "$ git status"],
      ["color-gray", "On branch main"],
      ["color-red", "modified: src/app.js"],
      ["color-red", "modified: style.css"],
      ["color-green-light", "nothing committed yet"],
    ],
  },
  add: {
    title: "git add .",
    description:
      "Move as alterações escolhidas para a staging area, preparando exatamente o que será incluído no próximo commit.",
    code: [
      ["path-terminal", "$ git add ."],
      ["color-gray", "Changes to be committed:"],
      ["color-green-light", "new file: index.html"],
      ["color-green-light", "modified: app.js"],
    ],
  },
  commit: {
    title: 'git commit -m "mensagem"',
    description:
      "Cria um snapshot permanente das alterações que estão na staging area e adiciona esse ponto ao histórico do projeto.",
    code: [
      ["path-terminal", '$ git commit -m "feat: dashboard"'],
      ["color-green-light", "[main a81c2e9]"],
      ["color-gray", "2 files changed"],
      ["color-green-light", "create mode 100644 index.html"],
    ],
  },
  branch: {
    title: "git branch",
    description:
      "Lista, cria ou remove branches. Branches permitem desenvolver funcionalidades isoladamente sem alterar diretamente a linha principal.",
    code: [
      ["path-terminal", "$ git branch"],
      ["color-green-light", "* main"],
      ["color-purple", "  feature/auth"],
      ["color-purple", "  feature/ui"],
    ],
  },
  push: {
    title: "git push origin main",
    description:
      "Envia seus commits locais para o repositório remoto, como um repositório hospedado no GitHub.",
    code: [
      ["path-terminal", "$ git push origin main"],
      ["color-gray", "Enumerating objects: 8"],
      ["color-gray", "Writing objects: 100%"],
      ["color-green-light", "Everything up-to-date."],
    ],
  },
  pull: {
    title: "git pull",
    description:
      "Busca as alterações mais recentes do repositório remoto e integra essas mudanças ao seu branch local.",
    code: [
      ["path-terminal", "$ git pull"],
      ["color-gray", "Updating a81c2e9..f92ab31"],
      ["color-gray", "Fast-forward"],
      ["color-green-light", "3 files changed"],
    ],
  },
};

const buttons = document.querySelectorAll(".command-button");
const title = document.getElementById("commandTitle");
const description = document.getElementById("commandDescription");
const code = document.getElementById("commandCode");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const data = commands[button.dataset.command];
    if (!data) return;

    document.querySelector(".command-button.active")?.classList.remove("active");
    button.classList.add("active");

    title.textContent = data.title;
    description.textContent = data.description;
    code.innerHTML = codeHTML(data.code);
  });
});




// ---------------------pagina sobre---------------------

function copiarPix() {
  const chave = document.getElementById("chavePix").textContent;

  navigator.clipboard.writeText(chave);

}

function darEstrela() {
  window.open(
    "https://github.com/euandr/guia-git",
    "_blank"
  );
}


function compartilharProjeto() {
  console.log(navigator.share);

  if (navigator.share) {
    navigator.share({
      title: "GitBase",
      text: "Confira o GitBase, um projeto para aprender Git e GitHub!",
      url: window.location.href
    });
  } else {
    alert("Seu navegador não suporta compartilhamento.");
  }
}

// ---------------------pagina guias---------------------

const guideToggles = document.querySelectorAll(".botao-guia");

function closeGuide(toggle, content) {
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector(".indicador-guia").textContent = "+";
  content.style.height = `${content.scrollHeight}px`;
  requestAnimationFrame(() => {
    content.style.height = "0px";
  });
  content.addEventListener("transitionend", () => {
    content.hidden = true;
  }, { once: true });
}

function openGuide(toggle, content) {
  content.hidden = false;
  content.style.height = "0px";
  toggle.setAttribute("aria-expanded", "true");
  toggle.querySelector(".indicador-guia").textContent = "−";
  requestAnimationFrame(() => {
    content.style.height = `${content.scrollHeight}px`;
  });
  content.addEventListener("transitionend", () => {
    content.style.height = "auto";
  }, { once: true });
}

guideToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = document.getElementById(toggle.getAttribute("aria-controls"));
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    guideToggles.forEach((otherToggle) => {
      if (otherToggle === toggle || otherToggle.getAttribute("aria-expanded") !== "true") return;
      closeGuide(otherToggle, document.getElementById(otherToggle.getAttribute("aria-controls")));
    });

    if (isOpen) {
      closeGuide(toggle, content);
    } else {
      openGuide(toggle, content);
    }
  });
});