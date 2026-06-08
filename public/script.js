/* =========================
   MOUSE FOLLOW GLOW
========================= */

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight =
        window.innerHeight;

        const revealTop =
        element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            element.classList.add("active");
        }

    });
}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


/* =========================
   ACTIVE NAVBAR LINK
========================= */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
        section.offsetTop;

        const sectionHeight =
        section.clientHeight;

        if (
            pageYOffset >=
            sectionTop - 200
        ) {
            current =
            section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {
            link.classList.add("active");
        }

    });

});

/* =========================
LOAD PROJECTS FROM DATABASE
========================= */

async function loadProjects() {


try {

    const response =
    await fetch("/api/projects");

    const projects =
    await response.json();

    const container =
    document.getElementById(
        "projects-container"
    );

    if (!container) return;

    container.innerHTML = "";

    projects.forEach((project) => {

    const card =
    document.createElement("div");

    card.className =
    project.featured
    ? "project featured-project"
    : "project";

    card.innerHTML = `

        ${
            project.featured
            ? `
            <div class="project-header">
                <span class="project-badge">
                    Currently Building
                </span>
            </div>
            `
            : ""
        }

        <h3>${project.title}</h3>

        ${
            project.role
            ? `
            <p class="project-role">
                ${project.role}
            </p>
            `
            : ""
        }

        <p>
            ${project.description}
        </p>

        <div class="project-tech">
            ${project.tech_stack}
        </div>

    `;

    container.appendChild(card);

});

} catch (error) {

    console.error(
        "Failed to load projects:",
        error
    );
}

}

loadProjects();
