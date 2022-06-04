import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
  cssAnimationStyle: 'from-right',
});

const inputForm = document.querySelector('.form');

inputForm.addEventListener('change', evt => {
  const firstDelay = Number(evt.currentTarget.elements.delay.value);
  const step = Number(evt.currentTarget.elements.step.value);
  const amount = Number(evt.currentTarget.elements.amount.value);
  let delay = firstDelay;

  inputForm.addEventListener('submit', evt => {
    evt.preventDefault();
    for (let i = 0; i < amount; i++) {

      createPromise(i + 1, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;
    }
  })
}
)

function createPromise(position, delay) {
  let promise = new Promise(function (resolve, reject) {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
  return promise;
}