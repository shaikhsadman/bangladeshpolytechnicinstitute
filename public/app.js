/* =========================================================================
   BANGLADESH POLYTECHNIC INSTITUTE — STUDENT MANAGEMENT SYSTEM
   Single-file demo app. Data persists in this browser via localStorage.
   ========================================================================= */

const DEPARTMENTS = ["Computer Science & Technology","Electrical & Electronics Technology","Civil Technology","Mechanical Technology"];
const DEPT_SHORT = {"Computer Science & Technology":"CST","Electrical & Electronics Technology":"EEE","Civil Technology":"CIVIL","Mechanical Technology":"MECH"};
const SUBJECTS_BY_DEPT = {
  "Computer Science & Technology":["Programming in C","Data Structures","Database Management","Web Technology","Digital Electronics"],
  "Electrical & Electronics Technology":["Circuit Analysis","Electrical Machines","Power Plant Engineering","Industrial Electronics","Electrical Drawing"],
  "Civil Technology":["Surveying","Structural Analysis","Building Construction","Concrete Technology","Engineering Drawing"],
  "Mechanical Technology":["Thermodynamics","Machine Design","Fluid Mechanics","Manufacturing Process","Auto CAD"]
};

/* ---------------- ICONS (inline SVG, stroke = currentColor) ---------------- */
const ICONS = {
  overview:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
  students:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.4"/><path d="M15 20c0-2.6 1.6-4.6 4-5.3"/></svg>`,
  teachers:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l10-4 10 4-10 4-10-4z"/><path d="M6 10.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5"/></svg>`,
  attendance:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4.5" width="18" height="16" rx="2.2"/><path d="M3 9.5h18"/><path d="M8 3v3M16 3v3"/><path d="M8.2 14l2.3 2.3L15.8 12"/></svg>`,
  marks:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>`,
  result:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 13h6M9 17h6M9 9.5h3"/></svg>`,
  teacherAttn:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l10-4 10 4-10 4-10-4z"/><path d="M8.5 15.5l2 2 4-4"/></svg>`
};

/* ---------------- DEFAULT DATA (seeded on first run) ---------------- */
const DEFAULT_STUDENTS = [
["MD Parvej Khan","155001","CST",6,"Rezaul Khan","01711-100001","parvej.khan@bangladeshpolytechnicinstitute.com","Rajshahi","A+","Wt92Uv66"],
["Russel Ahmed","155002","CST",6,"Aminul Ahmed","01711-100002","russel.ahmed@bangladeshpolytechnicinstitute.com","Rajshahi","B+","Agmm3eAz"],
["Shaikh Sadman Sakib","155003","CST",6,"Shaikh Kamal","01711-100003","sadman.sakib@bangladeshpolytechnicinstitute.com","Rajshahi","O","7wUpcjNm"],
["Nur Muhammad","155004","CST",5,"Nazrul Islam","01711-100004","nur.muhammad@bangladeshpolytechnicinstitute.com","Naogaon","A","d5rh3MMs"],
["Eliyas Rajjak","155005","CST",5,"Abdur Rajjak","01711-100005","eliyas.rajjak@bangladeshpolytechnicinstitute.com","Naogaon","B","hKfAAMb3"],
["Rakin Absar","155006","CST",5,"Aminul Absar","01711-100006","rakin.absar@bangladeshpolytechnicinstitute.com","Rajshahi","AB+","862AQSz7"],
["Elma Rahman","155007","CST",7,"Mizanur Rahman","01711-100007","elma.rahman@bangladeshpolytechnicinstitute.com","Rajshahi","A+","vz2px4wE"],
["Aniha Islam","155008","CST",7,"Nurul Islam","01711-100008","aniha.islam@bangladeshpolytechnicinstitute.com","Chapainawabganj","O+","7wPY7SvE"],
["Firoz Khan","155009","EEE",6,"Aslam Khan","01712-100009","firoz.khan@bangladeshpolytechnicinstitute.com","Rajshahi","B+","Fx4xMQD9"],
["Haider Ullah","155010","EEE",6,"Zia Ullah","01712-100010","haider.ullah@bangladeshpolytechnicinstitute.com","Rajshahi","A","kJHSe9pD"],
["Fariha Zaman","155011","EEE",5,"Shafiq Zaman","01712-100011","fariha.zaman@bangladeshpolytechnicinstitute.com","Natore","A+","ig6xX6pe"],
["Lamiya Rahman","155012","EEE",5,"Habibur Rahman","01712-100012","lamiya.rahman@bangladeshpolytechnicinstitute.com","Natore","B","e9UPvdnr"],
["Tanvir Ahmed","155013","EEE",7,"Salim Ahmed","01712-100013","tanvir.ahmed@bangladeshpolytechnicinstitute.com","Rajshahi","O","Pq82FjKs"],
["Mehedi Hasan","155014","EEE",7,"Anwar Hasan","01712-100014","mehedi.hasan@bangladeshpolytechnicinstitute.com","Pabna","A","fhhKE5WF"],
["Sabbir Hossain","155015","EEE",6,"Delwar Hossain","01712-100015","sabbir.hossain@bangladeshpolytechnicinstitute.com","Rajshahi","B+","Kx9XWRCU"],
["Nusrat Jahan","155016","EEE",6,"Kamal Jahan","01712-100016","nusrat.jahan@bangladeshpolytechnicinstitute.com","Rajshahi","AB+","6CU2BGay"],
["Rafiul Islam","155017","Civil",5,"Nazmul Islam","01713-100017","rafiul.islam@bangladeshpolytechnicinstitute.com","Bogura","A+","ykUj49JJ"],
["Tasnim Akter","155018","Civil",5,"Jasim Akter","01713-100018","tasnim.akter@bangladeshpolytechnicinstitute.com","Rajshahi","O+","Dy5GhjTW"],
["Imran Kabir","155019","Civil",6,"Yousuf Kabir","01713-100019","imran.kabir@bangladeshpolytechnicinstitute.com","Rajshahi","B","wA3ByRea"],
["Shamima Nasrin","155020","Civil",6,"Fazlul Nasrin","01713-100020","shamima.nasrin@bangladeshpolytechnicinstitute.com","Joypurhat","A","QaueMFg2"],
["Arafat Rahman","155021","Civil",7,"Motiur Rahman","01713-100021","arafat.rahman@bangladeshpolytechnicinstitute.com","Rajshahi","B+","pjmPV8ca"],
["Jannatul Ferdous","155022","Civil",7,"Rafiqul Ferdous","01713-100022","jannatul.ferdous@bangladeshpolytechnicinstitute.com","Rajshahi","O","sjnM3gUV"],
["Kamrul Hasan","155023","Civil",5,"Shahidul Hasan","01713-100023","kamrul.hasan@bangladeshpolytechnicinstitute.com","Sirajganj","A+","K5re9FsA"],
["Sumaiya Islam","155024","Civil",5,"Aynul Islam","01713-100024","sumaiya.islam@bangladeshpolytechnicinstitute.com","Rajshahi","AB+","zbkCB5Ug"],
["Mahfuzur Rahman","155025","Mechanical",6,"Aziz Rahman","01714-100025","mahfuzur.rahman@bangladeshpolytechnicinstitute.com","Rajshahi","B","ysZbgVm4"],
["Rima Akter","155026","Mechanical",6,"Iqbal Akter","01714-100026","rima.akter@bangladeshpolytechnicinstitute.com","Rajshahi","A","jxmsbHk2"],
["Shakil Ahmed","155027","Mechanical",5,"Wahid Ahmed","01714-100027","shakil.ahmed@bangladeshpolytechnicinstitute.com","Chapainawabganj","O+","vgmmV6F5"],
["Nadia Islam","155028","Mechanical",5,"Sohel Islam","01714-100028","nadia.islam@bangladeshpolytechnicinstitute.com","Rajshahi","B+","E8PvVxpH"],
["Rakibul Hasan","155029","Mechanical",7,"Alamgir Hasan","01714-100029","rakibul.hasan@bangladeshpolytechnicinstitute.com","Natore","A+","23dNGJQr"],
["Farzana Akter","155030","Mechanical",7,"Mostafa Akter","01714-100030","farzana.akter@bangladeshpolytechnicinstitute.com","Rajshahi","O","24i3Mix6"],
["Ashraful Alam","155031","CST",4,"Nizam Alam","01711-100031","ashraful.alam@bangladeshpolytechnicinstitute.com","Rajshahi","B","wGx24QjK"],
["Marzia Sultana","155032","CST",4,"Rowshan Sultana","01711-100032","marzia.sultana@bangladeshpolytechnicinstitute.com","Naogaon","A","A3sv9Q2u"],
["Zahidul Islam","155033","EEE",4,"Sirajul Islam","01712-100033","zahidul.islam@bangladeshpolytechnicinstitute.com","Rajshahi","AB+","4D9UhT98"],
["Tania Rahman","155034","EEE",4,"Enamul Rahman","01712-100034","tania.rahman@bangladeshpolytechnicinstitute.com","Pabna","O+","ivVu2uqC"],
["Mizanur Rahman","155035","Civil",4,"Aftab Rahman","01713-100035","mizanur.rahman@bangladeshpolytechnicinstitute.com","Rajshahi","A+","2WVWSfeW"],
["Sharmin Akter","155036","Civil",4,"Jalal Akter","01713-100036","sharmin.akter@bangladeshpolytechnicinstitute.com","Bogura","B+","upZ5s9rA"],
["Anisur Rahman","155037","Mechanical",4,"Latif Rahman","01714-100037","anisur.rahman@bangladeshpolytechnicinstitute.com","Rajshahi","A","X58UHzDM"],
["Rupa Khatun","155038","Mechanical",4,"Karim Khatun","01714-100038","rupa.khatun@bangladeshpolytechnicinstitute.com","Joypurhat","O","tgf869P8"],
["Tarek Aziz","155039","CST",7,"Moinul Aziz","01711-100039","tarek.aziz@bangladeshpolytechnicinstitute.com","Rajshahi","B+","xX5kWXHn"],
["Nishat Tabassum","155040","EEE",7,"Rashedul Tabassum","01712-100040","nishat.tabassum@bangladeshpolytechnicinstitute.com","Natore","A+","X5qu8G4C"]
];

