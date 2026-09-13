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

    document
      .querySelector(".command-button.active")
      ?.classList.remove("active");
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
  window.open("https://github.com/euandr/guia-git", "_blank");
}

function compartilharProjeto() {
  console.log(navigator.share);

  if (navigator.share) {
    navigator.share({
      title: "GitBase",
      text: "Confira o GitBase, um projeto para aprender Git e GitHub!",
      url: window.location.href,
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
  content.addEventListener(
    "transitionend",
    () => {
      content.hidden = true;
    },
    { once: true },
  );
}

function openGuide(toggle, content) {
  content.hidden = false;
  content.style.height = "0px";
  toggle.setAttribute("aria-expanded", "true");
  toggle.querySelector(".indicador-guia").textContent = "−";
  requestAnimationFrame(() => {
    content.style.height = `${content.scrollHeight}px`;
  });
  content.addEventListener(
    "transitionend",
    () => {
      content.style.height = "auto";
    },
    { once: true },
  );
}

guideToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = document.getElementById(
      toggle.getAttribute("aria-controls"),
    );
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    guideToggles.forEach((otherToggle) => {
      if (
        otherToggle === toggle ||
        otherToggle.getAttribute("aria-expanded") !== "true"
      )
        return;
      closeGuide(
        otherToggle,
        document.getElementById(otherToggle.getAttribute("aria-controls")),
      );
    });

    if (isOpen) {
      closeGuide(toggle, content);
    } else {
      openGuide(toggle, content);
    }
  });
});

