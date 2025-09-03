/* =========================
   quiz.js — بنك أسئلة + منطق اللعبة (غير متكرر)
   ========================= */

// ===== دوال مساعدة =====
function randInt(n){ return Math.floor(Math.random()*n); }
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=randInt(i+1); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function getLessonNumber(){ const m=location.pathname.match(/lesson(\d+)\.html$/i); return m?parseInt(m[1],10):1; }

// ===== بنك الأسئلة: لكل درس (صح/خطأ) + (دوائر) =====
const QUESTIONS = {
  1: { // أحترم ممتلكات الآخرين
    tf: [
      {q:"أخذ أقلام زميلي دون إذن تصرّف صحيح.", ans:false},
      {q:"احترام ممتلكات الآخرين سلوك جيد.", ans:true},
      {q:"تمزيق كتاب المدرسة يحافظ عليه.", ans:false}
    ],
    mc: [
      {q:"ماذا أفعل إذا وجدت كتابًا على الأرض؟", opts:["أرميه","أحتفظ به لنفسي","أعطيه للمعلم/صاحبه"], correct:2},
      {q:"كيف أحترم أدوات صديقي؟", opts:["أستأذن قبل الاستعمال","آخذها دون إذن","أخفيها عنه"], correct:0},
      {q:"رأيت لعبة ليست لي في الصف، ما الأفضل؟", opts:["أضعها في حقيبتي","أبلّغ المعلم عنها","أرميها"], correct:1}
    ]
  },
  2: { // أحافظ على مرافق مدرستي
    tf: [
      {q:"الكتابة على جدران المدرسة سلوك صحيح.", ans:false},
      {q:"إغلاق صنبور الماء بعد الاستعمال يحافظ على المرافق.", ans:true},
      {q:"تكسير الكراسي مزحة مسموحة.", ans:false}
    ],
    mc: [
      {q:"أيُّ سلوكٍ يحافظ على المرافق؟", opts:["رمي النفايات بالساحة","إغلاق الصنبور بعد الاستعمال","كسر الكرسي"], correct:1},
      {q:"وجدت كسرًا في الطاولة، ماذا تفعل؟", opts:["أتجاهله","أزيد الكسر","أخبر المعلم"], correct:2},
      {q:"كيف تحافظ على دورات المياه؟", opts:["أترك الماء جاريًا","أنظّف مكاني وأغلق الصنبور","أرسم على الجدار"], correct:1}
    ]
  },
  3: { // أصون المرافق العامة لبلدي
    tf: [
      {q:"الكتابة على جدار الحديقة العامة أمر مسموح.", ans:false},
      {q:"رمي المخلفات في السلة يحمي المرافق.", ans:true},
      {q:"اقتلاع الأشجار لعبة ممتعة!", ans:false}
    ],
    mc: [
      {q:"كيف أُظهر صون المرافق العامة؟", opts:["أكسر المقعد","أرمي المخلفات في السلة","أعبث بصنبور الماء"], correct:1},
      {q:"شاهدت مقعدًا مكسورًا في الحديقة، ماذا تفعل؟", opts:["أكسره أكثر","أُبلغ الجهة المسؤولة","ألتقط صورًا فقط"], correct:1},
      {q:"رمز ♻ يعني:", opts:["حظر الدخول","إعادة التدوير","خطر"], correct:1}
    ]
  },
  4: { // أقدر أسرتي
    tf: [
      {q:"مساعدة الأسرة في البيت يدل على التقدير.", ans:true},
      {q:"رفع الصوت على والديَّ تصرّف حسن.", ans:false},
      {q:"شكر أمي وأبي على جهودهم سلوك جميل.", ans:true}
    ],
    mc: [
      {q:"عاد والدي متعبًا، ما الأفضل؟", opts:["أرفع صوت التلفاز","أطلب منه يلعب فورًا","أُسلّم بهدوء وأعرض المساعدة"], correct:2},
      {q:"كيف أُظهر تقديري لأسرتي؟", opts:["أكسر الأغراض","أساعد في الترتيب","أتجاهل كلامهم"], correct:1},
      {q:"أختي تحتاج قلمًا، ماذا أفعل؟", opts:["أرفض دائمًا","أستأذن وأُعيرها","أُخفي قلمي"], correct:1}
    ]
  },
  5: { // عملة بلادي
    tf: [
      {q:"الدينار البحريني هو عملة بلادي.", ans:true},
      {q:"أدفع في المتجر ببطاقة المكتبة المدرسية فقط.", ans:false},
      {q:"المال يُستخدم لشراء الأشياء والخدمات.", ans:true}
    ],
    mc: [
      {q:"ماذا أحتاج عند الشراء من البائع؟", opts:["كرة ولعبة","مال (عملة بلادي)","دفتر الرسم فقط"], correct:1},
      {q:"أي مثال على ادخار المال؟", opts:["أصرف كل شيء الآن","أوفّر جزءًا في حصالة","أكسر الحصالة فورًا"], correct:1},
      {q:"أختار سعرًا مناسبًا يعني:", opts:["لا أنظر للسعر","أقارن وأختار المناسب","أشتري الأغلى دائمًا"], correct:1}
    ]
  },
  6: { // أحمي نفسي على الطريق
    tf: [
      {q:"أعبر الطريق من أي مكان بدون خطوط مشاة.", ans:false},
      {q:"أنتظر الإشارة الخضراء للمشاة قبل العبور.", ans:true},
      {q:"أركض فجأة بين السيارات.", ans:false}
    ],
    mc: [
      {q:"متى أعبر بأمان؟", opts:["عند الإشارة الحمراء للمشاة","عندما السيارات سريعة","عند الإشارة الخضراء وبعد التأكد من توقف السيارات"], correct:2},
      {q:"قبل العبور يجب:", opts:["أنظر يمين ثم يسار ثم يمين","أغمض عيني","أستمع للموسيقى"], correct:0},
      {q:"المكان الأنسب لعبور الطريق:", opts:["جسر المشاة/خطوط المشاة","وسط الشارع","من خلف سيارة متوقفة"], correct:0}
    ]
  },
  7: { // أهتم ببيئتي
    tf: [
      {q:"رمي القمامة في الحديقة يحمي البيئة.", ans:false},
      {q:"الفرز في الحاويات (ورق/بلاستيك) سلوك جيد.", ans:true},
      {q:"ترك صنبور الماء مفتوحًا يوفّر الماء.", ans:false}
    ],
    mc: [
      {q:"سلوك صديق للبيئة:", opts:["كسر الأغصان","الفرز وإعادة التدوير","حرق النفايات"], correct:1},
      {q:"أحافظ على المياه عندما:", opts:["أُغلق الصنبور بعد الاستعمال","أتركه جاريًا","ألعب به"], correct:0},
      {q:"رمز ♻ يعني:", opts:["إعادة التدوير","خطر","ممنوع الوقوف"], correct:0}
    ]
  },
  8: { // أعتني بصحتي
    tf: [
      {q:"الإفراط في الحلوى مفيد للصحة.", ans:false},
      {q:"النوم الكافي وشرب الماء عادات صحية.", ans:true},
      {q:"غسل اليدين قبل الأكل عادة غير مهمة.", ans:false}
    ],
    mc: [
      {q:"اختيار وجبة صحية:", opts:["بطاطس + مشروب غازي","ساندويتش جبن/خضار + ماء","شوكولاتة فقط"], correct:1},
      {q:"لأحافظ على صحتي:", opts:["أتجاهل الرياضة","أمارس نشاطًا بدنيًا","أسهر لوقت متأخر"], correct:1},
      {q:"أفضل مشروب يومي:", opts:["الماء","مشروب غازي","لا أشرب"], correct:0}
    ]
  },
  9: { // أمارس هواياتي
    tf: [
      {q:"ممارسة الهوايات تُنمّي المهارات.", ans:true},
      {q:"إزعاج الجيران بصراخٍ عالٍ هواية مفيدة.", ans:false},
      {q:"الرسم والقراءة من الهوايات الجيدة.", ans:true}
    ],
    mc: [
      {q:"مثال على هواية مفيدة:", opts:["إحداث الفوضى","قراءة قصص/الرسم","ترك الواجب دائمًا"], correct:1},
      {q:"وقت الفراغ:", opts:["أستغله في هواية مفيدة","أضايق الآخرين","لا أفعل شيئًا أبدًا"], correct:0},
      {q:"لأطوّر هوايتي:", opts:["أتدرّب بانتظام","أتوقف تمامًا","أسخر من المتدرّبين"], correct:0}
    ]
  },
  10: { // أحافظ على ممتلكاتي
    tf: [
      {q:"ترك أدواتي مبعثرة في الصف تصرّف صحيح.", ans:false},
      {q:"إعادة أغراضي إلى مكانها يحافظ عليها.", ans:true},
      {q:"فتح الماء بلا حاجة ثم المغادرة سلوك حسن.", ans:false}
    ],
    mc: [
      {q:"بعد تنظيف أسناني:", opts:["أترك الصنبور مفتوحًا","أغلقه وأعيد الأدوات مكانها","أرمي المنشفة أرضًا"], correct:1},
      {q:"كيف أحافظ على حقيبتي؟", opts:["أرتّبها وأحافظ على الدفاتر","أمزّق الكتب","أرمي الأقلام"], correct:0},
      {q:"ضاعت مبراتي، ماذا أفعل؟", opts:["آخذ مِبراة زميلي دون إذن","أستأذن أو أشتري أخرى","أغضب وأكسر شيئًا"], correct:1}
    ]
  }
};