const DEFAULT_TEACHERS = [
["Sayed Sadakatul Bari","T001","Head of Department","Computer Science & Technology","Data Structures","01911-200001","sadakatul.bari@bangladeshpolytechnicinstitute.com","M.Sc in CSE",2010,"9u4gybf6"],
["Selim Mahmud","T002","Senior Instructor","Electrical & Electronics Technology","Electrical Machines","01911-200002","selim.mahmud@bangladeshpolytechnicinstitute.com","B.Sc in EEE",2012,"Z4d5kjpu"],
["Rifah Tasnia","T003","Instructor","Civil Technology","Structural Analysis","01911-200003","rifah.tasnia@bangladeshpolytechnicinstitute.com","B.Sc in Civil Engg.",2015,"FqGQms4H"],
["Atia Khatun","T004","Instructor","Mechanical Technology","Thermodynamics","01911-200004","atia.khatun@bangladeshpolytechnicinstitute.com","B.Sc in Mechanical Engg.",2016,"s76Nc8WB"],
["Md. Hasibul Islam","T005","Junior Instructor","Computer Science & Technology","Web Technology","01911-200005","hasibul.islam@bangladeshpolytechnicinstitute.com","B.Sc in CSE",2019,"V7Bb4YkA"],
["Kamruzzaman Bhuiyan","T006","Senior Instructor","Civil Technology","Surveying","01911-200006","kamruzzaman.bhuiyan@bangladeshpolytechnicinstitute.com","M.Sc in Civil Engg.",2011,"sQU69VzE"],
["Nasrin Sultana","T007","Instructor","Electrical & Electronics Technology","Industrial Electronics","01911-200007","nasrin.sultana@bangladeshpolytechnicinstitute.com","B.Sc in EEE",2017,"iMyA8sst"],
["Abdul Kader","T008","Junior Instructor","Mechanical Technology","Auto CAD","01911-200008","abdul.kader@bangladeshpolytechnicinstitute.com","B.Sc in Mechanical Engg.",2020,"k4PuSVBH"]
];

/* Admin accounts: [username, display name, password] */
const ADMIN_ACCOUNTS = [
["admin1","Principal Admin","XDbTa4pE"],
["admin2","Academic Admin","2ZDMgJkC"],
["admin3","IT Admin","rx8fHtcH"]
];

function deptFullName(short){
  if(short==="Civil") return "Civil Technology";
  if(short==="Mechanical") return "Mechanical Technology";
  return DEPARTMENTS.find(d=>DEPT_SHORT[d]===short) || short;
}

/* Seeded RNG so default demo GPA values are reproducible on first load */
function mulberry32(seed){
  return function(){
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed>>>15, 1 | seed);
    t = t + Math.imul(t ^ t>>>7, 61 | t) ^ t;
    return ((t ^ t>>>14) >>> 0) / 4294967296;
  };
}

function genDateList(startStr, count){
  const start = new Date(startStr+"T00:00:00");
  const arr=[];
  for(let i=0;i<count;i++){
    const d = new Date(start);
    d.setDate(d.getDate()+i);
    arr.push(d.toISOString().slice(0,10));
  }
  return arr;
}
/* Builds a day-by-day Present/Absent sequence whose overall attendance
   lands somewhere between 50% and 95% (seeded, so results are stable). */
function buildAttendanceSequence(seedBase, totalDays){
  const rng = mulberry32(seedBase);
  const pct = 50 + Math.round(rng()*45); // 50 - 95
  const presentCount = Math.round(totalDays*pct/100);
  let statuses = new Array(totalDays).fill("Absent");
  for(let i=0;i<presentCount;i++) statuses[i] = "Present";
  const offset = Math.floor(rng()*totalDays);
  statuses = statuses.slice(offset).concat(statuses.slice(0,offset));
  return statuses;
}

function buildDefaultData(){
  const students = DEFAULT_STUDENTS.map((r,i)=>{
    const dept = deptFullName(r[2]);
    return {
      id:"S"+(i+1),
      name:r[0], boardRoll:r[1], department:dept, semester:r[3],
      guardian:r[4], phone:r[5], email:r[6], address:r[7], bloodGroup:r[8],
      session:"2022-23", password:r[9]
    };
  });
  const teachers = DEFAULT_TEACHERS.map((r,i)=>({
    id:"T"+(i+1), name:r[0], empId:r[1], designation:r[2], department:r[3],
    subject:r[4], phone:r[5], email:r[6], qualification:r[7], joinYear:r[8], password:r[9]
  }));
  const users = {};
  ADMIN_ACCOUNTS.forEach(a=>{ users[a[0]] = {password:a[2], role:"admin", name:a[1]}; });
  students.forEach(s=>{ users[s.boardRoll] = {password:s.password, role:"student", refId:s.id, name:s.name}; });
  teachers.forEach(t=>{ users[t.empId] = {password:t.password, role:"teacher", refId:t.id, name:t.name}; });

  /* Semester-wise GPA results — semester 1 through 8, GPA range 3.50-4.00 */
  const semesterResults = [];
  students.forEach((s,i)=>{
    const rng = mulberry32(5000 + i*97);
    for(let sem=1; sem<=8; sem++){
      let gpa = 3.5 + rng()*0.5;
      gpa = Math.min(4.00, Math.round(gpa*100)/100);
      semesterResults.push({id:s.id+"_sem"+sem, studentId:s.id, semester:sem, gpa});
    }
  });

  /* Attendance — seeded so every student and every teacher lands between 50% and 95% */
  const ATT_DAYS = 20;
  const attDates = genDateList("2026-06-01", ATT_DAYS);

  const attendance = [];
  students.forEach((s,i)=>{
    const subject = (SUBJECTS_BY_DEPT[s.department] || [])[0] || "General";
    const seq = buildAttendanceSequence(7000 + i*53, ATT_DAYS);
    attDates.forEach((date, d)=>{
      attendance.push({studentId:s.id, date, subject, status:seq[d]});
    });
  });

  const teacherAttendance = [];
  teachers.forEach((t,i)=>{
    const seq = buildAttendanceSequence(9000 + i*61, ATT_DAYS);
    attDates.forEach((date, d)=>{
      teacherAttendance.push({teacherId:t.id, date, status:seq[d]});
    });
  });

  return {students, teachers, users, attendance, marks:[], semesterResults, teacherAttendance};
}

