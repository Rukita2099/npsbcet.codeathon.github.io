// js/app.js

// String-Web-Like Animation Following Pointer
const canvas = document.getElementById('fluid-bg');
const ctx = canvas.getContext('2d');
let width, height;
let points = [];
const numPoints = 80; // Increased number of points
let mouse = { x: 0, y: 0 };

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
}

function updatePoints() {
  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }
}

function drawConnections() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0ff';

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) { // Slightly increased connection distance
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 140) * 1.5})`; // Boosted alpha brightness
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw lines to mouse
  for (let i = 0; i < points.length; i++) {
    const dx = points[i].x - mouse.x;
    const dy = points[i].y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 180) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 180) * 1.5})`; // Boosted alpha
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }
}

function animate() {
  updatePoints();
  drawConnections();
  requestAnimationFrame(animate);
}

resizeCanvas();
animate();

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Button Hover Glow Effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.classList.add('glow');
  });
  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('glow');
  });
});

// Overlay Blur Effect for Only Content
const overlayElements = document.querySelectorAll('.blur-overlay');
overlayElements.forEach(el => {
  el.style.backdropFilter = 'blur(8px)';
  el.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  el.style.borderRadius = '10px';
  el.style.padding = '1rem';
});
