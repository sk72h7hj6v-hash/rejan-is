const searchInput = document.getElementById("note-search");
const resultCount = document.getElementById("notes-result-count");
const filterButtons = document.querySelectorAll(".filter-btn");
const notes = document.querySelectorAll(".searchable-note");
const themeToggle = document.getElementById("theme-toggle");

let activeFilter = "all";

function updateVisibleNotes() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visibleCount = 0;

  notes.forEach((note) => {
    const tags = note.dataset.tags || "";
    const title = (note.dataset.title || "").toLowerCase();
    const description = (note.dataset.description || "").toLowerCase();
    const inCategory = activeFilter === "all" || tags.includes(activeFilter);
    const inSearch = !query || title.includes(query) || description.includes(query) || tags.includes(query);
    const isVisible = inCategory && inSearch;

    note.style.display = isVisible ? "" : "none";
    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (resultCount) {
    resultCount.textContent = visibleCount === 1 ? "Showing 1 note" : `Showing ${visibleCount} notes`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter || "all";
    updateVisibleNotes();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", updateVisibleNotes);
}

const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterMessage = document.getElementById("newsletter-message");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailValue = newsletterEmail?.value.trim() || "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      if (newsletterMessage) {
        newsletterMessage.textContent = "Please enter a valid email address.";
      }
      return;
    }

    if (newsletterMessage) {
      newsletterMessage.textContent = "Thanks! Your email app should open now so you can confirm subscription.";
    }
    const subject = encodeURIComponent("Cyber Notes subscription request");
    const body = encodeURIComponent(`Please add ${emailValue} to the Cyber Notes updates list.`);
    window.location.href = `mailto:hello@cybernotes.dev?subject=${subject}&body=${body}`;
    newsletterForm.reset();
  });
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

if (themeToggle) {
  const updateThemeLabel = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    themeToggle.textContent = currentTheme === "light" ? "Dark mode" : "Light mode";
  };

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeLabel();
  });

  updateThemeLabel();
}

updateVisibleNotes();
