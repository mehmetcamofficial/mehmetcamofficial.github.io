const API="https://mehmetcam-portfolio-ai.aydin254.workers.dev";
const MEDIA_BASE=API;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let session=sessionStorage.getItem("portfolioAdminSession")||"",config=null,currentUser=null,activityCache=[];
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

async function req(path,opts={}){
  const headers={"Content-Type":"application/json",...(opts.headers||{})};
  if(session)headers.Authorization="Bearer "+session;
  const r=await fetch(API+path,{...opts,headers});
  const d=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(d.error||"İşlem başarısız");
  return d;
}

async function boot(){
  if(session){showDashboard();return}
  try{
    const d=await req("/admin/auth-config");
    $("#setupBox").hidden=d.configured;
    $("#loginBox").hidden=!d.configured;
    $("#authHelp").textContent=d.configured?(d.enabled?"Admin hesabınla giriş yap.":"Admin login şu anda pasif."):"İlk kurulum: ADMIN_TOKEN ile doğrula ve kendi owner şifreni oluştur.";
    if(d.configured&&!d.enabled)$("#loginBtn").disabled=true;
  }catch(e){$("#authStatus").textContent=e.message}
}
async function setup(){
  try{
    await req("/admin/auth-config",{method:"POST",body:JSON.stringify({setupCode:$("#setupCode").value,password:$("#newPassword").value,enabled:true})});
    $("#setupCode").value="";$("#newPassword").value="";await boot();
  }catch(e){$("#authStatus").textContent=e.message}
}
async function login(){
  try{
    const d=await req("/admin/login",{method:"POST",body:JSON.stringify({username:$("#username")?.value||"owner",password:$("#password").value})});
    session=d.session;sessionStorage.setItem("portfolioAdminSession",session);showDashboard();
  }catch(e){$("#authStatus").textContent=e.message}
}
function logout(){session="";sessionStorage.removeItem("portfolioAdminSession");location.reload()}

async function showDashboard(){
  $("#authCard").hidden=true;$("#dashboard").hidden=false;
  try{
    const [c,a,auth,me]=await Promise.all([req("/admin/site-config"),req("/admin/analytics"),req("/admin/auth-config"),req("/admin/me")]);
    config=c.config;currentUser=me.user;
    $("#loginEnabled").checked=auth.enabled;
    $("#statVisitors").textContent=a.totalVisitors??0;
    const owner=currentUser?.role==="owner", viewer=currentUser?.role==="viewer", editor=currentUser?.role==="editor";
    const usersNav=$('.nav-btn[data-tab="users"]'),settingsNav=$('.nav-btn[data-tab="settings"]');
    if(usersNav)usersNav.hidden=!owner;if(settingsNav)settingsNav.hidden=!owner;
    $("#publishBtn").textContent=editor?"Onaya gönder":"Yayınla";
    $("#pagePublishBtn").textContent=editor?"Onaya gönder":"Yayınla";
    if(viewer){
      $$("[data-add],#publishBtn,#saveDraftBtn,#pagePublishBtn,#pageSaveDraftBtn,#addNavigationBtn,#addSectionBtn,.upload-btn").forEach(x=>x.hidden=true);
    }
    fillCore();renderAll();renderPageEditor();evaluateSeo();
  }catch(e){if(/Unauthorized/i.test(e.message))return logout();setStatus(e.message)}
}

function setStatus(m){$("#globalStatus").textContent=m||""}
function fillCore(){
  if(!config)return;
  $("#heroBadge").value=config.hero?.badge||"";
  $("#heroEyebrow").value=config.hero?.eyebrow||"";
  $("#heroLead").value=config.hero?.lead||"";
  $("#heroAccent").value=config.hero?.accent||"";
  $("#heroTail").value=config.hero?.tail||"";
  $("#heroDescription").value=config.hero?.description||"";
  $("#seoTitle").value=config.seo?.title||"";
  $("#seoDescription").value=config.seo?.description||"";
  syncSeoForm();
}
function collectCore(){
  config.hero={badge:$("#heroBadge").value,eyebrow:$("#heroEyebrow").value,lead:$("#heroLead").value,accent:$("#heroAccent").value,tail:$("#heroTail").value,description:$("#heroDescription").value};
  config.seo={...(config.seo||{}),title:$("#seoTitle").value,description:$("#seoDescription").value};
  collectSeoForm();
  collectPageEditor();
}
function renderAll(){
  renderCollection("projects");renderCollection("posts");renderCollection("experience");
  $("#statProjects").textContent=config.projects?.length||0;
  $("#statPosts").textContent=config.posts?.length||0;
  $("#statExperience").textContent=config.experience?.length||0;
}

