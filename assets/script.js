document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }
  document.querySelectorAll("#year, .year").forEach(el => el.textContent = new Date().getFullYear());
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const text = `رسالة إلى مطاعم أسماك وادي النيل\nالاسم: ${data.get("name")}\nالهاتف: ${data.get("phone")}\nنوع الاستفسار: ${data.get("topic")}\nالرسالة: ${data.get("message")}`;
      const feedback = document.getElementById("formFeedback");
      feedback.textContent = "تم تجهيز الرسالة على جهازك. اختر نسخ الرسالة ثم أرسلها إلى إدارة المطعم عبر وسيلة التواصل الرسمية.";
      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "btn btn-outline-dark copy-message";
      copyButton.textContent = "نسخ الرسالة";
      copyButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(text);
          feedback.textContent = "تم نسخ الرسالة. يمكنك إرسالها عبر وسيلة التواصل الرسمية للمطعم.";
        } catch {
          const area = document.createElement("textarea");
          area.value = text;
          document.body.appendChild(area);
          area.select();
          document.execCommand("copy");
          area.remove();
          feedback.textContent = "تم نسخ الرسالة. يمكنك إرسالها عبر وسيلة التواصل الرسمية للمطعم.";
        }
      });
      const old = feedback.querySelector(".copy-message");
      if (old) old.remove();
      feedback.appendChild(document.createElement("br"));
      feedback.appendChild(copyButton);
    });
  }
});