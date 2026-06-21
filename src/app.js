const form = document.querySelector('#dispatch-form');
const statusEl = document.querySelector('#form-status');
const results = document.querySelector('#results');
const packet = document.querySelector('#packet');
const marketActions = document.querySelector('#market-actions');

const marketplaceLinks = [
  ['Taskrabbit', 'https://www.taskrabbit.com/services/cleaning/house-cleaning'],
  ['Angi', 'https://www.angi.com/companylist/us/tx/austin/house-cleaning.htm'],
  ['Facebook Marketplace', 'https://www.facebook.com/marketplace/austin/search?query=cleaning%20services'],
];

function formToPayload(formData) {
  return Object.fromEntries([...formData.entries()].map(([key, value]) => [key, String(value).trim()]));
}

function renderLinks(summary) {
  marketActions.innerHTML = '';
  marketplaceLinks.forEach(([label, href]) => {
    const link = document.createElement('a');
    link.className = 'button secondary';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `Open ${label}`;
    link.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(summary);
        statusEl.textContent = `${label} link opened. Dispatch packet copied.`;
      } catch {
        statusEl.textContent = `${label} link opened. Copy the packet below manually.`;
      }
    });
    marketActions.appendChild(link);
  });
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusEl.textContent = 'Creating dispatch packet…';

  try {
    const response = await fetch('/api/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formToPayload(new FormData(form))),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Unable to create dispatch packet.');

    packet.textContent = data.summary;
    renderLinks(data.summary);
    results.hidden = false;
    statusEl.textContent = 'Packet ready. Copy it to your roster, Taskrabbit, Angi, or Facebook Marketplace workflow.';
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    statusEl.textContent = error.message;
  }
});