const gitReferenceData = {
  init: {
    title: "git init",
    description:
      "Cria um novo repositório Git na pasta atual, preparando-a para registrar versões do projeto.",
    usage: "git init",
    example: "mkdir meu-projeto\ncd meu-projeto\ngit init",
    terminal:
      "$ git init\n\nInitialized empty Git repository in /projetos/meu-projeto/.git/",
  },
  status: {
    title: "git status",
    description:
      "Mostra o estado atual do repositório, incluindo arquivos modificados, preparados e não rastreados.",
    usage: "git status",
    example: "git status",
    terminal:
      "$ git status\n\nOn branch main\nnothing to commit, working tree clean",
  },
  config: {
    title: "git config",
    description:
      "Define opções do Git, como o nome e o e-mail usados nos commits.",
    usage: 'git config --global user.name "Seu nome"',
    example: 'git config --global user.email "voce@email.com"',
    terminal: '$ git config --global user.name "Ana Silva"\n\n',
  },
  add: {
    title: "git add",
    description:
      "Adiciona arquivos à staging area, selecionando as alterações que entrarão no próximo commit.",
    usage: "git add arquivo.txt",
    example: "git add .",
    terminal: "$ git add arquivo.txt\n\n$",
  },
  commit: {
    title: "git commit",
    description:
      "Registra no histórico as alterações que foram colocadas na staging area.",
    usage: 'git commit -m "mensagem"',
    example: 'git commit -m "Adiciona página inicial"',
    terminal:
      '$ git commit -m "Adiciona página inicial"\n\n[main 4f2a91c] Adiciona página inicial\n 1 file changed, 12 insertions(+)',
  },
  restore: {
    title: "git restore",
    description:
      "Descarta alterações locais de um arquivo e recupera a versão registrada no último commit.",
    usage: "git restore arquivo.txt",
    example: "git restore style.css",
    terminal: "$ git restore style.css\n\n$",
  },
  "restore-staged": {
    title: "git restore --staged",
    description:
      "Remove um arquivo da staging area, mantendo suas alterações no diretório de trabalho.",
    usage: "git restore --staged arquivo.txt",
    example: "git restore --staged index.html",
    terminal: "$ git restore --staged index.html\n\n$",
  },
  log: {
    title: "git log",
    description:
      "Exibe os commits do histórico do repositório, do mais recente ao mais antigo.",
    usage: "git log --oneline",
    example: "git log --oneline -3",
    terminal:
      "$ git log --oneline -3\n\n4f2a91c Adiciona página inicial\n81c0de2 Ajusta estilos\n2be7a10 Commit inicial",
  },
  diff: {
    title: "git diff",
    description:
      "Compara alterações ainda não preparadas com a versão registrada no último commit.",
    usage: "git diff",
    example: "git diff -- README.md",
    terminal: "$ git diff\n\n- versão antiga\n+ versão atual",
  },
  revert: {
    title: "git revert",
    description:
      "Desfaz as alterações de um commit criando um novo commit, preservando o histórico.",
    usage: "git revert ID_DO_COMMIT",
    example: "git revert 4f2a91c",
    terminal:
      '$ git revert 4f2a91c\n\n[main 7d1b2aa] Revert "Adiciona página inicial"\n 1 file changed, 12 deletions(-)',
  },
  reset: {
    title: "git reset",
    description:
      "Move a referência da branch para outro commit e pode remover alterações do histórico local.",
    usage: "git reset --soft ID_DO_COMMIT",
    example: "git reset --hard HEAD~1",
    terminal:
      "$ git reset --hard HEAD~1\n\nHEAD is now at 81c0de2 Ajusta estilos",
  },
  branch: {
    title: "git branch",
    description:
      "Lista, cria ou remove branches que representam linhas de desenvolvimento.",
    usage: "git branch nome-da-branch",
    example: "git branch feature/login",
    terminal: "$ git branch\n\n* main\n  feature/login",
  },
  switch: {
    title: "git switch",
    description:
      "Troca para outra branch ou cria uma nova branch para continuar o trabalho.",
    usage: "git switch -c nome-da-branch",
    example: "git switch -c feature/login",
    terminal:
      "$ git switch -c feature/login\n\nSwitched to a new branch 'feature/login'",
  },
  merge: {
    title: "git merge",
    description: "Integra em uma branch as alterações feitas em outra branch.",
    usage: "git merge nome-da-branch",
    example: "git switch main\ngit merge feature/login",
    terminal:
      "$ git merge feature/login\n\nUpdating 81c0de2..4f2a91c\nFast-forward\n login.html | 12 ++++++++++++\n 1 file changed, 12 insertions(+)",
  },
  remote: {
    title: "git remote",
    description:
      "Gerencia as conexões do repositório local com repositórios remotos.",
    usage: "git remote -v",
    example: "git remote add origin URL_DO_REPOSITORIO",
    terminal:
      "$ git remote -v\n\norigin  https://github.com/usuario/projeto.git (fetch)\norigin  https://github.com/usuario/projeto.git (push)",
  },
  clone: {
    title: "git clone",
    description:
      "Copia um repositório remoto para o computador e configura sua conexão com a origem.",
    usage: "git clone URL_DO_REPOSITORIO",
    example: "git clone https://github.com/usuario/projeto.git",
    terminal:
      "$ git clone https://github.com/usuario/projeto.git\n\nCloning into 'projeto'...\nremote: Enumerating objects: 24, done.\nReceiving objects: 100% (24/24), done.",
  },
  pull: {
    title: "git pull",
    description:
      "Busca alterações do repositório remoto e tenta integrá-las à branch local atual.",
    usage: "git pull origin main",
    example: "git pull",
    terminal:
      "$ git pull\n\nUpdating 81c0de2..4f2a91c\nFast-forward\n 2 files changed, 8 insertions(+)",
  },
  push: {
    title: "git push",
    description:
      "Envia commits da branch local para um repositório remoto, como o GitHub.",
    usage: "git push origin main",
    example: "git push -u origin feature/login",
    terminal:
      "$ git push origin main\n\nEnumerating objects: 5, done.\nWriting objects: 100% (3/3), done.\nTo https://github.com/usuario/projeto.git\n   81c0de2..4f2a91c  main -> main",
  },
  stash: {
    title: "git stash",
    description:
      "Guarda temporariamente alterações não commitadas para deixar o diretório de trabalho limpo.",
    usage: 'git stash push -m "mensagem"',
    example: "git stash\ngit switch main",
    terminal:
      "$ git stash\n\nSaved working directory and index state WIP on feature/login: 4f2a91c Adiciona página inicial",
  },
  tag: {
    title: "git tag",
    description:
      "Cria ou lista marcadores no histórico, geralmente usados para identificar versões.",
    usage: 'git tag -a v1.0.0 -m "Versão 1.0.0"',
    example: "git tag v1.0.0\ngit push origin v1.0.0",
    terminal: "$ git tag v1.0.0\n\n",
  },
};

const referenceButtons = document.querySelectorAll(".comando-referencia");
const referenceTitle = document.getElementById("referenciaTitulo");
const referenceDescription = document.getElementById("referenciaDescricao");
const referenceUsage = document.getElementById("referenciaUso");
const referenceTerminal = document.getElementById("referenciaTerminal");

function showGitReference(command) {
  const data = gitReferenceData[command];
  if (!data || !referenceTitle) return;

  referenceButtons.forEach((button) =>
    button.classList.toggle("ativo", button.dataset.command === command),
  );
  referenceTitle.textContent = data.title;
  referenceDescription.textContent = data.description;
  referenceUsage.textContent = data.usage;
  referenceTerminal.textContent = data.terminal;
}

referenceButtons.forEach((button) => {
  button.addEventListener("click", () =>
    showGitReference(button.dataset.command),
  );
});

showGitReference("init");
