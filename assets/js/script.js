document.addEventListener('DOMContentLoaded', () => {
  // 🔸 헤더 메뉴
  const menuBtns = document.querySelectorAll('.header__menu-btn');
  const globalSubmenu = document.getElementById('globalSubmenu');
  const submenuClose = document.getElementById('submenuClose');
  const hamburgerBtn = document.getElementById('hamburgerBtn');

  menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      globalSubmenu?.classList.toggle('header__submenu--open');
    });
  });

  submenuClose?.addEventListener('click', () => {
    globalSubmenu?.classList.remove('header__submenu--open');
  });

  hamburgerBtn?.addEventListener('click', () => {
    globalSubmenu?.classList.toggle('header__submenu--open');
    hamburgerBtn.blur();
  });

  // 사이드 배너
  const sideBanners = document.getElementById('sideBanners');
  const sideBannersClose = document.getElementById('sideBannersClose');
  sideBannersClose?.addEventListener('click', () => {
    sideBanners.style.display = 'none';
  });

  // 영상 팝업
  const openPopupBtn = document.getElementById('openPopupBtn');
  const videoPopup = document.getElementById('videoPopup');
  const videoOverlay = document.getElementById('videoOverlay');
  const videoClose = document.getElementById('videoClose');

  openPopupBtn?.addEventListener('click', () => {
    videoPopup?.classList.add('video-popup--open');
  });
  videoClose?.addEventListener('click', () => {
    videoPopup?.classList.remove('video-popup--open');
  });
  videoOverlay?.addEventListener('click', () => {
    videoPopup?.classList.remove('video-popup--open');
  });

  // 탭 전환 기능
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const tabFeatures = document.querySelectorAll('.tab-feature-text__item'); // ✅ 추가

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 기존 탭 비활성화 처리
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    tabFeatures.forEach(f => f.classList.remove('active')); // ✅ 설명문구도 숨김

    // 클릭된 탭 활성화
    const targetId = btn.getAttribute('data-tab');
    document.getElementById(targetId)?.classList.add('active');
    document.getElementById('feature-' + targetId)?.classList.add('active'); // ✅ 해당 설명문구 표시

    btn.classList.add('active');
  });
});

  // 모달 열기
  const modalBtns = document.querySelectorAll('.detail-btn');
  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById('modal-' + modalId);
      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  // 모달 닫기
  const modalCloses = document.querySelectorAll('.modal-close, .teacher-modal__overlay');
  modalCloses.forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.teacher-modal.active').forEach(modal => {
        modal.classList.remove('active');
      });
    });
  });

  // FAQ 탭 필터
  const faqTabs = document.querySelectorAll('.faq-tab-button');
const faqItems = document.querySelectorAll('.faq-item');

faqTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // 모든 탭에서 active 제거
    faqTabs.forEach(btn => btn.classList.remove('active'));

    // 클릭한 탭 active 추가
    tab.classList.add('active');

    const selectedCategory = tab.getAttribute('data-category');

    // 모든 FAQ 항목 초기화
    faqItems.forEach(item => {
      if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});


    // FAQ 아코디언 
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
      question.addEventListener('click', () => {
        const parent = question.closest('.faq-item');
    
        // 이미 열려 있으면 닫기
        if (parent.classList.contains('active')) {
          parent.classList.remove('active');
        } else {
          // 열려 있는 것들 닫기
          faqItems.forEach(item => item.classList.remove('active'));
          parent.classList.add('active');
        }
      });
    });

// 수강 절차 아코디언
document.querySelectorAll('.step-item .toggle-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const stepItem = this.closest('.step-item');
    stepItem.classList.toggle('active');
  });
});

// 수강 필독
const guideTitles = document.querySelectorAll('.guide-tab__title');
guideTitles.forEach(title => {
  title.addEventListener('click', () => {
    const parent = title.closest('.guide-tab');
    const content = parent.querySelector('.guide-tab__content');

    const isOpen = content.classList.contains('active');

    // 모두 닫기
    document.querySelectorAll('.guide-tab__content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.guide-tab__title .guide-icon').forEach(i => i.textContent = '+');

    // 현재 항목만 열기
    if (!isOpen) {
      content.classList.add('active');
      title.querySelector('.guide-icon').textContent = '–';
    } else {
      title.querySelector('.guide-icon').textContent = '+';
    }
  });
});

// 수강 선택박스 공통 토글
document.querySelectorAll('.course-item, .select-box').forEach(box => {
  box.addEventListener('click', () => {
    const group = box.closest('.select-box-list, .course-list');
    if (group) {
      // 그룹 내 모든 선택 해제
      group.querySelectorAll('.course-item, .select-box').forEach(item => item.classList.remove('active'));
    }
    // 선택된 항목만 활성화
    box.classList.add('active');

    // 가격 변경 함수 호출 (계산 기능 추가시 연결 가능)
    updatePriceSummary();
  });
});

// 가격 요약 함수
function updatePriceSummary() {
  const selectedCourse = document.querySelector('.course-item.active');
  const basePrice = parseInt(selectedCourse?.dataset.price || 89000);

  const countEl = document.querySelector('.select-box-list.count .active');
  const count = parseInt(countEl?.dataset.count || 1);
  let countPriceFactor = count; // 기본: count배수
  if (count > 1) countPriceFactor *= 0.95; // 2회 이상 할인 적용

  const timeEl = document.querySelector('.select-box-list.time .active');
  const timeFactor = parseFloat(timeEl?.dataset.time || 1);

  const periodEl = document.querySelector('.select-box-list.period .active');
  const periodFactor = parseInt(periodEl?.dataset.period || 1);
  const periodDiscount = parseFloat(periodEl?.dataset.periodDiscount || 1);
  const periodFinalFactor = periodFactor * periodDiscount;

  const totalPrice = Math.round(basePrice * countPriceFactor * timeFactor * periodFinalFactor);

  const discount = 0;
  const point = 0;
  const coupon = 0;
  const finalPrice = totalPrice - discount - point - coupon;

  const summaryTitleEl = document.querySelector('.summary-title span');
  const summaryIconEl = document.getElementById('summaryIcon');
  if (selectedCourse) {
    const courseText = selectedCourse.textContent.trim();
    const courseIcon = selectedCourse.getAttribute('data-icon');
    if (summaryTitleEl) summaryTitleEl.textContent = courseText;
    if (summaryIconEl && courseIcon) summaryIconEl.setAttribute('src', courseIcon);
  }

  document.getElementById("basePrice").innerHTML = totalPrice.toLocaleString() + " <em>원</em>";
  document.getElementById("discountPrice").innerHTML = "-" + discount.toLocaleString() + " <em>원</em>";
  document.getElementById("pointDiscount").innerHTML = "-" + point.toLocaleString() + " 원";
  document.getElementById("couponDiscount").innerHTML = "-" + coupon.toLocaleString() + " 원";
  document.getElementById("finalPrice").innerHTML = "-" + finalPrice.toLocaleString() + " <em>원</em>";
}







});
