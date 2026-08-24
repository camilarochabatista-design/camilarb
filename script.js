document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  const notaInput = document.getElementById('nota');
  const tagBtns = document.querySelectorAll('.tag-btn');
  const form = document.getElementById('feedbackForm');
  const feedbacksList = document.getElementById('feedbacksList');

  let selectedTag = '';

  // Sistema de Classificação por Estrelas
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = star.getAttribute('data-value');
      notaInput.value = value;
      
      stars.forEach(s => {
        if (s.getAttribute('data-value') <= value) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });

  // Seleção de Tags Rápidas
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTag = btn.textContent;
    });
  });

  // Envios do Formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const prato = document.getElementById('prato').value;
    const nota = notaInput.value;
    const comentario = document.getElementById('comentario').value;

    if (nota === "0") {
      alert("Por favor, selecione uma nota usando as estrelas!");
      return;
    }

    // Criar o card do feedback
    const card = document.createElement('div');
    card.className = 'feedback-card';
    card.innerHTML = `
      <div class="feedback-header">
        <span>${prato}</span>
        <span class="feedback-stars">${'★'.repeat(nota)}${'☆'.repeat(5 - nota)}</span>
      </div>
      <p style="color: #cbd5e1;">${comentario || 'Sem comentário adicional.'}</p>
      ${selectedTag ? `<span class="feedback-tag">${selectedTag}</span>` : ''}
    `;

    // Adicionar no início da lista
    feedbacksList.prepend(card);

    // Limpar o formulário
    form.reset();
    notaInput.value = "0";
    stars.forEach(s => s.classList.remove('active'));
    tagBtns.forEach(b => b.classList.remove('selected'));
    selectedTag = '';

    alert("Opinião enviada com sucesso! Valeu por ajudar a melhorar a merenda. 🎉");
  });
});