const defs={
  projects:[["title","Başlık"],["category","Kategori"],["url","Canlı URL"],["image","Görsel URL"],["tags","Etiketler (virgülle)"],["description","Açıklama","textarea"],["content","Detay içerik","textarea"]],
  posts:[["title","Başlık"],["date","Tarih"],["url","Medium / kaynak URL"],["image","Görsel URL"],["excerpt","Kısa özet","textarea"],["content","İçerik","textarea"]],
  experience:[["period","Dönem"],["role","Rol"],["organization","Kurum"],["description","Açıklama","textarea"]]
};
function filteredItems(type){
  const items=(config[type]||[]).map((item,index)=>({item,index}));
  const q=String($('[data-search="'+type+'"]')?.value||"").trim().toLowerCase();
  const status=$('[data-status-filter="'+type+'"]')?.value||"all";
  return items.filter(({item})=>{
    const hay=JSON.stringify(item).toLowerCase();
    const searchOk=!q||hay.includes(q);
    const statusOk=status==="all"||(status==="disabled"?item.enabled===false:(item.enabled!==false&&(item.status||"published")===status));
    return searchOk&&statusOk;
  });
}
function renderCollection(type){
  const target=$("#"+(type==="posts"?"postsList":type+"List"));
  if(!target)return;
  const items=filteredItems(type);
  target.innerHTML=items.length?items.map(({item,index:i})=>{
    const title=item.title||item.role||"Yeni kayıt";
    const fields=defs[type].map(([k,l,t])=>'<label class="'+(t==="textarea"?"wide":"")+'">'+l+(t==="textarea"?'<textarea data-field="'+k+'">'+esc(item[k]||"")+'</textarea>':'<input data-field="'+k+'" value="'+esc(k==="tags"?(item.tags||[]).join(", "):(item[k]||""))+'">')+'</label>').join("");
    const ro=currentUser?.role==="viewer"?"disabled":"";
    return '<article class="editor-card" data-type="'+type+'" data-index="'+i+'"><div class="editor-card-head"><div><div class="editor-meta">'+esc(item.id||"")+'</div><h3>'+esc(title)+'</h3></div><div class="card-actions"><button class="ghost" data-move="-1" '+ro+'>↑</button><button class="ghost" data-move="1" '+ro+'>↓</button><button class="danger" data-delete '+ro+'>Sil</button></div></div><div class="toggle-line"><label><input type="checkbox" data-field="enabled" '+(item.enabled!==false?"checked":"")+' '+ro+'> Aktif</label><label>Durum <select data-field="status" '+ro+'><option value="published" '+(item.status!=="draft"?"selected":"")+'>Published</option><option value="draft" '+(item.status==="draft"?"selected":"")+'>Draft</option></select></label></div><div class="editor-fields">'+fields+'</div></article>';
  }).join(""):'<p class="muted">Bu filtreye uygun kayıt yok.</p>';
  if(currentUser?.role==="viewer")target.querySelectorAll("input,textarea,select").forEach(x=>x.disabled=true);
}
function syncCards(){
  $$(".editor-card[data-type]").forEach(card=>{
    const type=card.dataset.type,i=+card.dataset.index,item=config[type][i];if(!item)return;
    card.querySelectorAll("[data-field]").forEach(el=>{const k=el.dataset.field;if(k==="enabled")item[k]=el.checked;else if(k==="tags")item[k]=el.value.split(",").map(x=>x.trim()).filter(Boolean);else item[k]=el.value});
  });
}
function slug(v){return String(v||"item").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,50)+"-"+Date.now().toString().slice(-5)}
function addItem(type){
  syncCards();
  if(type==="projects")config.projects.push({id:slug("project"),title:"Yeni Proje",category:"",description:"",url:"#",image:"",content:"",tags:[],status:"draft",enabled:true});
  if(type==="posts")config.posts.push({id:slug("post"),title:"Yeni Yazı",excerpt:"",url:"#",date:new Date().getFullYear()+"",image:"",content:"",status:"draft",enabled:true});
  if(type==="experience")config.experience.push({id:slug("experience"),period:"",role:"Yeni Deneyim",organization:"",description:"",status:"draft",enabled:true});
  renderAll();
}
async function save(mode){
  try{
    syncCards();collectCore();
    const actualMode=mode==="publish"&&currentUser?.role==="editor"?"submit":mode;
    setStatus(actualMode==="draft"?"Taslak kaydediliyor…":actualMode==="submit"?"Onaya gönderiliyor…":"Yayınlanıyor…");
    const d=await req("/admin/site-config",{method:"POST",body:JSON.stringify({config,mode:actualMode,note:"Portfolio CMS publish"})});
    config=d.config;fillCore();renderAll();renderPageEditor();evaluateSeo();
    const msg=d.mode==="submitted"?"Onaya gönderildi. Owner/Admin Approvals bölümünden yayınlayabilir.":d.mode==="draft"?"Taslak kaydedildi.":"Yayınlandı. Önceki sürüm Revisions'a alındı.";
    setStatus(msg);$("#pageStatus").textContent=msg;
  }catch(e){setStatus(e.message);$("#pageStatus").textContent=e.message}
}

