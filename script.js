"use strict";

/* =====================================
   1. FOOTER YEAR
===================================== */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* =====================================
   2. MOBILE NAVIGATION
===================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close the menu when the screen becomes wider than the mobile breakpoint (same as the CSS)
    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            closeMobileMenu();
        }
    });
}

/* =====================================
   3. PROJECT DATA
===================================== */

const projects = [
    {
        icon: "💬",
        title: "SENADA Language Learning App",
        category: "UI/UX",
        description:
            "A language-learning app concept designed to help users learn Sarawak Malay through interactive features.",
        type: "Borneo Hackathon — Finalist",
        tools: "Figma",
        contribution:
            "Helped teammates design the user interface in Figma and prepare presentation slides.",
        cover: "linear-gradient(135deg, #e5d7ff, #f9c9e0)"
    },
    {
        icon: "🚈",
        title: "ART Transport App",
        category: "UI/UX",
        description:
            "A mobile app prototype concept for the Autonomous Rapid Transit system in Kuching.",
        type: "Group project",
        tools: "Figma",
        contribution:
            "Helped teammates design the user interface and prepare the final report.",
        cover: "linear-gradient(135deg, #d8ecff, #c8f1e5)"
    },
    {
        icon: "🧠",
        title: "Health Quiz Application",
        category: "Java",
        description:
            "A group project concept featuring health quizzes and interactive learning activities.",
        type: "Group project",
        tools: "Java",
        contribution:
            "Contributed to Java coding, preparation of the final report, and presentation.",
        cover: "linear-gradient(135deg, #ffd9ec, #ffebd4)"
    },
    {
        icon: "🏺",
        title: "Sarawak Heritage Online Auction",
        category: "Database",
        description:
            "A database design project for an online auction system featuring heritage items.",
        type: "Group project",
        tools: "MySQL",
        contribution:
            "Created tables using MySQL and prepared the project report.",
        cover: "linear-gradient(135deg, #d9e9ff, #e5ddff)"
    },
    {
        icon: "📱",
        title: "BSN Mobile Banking Redesign",
        category: "UI/UX",
        description:
            "A UI/UX redesign concept focusing on accessibility, navigation and mobile usability.",
        type: "Group project",
        tools: "Figma",
        contribution:
            "Designed screens in Figma, evaluated accessibility, and prepared the project report.",
        cover: "linear-gradient(135deg, #d9f4e5, #fff0cf)"
    }
];

/* =====================================
   4. DISPLAY PROJECT CARDS
===================================== */

const projectList = document.getElementById("project-list");
const filterStatus = document.getElementById("filter-status");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectSearch = document.getElementById("project-search-input");

let selectedCategory = "All";
let searchQuery = "";

function displayProjects(projectItems) {
    if (!projectList) return;

    projectList.replaceChildren();

    if (projectItems.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "project-empty";
        emptyMessage.textContent =
            "No projects found. Try another search or category.";

        projectList.appendChild(emptyMessage);
        return;
    }

    projectItems.forEach(function (project, index) {
        const card = document.createElement("article");
        card.className = "project-card";

        const cover = document.createElement("div");
        cover.className = "project-cover";
        cover.style.background = project.cover;

        const number = document.createElement("span");
        number.className = "project-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const icon = document.createElement("span");
        icon.className = "project-cover-icon";
        icon.textContent = project.icon;
        icon.setAttribute("aria-hidden", "true");

        cover.append(number, icon);

        const content = document.createElement("div");
        content.className = "project-content";

        const category = document.createElement("span");
        category.className = "project-category";
        category.textContent = project.category;

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.className = "project-description";
        description.textContent = project.description;

        const meta = document.createElement("div");
        meta.className = "project-meta";

        const groupLabel = document.createElement("strong");
        groupLabel.textContent = project.type;

        const toolsLabel = document.createElement("span");
        toolsLabel.textContent = "Tools: " + project.tools;

        meta.appendChild(groupLabel);
        meta.appendChild(toolsLabel);

        if (project.contribution) {
            const contributionLabel = document.createElement("p");
            contributionLabel.className = "project-contribution";

            const label = document.createElement("strong");
            label.textContent = "My Contribution: ";

            const details = document.createElement("span");
            details.textContent = project.contribution;

            contributionLabel.append(label, details);
            meta.appendChild(contributionLabel);
        }

        content.append(category, title, description, meta);
        card.append(cover, content);
        projectList.appendChild(card);
    });
}

