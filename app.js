// تخصيص نصوص الهيدر في index.html
document.addEventListener("DOMContentLoaded", () => {
  const sub = document.getElementById("subject");
  if (!sub) return; // هذا الملف يعمل في index.html فقط
  const subject = "التربية الوطنية";
  const school  = "مدرسة ام الحصم الابتدائيه للبنين";
  const lesson  = "";
  sub.textContent = subject;
  document.getElementById("school").textContent  = school;
  document.getElementById("lesson").textContent  = lesson;
});
