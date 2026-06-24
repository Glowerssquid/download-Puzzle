const files = {
  mobile: 'download/app-debug.apk',
  desktop: 'download/PuzzlesWinFormsExact_2.rar'
};

function absoluteUrl(path) {
  return new URL(path, window.location.href).href;
}

const mobileUrl = absoluteUrl(files.mobile);
const desktopUrl = absoluteUrl(files.desktop);

const mobileLink = document.querySelector('#mobileLink');
const desktopLink = document.querySelector('#desktopLink');
const desktopUrlText = document.querySelector('#desktopUrl');
const qrImage = document.querySelector('#mobileQr');
const qrBox = document.querySelector('.qr-box');
const toast = document.querySelector('#toast');

mobileLink.href = mobileUrl;
desktopLink.href = desktopUrl;
desktopUrlText.textContent = desktopUrl;

const qrApi = new URL('https://api.qrserver.com/v1/create-qr-code/');
qrApi.searchParams.set('size', '380x380');
qrApi.searchParams.set('margin', '12');
qrApi.searchParams.set('data', mobileUrl);
qrImage.src = qrApi.href;
qrImage.addEventListener('load', () => qrBox.classList.add('loaded'));
qrImage.addEventListener('error', () => {
  const fallback = document.querySelector('#qrFallback');
  fallback.textContent = 'QR-код не загрузился. Используйте кнопку скачивания ниже.';
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Ссылка скопирована');
  } catch (error) {
    showToast('Не удалось скопировать ссылку');
  }
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.copy === 'mobile' ? mobileUrl : desktopUrl;
    copyText(target);
  });
});
