/* ============================================================
   BUILD — gera a versão de produção em dist/
   (automatiza exatamente os passos feitos manualmente antes)
   ============================================================ */
const esbuild = require("esbuild");
const { minify } = require("html-minifier-terser");
const fs = require("fs");
const path = require("path");

const MODULOS = [
    "storage", "templates", "router", "mascaras",
    "validacao", "modal", "toast", "nav", "theme"
];

async function build() {
    fs.rmSync("dist", { recursive: true, force: true });
    fs.mkdirSync("dist/css", { recursive: true });
    fs.mkdirSync("dist/js", { recursive: true });
    fs.mkdirSync("dist/imagens", { recursive: true });

    /* 1) Concatena os módulos JS na mesma ordem de execução do index.html */
    let bundle = MODULOS.map((m) => fs.readFileSync(`js/modules/${m}.js`, "utf8")).join("\n");
    bundle += fs.readFileSync("js/main.js", "utf8");

    /* 2) Ajusta caminhos de imagem para relativo à raiz do dist
          (NÃO absoluto "/imagens/" — o GitHub Pages publica projetos
          num subcaminho, tipo /arise-social/, e um caminho absoluto
          ignoraria esse subcaminho, causando 404 nas imagens) */
    bundle = bundle.replace(/\.\.\/imagens\//g, "imagens/");

    /* 3) Minifica JS e CSS com esbuild */
    const jsMin = await esbuild.transform(bundle, { minify: true });
    fs.writeFileSync("dist/js/app.min.js", jsMin.code);

    const cssSrc = fs.readFileSync("css/style.css", "utf8");
    const cssMin = await esbuild.transform(cssSrc, { minify: true, loader: "css" });
    fs.writeFileSync("dist/css/style.min.css", cssMin.code);

    /* 4) Reescreve o index.html pra apontar pros arquivos de produção, e minifica */
    let html = fs.readFileSync("html/index.html", "utf8");
    html = html.replace(/<script src="\.\.\/js\/modules\/[a-z]+\.js"><\/script>\n?/g, "");
    html = html.replace('<script src="../js/main.js"></script>', '<script src="js/app.min.js"></script>');
    html = html.replace('href="../css/style.css"', 'href="css/style.min.css"');
    html = await minify(html, { collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true });
    fs.writeFileSync("dist/index.html", html);

    /* 5) Copia as imagens reais para dentro do dist (deploy autossuficiente) */
    for (const arquivo of fs.readdirSync("imagens")) {
        fs.copyFileSync(path.join("imagens", arquivo), path.join("dist/imagens", arquivo));
    }

    console.log("✅ Build de produção gerado em dist/");
}

build();