/* =====================================
   5. FILTER AND SEARCH PROJECTS
===================================== */

function updateProjects() {
    const query = searchQuery.toLowerCase();

    const filteredProjects = projects.filter(function (project) {
        const matchesCategory =
            selectedCategory === "All" ||
            project.category === selectedCategory;

        const searchableText = [
            project.title,
            project.category,
            project.description,
            project.type,
            project.tools
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(query);

        return matchesCategory && matchesSearch;
    });

    displayProjects(filteredProjects);

    filterButtons.forEach(function (button) {
        const isActive =
            button.dataset.category === selectedCategory;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    if (filterStatus) {
        filterStatus.textContent =
            "Showing " + filteredProjects.length +
            (filteredProjects.length === 1 ? " project" : " projects") +
            (selectedCategory === "All"
                ? ""
                : " in " + selectedCategory) +
            (searchQuery ? ' matching "' + searchQuery + '"' : "") +
            ".";
    }
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;
        updateProjects();
    });
});

if (projectSearch) {
    projectSearch.addEventListener("input", function () {
        searchQuery = projectSearch.value.trim();
        updateProjects();
    });
}

updateProjects();

/* =====================================
   6. SCROLL REVEAL
===================================== */

const revealElements = document.querySelectorAll(
    ".section-label, .section h2, .project-card, .about-section h3"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");

        revealObserver.observe(element);
    });
}

/* =====================================
   7. ACTIVE NAVIGATION LINK
===================================== */

const pageSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

// Marks one nav link as the current one (used by the observer and the bottom-of-page check)
function setCurrentLink(sectionId) {
    navigationLinks.forEach(function (link) {
        const isCurrent =
            link.getAttribute("href") === "#" + sectionId;

        if (isCurrent) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                setCurrentLink(entry.target.id);
            });
        },
        { rootMargin: "-30% 0px -60% 0px" }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}

// The Contact section is short, so it may never reach the observer band.
// When the user is at the very bottom of the page, highlight Contact.
function checkPageBottom() {
    const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

    if (atBottom) {
        setCurrentLink("contact");
    }
}

window.addEventListener("scroll", checkPageBottom, { passive: true });

/* =====================================
   8. THEME TOGGLE
===================================== */

const themeButton = document.createElement("button");

themeButton.type = "button";
themeButton.className = "theme-toggle";
themeButton.textContent = "🌙 Dark mode";
themeButton.setAttribute("aria-pressed", "false");
themeButton.setAttribute("aria-label", "Switch to dark mode");

const navbar = document.querySelector(".navbar");

if (navbar) {
    navbar.appendChild(themeButton);
}

themeButton.addEventListener("click", function () {
    const darkEnabled = document.body.classList.toggle("dark-theme");

    themeButton.textContent = darkEnabled
        ? "☀️ Light mode"
        : "🌙 Dark mode";

    themeButton.setAttribute("aria-pressed", String(darkEnabled));
    themeButton.setAttribute(
        "aria-label",
        darkEnabled ? "Switch to light mode" : "Switch to dark mode"
    );
});

/* =====================================
   9. BACK-TO-TOP VISIBILITY
===================================== */

const backToTop = document.querySelector(".back-to-top");

function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle("visible", window.scrollY > 300);
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();

/* =====================================
   10. TYPING EFFECT
===================================== */

// Types out the role text in the hero (the element with class "cover-role")
const coverRole = document.querySelector(".cover-role");

if (coverRole && !reducedMotion) {
    const roleText = coverRole.textContent.trim();
    let characterIndex = 0;

    // Screen readers read the full text instead of the partial typing
    coverRole.setAttribute("aria-label", roleText);

    coverRole.textContent = "";

    function typeNextCharacter() {
        if (characterIndex < roleText.length) {
            coverRole.textContent += roleText.charAt(characterIndex);
            characterIndex++;

            window.setTimeout(typeNextCharacter, 45);
        }
    }

    window.setTimeout(typeNextCharacter, 400);
}