window.addEventListener('load', () => {
  console.log('■ GA4');  
  const KEY = 'pochom_consent';
  if (localStorage.getItem(KEY) !== 'granted') return; // ★ ここは正しい

  console.log('GA4 page_view 発火準備OK');

  // gtag が初期化されるまで待つ
  function sendPageView() {
    if (typeof window.gtag !== 'function') {
      return requestAnimationFrame(sendPageView);
    }

    console.log('GA4 page_view 送信したよ');

    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }

  sendPageView();
});
