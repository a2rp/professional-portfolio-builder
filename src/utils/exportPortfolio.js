const escapeHtml = (value) =>
    String(value || "").replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return entities[character];
    });

const getImageData = async (fileName) => {
    const response = await fetch(
        import.meta.env.BASE_URL + "images/" + encodeURIComponent(fileName),
    );
    if (!response.ok) {
        throw new Error("A portfolio image could not be loaded.");
    }

    const image = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("A portfolio image could not be read."));
        reader.readAsDataURL(image);
    });
};

const exportPortfolio = async ({ profile, projects, theme }) => {
    const projectCards = await Promise.all(
        projects.map(async (project) => {
            const image = await getImageData(project.image);
            const projectLink = /^https?:\/\//i.test(project.link || "")
                ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noreferrer">View project</a>`
                : "";

            return `<article class="project">
                <img src="${image}" alt="" />
                <div class="project-copy">
                    <p class="project-type">${escapeHtml(project.type || "Selected work")} · ${escapeHtml(project.year)}</p>
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.description)}</p>
                    ${projectLink}
                </div>
            </article>`;
        }),
    );
    const portfolioTitle = escapeHtml(profile.name || "My portfolio");
    const contactEmail = escapeHtml(profile.email);
    const website = escapeHtml(profile.website);
    const about = escapeHtml(profile.summary);

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="${about}" />
<title>${portfolioTitle} | Portfolio</title>
<style>
* { box-sizing: border-box; }
body { margin: 0; background: ${theme.background}; color: ${theme.ink}; font: 16px/1.6 Arial, sans-serif; }
a { color: inherit; text-decoration: none; }
main { width: min(1080px, calc(100% - 48px)); margin: 0 auto; }
header { display: flex; align-items: center; justify-content: space-between; padding: 28px 0; border-bottom: 1px solid ${theme.line}; }
.brand { font-weight: 700; }
nav { display: flex; gap: 24px; color: ${theme.muted}; font-size: 14px; }
.hero { padding: 100px 0 90px; }
.role { color: ${theme.accent}; font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
h1 { max-width: 850px; margin: 18px 0; font: 500 clamp(44px, 8vw, 88px)/1.02 Georgia, serif; letter-spacing: -.045em; }
.summary { max-width: 600px; color: ${theme.muted}; font-size: 18px; }
.contact { display: inline-flex; margin-top: 26px; padding: 12px 18px; border-radius: 7px; background: ${theme.accent}; color: white; font-weight: 700; }
.section-heading { display: flex; align-items: baseline; justify-content: space-between; margin: 0 0 24px; border-bottom: 1px solid ${theme.line}; padding-bottom: 14px; }
h2 { margin: 0; font: 500 34px/1.2 Georgia, serif; }
.projects { display: grid; gap: 20px; }
.project { display: grid; grid-template-columns: minmax(220px, 1fr) 1fr; overflow: hidden; border: 1px solid ${theme.line}; border-radius: 12px; background: ${theme.surface}; }
.project img { width: 100%; height: 260px; object-fit: cover; }
.project-copy { align-self: center; padding: 30px; }
.project-type { color: ${theme.accent}; font-size: 12px; font-weight: 700; }
h3 { margin: 9px 0; font: 500 28px/1.2 Georgia, serif; }
.project-copy > p:not(.project-type) { color: ${theme.muted}; }
.project-copy a { display: inline-block; margin-top: 16px; color: ${theme.accent}; font-size: 13px; font-weight: 700; }
.about { margin: 100px 0; padding: 40px; border-radius: 14px; background: ${theme.accentSoft}; }
.about p { max-width: 680px; color: ${theme.muted}; }
footer { display: flex; justify-content: space-between; gap: 16px; padding: 25px 0; border-top: 1px solid ${theme.line}; color: ${theme.muted}; font-size: 13px; }
@media (max-width: 640px) { main { width: calc(100% - 32px); } header { align-items: flex-start; } nav { gap: 12px; font-size: 12px; } .hero { padding: 68px 0; } .project { grid-template-columns: 1fr; } .project img { height: 210px; } .project-copy { padding: 22px; } .about { margin: 64px 0; padding: 26px; } footer { flex-direction: column; } }
</style>
</head>
<body>
<main>
<header><a class="brand" href="#top">${portfolioTitle}</a><nav><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav></header>
<section class="hero" id="top"><p class="role">${escapeHtml(profile.role)} · ${escapeHtml(profile.location)}</p><h1>Thoughtful work, made for real life.</h1><p class="summary">${about}</p><a class="contact" href="mailto:${contactEmail}">Start a conversation</a></section>
<section id="work"><div class="section-heading"><h2>Selected work</h2><span>${projects.length} projects</span></div><div class="projects">${projectCards.join("")}</div></section>
<section class="about" id="about"><p class="project-type">A little about me</p><h2>Good work starts with listening.</h2><p>${about}</p></section>
<footer id="contact"><span>© ${new Date().getFullYear()} ${portfolioTitle}</span><span>${website} · ${contactEmail}</span></footer>
</main>
</body>
</html>`;

    const file = new Blob([html], { type: "text/html;charset=utf-8" });
    const objectUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = (profile.name || "my")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + "-portfolio.html";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
};

export default exportPortfolio;
