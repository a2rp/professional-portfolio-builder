import styles from "./App.module.css";

const App = () => (
    <main className={styles.appShell}>
        <div className={styles.setupMessage}>
            <p>Folio Studio</p>
            <h1>Your portfolio workspace is being prepared.</h1>
        </div>
    </main>
);

export default App;
