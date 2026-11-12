const projectDetails = {
  capstone: {
    challenge: 'A phone based eye movement assessment needs sessions that are useful for research and safe to handle. Camera quality, lighting, and incomplete recordings can affect the data.',
    contribution: 'I support clinical research and validation planning, including consent and privacy questions, pilot data planning, and ways to identify unusable sessions.',
    status: 'Capstone research is in progress. I am describing the concept and my role, not claiming a clinical product or validated diagnostic result.'
  },
  'laser-tag': {
    challenge: 'A four person team needed application behavior and persistent data to work together in a laser tag software project.',
    contribution: 'I collaborated on the full stack project and worked with the PostgreSQL backed system. The project required coordinating application logic, data, and team changes.',
    status: 'Completed as a four person team project.'
  },
  game: {
    challenge: 'A 2D game grew across assignments, so the map editor, movement, collision, and game objects had to fit into a maintainable structure.',
    contribution: 'I built the Java game and map editor using MVC and object oriented design, then extended it with collision behavior and polymorphic game objects.',
    status: 'Completed through coursework.'
  }
};

const dialog = document.getElementById('projectDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDescription = document.getElementById('dialogDescription');
const dialogTags = document.getElementById('dialogTags');
const dialogChallenge = document.getElementById('dialogChallenge');
const dialogContribution = document.getElementById('dialogContribution');
const dialogStatus = document.getElementById('dialogStatus');
let lastOpener = null;

document.querySelectorAll('.project-open').forEach(button => {
  const card = button.closest('.card');
  const title = card.querySelector('h3').textContent.trim();
  const details = projectDetails[card.dataset.project];
  button.setAttribute('aria-label', `Open project case study: ${title}`);
  button.addEventListener('click', () => {
    lastOpener = button;
    dialog.dataset.project = card.dataset.project;
    dialogTitle.textContent = title;
    dialogDescription.textContent = card.querySelector('p').textContent.trim();
    dialogChallenge.textContent = details.challenge;
    dialogContribution.textContent = details.contribution;
    dialogStatus.textContent = details.status;
    dialogTags.replaceChildren();
    card.querySelectorAll('.tags span').forEach(tag => {
      const item = document.createElement('span');
      item.textContent = tag.textContent;
      dialogTags.appendChild(item);
    });
    dialog.showModal();
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => lastOpener?.focus());

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('#skills .skill').forEach(skill => observer.observe(skill));
}
