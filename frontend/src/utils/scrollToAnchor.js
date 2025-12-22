export const scrollToAnchor = (anchorId, e = null) => {
  if (e) {
    e.preventDefault();
  }

  // Если не на главной странице, переходим на главную
  if (window.location.pathname !== '/') {
    window.location.href = `/#${anchorId}`;
    return;
  }

  // Если на главной странице, скроллим к элементу
  const element = document.getElementById(anchorId);
  if (element) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - 20;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

