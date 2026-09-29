(function(){
  const KEY='account';
  function getAccount(){try{return JSON.parse(localStorage.getItem(KEY))||null}catch(e){return null}}
  function esc(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function avatar(a){return a&&a.avatar ? a.avatar : 'Guest.jpg'}
  function applyAccent(){
    const a=getAccount(); const accent=(a&&a.accent)||'#a600ff';
    document.documentElement.style.setProperty('--accent',accent);
    let s=document.getElementById('vt-global-accent');
    if(!s){s=document.createElement('style');s.id='vt-global-accent';document.head.appendChild(s)}
    s.textContent=`
      :root{--accent:${accent}}
      a:hover,.logo{color:var(--accent)}
      button:not(.secondary):not(.category-btn):not(.mobile-category-toggle),.button:not(.secondary){background:var(--accent)!important}
      input:focus,textarea:focus,select:focus{border-color:var(--accent)!important;box-shadow:0 0 0 1px var(--accent)33}
      .vt-site-avatar{border-color:var(--accent)!important}
      .vt-accent{color:var(--accent)!important}
      #vt-global-profile{margin-left:auto;display:flex;align-items:center;flex:0 0 auto;font-family:inherit}
      #vt-global-profile .vt-profile-link{display:block;line-height:0}
      #vt-global-profile .vt-site-avatar{width:55px;height:55px;border:2px solid var(--accent);border-radius:50%;object-fit:cover;background:#222;display:block;cursor:pointer;box-shadow:0 4px 18px #0007}
      header:not(.site-main-header){display:flex;align-items:center;gap:12px;min-height:52px;padding:8px 14px;box-sizing:border-box;position:relative}
      .vt-page-logo{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;gap:9px;color:var(--accent);text-decoration:none;font-weight:700;font-size:21px;line-height:1;z-index:2}
      .vt-page-logo img{width:36px;height:36px;border-radius:9px;object-fit:cover;display:block}
      #vt-generated-header .vt-page-logo{left:50%;}
      @media(max-width:700px){.vt-page-logo{font-size:18px;gap:6px}.vt-page-logo img{width:32px;height:32px}}
      #vt-generated-header{display:flex;align-items:center;min-height:52px;padding:8px 14px;box-sizing:border-box;background:rgba(32,32,32,.72);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid #ffffff18;box-shadow:0 8px 24px #0004;position:relative;z-index:10}
      #vt-global-profile{transform:translateY(2.6px)!important}
      @media(max-width:700px){#vt-global-profile .vt-site-avatar{width:38px;height:38px}}
      @media(max-width:700px){body.page-history #vt-global-profile{transform:translate(-8px,2.6px)!important}}
    `;
  }
  function addHeader(){
    const a=getAccount();
    const page=location.pathname.split('/').pop().toLowerCase();

    if(page==='account.html'){
      const old=document.getElementById('vt-global-profile');
      if(old) old.remove();
      return;
    }

    if(page==='index.html' || page===''){
      const old=document.getElementById('vt-global-profile');
      if(old) old.remove();
      const headerAvatar=document.getElementById('headerAvatar');
      if(headerAvatar){
        headerAvatar.src=avatar(a);
        headerAvatar.alt=a&&a.username?`Аватар ${a.username}`:'Профиль';
      }
      return;
    }

    let header=document.querySelector('header');
    if(!header){
      header=document.createElement('header');
      header.id='vt-generated-header';
      document.body.prepend(header);
    }

    if(!header.querySelector('.vt-page-logo')){
      const logo=document.createElement('a');
      logo.className='vt-page-logo';
      logo.href='index.html';
      logo.setAttribute('aria-label','ViceTube');
      logo.innerHTML='<img src="logo.png" alt="ViceTube"><span>ViceTube</span>';
      header.appendChild(logo);
    }

    if(page==='upload.html'){
      const old=document.getElementById('vt-global-profile');
      if(old) old.remove();
      return;
    }

    let h=document.getElementById('vt-global-profile');
    if(!h){
      h=document.createElement('div');
      h.id='vt-global-profile';
      h.innerHTML=`
        <a class="vt-profile-link" href="account.html" aria-label="профиль" title="профиль">
          <img class="vt-site-avatar" alt="Аватар профиля">
        </a>`;
      header.appendChild(h);
    }else if(h.parentElement!==header){
      header.appendChild(h);
    }

    const img=h.querySelector('img');
    img.src=avatar(a);
    img.alt=a&&a.username?`Аватар ${a.username}`:'Профиль';
  }
  function run(){
    if(location.pathname.toLowerCase().endsWith('/history.html') || location.pathname.toLowerCase().endsWith('history.html')) document.body.classList.add('page-history');
    applyAccent();addHeader();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  window.addEventListener('storage',run);
  window.ViceTubeProfile={refresh:run,getAccount:getAccount};
})();

