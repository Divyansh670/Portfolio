/* ============================================
   WARP-SPEED CANVAS BACKGROUND
   ============================================ */
(function () {
  const canvas = document.getElementById("warp-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, cx, cy;
  let stars = [];
  const STAR_COUNT = 380;
  const SPEED = 0.55;

  let mouseX = 0, mouseY = 0;
  let targetTiltX = 0, targetTiltY = 0;
  let tiltX = 0, tiltY = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cx = w / 2;
    cy = h / 2;
  }

  function makeStar() {
    return {
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      o: Math.random() * 0.5 + 0.3,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, makeStar);
  }

  function colorFor(i) {
    // cycle between cyan and violet subtly
    return i % 5 === 0 ? "76,243,255" : i % 7 === 0 ? "184,79,255" : "237,239,247";
  }

  function draw() {
    ctx.fillStyle = "rgba(5,7,13,1)";
    ctx.fillRect(0, 0, w, h);

    tiltX += (targetTiltX - tiltX) * 0.02;
    tiltY += (targetTiltY - tiltY) * 0.02;

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const prevZ = s.z;
      s.z -= SPEED * (reduceMotion ? 0.15 : 1) * 3;
      if (s.z <= 1) {
        Object.assign(s, makeStar());
        s.z = w;
        continue;
      }

      const k = 128 / s.z;
      const px = s.x * k + cx + tiltX;
      const py = s.y * k + cy + tiltY;

      const pk = 128 / prevZ;
      const ppx = s.x * pk + cx + tiltX;
      const ppy = s.y * pk + cy + tiltY;

      if (px < 0 || px > w || py < 0 || py > h) continue;

      const size = Math.max(0.4, (1 - s.z / w) * 2.2);
      const alpha = Math.min(1, (1 - s.z / w) * s.o * 1.6);

      ctx.strokeStyle = `rgba(${colorFor(i)},${alpha})`;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(ppx, ppy);
      ctx.lineTo(px, py);
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", (e) => {
    targetTiltX = (e.clientX - window.innerWidth / 2) * 0.02;
    targetTiltY = (e.clientY - window.innerHeight / 2) * 0.02;
  });

  init();
  requestAnimationFrame(draw);
})();

/* ============================================
   NAV: scroll state + mobile menu
   ============================================ */
(function () {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  });

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
})();

/* ============================================
   SCROLL REVEAL
   ============================================ */
(function () {
  const targets = document.querySelectorAll(
    ".section__head, .about__text, .about__facts, .skill-group, .project-card, .timeline__item, .achievement-card, .contact__box"
  );

  targets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => io.observe(el));
})();