/* ---------------- STORAGE LAYER ---------------- */
const DB_KEY = "bangladeshpolytechnicinstitute_sms_v1";
function loadDB(){
  let raw = localStorage.getItem(DB_KEY);
  if(!raw){
    const fresh = buildDefaultData();
    localStorage.setItem(DB_KEY, JSON.stringify(fresh));
    return fresh;
  }
  const db = JSON.parse(raw);
  if(!db.semesterResults) db.semesterResults = [];
  if(!db.teacherAttendance) db.teacherAttendance = [];
  return db;
}
function saveDB(){ localStorage.setItem(DB_KEY, JSON.stringify(DB)); }
let DB = loadDB();

function showToast(msg){
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=>t.classList.remove("show"), 1800);
}

/* ---------------- SESSION ---------------- */
let session = null; // {role, username, refId, name}
let currentRole = "admin";
let currentView = null;

function switchRole(role){
  currentRole = role;
  document.querySelectorAll(".role-tab").forEach(b=>b.classList.toggle("active", b.dataset.role===role));
  const idLabel = document.getElementById("idLabel");
  const hint = document.getElementById("hintBox");
  if(role==="admin"){
    idLabel.textContent="Admin ID";
    hint.innerHTML = "<b>Demo admin login</b> — ID: <b>admin1</b> &nbsp; Password: <b>XDbTa4pE</b>";
  } else if(role==="teacher"){
    idLabel.textContent="Employee ID";
    hint.innerHTML = "<b>Demo teacher login</b> — ID: <b>T001</b> &nbsp; Password: <b>9u4gybf6</b>";
  } else {
    idLabel.textContent="Board Roll";
    hint.innerHTML = "<b>Demo student login</b> — Board Roll: <b>155001</b> &nbsp; Password: <b>Wt92Uv66</b>";
  }
  document.getElementById("loginErr").style.display="none";
}

function doLogin(e){
  e.preventDefault();
  const id = document.getElementById("loginId").value.trim();
  const pw = document.getElementById("loginPw").value;
  const user = DB.users[id];
  const err = document.getElementById("loginErr");
  if(!user || user.password !== pw || user.role !== currentRole){
    err.style.display="block";
    return false;
  }
  err.style.display="none";
  session = {role:user.role, username:id, refId:user.refId||null, name:user.name};
  document.getElementById("loginScreen").style.display="none";
  document.getElementById("appScreen").style.display="block";
  document.getElementById("loginId").value=""; document.getElementById("loginPw").value="";
  boot();
  return false;
}
function logout(){
  session = null;
  document.getElementById("appScreen").style.display="none";
  document.getElementById("loginScreen").style.display="flex";
}

/* ---------------- NAV CONFIG PER ROLE ---------------- */
const NAV = {
  admin:[
    ["overview","Overview","overview"], ["students","Manage Students","students"], ["teachers","Manage Teachers","teachers"],
    ["attendance","Student Attendance","attendance"], ["teacherAttendance","Teacher Attendance","teacherAttn"],
    ["marks","Exam Marks","marks"], ["semesterResults","Semester Results","result"]
  ],
  teacher:[
    ["overview","Overview","overview"], ["myStudents","My Dept. Students","students"],
    ["attendance","Take Attendance","attendance"], ["myTeacherAttendance","My Attendance","teacherAttn"],
    ["marks","Enter Marks","marks"], ["semesterResults","Semester Results","result"]
  ],
  student:[
    ["overview","My Profile","overview"], ["myAttendance","My Attendance","attendance"],
    ["myMarks","Exam Marks","marks"], ["myResult","My Result Sheet","result"]
  ]
};

function boot(){
  document.getElementById("sideWho").textContent =
    session.role==="admin" ? "Administrator" :
    session.role==="teacher" ? "Teacher · "+session.name :
    "Student · "+session.name;
  const nav = NAV[session.role];
  document.getElementById("navItems").innerHTML = nav.map(n=>
    `<button class="nav-item" data-v="${n[0]}" onclick="goto('${n[0]}')">${ICONS[n[2]]||""}<span>${n[1]}</span></button>`
  ).join("");
  document.getElementById("mobileNav").innerHTML = nav.map(n=>
    `<button data-v="${n[0]}" onclick="goto('${n[0]}')">${n[1]}</button>`
  ).join("");
  goto(nav[0][0]);
}

function goto(view){
  currentView = view;
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active", b.dataset.v===view));
  document.querySelectorAll(".mobile-nav button").forEach(b=>b.classList.toggle("active", b.dataset.v===view));
  render();
  const vr = document.getElementById("viewRoot");
  vr.classList.remove("fade-in"); void vr.offsetWidth; vr.classList.add("fade-in");
}

/* ---------------- HELPERS ---------------- */
function studentById(id){ return DB.students.find(s=>s.id===id); }
function teacherById(id){ return DB.teachers.find(t=>t.id===id); }
function attendancePercent(studentId){
  const recs = DB.attendance.filter(a=>a.studentId===studentId);
  if(recs.length===0) return null;
  const present = recs.filter(a=>a.status==="Present").length;
  return Math.round((present/recs.length)*100);
}
function teacherAttendancePercent(teacherId){
  const recs = DB.teacherAttendance.filter(a=>a.teacherId===teacherId);
  if(recs.length===0) return null;
  const present = recs.filter(a=>a.status==="Present").length;
  return Math.round((present/recs.length)*100);
}
function gradeFor(pct){
  if(pct>=80) return "A+"; if(pct>=70) return "A"; if(pct>=60) return "A-";
  if(pct>=50) return "B"; if(pct>=40) return "C"; return "F";
}
function gradeClass(g){
  if(g==="F") return "badge-grade-F";
  if(g==="A+"||g==="A"||g==="A-") return "badge-grade-A";
  return "badge-grade-B";
}
function gpaGrade(gpa){
  if(gpa>=3.75) return "A+"; if(gpa>=3.5) return "A"; if(gpa>=3.25) return "A-";
  if(gpa>=3.0) return "B+"; if(gpa>=2.5) return "B"; if(gpa>=2.0) return "C"; return "F";
}
function studentResults(studentId){
  return DB.semesterResults.filter(r=>r.studentId===studentId).sort((a,b)=>a.semester-b.semester);
}
function cgpaOf(studentId){
  const recs = studentResults(studentId);
  if(!recs.length) return null;
  return Math.round((recs.reduce((a,b)=>a+b.gpa,0)/recs.length)*100)/100;
}
function generateRandomPassword(){
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let pw = "";
  for(let i=0;i<8;i++) pw += chars[Math.floor(Math.random()*chars.length)];
  return pw;
}
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

