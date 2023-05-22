
/* модалльное окно */

const singInButton = document.querySelector('.buttons__button-prime');
const modal = document.querySelector('.modal-wrapper');

singInButton.addEventListener('click', () => {
  modal.classList.add('modal-wrapper_active');
});

modal.addEventListener('click', (e) => {
  const caption = e.target;
  if (!caption.classList.contains('modal-wrapper_active')) return;
  modal.classList.remove('modal-wrapper_active');
});

/* Отправка формы */

async function submitForm(event) {
  event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
  try {
    // Формируем запрос
    const response = await fetch(event.target.action, {
      method: 'POST',
      body: new FormData(event.target)
    });
    // проверяем, что ответ есть
    if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
    // проверяем, что ответ действительно JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw ('Не отправлено. Вы - РОБОТ!');
    }
    // обрабатываем запрос
    const json = await response.json();
    if (json.result === "success") {
      // в случае успеха
      alert(json.info);
      setTimeout(() => {
        modal.classList.remove('modal-wrapper_active');
      }, "1000");
    } else { 
      // в случае ошибки
      console.log(json);
      throw (json.info);
    }
  } catch (error) { // обработка ошибки
    alert(error);
  }
}