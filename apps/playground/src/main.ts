import '@vitals/tokens/vitals.css';
import '@myhealth-belgium/vitals';

document.addEventListener('vitals-error', (event) => {
  if (event.error) {
    console.warn(event.message);
    throw event.error;
  } else console.error(event.message);
});
