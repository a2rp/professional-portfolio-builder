export const themeOptions = [
    {
        id: "clay",
        name: "Warm clay",
        description: "Earthy and editorial",
        background: "#f5eee6",
        surface: "#fffaf4",
        ink: "#302320",
        muted: "#796960",
        line: "#e4d5c8",
        accent: "#bd573d",
        accentSoft: "#f3ded4",
    },
    {
        id: "violet",
        name: "Garden violet",
        description: "Bright and expressive",
        background: "#f0edf7",
        surface: "#fffefe",
        ink: "#28223b",
        muted: "#716b84",
        line: "#dcd6e9",
        accent: "#6651b4",
        accentSoft: "#e9e3f5",
    },
    {
        id: "lagoon",
        name: "Deep lagoon",
        description: "Cool and considered",
        background: "#eaf2f0",
        surface: "#fcfffd",
        ink: "#1e302e",
        muted: "#5f7570",
        line: "#d2e0dc",
        accent: "#23746c",
        accentSoft: "#d9ece7",
    },
];

export const starterPortfolio = {
    profile: {
        name: "Mara Bennett",
        role: "Designer & digital maker",
        location: "Brooklyn, New York",
        email: "hello@marabennett.design",
        website: "marabennett.design",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        summary:
            "I shape clear, thoughtful digital experiences for people and places. My work brings strategy, useful details, and a little personality together.",
    },
    projects: [
        {
            id: "common-ground",
            title: "Common Ground",
            type: "Digital product",
            year: "2025",
            description:
                "A neighborhood guide that helps people find independent places worth knowing.",
            image: "portfolio-product.jpg",
            link: "",
        },
        {
            id: "after-hours",
            title: "After Hours",
            type: "Brand & website",
            year: "2024",
            description:
                "A brighter identity and ticketing experience for a city arts festival.",
            image: "portfolio-editorial.jpg",
            link: "",
        },
        {
            id: "open-paths",
            title: "Open Paths",
            type: "Editorial project",
            year: "2024",
            description:
                "Stories and practical guides for people finding their way outdoors.",
            image: "portfolio-space.jpg",
            link: "",
        },
    ],
    themeId: "clay",
};

export const projectImages = [
    { name: "City at dusk", file: "portfolio-product.jpg" },
    { name: "Night architecture", file: "portfolio-editorial.jpg" },
    { name: "Lake and trail", file: "portfolio-space.jpg" },
];
