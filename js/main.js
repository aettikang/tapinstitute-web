// 휴대폰 메뉴 열고 닫기
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;

  var isKo = document.documentElement.lang === 'ko';
  var openLabel = isKo ? '메뉴 열기' : 'Open menu';
  var closeLabel = isKo ? '메뉴 닫기' : 'Close menu';

  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? closeLabel : openLabel);
  }

  btn.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });

  // 메뉴 항목을 누르면 메뉴를 닫습니다
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Esc 키로 닫기
  nav.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); btn.focus(); }
  });
})();