function renderPageEditor(){
  config.navigation=Array.isArray(config.navigation)?config.navigation:[];
  config.sections=Array.isArray(config.sections)?config.sections:[];
  config.pageControls=config.pageControls||{};
  $("#navigationList").innerHTML=config.navigation.map((x,i)=>'<div class="mini-editor" data-nav-index="'+i+'"><input data-nav-field="label" value="'+esc(x.label||"")+'" placeholder="Label"><input data-nav-field="href" value="'+esc(x.href||"")+'" placeholder="#section veya /url"><button class="ghost" data-nav-move="-1">↑</button><button class="ghost" data-nav-move="1">↓</button><button class="danger" data-nav-delete>Sil</button></div>').join("");
  const labels={profile:"Research Profile",experience:"Experience","agricultural-projects":"AgriTech","featured-project":"Featured Work","ai-workflow":"AI Workflow","digital-products":"Digital Products",apps:"Applications","live-apps":"Live Work",publication:"Publication",contact:"Contact"};
  $("#pageControlsList").innerHTML=Object.entries(config.pageControls).map(([id,x])=>'<article class="section-control" data-page-id="'+esc(id)+'"><div class="section-control-head"><strong>'+esc(labels[id]||id)+'</strong><label><input type="checkbox" data-page-field="enabled" '+(x.enabled!==false?"checked":"")+'> Aktif</label></div><label>Eyebrow<input data-page-field="eyebrow" value="'+esc(x.eyebrow||"")+'"></label><label>Başlık<input data-page-field="title" value="'+esc(x.title||"")+'"></label></article>').join("");
  $("#sectionsList").innerHTML=config.sections.length?config.sections.map((x,i)=>'<article class="editor-card" data-section-index="'+i+'"><div class="editor-card-head"><div><div class="editor-meta">'+esc(x.id||"")+'</div><h3>'+esc(x.title||"Yeni Bölüm")+'</h3></div><button class="danger" data-section-delete>Sil</button></div><div class="toggle-line"><label><input type="checkbox" data-section-field="enabled" '+(x.enabled!==false?"checked":"")+'> Aktif</label><label>Durum <select data-section-field="status"><option value="published" '+(x.status!=="draft"?"selected":"")+'>Published</option><option value="draft" '+(x.status==="draft"?"selected":"")+'>Draft</option></select></label></div><div class="editor-fields"><label>Eyebrow<input data-section-field="eyebrow" value="'+esc(x.eyebrow||"")+'"></label><label>Başlık<input data-section-field="title" value="'+esc(x.title||"")+'"></label><label class="wide">İçerik<textarea data-section-field="body">'+esc(x.body||"")+'</textarea></label><label>Link label<input data-section-field="linkLabel" value="'+esc(x.linkLabel||"")+'"></label><label>Link URL<input data-section-field="linkUrl" value="'+esc(x.linkUrl||"")+'"></label></div></article>').join(""):'<p class="muted">Özel bölüm yok.</p>';
}
function collectPageEditor(){
  $("[data-nav-index]")&&$$("[data-nav-index]").forEach(row=>{const i=+row.dataset.navIndex;if(!config.navigation[i])return;row.querySelectorAll("[data-nav-field]").forEach(el=>config.navigation[i][el.dataset.navField]=el.value)});
  $$("[data-page-id]").forEach(card=>{const id=card.dataset.pageId;config.pageControls[id]=config.pageControls[id]||{};card.querySelectorAll("[data-page-field]").forEach(el=>config.pageControls[id][el.dataset.pageField]=el.type==="checkbox"?el.checked:el.value)});
  $$("[data-section-index]").forEach(card=>{const i=+card.dataset.sectionIndex,item=config.sections[i];if(!item)return;card.querySelectorAll("[data-section-field]").forEach(el=>item[el.dataset.sectionField]=el.type==="checkbox"?el.checked:el.value)});
}

async function loadMedia(){try{const d=await req("/admin/media");$("#mediaList").innerHTML=d.items.length?d.items.map(x=>'<article class="media-card"><img src="'+MEDIA_BASE+esc(x.url)+'" alt=""><div><strong>'+esc(x.name)+'</strong><small>'+Math.round((x.size||0)/1024)+' KB</small><div class="card-actions"><button class="ghost" data-copy="'+MEDIA_BASE+esc(x.url)+'">URL kopyala</button><button class="danger" data-media-delete="'+esc(x.id)+'">Sil</button></div></div></article>').join(""):'<p class="muted">Henüz medya yok.</p>'}catch(e){$("#mediaList").innerHTML='<p class="muted">'+esc(e.message)+'</p>'}}
async function uploadMedia(file){if(!file)return;if(file.size>2*1024*1024)return alert("Maksimum yaklaşık 2 MB.");const data=await new Promise((res,rej)=>{const r=new FileReader;r.onload=()=>res(String(r.result).split(",")[1]);r.onerror=rej;r.readAsDataURL(file)});await req("/admin/media",{method:"POST",body:JSON.stringify({name:file.name,type:file.type,size:file.size,data})});loadMedia()}

