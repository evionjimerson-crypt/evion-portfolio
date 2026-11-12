const dialog = document.getElementById('projectDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDescription = document.getElementById('dialogDescription');
const dialogTags = document.getElementById('dialogTags');
let lastOpener = null;

document.querySelectorAll('.project-open').forEach(button => {
  const card = button.closest('.card');
  const title = card.querySelector('h3').textContent.trim();
  button.setAttribute('aria-label', `Open project: ${title}`);
  button.addEventListener('click', () => {
    lastOpener = button;
    dialogTitle.textContent = title;
    dialogDescription.textContent = card.querySelector('p').textContent.trim();
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
