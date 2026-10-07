import { useState } from "react";
import SiteHeader from "./components/siteHeader/index.jsx";
import PortfolioEditor from "./components/portfolioEditor/index.jsx";
import SitePreview from "./components/sitePreview/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import { starterPortfolio, themeOptions } from "./data/portfolio.js";
import exportPortfolio from "./utils/exportPortfolio.js";
import styles from "./App.module.css";

const storageKey = "folio-studio-portfolio";

const createStarterPortfolio = () => JSON.parse(JSON.stringify(starterPortfolio));

const loadPortfolio = () => {
    try {
        const savedPortfolio = window.localStorage.getItem(storageKey);
        if (!savedPortfolio) {
            return createStarterPortfolio();
        }

        const parsedPortfolio = JSON.parse(savedPortfolio);
        return {
            ...createStarterPortfolio(),
            ...parsedPortfolio,
            profile: {
                ...starterPortfolio.profile,
                ...parsedPortfolio.profile,
            },
            projects: Array.isArray(parsedPortfolio.projects)
                ? parsedPortfolio.projects
                : createStarterPortfolio().projects,
        };
    } catch {
        return createStarterPortfolio();
    }
};

const App = () => {
    const [portfolio, setPortfolio] = useState(loadPortfolio);
    const [saveStatus, setSaveStatus] = useState("Draft ready");
    const [exportStatus, setExportStatus] = useState("");
    const selectedTheme =
        themeOptions.find((theme) => theme.id === portfolio.themeId) ||
        themeOptions[0];

    const savePortfolio = (nextPortfolio) => {
        setPortfolio(nextPortfolio);
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(nextPortfolio));
            setSaveStatus("Saved in this browser");
        } catch {
            setSaveStatus("Browser storage is unavailable");
        }
    };

    const updateProfile = (field, value) => {
        savePortfolio({
            ...portfolio,
            profile: { ...portfolio.profile, [field]: value },
        });
    };

    const updateProjects = (projects) => {
        savePortfolio({ ...portfolio, projects });
    };

    const updateTheme = (themeId) => {
        savePortfolio({ ...portfolio, themeId });
    };

    const handleExport = async () => {
        setExportStatus("Preparing your website file...");
        try {
            await exportPortfolio({
                profile: portfolio.profile,
                projects: portfolio.projects,
                theme: selectedTheme,
            });
            setExportStatus("Your website file is ready.");
        } catch {
            setExportStatus("Could not create the file. Please try again.");
        }
    };

    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.pageContent}>
                <section className={styles.titleArea}>
                    <div>
                        <p className={styles.label}>Your next introduction</p>
                        <h1>Make your work easy to remember.</h1>
                        <p className={styles.intro}>
                            Build a personal site that gives your best work room to speak.
                        </p>
                    </div>
                    <span className={styles.projectCount}>
                        <strong>{portfolio.projects.length}</strong> selected projects
                    </span>
                </section>

                <div className={styles.workspace}>
                    <PortfolioEditor
                        portfolio={portfolio}
                        themeOptions={themeOptions}
                        saveStatus={saveStatus}
                        exportStatus={exportStatus}
                        onProfileChange={updateProfile}
                        onProjectsChange={updateProjects}
                        onThemeChange={updateTheme}
                        onExport={handleExport}
                    />

                    <SitePreview
                        profile={portfolio.profile}
                        projects={portfolio.projects}
                        theme={selectedTheme}
                    />
                </div>

                <section className={styles.aboutPanel} id="about">
                    <p className={styles.label}>A simple way to share your work</p>
                    <h2>From a few details to a page you can send.</h2>
                    <p>
                        Your draft stays in this browser. When it is ready, export a
                        self-contained HTML file with your text, project images, and chosen
                        colors.
                    </p>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
};

export default App;
