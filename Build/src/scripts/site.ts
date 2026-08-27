const NAV_ID = "site-nav";
const TOGGLE_ID = "nav-toggle";
const OVERLAY_ID = "nav-overlay";

function closeNav() {
  document.body.classList.remove("nav-open");
  const toggle = document.getElementById(TOGGLE_ID) as HTMLButtonElement | null;
  toggle?.setAttribute("aria-expanded", "false");
}

const toggle = document.getElementById(TOGGLE_ID);
toggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(open));
});

const overlay = document.getElementById(OVERLAY_ID);
overlay?.addEventListener("click", closeNav);

document.querySelectorAll<HTMLElement>(`#${NAV_ID} a`).forEach((link) => {
  link.addEventListener("click", closeNav);
});