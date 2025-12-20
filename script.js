// ================= SWIPER =================
const swiper = new Swiper(".swiper-container", {
  speed: 900,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: ".swiper-pagination"
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

// ================= FAQ =================
function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const arrow = element.querySelector('.arrow');

  answer.classList.toggle("active");
  arrow.style.transform = answer.classList.contains("active")
    ? "rotate(330deg)"
    : "rotate(0deg)";
}

// ================= PHONE INPUT =================
const inputPhone = document.getElementById("phone");

inputPhone.addEventListener("focus", () => {
  if (!inputPhone.value) {
    inputPhone.value = "+";
  }
});

inputPhone.addEventListener("input", () => {
  let digits = inputPhone.value.replace(/\D/g, "");
  inputPhone.value = "+" + digits;
});

inputPhone.addEventListener("keydown", (e) => {
  const pos = inputPhone.selectionStart;

  if ((e.key === "Backspace" || e.key === "Delete") && pos <= 1) {
    e.preventDefault();
  }

  if (e.key === "ArrowLeft" && pos <= 1) {
    e.preventDefault();
  }
});

inputPhone.addEventListener("paste", (e) => {
  e.preventDefault();
  const paste = (e.clipboardData || window.clipboardData).getData("text");
  const digits = paste.replace(/\D/g, "");
  inputPhone.value = "+" + digits;
});


// ================= SCROLL =================
document.querySelectorAll('.contact-us, .reasons-button').forEach(btn => {
  btn?.addEventListener('click', () => {
    document.querySelector('#Contact')?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('.logo-footer')?.addEventListener('click', () => {
  document.querySelector('#Home')?.scrollIntoView({ behavior: 'smooth' });
});

// ================= FORM =================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const phoneInput = document.getElementById('phone');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');
  const closeNotificationBtn = document.getElementById('close-notification');

  if (!form) return;

  phoneInput?.addEventListener('focus', () => {
    if (!phoneInput.value.startsWith('+')) {
      phoneInput.value = '+' + phoneInput.value.replace(/\D/g, '');
    }
  });

  function showNotification(text) {
    notificationText.textContent = text;
    notification.style.display = 'flex';
  }

  closeNotificationBtn?.addEventListener('click', () => {
    notification.style.display = 'none';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const rawPhone = phoneInput.value.replace(/\D/g, '');
    const phone = '+' + rawPhone;

    const validUA = ["39","50","63","66","67","68","73","91","92","93","94","95","96","97","98","99"];
    let isValid = false;

    if (phone.startsWith("+380") && phone.length === 13) {
      isValid = validUA.includes(phone.slice(4, 6));
    } else if (
      (phone.startsWith("+420") && phone.length === 13) ||
      (phone.startsWith("+1") && phone.length === 12) ||
      (phone.startsWith("+44") && phone.length === 13 && phone[3] === '7')
    ) {
      isValid = true;
    }

    if (!isValid) {
      showNotification("Введіть правильний номер телефону.");
      return;
    }

    const token = "8392498239:AAEROAOnnmvHNRs75fu03mEWD2z3XGx0-cI";
    const chatIds = ["1113969494", "744263334"];
    const message = `🧑 Нове звернення\n📇 Ім’я: ${name}\n📞 Телефон: ${phone}`;

    try {
      await Promise.all(
        chatIds.map(id =>
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: id, text: message })
          })
        )
      );

      form.reset();
      window.location.href = "thanks-page.html";

    } catch {
      showNotification("Помилка з'єднання з Telegram.");
    }
  });
});

// ================= MODALS =================
function openModal(id) {
  document.getElementById(id)?.classList.add("show");
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("show");
}

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove("show");
  }
});

// ================= TABS =================
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#tab-buttons button');
  const tabs = document.querySelectorAll('.tab');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(tab => tab.classList.remove('active'));
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });
});

// ================= MOBILE MENU =================
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  toggleBtn.textContent = mobileMenu.classList.contains("active") ? "✖" : "☰";
});

mobileMenu?.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    toggleBtn.textContent = "☰";
  });
});