async function loadKnowledge(){try{const d=await req("/admin/unanswered?limit=50");$("#knowledgeList").innerHTML=d.items.length?d.items.map((x,i)=>'<article class="editor-card"><div class="editor-card-head"><div><div class="editor-meta">'+esc(x.count||1)+' kez soruldu</div><h3>'+esc(x.question||"")+'</h3></div><button class="danger" data-unanswered-delete="'+esc(x.key)+'">Çözüldü / sil</button></div><label>Onaylı cevap<textarea class="knowledge-answer" data-k-answer="'+i+'"></textarea></label><button data-k-add="'+i+'">Knowledge\'a ekle</button></article>').join(""):'<p class="muted">Cevapsız soru yok.</p>';window.__unanswered=d.items}catch(e){$("#knowledgeList").innerHTML='<p class="muted">'+esc(e.message)+'</p>'}}

async function loadAnalytics(){try{const d=await req("/admin/analytics");$("#analyticsVisitors").textContent=d.totalVisitors??0;$("#analyticsViews").textContent=d.pageViews??0;$("#analyticsAvg").textContent=d.avgViewsPerVisitor??0;$("#analyticsDays").textContent=d.activeDays??0;$("#analyticsUpdated").textContent=d.updatedAt?"Son güncelleme: "+new Date(d.updatedAt).toLocaleString("tr-TR"):"Henüz veri yok.";const daily=Array.isArray(d.daily)?d.daily:[];const max=Math.max(1,...daily.map(x=>Number(x.pageViews)||0));$("#analyticsChart").innerHTML=daily.length?daily.map(x=>'<div class="bar-col" title="'+esc(x.date)+' · '+esc(x.pageViews)+' views"><div class="bar-wrap"><i style="height:'+Math.max(4,Math.round((Number(x.pageViews)||0)/max*100))+'%"></i></div><small>'+esc(String(x.date||"").slice(5))+'</small></div>').join(""):'<p class="muted">Detaylı günlük veri yeni analytics sürümünden itibaren birikecek.</p>';const pages=Array.isArray(d.topPages)?d.topPages:[];$("#topPages").innerHTML=pages.length?pages.map((x,i)=>'<div class="table-row"><span><b>'+(i+1)+'</b>'+esc(x.path)+'</span><strong>'+esc(x.views)+'</strong></div>').join(""):'<p class="muted">Sayfa bazlı veri yeni sürümden itibaren birikecek.</p>'}catch(e){$("#analyticsUpdated").textContent=e.message}}

async function loadChatbot(){
  try{
    const d=await req("/admin/chat-analytics"),routes=d.routes||{},modes=d.modes||{};
    const grounded=(d.total||0)-(routes["not-found"]||0);
    $("#chatTotal").textContent=d.total||0;$("#chatGrounded").textContent=grounded;$("#chatNotFound").textContent=routes["not-found"]||0;$("#chatRecruiter").textContent=modes.recruiter||0;
    const max=Math.max(1,...Object.values(routes).map(Number));
    $("#chatRoutes").innerHTML=Object.entries(routes).sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<div class="metric-row"><span>'+esc(k)+'</span><div><i style="width:'+Math.round(Number(v)/max*100)+'%"></i></div><strong>'+esc(v)+'</strong></div>').join("")||'<p class="muted">Henüz chatbot analitiği yok.</p>';
    $("#chatRecent").innerHTML=(d.recent||[]).slice(0,15).map(x=>'<div class="table-row"><span><b>'+esc(String(x.route||"").replace("knowledge-fallback","fallback"))+'</b>'+esc(x.question||"")+'</span><strong>'+esc(new Date(x.at).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}))+'</strong></div>').join("")||'<p class="muted">Yeni sorular burada görünecek.</p>';
    $("#chatStatus").textContent=d.updatedAt?"Son güncelleme: "+new Date(d.updatedAt).toLocaleString("tr-TR"):"";
  }catch(e){$("#chatStatus").textContent=e.message}
}