// ===== حالة اللعب =====
let score = 0;
let currentLesson = 1;
let currentTF = null;
let currentMC = null;

// قوائم غير متكررة لكل درس (تُستهلك ثم يُعاد خلطها)
let poolTF = {};  // {lessonNumber: [tfQuestions...]}
let poolMC = {};  // {lessonNumber: [mcQuestions...]}

// ===== تحميل / إعادة تحميل الأسئلة (بدون تكرار) =====
function loadQuestions(){
  score = 0;
  currentLesson = getLessonNumber();
  const data = QUESTIONS[currentLesson] || QUESTIONS[1];

  // حضّر/أعد ملء قوائم الدرس إذا فاضية
  if(!poolTF[currentLesson] || poolTF[currentLesson].length === 0){
    poolTF[currentLesson] = shuffle([...data.tf]);
  }
  if(!poolMC[currentLesson] || poolMC[currentLesson].length === 0){
    poolMC[currentLesson] = shuffle([...data.mc]);
  }

  // اسحب أول سؤال متاح من كل نوع
  currentTF = poolTF[currentLesson].shift();
  currentMC = poolMC[currentLesson].shift();

  // حقن سؤال صح/خطأ
  const tfH = document.getElementById("tf-question");
  if (tfH) tfH.textContent = currentTF.q;

  // إعادة ضبط الواجهة
  document.getElementById("q1")?.classList.remove("hidden");
  document.getElementById("q2")?.classList.add("hidden");
  document.getElementById("result")?.classList.add("hidden");
}

