(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('particleCanvas');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = 0, height = 0, particles = [], frame = 0;
  const colors = ['0,245,255', '255,43,214', '169,107,255'];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(85, Math.floor(width / 16));
    particles = Array.from({length: count}, () => ({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.7+.4,c:colors[Math.floor(Math.random()*colors.length)]}));
  }
  function draw() {
    if (document.hidden) { requestAnimationFrame(draw); return; }
    ctx.clearRect(0,0,width,height);
    particles.forEach((p,i) => {
      p.x += p.vx; p.y += p.vy;
      if(p.x < -5) p.x=width+5; if(p.x>width+5)p.x=-5;
      if(p.y < -5)p.y=height+5; if(p.y>height+5)p.y=-5;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${p.c},.75)`;ctx.shadowBlur=10;ctx.shadowColor=`rgb(${p.c})`;ctx.fill();ctx.shadowBlur=0;
      for(let j=i+1;j<particles.length;j++){
        const q=particles[j], dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
        if(d<105){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(${p.c},${(1-d/105)*.12})`;ctx.lineWidth=.6;ctx.stroke();}
      }
    });
    frame++; requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize, {passive:true});
  resize(); draw();
  const revealTargets = document.querySelectorAll('.content-section, .intro-strip > div, .about-card, .education-card, .skill-card, .project-card, .contact-banner');
  revealTargets.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
    revealTargets.forEach(el => observer.observe(el));
  } else revealTargets.forEach(el => el.classList.add('is-visible'));
})();