function syncSeoForm(){
  if(!config)return;
  const seo=config.seo||{};
  if($("#seoMetaTitle"))$("#seoMetaTitle").value=seo.title||"";
  if($("#seoMetaDescription"))$("#seoMetaDescription").value=seo.description||"";
  if($("#seoCanonical"))$("#seoCanonical").value=seo.canonical||"https://mehmetcamofficial.com.tr/";
  if($("#seoOgTitle"))$("#seoOgTitle").value=seo.ogTitle||seo.title||"";
  if($("#seoOgDescription"))$("#seoOgDescription").value=seo.ogDescription||seo.description||"";
  if($("#seoOgImage"))$("#seoOgImage").value=seo.ogImage||"https://mehmetcamofficial.com.tr/profile.jpeg";
  if($("#seoRobots"))$("#seoRobots").value=seo.robots||"index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
}
function collectSeoForm(){
  if(!config)return;
  config.seo=config.seo||{};
  if($("#seoMetaTitle"))config.seo.title=$("#seoMetaTitle").value.trim();
  if($("#seoMetaDescription"))config.seo.description=$("#seoMetaDescription").value.trim();
  if($("#seoCanonical"))config.seo.canonical=$("#seoCanonical").value.trim();
  if($("#seoOgTitle"))config.seo.ogTitle=$("#seoOgTitle").value.trim();
  if($("#seoOgDescription"))config.seo.ogDescription=$("#seoOgDescription").value.trim();
  if($("#seoOgImage"))config.seo.ogImage=$("#seoOgImage").value.trim();
  if($("#seoRobots"))config.seo.robots=$("#seoRobots").value.trim();
  if($("#seoTitle"))$("#seoTitle").value=config.seo.title||"";
  if($("#seoDescription"))$("#seoDescription").value=config.seo.description||"";
}
function evaluateSeo(showFeedback=false){
  if(!config)return;
  collectSeoForm();
  const seo=config.seo||{},title=(seo.title||"").trim(),desc=(seo.description||"").trim();
  const canonical=(seo.canonical||"").trim(),ogTitle=(seo.ogTitle||"").trim(),ogDesc=(seo.ogDescription||"").trim(),ogImage=(seo.ogImage||"").trim(),robots=(seo.robots||"").trim();
  const publishedPosts=(config.posts||[]).filter(x=>x.enabled!==false&&x.status!=="draft").length;
  const publishedProjects=(config.projects||[]).filter(x=>x.enabled!==false&&x.status!=="draft").length;
  const activeSections=Object.values(config.pageControls||{}).filter(x=>x.enabled!==false).length;
  const checks=[
    {label:"SEO title 35–65 karakter",ok:title.length>=35&&title.length<=65,detail:title.length+" karakter"},
    {label:"Meta description 120–170 karakter",ok:desc.length>=120&&desc.length<=170,detail:desc.length+" karakter"},
    {label:"Canonical HTTPS URL",ok:/^https:\/\//i.test(canonical),detail:canonical||"Eksik"},
    {label:"Open Graph title mevcut",ok:ogTitle.length>=20,detail:ogTitle.length+" karakter"},
    {label:"Open Graph description mevcut",ok:ogDesc.length>=70,detail:ogDesc.length+" karakter"},
    {label:"Open Graph image HTTPS",ok:/^https:\/\//i.test(ogImage),detail:ogImage?"Görsel tanımlı":"Eksik"},
    {label:"Robots index/follow",ok:/index/i.test(robots)&&/follow/i.test(robots),detail:robots||"Eksik"},
    {label:"Hero açıklaması yeterli",ok:(config.hero?.description||"").length>=80,detail:(config.hero?.description||"").length+" karakter"},
    {label:"En az 5 yayınlanmış proje",ok:publishedProjects>=5,detail:publishedProjects+" proje"},
    {label:"En az 5 yayınlanmış yazı",ok:publishedPosts>=5,detail:publishedPosts+" yazı"},
    {label:"Navigation Writing + Contact",ok:(config.navigation||[]).some(x=>/writing/i.test(x.label))&&(config.navigation||[]).some(x=>/contact/i.test(x.label)),detail:"Menü kontrolü"},
    {label:"Ana sayfa içerik kapsamı",ok:activeSections>=7,detail:activeSections+" aktif bölüm"}
  ];
  const score=Math.round(checks.filter(x=>x.ok).length/checks.length*100);
  $("#seoScore").textContent=score+"%";
  $("#seoTitleScore").textContent=(title.length>=35&&title.length<=65)?"OK":"Check";
  $("#seoDescScore").textContent=(desc.length>=120&&desc.length<=170)?"OK":"Check";
  $("#seoContentScore").textContent=(publishedPosts>=5&&publishedProjects>=5&&activeSections>=7)?"OK":"Check";
  $("#seoChecklist").innerHTML=checks.map(x=>'<div class="check-item '+(x.ok?"ok":"warn")+'"><span>'+(x.ok?"✓":"!")+'</span><div><strong>'+esc(x.label)+'</strong><small>'+esc(x.detail)+'</small></div></div>').join("");
  if($("#seoTitleCount"))$("#seoTitleCount").textContent=title.length+"/65";
  if($("#seoDescCount"))$("#seoDescCount").textContent=desc.length+"/170";
  if($("#serpUrl"))$("#serpUrl").textContent=(canonical||"https://mehmetcamofficial.com.tr/").replace(/^https?:\/\//,"");
  if($("#serpTitle"))$("#serpTitle").textContent=title||"SEO title";
  if($("#serpDescription"))$("#serpDescription").textContent=desc||"Meta description";
  if($("#socialTitle"))$("#socialTitle").textContent=ogTitle||title||"Open Graph title";
  if($("#socialDescription"))$("#socialDescription").textContent=ogDesc||desc||"Open Graph description";
  if($("#socialImage"))$("#socialImage").style.backgroundImage=ogImage?'url("'+ogImage.replace(/"/g,"")+'")':"none";
  if(showFeedback){if($("#seoStatus"))$("#seoStatus").textContent="SEO yeniden değerlendirildi · "+score+"%";toast("SEO yeniden değerlendirildi · "+score+"%");}
}

async function loadApprovals(){
  try{
    const d=await req("/admin/publish-requests");
    $("#approvalList").innerHTML=d.items.length?d.items.map(x=>'<article class="editor-card"><div class="editor-card-head"><div><div class="editor-meta">'+esc(new Date(x.createdAt).toLocaleString("tr-TR"))+' · '+esc(x.submittedBy?.role||"")+'</div><h3>'+esc(x.note||"Publish request")+'</h3><p class="muted">Gönderen: '+esc(x.submittedBy?.name||x.submittedBy?.username||"Unknown")+'</p></div><span class="status-pill ok">Pending</span></div><div class="card-actions"><button data-approval="approve" data-approval-key="'+esc(x.key)+'">Onayla & yayınla</button><button class="danger" data-approval="reject" data-approval-key="'+esc(x.key)+'">Reddet</button></div></article>').join(""):'<p class="muted">Bekleyen yayın onayı yok.</p>';
    if(!["owner","admin"].includes(currentUser?.role))$("#approvalList").querySelectorAll("button").forEach(x=>x.disabled=true);
  }catch(e){$("#approvalList").innerHTML='<p class="muted">'+esc(e.message)+'</p>'}
}

async function loadActivity(){
  try{
    const d=await req("/admin/audit?limit=120");activityCache=d.items||[];renderActivity();
  }catch(e){$("#activityList").innerHTML='<p class="muted">'+esc(e.message)+'</p>'}
}
function renderActivity(){
  const q=($("#activitySearch")?.value||"").trim().toLowerCase();
  const rows=activityCache.filter(x=>!q||JSON.stringify(x).toLowerCase().includes(q));
  $("#activityList").innerHTML=rows.length?rows.map(x=>'<article class="activity-row"><div class="activity-icon">•</div><div><strong>'+esc(x.action||"activity")+'</strong><p>'+esc(x.entity||"")+(x.actor?.name?" · "+esc(x.actor.name):"")+'</p></div><time>'+esc(new Date(x.at).toLocaleString("tr-TR"))+'</time></article>').join(""):'<p class="muted">Kayıt bulunamadı.</p>';
}

async function loadUsers(){if(currentUser?.role!=="owner")return;try{const d=await req("/admin/users");$("#usersList").innerHTML=d.users.length?d.users.map(u=>'<article class="editor-card user-card"><div class="editor-card-head"><div><div class="editor-meta">@'+esc(u.username)+' · '+esc(u.role)+'</div><h3>'+esc(u.name||u.username)+'</h3><p class="muted">Son giriş: '+(u.lastLoginAt?esc(new Date(u.lastLoginAt).toLocaleString("tr-TR")):"Henüz giriş yapmadı")+'</p></div><span class="status-pill '+(u.active?"ok":"off")+'">'+(u.active?"Aktif":"Pasif")+'</span></div><div class="user-controls"><label>Rol<select data-user-role="'+esc(u.id)+'"><option value="admin" '+(u.role==="admin"?"selected":"")+'>Admin</option><option value="editor" '+(u.role==="editor"?"selected":"")+'>Editor</option><option value="viewer" '+(u.role==="viewer"?"selected":"")+'>Viewer</option></select></label><label>Yeni şifre<input type="password" data-user-pass="'+esc(u.id)+'" placeholder="Değiştirmek için yaz"></label></div><div class="card-actions"><button class="ghost" data-user-save="'+esc(u.id)+'">Rolü kaydet</button><button class="ghost" data-user-toggle="'+esc(u.id)+'" data-active="'+(u.active?"1":"0")+'">'+(u.active?"Pasif yap":"Aktif yap")+'</button><button class="ghost" data-user-reset="'+esc(u.id)+'">Şifreyi değiştir</button><button class="danger" data-user-delete="'+esc(u.id)+'">Kullanıcıyı sil</button></div></article>').join(""):'<p class="muted">Ek yönetici kullanıcı yok.</p>'}catch(e){$("#usersStatus").textContent=e.message}}
async function createUser(){try{const body={action:"create",name:$("#newUserName").value,username:$("#newUsername").value,role:$("#newUserRole").value,password:$("#newUserPassword").value};await req("/admin/users",{method:"POST",body:JSON.stringify(body)});$("#newUserPanel").hidden=true;$("#newUserName").value="";$("#newUsername").value="";$("#newUserPassword").value="";$("#usersStatus").textContent="Kullanıcı oluşturuldu.";loadUsers()}catch(e){$("#usersStatus").textContent=e.message}}

async function loadRevisions(){try{const d=await req("/admin/revisions");$("#revisionList").innerHTML=d.items.length?d.items.map(x=>'<article class="editor-card"><div class="editor-card-head"><div><div class="editor-meta">'+esc(new Date(x.createdAt).toLocaleString("tr-TR"))+'</div><h3>'+esc(x.note||"Revision")+'</h3></div><button class="ghost" data-restore="'+esc(x.key)+'">Bu sürüme dön</button></div></article>').join(""):'<p class="muted">Henüz revision yok.</p>'}catch(e){$("#revisionList").innerHTML='<p class="muted">'+esc(e.message)+'</p>'}}

function openTab(name){
  $$(".nav-btn").forEach(x=>x.classList.toggle("active",x.dataset.tab===name));
  $$(".tab").forEach(x=>x.classList.toggle("active",x.dataset.panel===name));
  if(name==="page")renderPageEditor();if(name==="media")loadMedia();if(name==="knowledge")loadKnowledge();if(name==="chatbot")loadChatbot();if(name==="analytics")loadAnalytics();if(name==="seo"){syncSeoForm();evaluateSeo();}if(name==="approvals")loadApprovals();if(name==="activity")loadActivity();if(name==="users")loadUsers();if(name==="revisions")loadRevisions();
}
async function saveAccess(){try{await req("/admin/auth-config",{method:"POST",body:JSON.stringify({enabled:$("#loginEnabled").checked})});$("#settingsStatus").textContent="Login durumu kaydedildi."}catch(e){$("#settingsStatus").textContent=e.message}}
async function changePassword(){try{await req("/admin/auth-config",{method:"POST",body:JSON.stringify({password:$("#changePassword").value})});$("#changePassword").value="";$("#settingsStatus").textContent="Şifre güncellendi."}catch(e){$("#settingsStatus").textContent=e.message}}

document.addEventListener("input",e=>{
  if(e.target.matches("[data-search],[data-status-filter]"))renderCollection(e.target.dataset.search||e.target.dataset.statusFilter);
  if(e.target.id==="activitySearch")renderActivity();
  if(["seoMetaTitle","seoMetaDescription","seoCanonical","seoOgTitle","seoOgDescription","seoOgImage","seoRobots"].includes(e.target.id))evaluateSeo();
});
document.addEventListener("change",e=>{if(e.target.matches("[data-status-filter]"))renderCollection(e.target.dataset.statusFilter)});

document.addEventListener("click",async e=>{
  const n=e.target.closest(".nav-btn");if(n)return openTab(n.dataset.tab);
  const add=e.target.closest("[data-add]");if(add)return addItem(add.dataset.add);
  const card=e.target.closest(".editor-card[data-type]");
  if(card&&e.target.closest("[data-delete]")){syncCards();config[card.dataset.type].splice(+card.dataset.index,1);return renderAll()}
  if(card&&e.target.closest("[data-move]")){syncCards();const a=config[card.dataset.type],i=+card.dataset.index,j=i+(+e.target.closest("[data-move]").dataset.move);if(j>=0&&j<a.length)[a[i],a[j]]=[a[j],a[i]];return renderAll()}
  const nav=e.target.closest("[data-nav-index]");
  if(nav&&e.target.closest("[data-nav-delete]")){collectPageEditor();config.navigation.splice(+nav.dataset.navIndex,1);return renderPageEditor()}
  if(nav&&e.target.closest("[data-nav-move]")){collectPageEditor();const i=+nav.dataset.navIndex,j=i+(+e.target.closest("[data-nav-move]").dataset.navMove);if(j>=0&&j<config.navigation.length)[config.navigation[i],config.navigation[j]]=[config.navigation[j],config.navigation[i]];return renderPageEditor()}
  const sec=e.target.closest("[data-section-index]");if(sec&&e.target.closest("[data-section-delete]")){collectPageEditor();config.sections.splice(+sec.dataset.sectionIndex,1);return renderPageEditor()}
  const cp=e.target.closest("[data-copy]");if(cp){await navigator.clipboard.writeText(cp.dataset.copy);cp.textContent="Kopyalandı";return}
  const md=e.target.closest("[data-media-delete]");if(md&&confirm("Görsel silinsin mi?")){await req("/admin/media?id="+encodeURIComponent(md.dataset.mediaDelete),{method:"DELETE"});return loadMedia()}
  const ud=e.target.closest("[data-unanswered-delete]");if(ud){await req("/admin/unanswered?key="+encodeURIComponent(ud.dataset.unansweredDelete),{method:"DELETE"});return loadKnowledge()}
  const ka=e.target.closest("[data-k-add]");if(ka){const i=+ka.dataset.kAdd,x=window.__unanswered[i],answer=$('[data-k-answer="'+i+'"]').value.trim();if(!answer)return alert("Önce cevap yaz.");await req("/admin/knowledge",{method:"POST",body:JSON.stringify({question:x.question,answer,title:"Curated portfolio knowledge",unansweredKey:x.key})});return loadKnowledge()}
  const ap=e.target.closest("[data-approval]");if(ap){if(!confirm(ap.dataset.approval==="approve"?"Bu değişiklik canlıya yayınlansın mı?":"Bu onay isteği reddedilsin mi?"))return;await req("/admin/publish-requests",{method:"POST",body:JSON.stringify({key:ap.dataset.approvalKey,action:ap.dataset.approval})});return loadApprovals()}
  const rr=e.target.closest("[data-restore]");if(rr&&confirm("Bu sürüme dönülsün mü? Mevcut sürüm önce yedeklenecek.")){const d=await req("/admin/revisions",{method:"POST",body:JSON.stringify({key:rr.dataset.restore})});config=d.config;fillCore();renderAll();renderPageEditor();openTab("overview");setStatus("Revision geri yüklendi.");return}
  const us=e.target.closest("[data-user-save]");if(us){const id=us.dataset.userSave,role=$('[data-user-role="'+id+'"]').value;await req("/admin/users",{method:"POST",body:JSON.stringify({action:"update",id,role})});return loadUsers()}
  const ut=e.target.closest("[data-user-toggle]");if(ut){const id=ut.dataset.userToggle,active=ut.dataset.active!=="1";await req("/admin/users",{method:"POST",body:JSON.stringify({action:"update",id,active})});return loadUsers()}
  const ur=e.target.closest("[data-user-reset]");if(ur){const id=ur.dataset.userReset,password=$('[data-user-pass="'+id+'"]').value;if(password.length<10)return alert("Yeni şifre en az 10 karakter olmalı.");await req("/admin/users",{method:"POST",body:JSON.stringify({action:"reset-password",id,password})});return loadUsers()}
  const ux=e.target.closest("[data-user-delete]");if(ux&&confirm("Bu kullanıcı tamamen silinsin mi?")){await req("/admin/users?id="+encodeURIComponent(ux.dataset.userDelete),{method:"DELETE"});return loadUsers()}
});

function bind(id,event,handler){
  const el=document.getElementById(id);
  if(el)el.addEventListener(event,handler);
}
bind("setupBtn","click",setup);
bind("loginBtn","click",login);
bind("logoutBtn","click",logout);
bind("saveDraftBtn","click",()=>save("draft"));
bind("publishBtn","click",()=>save("publish"));
bind("pageSaveDraftBtn","click",()=>save("draft"));
bind("pagePublishBtn","click",()=>save("publish"));
bind("saveAccessBtn","click",saveAccess);
bind("changePasswordBtn","click",changePassword);
bind("refreshKnowledge","click",loadKnowledge);
bind("refreshChatbot","click",loadChatbot);
bind("refreshAnalytics","click",loadAnalytics);
bind("refreshSeo","click",()=>{try{evaluateSeo(true)}catch(e){console.error(e);toast("SEO değerlendirme hatası: "+e.message,"error");if($("#seoStatus"))$("#seoStatus").textContent=e.message}});
bind("seoSaveDraftBtn","click",()=>save("draft"));
bind("seoPublishBtn","click",()=>save("publish"));
bind("refreshApprovals","click",loadApprovals);
bind("refreshActivity","click",loadActivity);
bind("refreshRevisions","click",loadRevisions);
bind("newUserBtn","click",()=>{const p=$("#newUserPanel");if(p)p.hidden=false});
bind("cancelUserBtn","click",()=>{const p=$("#newUserPanel");if(p)p.hidden=true});
bind("createUserBtn","click",createUser);
bind("addNavigationBtn","click",()=>{collectPageEditor();config.navigation.push({label:"New",href:"#"});renderPageEditor()});
bind("addSectionBtn","click",()=>{collectPageEditor();config.sections.push({id:slug("section"),eyebrow:"// NEW SECTION",title:"New section",body:"",linkLabel:"",linkUrl:"#",status:"draft",enabled:true});renderPageEditor()});
const mediaInput=$("#mediaInput");if(mediaInput)mediaInput.addEventListener("change",e=>uploadMedia(e.target.files[0]));
const passwordInput=$("#password");if(passwordInput)passwordInput.addEventListener("keydown",e=>{if(e.key==="Enter")login()});
window.addEventListener("error",e=>{console.error("CMS runtime error",e.error||e.message);toast("CMS hata verdi. Sayfayı yenileyip tekrar dene.","error")});
window.addEventListener("unhandledrejection",e=>{console.error("CMS async error",e.reason);toast("İşlem tamamlanamadı.","error")});
boot();