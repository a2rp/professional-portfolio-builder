import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FiLayers, FiMenu, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const closeOnOutsideClick = (event) => {
            if (!menuRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <a className={styles.brand} href="#editor" onClick={closeMenu}>
                    <span className={styles.brandIcon}>
                        <FiLayers aria-hidden="true" />
                    </span>
                    <span>folio studio</span>
                </a>

                <div className={styles.navigation} ref={menuRef}>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={
                            menuOpen ? "Close navigation" : "Open navigation"
                        }
                        aria-expanded={menuOpen}
                        aria-controls="site-navigation"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <FiX aria-hidden="true" />
                        ) : (
                            <FiMenu aria-hidden="true" />
                        )}
                    </button>
                    <nav
                        className={menuOpen ? styles.navOpen : styles.nav}
                        id="site-navigation"
                        aria-label="Main navigation"
                    >
                        <a href="#editor" onClick={closeMenu}>
                            Editor
                        </a>
                        <a href="#preview" onClick={closeMenu}>
                            Live preview
                        </a>
                        <a href="#about" onClick={closeMenu}>
                            About
                        </a>
                    </nav>
                </div>

                <a
                    className={styles.repository}
                    href="https://github.com/a2rp/professional-portfolio-builder"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub aria-hidden="true" />
                    <span>Repository</span>
                </a>
            </div>
        </header>
    );
};

export default SiteHeader;