/* ---------------- SVG chart helpers ---------------- */
function donutChart(pct, color){
  pct = Math.max(0, Math.min(100, pct));
  const r = 52, c = 2*Math.PI*r;
  const offset = c - (pct/100)*c;
  return `<svg viewBox="0 0 120 120" width="132" height="132">
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(16,24,38,0.08)" stroke-width="12"/>
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${offset}" transform="rotate(-90 60 60)"/>
  </svg>`;
}
function sparkline(values, width, height, color){
  if(!values.length) return "";
  const min = 3.0, max = 4.0;
  const step = width/(values.length-1||1);
  const pts = values.map((v,i)=>{
    const x = i*step;
    const y = height - ((v-min)/(max-min))*height;
    return x.toFixed(1)+","+y.toFixed(1);
  }).join(" ");
  const dots = values.map((v,i)=>{
    const x = i*step; const y = height - ((v-min)/(max-min))*height;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${color}"/>`;
  }).join("");
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" preserveAspectRatio="none">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
  </svg>`;
}

/* ---------------- MODAL HELPERS ---------------- */
function openModal(html){
  document.getElementById("modalBox").innerHTML = html;
  document.getElementById("modalBg").classList.add("show");
}
function closeModal(){ document.getElementById("modalBg").classList.remove("show"); }
document.getElementById("modalBg").addEventListener("click", e=>{ if(e.target.id==="modalBg") closeModal(); });

/* ================================================================
   RENDER ROUTER
   ================================================================ */
function render(){
  const root = document.getElementById("viewRoot");
  const title = document.getElementById("pageTitle");
  const sub = document.getElementById("pageSub");

  if(currentView==="overview"){
    if(session.role==="admin") return renderAdminOverview(root,title,sub);
    if(session.role==="teacher") return renderTeacherOverview(root,title,sub);
    if(session.role==="student") return renderStudentProfile(root,title,sub);
  }
  if(currentView==="students") return renderStudentsManage(root,title,sub);
  if(currentView==="teachers") return renderTeachersManage(root,title,sub);
  if(currentView==="myStudents") return renderMyStudents(root,title,sub);
  if(currentView==="attendance") return renderAttendance(root,title,sub);
  if(currentView==="teacherAttendance") return renderTeacherAttendanceAdmin(root,title,sub);
  if(currentView==="myTeacherAttendance") return renderMyTeacherAttendance(root,title,sub);
  if(currentView==="marks") return renderMarks(root,title,sub);
  if(currentView==="semesterResults") return renderSemesterResultsManage(root,title,sub);
  if(currentView==="myAttendance") return renderMyAttendance(root,title,sub);
  if(currentView==="myMarks") return renderMyMarks(root,title,sub);
  if(currentView==="myResult") return renderMyResult(root,title,sub);
}

/* ---------------- ADMIN: OVERVIEW ---------------- */
function renderAdminOverview(root,title,sub){
  title.textContent = "Admin Overview";
  sub.textContent = "bangladeshpolytechnicinstitute-ten.vercel.app — full system snapshot";
  const totalStudents = DB.students.length;
  const totalTeachers = DB.teachers.length;
  const avgCgpa = Math.round((DB.students.reduce((a,s)=>a+(cgpaOf(s.id)||0),0)/totalStudents)*100)/100;
  root.innerHTML = `
    <div class="stat-row">
      <div class="stat-card"><div class="num">${totalStudents}</div><div class="lbl">Total Students</div></div>
      <div class="stat-card"><div class="num">${totalTeachers}</div><div class="lbl">Total Teachers</div></div>
      <div class="stat-card gold"><div class="num">${DEPARTMENTS.length}</div><div class="lbl">Departments</div></div>
      <div class="stat-card mint"><div class="num">${avgCgpa}</div><div class="lbl">Institute Avg CGPA</div></div>
      <div class="stat-card coral"><div class="num">${DB.attendance.length}</div><div class="lbl">Attendance Logs</div></div>
    </div>
    <div class="panel">
      <h2>Students &amp; Staff per Department</h2>
      <div class="table-wrap"><table>
        <tr><th>Department</th><th>Students</th><th>Teachers</th><th>Avg CGPA</th></tr>
        ${DEPARTMENTS.map(d=>{
          const stus = DB.students.filter(s=>s.department===d);
          const avg = stus.length ? Math.round((stus.reduce((a,s)=>a+(cgpaOf(s.id)||0),0)/stus.length)*100)/100 : 0;
          return `<tr><td>${d}</td><td>${stus.length}</td><td>${DB.teachers.filter(t=>t.department===d).length}</td><td><span class="gpa-input" style="border:none;background:transparent;">${avg}</span></td></tr>`;
        }).join("")}
      </table></div>
    </div>
    <div class="panel">
      <h2>Quick Links</h2>
      <div class="btn-row">
        <button class="btn-ghost" onclick="goto('students')">Manage Students →</button>
        <button class="btn-ghost" onclick="goto('teachers')">Manage Teachers →</button>
        <button class="btn-ghost" onclick="goto('attendance')">Student Attendance →</button>
        <button class="btn-ghost" onclick="goto('teacherAttendance')">Teacher Attendance →</button>
        <button class="btn-ghost" onclick="goto('semesterResults')">Semester Results →</button>
      </div>
    </div>
  `;
}

/* ---------------- TEACHER: OVERVIEW ---------------- */
function renderTeacherOverview(root,title,sub){
  const t = teacherById(session.refId);
  title.textContent = "Welcome, "+t.name;
  sub.textContent = t.designation+" · "+t.department;
  const deptStudents = DB.students.filter(s=>s.department===t.department);
  const myAttnPct = teacherAttendancePercent(t.id);
  root.innerHTML = `
    <div class="stat-row">
      <div class="stat-card"><div class="num">${deptStudents.length}</div><div class="lbl">Students in ${DEPT_SHORT[t.department]||t.department}</div></div>
      <div class="stat-card gold"><div class="num">${t.subject}</div><div class="lbl">Subject Taught</div></div>
      <div class="stat-card mint"><div class="num">${myAttnPct===null?"—":myAttnPct+"%"}</div><div class="lbl">My Attendance</div></div>
    </div>
    <div class="panel">
      <h2>My Details</h2>
      <div class="profile-grid">
        <div class="profile-item"><div class="k">Designation</div><div class="v">${t.designation}</div></div>
        <div class="profile-item"><div class="k">Department</div><div class="v">${t.department}</div></div>
        <div class="profile-item"><div class="k">Qualification</div><div class="v">${t.qualification}</div></div>
        <div class="profile-item"><div class="k">Joined</div><div class="v">${t.joinYear}</div></div>
        <div class="profile-item"><div class="k">Phone</div><div class="v">${t.phone}</div></div>
        <div class="profile-item"><div class="k">Email</div><div class="v">${t.email}</div></div>
      </div>
    </div>
    <div class="panel">
      <h2>Quick Actions</h2>
      <div class="btn-row">
        <button class="btn-ghost" onclick="goto('attendance')">Take Attendance →</button>
        <button class="btn-ghost" onclick="goto('marks')">Enter Marks →</button>
        <button class="btn-ghost" onclick="goto('semesterResults')">Edit Semester Results →</button>
        <button class="btn-ghost" onclick="goto('myStudents')">View My Students →</button>
      </div>
    </div>
  `;
}

/* ---------------- STUDENT: PROFILE ---------------- */
function renderStudentProfile(root,title,sub){
  const s = studentById(session.refId);
  title.textContent = s.name;
  sub.textContent = "Board Roll: "+s.boardRoll+" · "+s.department;
  const pct = attendancePercent(s.id);
  const cgpa = cgpaOf(s.id);
  root.innerHTML = `
    <div class="stat-row">
      <div class="stat-card amber"><div class="num">${pct===null?"—":pct+"%"}</div><div class="lbl">Attendance</div></div>
      <div class="stat-card mint"><div class="num">${cgpa===null?"—":cgpa.toFixed(2)}</div><div class="lbl">Current CGPA</div></div>
      <div class="stat-card"><div class="num">${s.semester}th</div><div class="lbl">Current Semester</div></div>
    </div>
    <div class="panel">
      <h2>My Details</h2>
      <div class="profile-grid">
        <div class="profile-item"><div class="k">Board Roll</div><div class="v">${s.boardRoll}</div></div>
        <div class="profile-item"><div class="k">Department</div><div class="v">${s.department}</div></div>
        <div class="profile-item"><div class="k">Semester</div><div class="v">${s.semester}th</div></div>
        <div class="profile-item"><div class="k">Session</div><div class="v">${s.session}</div></div>
        <div class="profile-item"><div class="k">Guardian</div><div class="v">${s.guardian}</div></div>
        <div class="profile-item"><div class="k">Phone</div><div class="v">${s.phone}</div></div>
        <div class="profile-item"><div class="k">Email</div><div class="v">${s.email}</div></div>
        <div class="profile-item"><div class="k">Address</div><div class="v">${s.address}</div></div>
        <div class="profile-item"><div class="k">Blood Group</div><div class="v">${s.bloodGroup}</div></div>
      </div>
    </div>
  `;
}

/* ---------------- ADMIN: MANAGE STUDENTS (CRUD) ---------------- */
function renderStudentsManage(root,title,sub){
  title.textContent = "Manage Students";
  sub.textContent = DB.students.length+" students enrolled";
  root.innerHTML = `
    <div class="panel">
      <div class="search-bar">
        <input id="stuSearch" placeholder="Search by name or board roll..." oninput="filterStudentsTable()">
        <select id="stuDeptFilter" onchange="filterStudentsTable()">
          <option value="">All Departments</option>
          ${DEPARTMENTS.map(d=>`<option value="${d}">${d}</option>`).join("")}
        </select>
        <button class="btn-primary" onclick="openStudentForm()">+ Add Student</button>
      </div>
      <div class="table-wrap"><table>
        <tr><th>Board Roll</th><th>Name</th><th>Department</th><th>Sem</th><th>Phone</th><th>Actions</th></tr>
        <tbody id="stuTableBody"></tbody>
      </table></div>
    </div>
  `;
  fillStudentsTable(DB.students);
}
function fillStudentsTable(list){
  document.getElementById("stuTableBody").innerHTML = list.length? list.map(s=>`
    <tr>
      <td class="mono">${s.boardRoll}</td>
      <td>${s.name}</td>
      <td>${DEPT_SHORT[s.department]||s.department}</td>
      <td>${s.semester}th</td>
      <td>${s.phone}</td>
      <td><div class="btn-row">
        <button class="btn btn-edit" onclick="openStudentForm('${s.id}')">Edit</button>
        <button class="btn btn-del" onclick="deleteStudent('${s.id}')">Delete</button>
      </div></td>
    </tr>`).join("") : `<tr><td colspan="6"><div class="empty-note">No students found.</div></td></tr>`;
}
function filterStudentsTable(){
  const q = document.getElementById("stuSearch").value.toLowerCase();
  const dept = document.getElementById("stuDeptFilter").value;
  const list = DB.students.filter(s =>
    (s.name.toLowerCase().includes(q) || s.boardRoll.includes(q)) &&
    (dept==="" || s.department===dept)
  );
  fillStudentsTable(list);
}
function openStudentForm(id){
  const s = id ? studentById(id) : null;
  openModal(`
    <h3>${s?"Edit Student":"Add New Student"}</h3>
    <div class="form-grid">
      <div><label>Full Name</label><input id="f_name" value="${s?escapeHtml(s.name):''}"></div>
      <div><label>Board Roll</label><input id="f_roll" value="${s?s.boardRoll:''}"></div>
      <div><label>Department</label>
        <select id="f_dept">${DEPARTMENTS.map(d=>`<option value="${d}" ${s&&s.department===d?'selected':''}>${d}</option>`).join("")}</select>
      </div>
      <div><label>Semester</label>
        <select id="f_sem">${[1,2,3,4,5,6,7,8].map(n=>`<option value="${n}" ${s&&s.semester==n?'selected':''}>${n}th</option>`).join("")}</select>
      </div>
      <div><label>Guardian Name</label><input id="f_guardian" value="${s?escapeHtml(s.guardian):''}"></div>
      <div><label>Phone</label><input id="f_phone" value="${s?s.phone:''}"></div>
      <div><label>Email</label><input id="f_email" value="${s?s.email:''}"></div>
      <div><label>Address</label><input id="f_address" value="${s?escapeHtml(s.address):''}"></div>
      <div><label>Blood Group</label><input id="f_blood" value="${s?s.bloodGroup:'A+'}"></div>
      <div><label>Session</label><input id="f_session" value="${s?s.session:'2023-24'}"></div>
    </div>
    <div class="modal-close-row">
      <button class="btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn-primary" onclick="saveStudent(${s?`'${s.id}'`:'null'})">Save Student</button>
    </div>
  `);
}
function saveStudent(id){
  const name=document.getElementById("f_name").value.trim();
  const roll=document.getElementById("f_roll").value.trim();
  if(!name || !roll){ alert("Name and Board Roll are required."); return; }
  const data = {
    name, boardRoll:roll,
    department:document.getElementById("f_dept").value,
    semester:parseInt(document.getElementById("f_sem").value),
    guardian:document.getElementById("f_guardian").value.trim(),
    phone:document.getElementById("f_phone").value.trim(),
    email:document.getElementById("f_email").value.trim(),
    address:document.getElementById("f_address").value.trim(),
    bloodGroup:document.getElementById("f_blood").value.trim(),
    session:document.getElementById("f_session").value.trim()
  };
  if(id){
    const s = studentById(id);
    const oldRoll = s.boardRoll;
    Object.assign(s, data);
    if(oldRoll !== data.boardRoll){
      DB.users[data.boardRoll] = DB.users[oldRoll];
      delete DB.users[oldRoll];
    }
    DB.users[data.boardRoll].name = data.name;
  } else {
    const newId = "S"+(DB.students.length + 1 + Math.floor(Math.random()*1000));
    const newPassword = generateRandomPassword();
    DB.students.push({id:newId, ...data, password:newPassword});
    DB.users[data.boardRoll] = {password:newPassword, role:"student", refId:newId, name:data.name};
    alert("New student login created.\nUsername (Board Roll): "+data.boardRoll+"\nPassword: "+newPassword+"\n\nPlease save this — it will only be shown once.");
    for(let sem=1; sem<=8; sem++){
      DB.semesterResults.push({id:newId+"_sem"+sem, studentId:newId, semester:sem, gpa: sem<=data.semester? (3.5+Math.random()*0.5).toFixed(2)*1 : 0});
    }
  }
  saveDB();
  closeModal();
  showToast("Student saved");
  renderStudentsManage(document.getElementById("viewRoot"), document.getElementById("pageTitle"), document.getElementById("pageSub"));
}
function deleteStudent(id){
  if(!confirm("Delete this student? This also removes their attendance, marks and result records.")) return;
  const s = studentById(id);
  DB.students = DB.students.filter(x=>x.id!==id);
  delete DB.users[s.boardRoll];
  DB.attendance = DB.attendance.filter(a=>a.studentId!==id);
  DB.marks = DB.marks.filter(m=>m.studentId!==id);
  DB.semesterResults = DB.semesterResults.filter(r=>r.studentId!==id);
  saveDB();
  showToast("Student deleted");
  renderStudentsManage(document.getElementById("viewRoot"), document.getElementById("pageTitle"), document.getElementById("pageSub"));
}

/* ---------------- ADMIN: MANAGE TEACHERS (CRUD) ---------------- */
function renderTeachersManage(root,title,sub){
  title.textContent = "Manage Teachers";
  sub.textContent = DB.teachers.length+" teachers on staff";
  root.innerHTML = `
    <div class="panel">
      <div class="search-bar">
        <input id="teaSearch" placeholder="Search by name or employee ID..." oninput="filterTeachersTable()">
        <button class="btn-primary" onclick="openTeacherForm()">+ Add Teacher</button>
      </div>
      <div class="table-wrap"><table>
        <tr><th>Emp ID</th><th>Name</th><th>Designation</th><th>Department</th><th>Subject</th><th>Actions</th></tr>
        <tbody id="teaTableBody"></tbody>
      </table></div>
    </div>
  `;
  fillTeachersTable(DB.teachers);
}
function fillTeachersTable(list){
  document.getElementById("teaTableBody").innerHTML = list.length? list.map(t=>`
    <tr>
      <td class="mono">${t.empId}</td>
      <td>${t.name}</td>
      <td>${t.designation}</td>
      <td>${DEPT_SHORT[t.department]||t.department}</td>
      <td>${t.subject}</td>
      <td><div class="btn-row">
        <button class="btn btn-edit" onclick="openTeacherForm('${t.id}')">Edit</button>
        <button class="btn btn-del" onclick="deleteTeacher('${t.id}')">Delete</button>
      </div></td>
    </tr>`).join("") : `<tr><td colspan="6"><div class="empty-note">No teachers found.</div></td></tr>`;
}
function filterTeachersTable(){
  const q = document.getElementById("teaSearch").value.toLowerCase();
  const list = DB.teachers.filter(t=> t.name.toLowerCase().includes(q) || t.empId.toLowerCase().includes(q));
  fillTeachersTable(list);
}
function openTeacherForm(id){
  const t = id ? teacherById(id) : null;
  openModal(`
    <h3>${t?"Edit Teacher":"Add New Teacher"}</h3>
    <div class="form-grid">
      <div><label>Full Name</label><input id="f_name" value="${t?escapeHtml(t.name):''}"></div>
      <div><label>Employee ID</label><input id="f_emp" value="${t?t.empId:''}"></div>
      <div><label>Designation</label>
        <select id="f_desig">
          ${["Head of Department","Senior Instructor","Instructor","Junior Instructor"].map(d=>`<option ${t&&t.designation===d?'selected':''}>${d}</option>`).join("")}
        </select>
      </div>
      <div><label>Department</label>
        <select id="f_dept">${DEPARTMENTS.map(d=>`<option value="${d}" ${t&&t.department===d?'selected':''}>${d}</option>`).join("")}</select>
      </div>
      <div><label>Subject Taught</label><input id="f_subject" value="${t?t.subject:''}"></div>
      <div><label>Phone</label><input id="f_phone" value="${t?t.phone:''}"></div>
      <div><label>Email</label><input id="f_email" value="${t?t.email:''}"></div>
      <div><label>Qualification</label><input id="f_qual" value="${t?t.qualification:''}"></div>
      <div><label>Joining Year</label><input id="f_join" value="${t?t.joinYear:'2024'}"></div>
    </div>
    <div class="modal-close-row">
      <button class="btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn-primary" onclick="saveTeacher(${t?`'${t.id}'`:'null'})">Save Teacher</button>
    </div>
  `);
}
function saveTeacher(id){
  const name=document.getElementById("f_name").value.trim();
  const emp=document.getElementById("f_emp").value.trim();
  if(!name || !emp){ alert("Name and Employee ID are required."); return; }
  const data = {
    name, empId:emp,
    designation:document.getElementById("f_desig").value,
    department:document.getElementById("f_dept").value,
    subject:document.getElementById("f_subject").value.trim(),
    phone:document.getElementById("f_phone").value.trim(),
    email:document.getElementById("f_email").value.trim(),
    qualification:document.getElementById("f_qual").value.trim(),
    joinYear:document.getElementById("f_join").value.trim()
  };
  if(id){
    const t = teacherById(id);
    const oldEmp = t.empId;
    Object.assign(t, data);
    if(oldEmp !== data.empId){
      DB.users[data.empId] = DB.users[oldEmp];
      delete DB.users[oldEmp];
    }
    DB.users[data.empId].name = data.name;
  } else {
    const newId = "T"+(DB.teachers.length + 1 + Math.floor(Math.random()*1000));
    const newPassword = generateRandomPassword();
    DB.teachers.push({id:newId, ...data, password:newPassword});
    DB.users[data.empId] = {password:newPassword, role:"teacher", refId:newId, name:data.name};
    alert("New teacher login created.\nUsername (Employee ID): "+data.empId+"\nPassword: "+newPassword+"\n\nPlease save this — it will only be shown once.");
  }
  saveDB();
  closeModal();
  showToast("Teacher saved");
  renderTeachersManage(document.getElementById("viewRoot"), document.getElementById("pageTitle"), document.getElementById("pageSub"));
}
function deleteTeacher(id){
  if(!confirm("Delete this teacher?")) return;
  const t = teacherById(id);
  DB.teachers = DB.teachers.filter(x=>x.id!==id);
  delete DB.users[t.empId];
  DB.teacherAttendance = DB.teacherAttendance.filter(a=>a.teacherId!==id);
  saveDB();
  showToast("Teacher deleted");
  renderTeachersManage(document.getElementById("viewRoot"), document.getElementById("pageTitle"), document.getElementById("pageSub"));
}

/* ---------------- TEACHER: MY STUDENTS (read-only list) ---------------- */
function renderMyStudents(root,title,sub){
  const t = teacherById(session.refId);
  title.textContent = "Students — "+t.department;
  sub.textContent = "Read-only list for your department";
  const list = DB.students.filter(s=>s.department===t.department);
  root.innerHTML = `
    <div class="panel">
      <div class="table-wrap"><table>
        <tr><th>Board Roll</th><th>Name</th><th>Semester</th><th>Phone</th><th>Attendance</th><th>CGPA</th></tr>
        ${list.map(s=>{
          const pct = attendancePercent(s.id);
          const cgpa = cgpaOf(s.id);
          return `<tr><td class="mono">${s.boardRoll}</td><td>${s.name}</td><td>${s.semester}th</td><td>${s.phone}</td><td>${pct===null?"—":pct+"%"}</td><td>${cgpa===null?"—":cgpa.toFixed(2)}</td></tr>`;
        }).join("")}
      </table></div>
    </div>
  `;
}

/* ---------------- ATTENDANCE (admin + teacher take student attendance) ---------------- */
function renderAttendance(root,title,sub){
  title.textContent = "Student Attendance";
  sub.textContent = "Mark daily attendance by department, date and subject";
  const isTeacher = session.role==="teacher";
  const t = isTeacher ? teacherById(session.refId) : null;
  const deptOptions = isTeacher ? [t.department] : DEPARTMENTS;
  root.innerHTML = `
    <div class="panel">
      <div class="form-grid" style="margin-bottom:6px;">
        <div><label>Department</label>
          <select id="attDept" onchange="loadAttendanceTable()" ${isTeacher?'disabled':''}>
            ${deptOptions.map(d=>`<option value="${d}">${d}</option>`).join("")}
          </select>
        </div>
        <div><label>Date</label><input type="date" id="attDate" onchange="loadAttendanceTable()"></div>
        <div><label>Subject</label>
          <select id="attSubject" onchange="loadAttendanceTable()"></select>
        </div>
      </div>
      <div class="table-wrap"><table>
        <tr><th>Board Roll</th><th>Name</th><th>Status</th></tr>
        <tbody id="attTableBody"></tbody>
      </table></div>
      <div class="modal-close-row">
        <button class="btn-primary" onclick="saveAttendance()">Save Attendance</button>
      </div>
    </div>
  `;
  document.getElementById("attDate").value = new Date().toISOString().slice(0,10);
  populateSubjectDropdown("attDept","attSubject");
  loadAttendanceTable();
}
function populateSubjectDropdown(deptSelId, subjSelId){
  const dept = document.getElementById(deptSelId).value;
  const subjSel = document.getElementById(subjSelId);
  const subs = SUBJECTS_BY_DEPT[dept] || [];
  subjSel.innerHTML = subs.map(s=>`<option value="${s}">${s}</option>`).join("");
}
function loadAttendanceTable(){
  populateSubjectDropdown("attDept","attSubject");
  const dept = document.getElementById("attDept").value;
  const date = document.getElementById("attDate").value;
  const subject = document.getElementById("attSubject").value;
  const list = DB.students.filter(s=>s.department===dept);
  document.getElementById("attTableBody").innerHTML = list.map(s=>{
    const existing = DB.attendance.find(a=>a.studentId===s.id && a.date===date && a.subject===subject);
    const status = existing ? existing.status : "Present";
    return `<tr data-sid="${s.id}">
      <td class="mono">${s.boardRoll}</td><td>${s.name}</td>
      <td><div class="attn-toggle">
        <button type="button" class="${status==='Present'?'sel-present':''}" onclick="setAttnStatus(this,'Present')">Present</button>
        <button type="button" class="${status==='Absent'?'sel-absent':''}" onclick="setAttnStatus(this,'Absent')">Absent</button>
      </div></td>
    </tr>`;
  }).join("");
}
function setAttnStatus(btn, status){
  const row = btn.closest("tr");
  row.querySelectorAll(".attn-toggle button").forEach(b=>{b.classList.remove("sel-present","sel-absent");});
  btn.classList.add(status==="Present"?"sel-present":"sel-absent");
}
function saveAttendance(){
  const dept = document.getElementById("attDept").value;
  const date = document.getElementById("attDate").value;
  const subject = document.getElementById("attSubject").value;
  if(!date){ alert("Please choose a date."); return; }
  document.querySelectorAll("#attTableBody tr").forEach(row=>{
    const sid = row.dataset.sid;
    const selBtn = row.querySelector(".sel-present, .sel-absent");
    const status = selBtn ? (selBtn.classList.contains("sel-present")?"Present":"Absent") : "Present";
    DB.attendance = DB.attendance.filter(a=>!(a.studentId===sid && a.date===date && a.subject===subject));
    DB.attendance.push({studentId:sid, date, subject, status});
  });
  saveDB();
  showToast("Attendance saved for "+date);
}

/* ---------------- ADMIN: TEACHER ATTENDANCE ---------------- */
function renderTeacherAttendanceAdmin(root,title,sub){
  title.textContent = "Teacher Attendance";
  sub.textContent = "Mark daily attendance for all teaching staff";
  root.innerHTML = `
    <div class="panel">
      <div class="form-grid" style="margin-bottom:6px; max-width:320px;">
        <div><label>Date</label><input type="date" id="tAttDate" onchange="loadTeacherAttendanceTable()"></div>
      </div>
      <div class="table-wrap"><table>
        <tr><th>Emp ID</th><th>Name</th><th>Department</th><th>Status</th></tr>
        <tbody id="tAttTableBody"></tbody>
      </table></div>
      <div class="modal-close-row">
        <button class="btn-primary" onclick="saveTeacherAttendance()">Save Attendance</button>
      </div>
    </div>
    <div class="panel">
      <h2>Attendance Summary</h2>
      <div class="table-wrap"><table>
        <tr><th>Emp ID</th><th>Name</th><th>Attendance %</th></tr>
        ${DB.teachers.map(t=>{
          const pct = teacherAttendancePercent(t.id);
          return `<tr><td class="mono">${t.empId}</td><td>${t.name}</td><td>${pct===null?"—":pct+"%"}</td></tr>`;
        }).join("")}
      </table></div>
    </div>
  `;
  document.getElementById("tAttDate").value = new Date().toISOString().slice(0,10);
  loadTeacherAttendanceTable();
}
function loadTeacherAttendanceTable(){
  const date = document.getElementById("tAttDate").value;
  document.getElementById("tAttTableBody").innerHTML = DB.teachers.map(t=>{
    const existing = DB.teacherAttendance.find(a=>a.teacherId===t.id && a.date===date);
    const status = existing ? existing.status : "Present";
    return `<tr data-tid="${t.id}">
      <td class="mono">${t.empId}</td><td>${t.name}</td><td>${DEPT_SHORT[t.department]||t.department}</td>
      <td><div class="attn-toggle">
        <button type="button" class="${status==='Present'?'sel-present':''}" onclick="setAttnStatus(this,'Present')">Present</button>
        <button type="button" class="${status==='Absent'?'sel-absent':''}" onclick="setAttnStatus(this,'Absent')">Absent</button>
      </div></td>
    </tr>`;
  }).join("");
}
function saveTeacherAttendance(){
  const date = document.getElementById("tAttDate").value;
  if(!date){ alert("Please choose a date."); return; }
  document.querySelectorAll("#tAttTableBody tr").forEach(row=>{
    const tid = row.dataset.tid;
    const selBtn = row.querySelector(".sel-present, .sel-absent");
    const status = selBtn ? (selBtn.classList.contains("sel-present")?"Present":"Absent") : "Present";
    DB.teacherAttendance = DB.teacherAttendance.filter(a=>!(a.teacherId===tid && a.date===date));
    DB.teacherAttendance.push({teacherId:tid, date, status});
  });
  saveDB();
  showToast("Teacher attendance saved for "+date);
  renderTeacherAttendanceAdmin(document.getElementById("viewRoot"), document.getElementById("pageTitle"), document.getElementById("pageSub"));
}

/* ---------------- TEACHER: MY OWN ATTENDANCE (read-only) ---------------- */
function renderMyTeacherAttendance(root,title,sub){
  const t = teacherById(session.refId);
  title.textContent = "My Attendance";
  sub.textContent = t.name+" · "+t.empId;
  const recs = DB.teacherAttendance.filter(a=>a.teacherId===t.id).sort((a,b)=>b.date.localeCompare(a.date));
  const pct = teacherAttendancePercent(t.id);
  root.innerHTML = `
    <div class="stat-row">
      <div class="stat-card amber"><div class="num">${pct===null?"—":pct+"%"}</div><div class="lbl">Overall Attendance</div></div>
      <div class="stat-card mint"><div class="num">${recs.filter(r=>r.status==='Present').length}</div><div class="lbl">Days Present</div></div>
      <div class="stat-card coral"><div class="num">${recs.filter(r=>r.status==='Absent').length}</div><div class="lbl">Days Absent</div></div>
    </div>
    <div class="panel">
      <h2>Attendance Log</h2>
      <div class="table-wrap"><table>
        <tr><th>Date</th><th>Status</th></tr>
        ${recs.length? recs.map(r=>`<tr><td>${r.date}</td><td><span class="badge ${r.status==='Present'?'badge-present':'badge-absent'}">${r.status}</span></td></tr>`).join("") : `<tr><td colspan="2"><div class="empty-note">No attendance recorded yet. Ask the admin to mark it.</div></td></tr>`}
      </table></div>
    </div>
  `;
}

/* ---------------- MARKS (admin + teacher enter exam marks) ---------------- */
function renderMarks(root,title,sub){
  title.textContent = "Exam Marks";
  sub.textContent = "Enter and manage subject-wise exam marks";
  const isTeacher = session.role==="teacher";
  const t = isTeacher ? teacherById(session.refId) : null;
  const deptOptions = isTeacher ? [t.department] : DEPARTMENTS;
  root.innerHTML = `
    <div class="panel">
      <h2>Add / Update Marks</h2>
      <div class="form-grid">
        <div><label>Department</label>
          <select id="mkDept" onchange="onMkDeptChange()">${deptOptions.map(d=>`<option value="${d}">${d}</option>`).join("")}</select>
        </div>
        <div><label>Student</label><select id="mkStudent"></select></div>
        <div><label>Subject</label><select id="mkSubject"></select></div>
        <div><label>Exam Type</label>
          <select id="mkExam"><option>Class Test</option><option>Mid Term</option><option selected>Semester Final</option></select>
        </div>
        <div><label>Marks Obtained (of 100)</label><input type="number" id="mkScore" min="0" max="100" value="75"></div>
      </div>
      <button class="btn-primary" onclick="addMarks()">Save Marks Entry</button>
    </div>
    <div class="panel">
      <h2>All Marks Entries</h2>
      <div class="table-wrap"><table>
        <tr><th>Board Roll</th><th>Name</th><th>Subject</th><th>Exam</th><th>Score</th><th>Grade</th><th>Actions</th></tr>
        <tbody id="mkTableBody"></tbody>
      </table></div>
    </div>
  `;
  onMkDeptChange();
  fillMarksTable();
}
function onMkDeptChange(){
  const dept = document.getElementById("mkDept").value;
  const stuSel = document.getElementById("mkStudent");
  const list = DB.students.filter(s=>s.department===dept);
  stuSel.innerHTML = list.map(s=>`<option value="${s.id}">${s.name} (${s.boardRoll})</option>`).join("");
  populateSubjectDropdown("mkDept","mkSubject");
}
function fillMarksTable(){
  const rows = DB.marks.slice().reverse().map(m=>{
    const s = studentById(m.studentId);
    if(!s) return "";
    const grade = gradeFor(m.score);
    return `<tr>
      <td class="mono">${s.boardRoll}</td><td>${s.name}</td><td>${m.subject}</td><td>${m.exam}</td>
      <td>${m.score}/100</td><td><span class="badge ${gradeClass(grade)}">${grade}</span></td>
      <td><button class="btn btn-del" onclick="deleteMarks('${m.id}')">Delete</button></td>
    </tr>`;
  }).join("");
  document.getElementById("mkTableBody").innerHTML = rows || `<tr><td colspan="7"><div class="empty-note">No marks entered yet.</div></td></tr>`;
}
function addMarks(){
  const studentId = document.getElementById("mkStudent").value;
  const subject = document.getElementById("mkSubject").value;
  const exam = document.getElementById("mkExam").value;
  const score = parseInt(document.getElementById("mkScore").value);
  if(!studentId){ alert("Please select a student."); return; }
  if(isNaN(score) || score<0 || score>100){ alert("Enter a valid score between 0 and 100."); return; }
  DB.marks = DB.marks.filter(m=>!(m.studentId===studentId && m.subject===subject && m.exam===exam));
  DB.marks.push({id:"M"+Date.now()+Math.floor(Math.random()*999), studentId, subject, exam, score});
  saveDB();
  showToast("Marks saved");
  fillMarksTable();
}
function deleteMarks(id){
  DB.marks = DB.marks.filter(m=>m.id!==id);
  saveDB();
  showToast("Marks entry removed");
  fillMarksTable();
}

/* ---------------- ADMIN/TEACHER: SEMESTER RESULTS (editable GPA, sem 1-8) ---------------- */
function renderSemesterResultsManage(root,title,sub){
  title.textContent = "Semester Results";
  sub.textContent = "Edit GPA for each semester (1st–8th), scale 0.00–4.00";
  const isTeacher = session.role==="teacher";
  const t = isTeacher ? teacherById(session.refId) : null;
  const deptOptions = isTeacher ? [t.department] : DEPARTMENTS;
  root.innerHTML = `
    <div class="panel">
      <div class="form-grid" style="margin-bottom:6px;">
        <div><label>Department</label>
          <select id="resDept" onchange="onResDeptChange()">${deptOptions.map(d=>`<option value="${d}">${d}</option>`).join("")}</select>
        </div>
        <div><label>Student</label><select id="resStudent" onchange="loadResultRows()"></select></div>
      </div>
      <div id="resHeroWrap"></div>
      <div class="table-wrap"><table>
        <tr><th>Semester</th><th>GPA (0.00–4.00)</th><th>Grade</th></tr>
        <tbody id="resTableBody"></tbody>
      </table></div>
      <div class="modal-close-row">
        <button class="btn-primary" onclick="saveResultRows()">Save All Semesters</button>
      </div>
    </div>
  `;
  onResDeptChange();
}
function onResDeptChange(){
  const dept = document.getElementById("resDept").value;
  const stuSel = document.getElementById("resStudent");
  const list = DB.students.filter(s=>s.department===dept);
  stuSel.innerHTML = list.map(s=>`<option value="${s.id}">${s.name} (${s.boardRoll})</option>`).join("");
  loadResultRows();
}
function loadResultRows(){
  const sid = document.getElementById("resStudent").value;
  if(!sid) return;
  const recs = studentResults(sid);
  const cgpa = cgpaOf(sid);
  document.getElementById("resHeroWrap").innerHTML = `
    <div class="result-hero">
      <div class="donut-wrap">
        ${donutChart(cgpa? (cgpa/4)*100 : 0, "#7266f0")}
        <div class="donut-center"><div class="cgpa-num">${cgpa? cgpa.toFixed(2):"—"}</div><div class="cgpa-lbl">CGPA</div></div>
      </div>
      <div style="flex:1; min-width:220px;">
        <div class="panel-sub" style="margin-bottom:6px;">GPA trend across semesters</div>
        ${sparkline(recs.map(r=>r.gpa), 400, 70, "#e7ac3c")}
      </div>
    </div>
  `;
  document.getElementById("resTableBody").innerHTML = recs.map(r=>`
    <tr data-sem="${r.semester}">
      <td>${r.semester}${["st","nd","rd"][r.semester-1]||"th"} Semester</td>
      <td><input type="number" class="gpa-input" min="0" max="4.00" step="0.01" value="${r.gpa.toFixed(2)}" onchange="onGpaCellChange(this)"></td>
      <td><span class="badge ${gradeClass('A')}" id="grade_${r.semester}">${gpaGrade(r.gpa)}</span></td>
    </tr>
  `).join("");
}
function onGpaCellChange(input){
  let v = parseFloat(input.value);
  if(isNaN(v)) v = 0; if(v>4) v=4; if(v<0) v=0;
  input.value = v.toFixed(2);
  const row = input.closest("tr");
  row.querySelector("span[id^=grade_]").textContent = gpaGrade(v);
}
function saveResultRows(){
  const sid = document.getElementById("resStudent").value;
  document.querySelectorAll("#resTableBody tr").forEach(row=>{
    const sem = parseInt(row.dataset.sem);
    const gpa = parseFloat(row.querySelector(".gpa-input").value);
    let rec = DB.semesterResults.find(r=>r.studentId===sid && r.semester===sem);
    if(rec){ rec.gpa = gpa; } else { DB.semesterResults.push({id:sid+"_sem"+sem, studentId:sid, semester:sem, gpa}); }
  });
  saveDB();
  showToast("Semester results saved");
  loadResultRows();
}

/* ---------------- STUDENT: MY ATTENDANCE ---------------- */
function renderMyAttendance(root,title,sub){
  const s = studentById(session.refId);
  title.textContent = "My Attendance";
  sub.textContent = s.name+" · Board Roll "+s.boardRoll;
  const recs = DB.attendance.filter(a=>a.studentId===s.id).sort((a,b)=>b.date.localeCompare(a.date));
  const pct = attendancePercent(s.id);
  root.innerHTML = `
    <div class="stat-row">
      <div class="stat-card amber"><div class="num">${pct===null?"—":pct+"%"}</div><div class="lbl">Overall Attendance</div></div>
      <div class="stat-card mint"><div class="num">${recs.filter(r=>r.status==='Present').length}</div><div class="lbl">Days Present</div></div>
      <div class="stat-card coral"><div class="num">${recs.filter(r=>r.status==='Absent').length}</div><div class="lbl">Days Absent</div></div>
    </div>
    <div class="panel">
      <h2>Attendance Log</h2>
      <div class="table-wrap"><table>
        <tr><th>Date</th><th>Subject</th><th>Status</th></tr>
        ${recs.length? recs.map(r=>`<tr><td>${r.date}</td><td>${r.subject}</td><td><span class="badge ${r.status==='Present'?'badge-present':'badge-absent'}">${r.status}</span></td></tr>`).join("") : `<tr><td colspan="3"><div class="empty-note">No attendance recorded yet.</div></td></tr>`}
      </table></div>
    </div>
  `;
}

/* ---------------- STUDENT: MY MARKS (subject-wise) ---------------- */
function renderMyMarks(root,title,sub){
  const s = studentById(session.refId);
  title.textContent = "Exam Marks";
  sub.textContent = s.name+" · "+s.department;
  const recs = DB.marks.filter(m=>m.studentId===s.id);
  const avg = recs.length ? Math.round(recs.reduce((a,b)=>a+b.score,0)/recs.length) : null;
  root.innerHTML = `
    <div class="stat-row">
      <div class="stat-card"><div class="num">${recs.length}</div><div class="lbl">Total Entries</div></div>
      <div class="stat-card amber"><div class="num">${avg===null?"—":avg}</div><div class="lbl">Average Score</div></div>
      <div class="stat-card"><div class="num">${avg===null?"—":gradeFor(avg)}</div><div class="lbl">Overall Grade</div></div>
    </div>
    <div class="panel">
      <h2>Marks Sheet</h2>
      <div class="table-wrap"><table>
        <tr><th>Subject</th><th>Exam Type</th><th>Score</th><th>Grade</th></tr>
        ${recs.length? recs.map(m=>{
          const grade = gradeFor(m.score);
          return `<tr><td>${m.subject}</td><td>${m.exam}</td><td>${m.score}/100</td><td><span class="badge ${gradeClass(grade)}">${grade}</span></td></tr>`;
        }).join("") : `<tr><td colspan="4"><div class="empty-note">No marks published yet.</div></td></tr>`}
      </table></div>
    </div>
  `;
}

/* ---------------- STUDENT: MY RESULT SHEET (semester GPA 1-8) ---------------- */
function renderMyResult(root,title,sub){
  const s = studentById(session.refId);
  title.textContent = "My Result Sheet";
  sub.textContent = s.name+" · Board Roll "+s.boardRoll;
  const recs = studentResults(s.id);
  const cgpa = cgpaOf(s.id);
  root.innerHTML = `
    <div class="panel">
      <div class="result-hero">
        <div class="donut-wrap">
          ${donutChart(cgpa? (cgpa/4)*100 : 0, "#7266f0")}
          <div class="donut-center"><div class="cgpa-num">${cgpa? cgpa.toFixed(2):"—"}</div><div class="cgpa-lbl">CGPA</div></div>
        </div>
        <div style="flex:1; min-width:220px;">
          <div class="panel-sub" style="margin-bottom:6px;">GPA trend, 1st through 8th semester</div>
          ${sparkline(recs.map(r=>r.gpa), 420, 76, "#e7ac3c")}
        </div>
      </div>
    </div>
    <div class="panel">
      <h2>Semester-wise Result</h2>
      <div class="table-wrap"><table>
        <tr><th>Semester</th><th>GPA</th><th>Grade</th></tr>
        ${recs.map(r=>`<tr><td>${r.semester}${["st","nd","rd"][r.semester-1]||"th"} Semester</td><td class="mono">${r.gpa.toFixed(2)}</td><td><span class="badge ${gradeClass('A')}">${gpaGrade(r.gpa)}</span></td></tr>`).join("")}
      </table></div>
    </div>
  `;
}
