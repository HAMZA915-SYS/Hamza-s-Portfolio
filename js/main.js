/* ================================================
   HAMZA KHAN PORTFOLIO — MAIN JS
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── AOS INIT ──────────────────────────────── */
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 60,
  });

  /* ── YEAR ──────────────────────────────────── */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── CUSTOM CURSOR ─────────────────────────── */
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (dot && ring && window.matchMedia("(hover:hover)").matches) {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    });
    const animCursor = () => {
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animCursor);
    };
    animCursor();
    document
      .querySelectorAll(
        "a, button, .service-card, .project-card, .about-card, .wm-card",
      )
      .forEach((el) => {
        el.addEventListener(
          "mouseenter",
          () => (ring.style.transform = "translate(-50%,-50%) scale(1.8)"),
        );
        el.addEventListener(
          "mouseleave",
          () => (ring.style.transform = "translate(-50%,-50%) scale(1)"),
        );
      });
  }

  /* ── NAVBAR SCROLL ─────────────────────────── */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      navbar && navbar.classList.toggle("scrolled", y > 50);
      backToTop && backToTop.classList.toggle("visible", y > 500);
      updateActiveNav();
      animSkillBars();
    },
    { passive: true },
  );

  /* ── HAMBURGER ─────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger &&
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });
  document.querySelectorAll(".mob-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ── ACTIVE NAV ────────────────────────────── */
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  function updateActiveNav() {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  }

  /* ── AURORA CANVAS ─────────────────────────── */
  const canvas = document.getElementById("auroraCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W,
      H,
      t = 0;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.25, y: 0.3, r: 0.55, c: "rgba(0,229,255,", spd: 0.0005, phase: 0 },
      { x: 0.7, y: 0.6, r: 0.5, c: "rgba(168,85,247,", spd: 0.0007, phase: 2 },
      { x: 0.5, y: 0.8, r: 0.45, c: "rgba(0,255,136,", spd: 0.0004, phase: 4 },
      { x: 0.1, y: 0.7, r: 0.4, c: "rgba(59,130,246,", spd: 0.0006, phase: 1 },
    ];

    function draw() {
      ctx.clearRect(0, 0, W, H);
      blobs.forEach((b) => {
        const x = (b.x + Math.sin(t * b.spd * 2 + b.phase) * 0.15) * W;
        const y = (b.y + Math.cos(t * b.spd * 1.5 + b.phase) * 0.12) * H;
        const r = b.r * Math.min(W, H);
        const pulse = 0.06 + 0.025 * Math.sin(t * b.spd * 3);
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, b.c + pulse + ")");
        grd.addColorStop(0.6, b.c + pulse * 0.3 + ")");
        grd.addColorStop(1, b.c + "0)");
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
      t++;
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── TYPEWRITER ────────────────────────────── */
  const tw = document.getElementById("typewriter");
  if (tw) {
    const words = [
      "Frontend Developer",
      "Webflow Designer",
      "UI Builder",
      "Web Developer",
    ];
    let wi = 0,
      ci = 0,
      deleting = false;
    const type = () => {
      const word = words[wi];
      if (!deleting) {
        tw.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        tw.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 55 : 100);
    };
    setTimeout(type, 1800);
  }

  /* ── SKILL BARS ────────────────────────────── */
  let barsAnimated = false;
  function animSkillBars() {
    if (barsAnimated) return;
    const barsSection = document.getElementById("skills");
    if (!barsSection) return;
    const rect = barsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      document.querySelectorAll(".skill-fill").forEach((bar) => {
        bar.style.width = bar.dataset.width + "%";
      });
      barsAnimated = true;
    }
  }

  /* ── SCROLL ZOOM ───────────────────────────── */
  const zoomTargets = document.querySelectorAll(
    ".about-section, .services-section, .skills-section, .projects-section, .whyme-section, .contact-section",
  );
  const zoomObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        e.target.classList.toggle("zoom-in-section", e.isIntersecting);
        e.target.classList.toggle("zoom-out-section", !e.isIntersecting);
      });
    },
    { threshold: 0.12 },
  );
  zoomTargets.forEach((el) => {
    el.classList.add("zoom-section");
    zoomObs.observe(el);
  });

  /* ── SMOOTH ANCHOR SCROLL ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('.form-submit');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    status.textContent = 'Sending...';
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
        status.classList.add('success');
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          status.textContent = data.errors.map(err => err.message).join(', ');
        } else {
          status.textContent = 'Oops! Something went wrong. Please try again.';
        }
        status.classList.add('error');
      }
    } catch (error) {
      status.textContent = 'Network error. Please check your connection and try again.';
      status.classList.add('error');
    } finally {
      submitBtn.disabled = false;
    }
  });
});
