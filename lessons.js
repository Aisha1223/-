// عناوين الدروس
const LESSON_TITLES = {
  1: "أحترم ممتلكات الآخرين",
  2: "أحافظ على مرافق مدرستي",
  3: "أصون المرافق العامة لبلدي",
  4: "أقدر أسرتي",
  5: "عمالة بلادي",
  6: "أحمي نفسي على الطريق",
  7: "أهتم ببيئتي",
  8: "أعتني بصحتي",
  9: "أمارس هواياتي",
  10:"أحافظ على ممتلكاتي"
};

function getLessonNumberFromPath(){
  const m = location.pathname.match(/lesson(\d+)\.html$/i);
  return m ? parseInt(m[1],10) : null;
}

document.addEventListener("DOMContentLoaded", ()=>{
  const n = getLessonNumberFromPath();
  if (!n) return;

  const title = LESSON_TITLES[n] || `الدرس ${n}`;
  document.title = `الدرس ${n}: ${title}`;

  const h2 = document.querySelector(".lesson-title");
  if (h2) h2.textContent = `الدرس ${n}: ${title}`;

  // تأثير بسيط لصندوق الدرس
  const box = document.querySelector(".lesson-box");
  if (box){ box.style.transform="translateY(0)"; box.style.opacity="1"; }
});
