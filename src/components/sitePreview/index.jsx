import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
    FiArrowDownRight,
    FiArrowUpRight,
    FiMapPin,
    FiMonitor,
    FiSmartphone,
} from "react-icons/fi";
import styles from "./styles.module.css";

const SitePreview = ({ profile, projects, theme }) => {
    const [view, setView] = useState("desktop");
    const initials = profile.name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join("");
    const portfolioStyle = {
        "--site-bg": theme.background,
        "--site-surface": theme.surface,
        "--site-ink": theme.ink,
        "--site-muted": theme.muted,
        "--site-line": theme.line,
        "--site-accent": theme.accent,
        "--site-accent-soft": theme.accentSoft,
    };

    return (
        <section
            className={styles.preview}
            id="preview"
            aria-labelledby="preview-title"
        >
            <div className={styles.previewHeading}>
                <div>
                    <p className={styles.label}>Live website preview</p>
                    <h2 id="preview-title">See your page take shape.</h2>
                </div>
                <div
                    className={styles.viewToggle}
                    role="group"
                    aria-label="Preview size"
                >
                    <button
                        className={
                            view === "desktop"
                                ? styles.viewActive
                                : styles.viewButton
                        }
                        type="button"
                        aria-pressed={view === "desktop"}
                        onClick={() => setView("desktop")}
                    >
                        <FiMonitor aria-hidden="true" />
                        Desktop
                    </button>
                    <button
                        className={
                            view === "mobile"
                                ? styles.viewActive
                                : styles.viewButton
                        }
                        type="button"
                        aria-pressed={view === "mobile"}
                        onClick={() => setView("mobile")}
                    >
                        <FiSmartphone aria-hidden="true" />
                        Mobile
                    </button>
                </div>
            </div>

            <div className={styles.browser}>
                <div className={styles.browserBar}>
                    <span className={styles.browserDots} aria-hidden="true">
                        <i />
                        <i />
                        <i />
                    </span>
                    <span className={styles.addressBar}>
                        <span />
                        {profile.website || "your-portfolio.site"}
                    </span>
                    <span className={styles.previewLabel}>Preview</span>
                </div>

                <div className={styles.viewport}>
                    <div
                        className={
                            view === "mobile"
                                ? styles.sitePageMobile
                                : styles.sitePage
                        }
                        style={portfolioStyle}
                    >
                        <header className={styles.siteNav}>
                            <a className={styles.siteName} href="#preview">
                                {profile.name || "Your name"}
                                <span>.</span>
                            </a>
                            <nav aria-label="Portfolio page navigation">
                                <a href="#preview-work">Work</a>
                                <a href="#preview-about">About</a>
                                <a href="#preview-contact">Contact</a>
                            </nav>
                            <a
                                className={styles.navContact}
                                href={
                                    profile.email
                                        ? "mailto:" + profile.email
                                        : "#preview-contact"
                                }
                            >
                                Let’s talk
                                <FiArrowUpRight aria-hidden="true" />
                            </a>
                        </header>

                        <section className={styles.hero}>
                            <div className={styles.heroCopy}>
                                <p className={styles.role}>
                                    {profile.role || "Your professional title"}
                                </p>
                                <h1>
                                    {profile.name || "Your name"}
                                    <span>.</span>
                                </h1>
                                <p className={styles.summary}>
                                    {profile.summary ||
                                        "Add a short introduction in the editor to tell people what you do."}
                                </p>
                                <a
                                    className={styles.heroContact}
                                    href={
                                        profile.email
                                            ? "mailto:" + profile.email
                                            : "#preview-contact"
                                    }
                                >
                                    Get in touch
                                    <FiArrowDownRight aria-hidden="true" />
                                </a>
                                <span className={styles.location}>
                                    <FiMapPin aria-hidden="true" />
                                    {profile.location || "Your location"}
                                </span>
                            </div>
                            <div className={styles.heroImage}>
                                <img
                                    src={
                                        import.meta.env.BASE_URL +
                                        "images/portfolio-space.jpg"
                                    }
                                    alt="A person looking across a quiet lake"
                                />
                                <span className={styles.avatar}>
                                    {initials || "ME"}
                                </span>
                                <span className={styles.imageNote}>
                                    A thoughtful practice
                                </span>
                            </div>
                        </section>

                        <section className={styles.work} id="preview-work">
                            <div className={styles.workHeading}>
                                <div>
                                    <p className={styles.label}>
                                        A few recent things
                                    </p>
                                    <h2>Selected work</h2>
                                </div>
                                <span>
                                    {projects.length
                                        .toString()
                                        .padStart(2, "0")}{" "}
                                    projects
                                </span>
                            </div>
                            {projects.length ? (
                                <div className={styles.projectGrid}>
                                    {projects.map((project, index) => (
                                        <article
                                            className={styles.workCard}
                                            key={project.id}
                                        >
                                            <a
                                                className={styles.cardImage}
                                                href={
                                                    project.link ||
                                                    "#preview-work"
                                                }
                                                target={
                                                    project.link
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    project.link
                                                        ? "noreferrer"
                                                        : undefined
                                                }
                                                aria-label={
                                                    project.title + " project"
                                                }
                                            >
                                                <img
                                                    src={
                                                        import.meta.env
                                                            .BASE_URL +
                                                        "images/" +
                                                        project.image
                                                    }
                                                    alt={
                                                        project.title +
                                                        " project cover"
                                                    }
                                                />
                                                <span
                                                    className={
                                                        styles.cardNumber
                                                    }
                                                >
                                                    0{index + 1}
                                                </span>
                                                <FiArrowUpRight aria-hidden="true" />
                                            </a>
                                            <div className={styles.cardCopy}>
                                                <span>
                                                    {project.type ||
                                                        "Selected work"}{" "}
                                                    · {project.year}
                                                </span>
                                                <h3>{project.title}</h3>
                                                <p>{project.description}</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <p className={styles.emptyProjects}>
                                    Add your first project in the editor to show
                                    it here.
                                </p>
                            )}
                        </section>

                        <section className={styles.contact} id="preview-about">
                            <p className={styles.label}>
                                A good place to start
                            </p>
                            <h2>Have a good project in mind?</h2>
                            <p>
                                Based in {profile.location || "your city"}. Open
                                to thoughtful work and good conversations.
                            </p>
                            <a
                                id="preview-contact"
                                href={
                                    profile.email
                                        ? "mailto:" + profile.email
                                        : "#preview"
                                }
                            >
                                {profile.email || "Add an email in the editor"}
                                <FiArrowUpRight aria-hidden="true" />
                            </a>
                        </section>

                        <footer className={styles.siteFooter}>
                            <span>
                                © {new Date().getFullYear()}{" "}
                                {profile.name || "Your name"}
                            </span>
                            <span className={styles.socialLinks}>
                                {profile.github ? (
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="GitHub"
                                    >
                                        <FaGithub aria-hidden="true" />
                                    </a>
                                ) : null}
                                {profile.linkedin ? (
                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedinIn aria-hidden="true" />
                                    </a>
                                ) : null}
                            </span>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SitePreview;