// ===== الإجابة على سؤال صح/خطأ =====
function answerQ1(isTrue){
  if (isTrue === currentTF.ans){
    score++;
    alert("✅ صحيح، أحسنت!");

    // حضّر سؤال الدوائر مع خلط ترتيب الخيارات
    const qEl = document.getElementById("mc-question");
    const optsBox = document.getElementById("mc-options");
    qEl.textContent = currentMC.q;

    optsBox.innerHTML = "";
    // نحافظ على الفهرسة الأصلية للتصحيح لاحقًا
    const entries = currentMC.opts.map((text,idx)=>({text,idx}));
    shuffle(entries).forEach(({text,idx})=>{
      const id = "opt_"+idx+"_"+Math.random().toString(36).slice(2,6);
      optsBox.insertAdjacentHTML("beforeend",
        `<label for="${id}"><input id="${id}" type="radio" name="q2" value="${idx}"> ${text}</label><br>`
      );
    });

    // إظهار السؤال 2
    document.getElementById("q1").classList.add("hidden");
    document.getElementById("q2").classList.remove("hidden");
  } else {
    alert("❌ خطأ، جرّب مرة ثانية");
  }
}

// ===== التحقق من سؤال الدوائر =====
function checkQ2(ev){
  if (ev) ev.preventDefault();
  const sel = document.querySelector('input[name="q2"]:checked');
  if (!sel){ alert("اختر إجابة أولاً"); return; }

  const chosen = parseInt(sel.value,10);
  if (chosen === currentMC.correct){
    score++;
    alert("✅ ممتاز!");
    document.getElementById("q2").classList.add("hidden");
    showResult();
  } else {
    alert("❌ غير صحيح، حاول مرة أخرى");
  }
}

// ===== عرض النتيجة + رسالة تحفيزية =====
function showResult(){
  const res = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const msgEl = document.getElementById("msg");
  const starsEl = document.getElementById("stars");

  scoreEl.textContent = `${score} / 2`;
  res.classList.remove("bad");

  if (score === 2){
    starsEl.textContent = "🌟🌟";
    msgEl.textContent = "بطل! نتيجتك كاملة — استمرارك بيخليك متميز 👏";
  } else if (score === 1){
    starsEl.textContent = "🌟";
    msgEl.textContent = "حلو! إجابة وحدة صحيحة — جرّب تعيد عشان تكملها 💪";
    res.classList.add("bad");
  } else {
    starsEl.textContent = "⭐";
    msgEl.textContent = "ما عليه، المحاولة مهمة! أعد المحاولة وبتنجح إن شاء الله 🙂";
    res.classList.add("bad");
  }
  res.classList.remove("hidden");
}

// ===== إعادة المحاولة (يختار سؤالين جديدين من الباقي) =====
function retry(){
  loadQuestions(); // لا يُكرر حتى يخلص كل أسئلة الدرس
  return false;
}

// بدء التشغيل
document.addEventListener("DOMContentLoaded", loadQuestions);
