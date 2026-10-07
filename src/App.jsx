import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell}>
        <SiteHeader />
        <main className={styles.pageContent}>
            <section className={styles.editorPanel} id="editor">
                <p>Portfolio editor</p>
                <h1>Shape a site that sounds like you.</h1>
            </section>
            <section className={styles.previewPanel} id="preview">
                <h2>Your live preview</h2>
                <p>Your changes will appear here as you build.</p>
            </section>
            <section className={styles.aboutPanel} id="about">
                <h2>Made for your next introduction.</h2>
                <p>Build a personal portfolio, keep it in your browser, and export it when it feels right.</p>
            </section>
        </main>
    </div>
);

export default App;
