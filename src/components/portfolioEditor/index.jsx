import { useEffect, useRef, useState } from "react";
import {
    FiBriefcase,
    FiCheck,
    FiDownload,
    FiDroplet,
    FiEdit3,
    FiPlus,
    FiTrash2,
    FiUser,
    FiX,
} from "react-icons/fi";
import { projectImages } from "../../data/portfolio.js";
import styles from "./styles.module.css";

const profileFields = [
    { name: "name", label: "Your name", required: true },
    { name: "role", label: "Professional title", required: true },
    { name: "location", label: "Location" },
    { name: "email", label: "Email address", type: "email" },
    { name: "website", label: "Website name" },
    { name: "github", label: "GitHub profile", type: "url" },
    { name: "linkedin", label: "LinkedIn profile", type: "url" },
];

const editorTabs = [
    { id: "profile", label: "Profile", Icon: FiUser },
    { id: "projects", label: "Projects", Icon: FiBriefcase },
    { id: "style", label: "Style", Icon: FiDroplet },
];

const blankProject = () => ({
    id: "project-" + Date.now(),
    title: "",
    type: "",
    year: new Date().getFullYear().toString(),
    description: "",
    image: projectImages[0].file,
    link: "",
});

const PortfolioEditor = ({
    portfolio,
    themeOptions,
    saveStatus,
    exportStatus,
    onProfileChange,
    onProjectsChange,
    onThemeChange,
    onExport,
}) => {
    const [activeTab, setActiveTab] = useState("profile");
    const [projectDraft, setProjectDraft] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const cancelRef = useRef(null);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!deleteTarget) {
            return undefined;
        }

        cancelRef.current?.focus();

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setDeleteTarget(null);
                return;
            }

            if (event.key === "Tab") {
                const buttons = dialogRef.current?.querySelectorAll("button");
                const firstButton = buttons?.[0];
                const lastButton = buttons?.[buttons.length - 1];

                if (event.shiftKey && document.activeElement === firstButton) {
                    event.preventDefault();
                    lastButton?.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === lastButton
                ) {
                    event.preventDefault();
                    firstButton?.focus();
                }
            }
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [deleteTarget]);

    const updateProjectDraft = (field, value) => {
        setProjectDraft((current) => ({ ...current, [field]: value }));
    };

    const saveProject = (event) => {
        event.preventDefault();
        const projectExists = portfolio.projects.some(
            (project) => project.id === projectDraft.id,
        );
        const nextProjects = projectExists
            ? portfolio.projects.map((project) =>
                  project.id === projectDraft.id ? projectDraft : project,
              )
            : [...portfolio.projects, projectDraft];

        onProjectsChange(nextProjects);
        setProjectDraft(null);
    };

    const deleteProject = () => {
        onProjectsChange(
            portfolio.projects.filter(
                (project) => project.id !== deleteTarget.id,
            ),
        );
        setDeleteTarget(null);
    };

    const openProjectForm = (project) => {
        setProjectDraft(project ? { ...project } : blankProject());
    };

    const selectedTheme = themeOptions.find(
        (theme) => theme.id === portfolio.themeId,
    );

    return (
        <section
            className={styles.editor}
            id="editor"
            aria-labelledby="editor-title"
        >
            <div className={styles.heading}>
                <div>
                    <p className={styles.label}>Your workspace</p>
                    <h2 id="editor-title">Build your page</h2>
                    <p className={styles.description}>
                        Make it yours, one detail at a time.
                    </p>
                </div>
                <span className={styles.savedStatus} role="status">
                    <FiCheck aria-hidden="true" />
                    {saveStatus}
                </span>
            </div>

            <div
                className={styles.tabs}
                role="tablist"
                aria-label="Portfolio sections"
            >
                {editorTabs.map(({ id, label, Icon }) => (
                    <button
                        className={
                            activeTab === id ? styles.tabActive : styles.tab
                        }
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === id}
                        aria-controls="editor-content"
                        onClick={() => setActiveTab(id)}
                    >
                        <Icon aria-hidden="true" />
                        {label}
                    </button>
                ))}
            </div>

            <div className={styles.content} id="editor-content" role="tabpanel">
                {activeTab === "profile" ? (
                    <div className={styles.profileForm}>
                        <div className={styles.sectionHeading}>
                            <h3>Introduce yourself</h3>
                            <p>This is the first thing people will read.</p>
                        </div>
                        <div className={styles.fields}>
                            {profileFields.map((field) => (
                                <label
                                    className={styles.field}
                                    key={field.name}
                                >
                                    <span>{field.label}</span>
                                    <input
                                        type={field.type || "text"}
                                        value={portfolio.profile[field.name]}
                                        required={field.required || false}
                                        onChange={(event) =>
                                            onProfileChange(
                                                field.name,
                                                event.target.value,
                                            )
                                        }
                                    />
                                </label>
                            ))}
                            <label className={styles.field}>
                                <span>Short introduction</span>
                                <textarea
                                    rows="4"
                                    maxLength="280"
                                    value={portfolio.profile.summary}
                                    onChange={(event) =>
                                        onProfileChange(
                                            "summary",
                                            event.target.value,
                                        )
                                    }
                                />
                                <small>Keep it to a few clear sentences.</small>
                            </label>
                        </div>
                    </div>
                ) : null}

                {activeTab === "projects" ? (
                    <div className={styles.projectSection}>
                        <div className={styles.sectionHeading}>
                            <h3>Your selected work</h3>
                            <p>
                                Add a few projects that show what you do best.
                            </p>
                        </div>
                        <div className={styles.projectList}>
                            {portfolio.projects.map((project) => (
                                <article
                                    className={styles.projectRow}
                                    key={project.id}
                                >
                                    <img
                                        src={
                                            import.meta.env.BASE_URL +
                                            "images/" +
                                            project.image
                                        }
                                        alt=""
                                    />
                                    <div className={styles.projectCopy}>
                                        <strong>{project.title}</strong>
                                        <span>
                                            {project.type || "Project"} ·{" "}
                                            {project.year}
                                        </span>
                                    </div>
                                    <button
                                        className={styles.iconButton}
                                        type="button"
                                        aria-label={"Edit " + project.title}
                                        onClick={() => openProjectForm(project)}
                                    >
                                        <FiEdit3 aria-hidden="true" />
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        type="button"
                                        aria-label={"Remove " + project.title}
                                        onClick={() => setDeleteTarget(project)}
                                    >
                                        <FiTrash2 aria-hidden="true" />
                                    </button>
                                </article>
                            ))}
                        </div>
                        {projectDraft ? (
                            <form
                                className={styles.projectForm}
                                onSubmit={saveProject}
                            >
                                <div className={styles.formHeading}>
                                    <h3>
                                        {portfolio.projects.some(
                                            (project) =>
                                                project.id === projectDraft.id,
                                        )
                                            ? "Edit project"
                                            : "Add a project"}
                                    </h3>
                                    <button
                                        className={styles.iconButton}
                                        type="button"
                                        aria-label="Close project form"
                                        onClick={() => setProjectDraft(null)}
                                    >
                                        <FiX aria-hidden="true" />
                                    </button>
                                </div>
                                <label className={styles.field}>
                                    <span>Project name</span>
                                    <input
                                        autoFocus
                                        maxLength="48"
                                        required
                                        value={projectDraft.title}
                                        onChange={(event) =>
                                            updateProjectDraft(
                                                "title",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </label>
                                <div className={styles.fieldRow}>
                                    <label className={styles.field}>
                                        <span>Project type</span>
                                        <input
                                            maxLength="32"
                                            value={projectDraft.type}
                                            onChange={(event) =>
                                                updateProjectDraft(
                                                    "type",
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </label>
                                    <label className={styles.field}>
                                        <span>Year</span>
                                        <input
                                            maxLength="4"
                                            value={projectDraft.year}
                                            onChange={(event) =>
                                                updateProjectDraft(
                                                    "year",
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                                <label className={styles.field}>
                                    <span>Short description</span>
                                    <textarea
                                        rows="3"
                                        maxLength="150"
                                        required
                                        value={projectDraft.description}
                                        onChange={(event) =>
                                            updateProjectDraft(
                                                "description",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </label>
                                <div className={styles.fieldRow}>
                                    <label className={styles.field}>
                                        <span>Cover image</span>
                                        <select
                                            value={projectDraft.image}
                                            onChange={(event) =>
                                                updateProjectDraft(
                                                    "image",
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            {projectImages.map((image) => (
                                                <option
                                                    key={image.file}
                                                    value={image.file}
                                                >
                                                    {image.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className={styles.field}>
                                        <span>Project link</span>
                                        <input
                                            type="url"
                                            placeholder="https://"
                                            value={projectDraft.link}
                                            onChange={(event) =>
                                                updateProjectDraft(
                                                    "link",
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                                <div className={styles.formActions}>
                                    <button
                                        className={styles.secondaryButton}
                                        type="button"
                                        onClick={() => setProjectDraft(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={styles.primaryButton}
                                        type="submit"
                                    >
                                        <FiCheck aria-hidden="true" />
                                        Save project
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button
                                className={styles.addButton}
                                type="button"
                                onClick={() => openProjectForm(null)}
                            >
                                <FiPlus aria-hidden="true" />
                                Add a project
                            </button>
                        )}
                    </div>
                ) : null}

                {activeTab === "style" ? (
                    <div className={styles.styleSection}>
                        <div className={styles.sectionHeading}>
                            <h3>Choose a look</h3>
                            <p>Pick a palette for the portfolio preview.</p>
                        </div>
                        <div className={styles.themeList}>
                            {themeOptions.map((theme) => (
                                <button
                                    className={
                                        portfolio.themeId === theme.id
                                            ? styles.themeSelected
                                            : styles.theme
                                    }
                                    key={theme.id}
                                    type="button"
                                    aria-pressed={
                                        portfolio.themeId === theme.id
                                    }
                                    onClick={() => onThemeChange(theme.id)}
                                >
                                    <span
                                        className={styles.themeSwatches}
                                        style={{
                                            "--theme-background":
                                                theme.background,
                                            "--theme-accent": theme.accent,
                                            "--theme-surface": theme.surface,
                                        }}
                                    >
                                        <i />
                                        <i />
                                        <i />
                                    </span>
                                    <span className={styles.themeCopy}>
                                        <strong>{theme.name}</strong>
                                        <small>{theme.description}</small>
                                    </span>
                                    {portfolio.themeId === theme.id ? (
                                        <FiCheck aria-hidden="true" />
                                    ) : null}
                                </button>
                            ))}
                        </div>
                        {selectedTheme ? (
                            <p className={styles.themeNote}>
                                Your preview is using{" "}
                                {selectedTheme.name.toLowerCase()}.
                            </p>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <div className={styles.editorFooter}>
                <div>
                    <p>Ready to share?</p>
                    <span>
                        {exportStatus || "Your draft stays in this browser."}
                    </span>
                </div>
                <button
                    className={styles.exportButton}
                    type="button"
                    onClick={onExport}
                >
                    <FiDownload aria-hidden="true" />
                    Export website
                </button>
            </div>

            {deleteTarget ? (
                <div
                    className={styles.dialogOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setDeleteTarget(null);
                        }
                    }}
                >
                    <section
                        className={styles.deleteDialog}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        aria-describedby="delete-description"
                        ref={dialogRef}
                    >
                        <span className={styles.dialogIcon}>
                            <FiTrash2 aria-hidden="true" />
                        </span>
                        <h2 id="delete-title">Remove this project?</h2>
                        <p id="delete-description">
                            “{deleteTarget.title}” will be removed from your
                            portfolio.
                        </p>
                        <div className={styles.dialogActions}>
                            <button
                                className={styles.secondaryButton}
                                type="button"
                                ref={cancelRef}
                                onClick={() => setDeleteTarget(null)}
                            >
                                Keep project
                            </button>
                            <button
                                className={styles.dangerButton}
                                type="button"
                                onClick={deleteProject}
                            >
                                Remove project
                            </button>
                        </div>
                    </section>
                </div>
            ) : null}
        </section>
    );
};

export default PortfolioEditor;
