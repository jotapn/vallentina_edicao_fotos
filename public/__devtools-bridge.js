(function(){
if(window.__DEVTOOLS_BRIDGE__) return;
window.__DEVTOOLS_BRIDGE__=true;
if(window===window.parent) return;

var V=4,mode='idle',hl=null,tt=null,lastT=null,selectedElRef=null,toolbar=null;
var editEl=null,origTxt='',origHtml='';

function getFiber(el){
  var keys=Object.keys(el);
  for(var i=0;i<keys.length;i++){
    if(keys[i].indexOf('__reactFiber$')===0||keys[i].indexOf('__reactInternalInstance$')===0)
      return el[keys[i]];
  }
  return null;
}

function getStack(el){
  var fiber=getFiber(el);
  if(!fiber) return null;
  var stack=[],cur=fiber;
  while(cur){
    if(typeof cur.type==='function'||(typeof cur.type==='object'&&cur.type!==null)){
      var n=(cur.type&&(cur.type.displayName||cur.type.name))||null;
      var s=cur._debugSource||null;
      if(n&&n[0]!=='_'&&n!=='Fragment'){
        stack.push({componentName:n,fileName:s?s.fileName:null,lineNumber:s?s.lineNumber:null,columnNumber:s?s.columnNumber:null});
      }
    }
    cur=cur.return;
  }
  return stack.length?stack:null;
}

function cssSel(el){
  if(!el||el===document.body||el===document.documentElement) return '';
  var t=el.tagName.toLowerCase();
  var id=el.id?'#'+el.id:'';
  var c=(el.className&&typeof el.className==='string')?'.'+el.className.trim().split(/\s+/).filter(Boolean).slice(0,3).join('.'):'';
  return t+id+c;
}

function createUI(){
  hl=document.createElement('div');hl.id='__dp-hl';
  hl.style.cssText='position:fixed;pointer-events:none;z-index:2147483646;border:2px solid #3b82f6;background:rgba(59,130,246,0.08);border-radius:4px;transition:all 60ms ease-out;display:none;';
  document.body.appendChild(hl);
  tt=document.createElement('div');tt.id='__dp-tt';
  tt.style.cssText='position:fixed;pointer-events:none;z-index:2147483647;background:#1e1e2e;color:#cdd6f4;font-size:11px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;padding:4px 8px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.3);max-width:360px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:none;line-height:1.4;';
  document.body.appendChild(tt);
}

function destroyUI(){
  if(hl){hl.remove();hl=null;}
  if(tt){tt.remove();tt=null;}
  destroyToolbar();
}

function destroyToolbar(){if(toolbar){toolbar.remove();toolbar=null;}}

function posHL(el){
  if(!el||el===document.body||el===document.documentElement){hl.style.display='none';tt.style.display='none';return;}
  var r=el.getBoundingClientRect();
  hl.style.top=r.top+'px';hl.style.left=r.left+'px';hl.style.width=r.width+'px';hl.style.height=r.height+'px';hl.style.display='block';
  var stack=getStack(el),s=cssSel(el),label='<'+s+'>';
  if(stack&&stack[0]){label=stack[0].componentName;if(stack[0].fileName){var p=stack[0].fileName.split('/');label+='  \u00b7  '+p.slice(-2).join('/');if(stack[0].lineNumber)label+=':'+stack[0].lineNumber;}}
  tt.textContent=label;var top=r.top-28;if(top<4)top=r.bottom+4;
  tt.style.top=top+'px';tt.style.left=Math.max(4,r.left)+'px';tt.style.display='block';
}

function getComputedStylesData(el){
  var cs=window.getComputedStyle(el);
  return {
    color:cs.color,backgroundColor:cs.backgroundColor,fontSize:cs.fontSize,fontFamily:cs.fontFamily,fontWeight:cs.fontWeight,
    marginTop:cs.marginTop,marginRight:cs.marginRight,marginBottom:cs.marginBottom,marginLeft:cs.marginLeft,
    paddingTop:cs.paddingTop,paddingRight:cs.paddingRight,paddingBottom:cs.paddingBottom,paddingLeft:cs.paddingLeft,
    borderRadius:cs.borderRadius,border:cs.border,display:cs.display,alignItems:cs.alignItems,justifyContent:cs.justifyContent,
    width:cs.width,height:cs.height,opacity:cs.opacity,gap:cs.gap,textAlign:cs.textAlign,lineHeight:cs.lineHeight
  };
}

function blockEv(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return false;}

function isToolbarEl(el){return toolbar&&(toolbar===el||toolbar.contains(el));}

/* ── Inline Toolbar ── */
function createToolbar(el){
  destroyToolbar();
  toolbar=document.createElement('div');toolbar.id='__dp-toolbar';
  var r=el.getBoundingClientRect();
  var top=r.top-40;if(top<4)top=r.bottom+4;
  toolbar.style.cssText='position:fixed;z-index:2147483647;display:flex;align-items:center;gap:2px;padding:4px 6px;background:#1a1a2e;border:1px solid rgba(255,255,255,0.12);border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,0.4);font-family:-apple-system,BlinkMacSystemFont,sans-serif;top:'+top+'px;left:'+Math.max(4,r.left)+'px;';

  var tag=el.tagName.toLowerCase();
  var badge=document.createElement('span');
  badge.textContent=tag;
  badge.style.cssText='font-size:10px;font-weight:600;color:#3b82f6;background:rgba(59,130,246,0.15);padding:2px 8px;border-radius:6px;margin-right:4px;';
  toolbar.appendChild(badge);

  var sep1=document.createElement('div');sep1.style.cssText='width:1px;height:16px;background:rgba(255,255,255,0.12);margin:0 2px;';
  toolbar.appendChild(sep1);

  function mkBtn(label,title,fn){
    var b=document.createElement('button');b.title=title;b.innerHTML=label;
    b.style.cssText='width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;color:#cdd6f4;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;transition:background 0.15s;';
    b.onmouseenter=function(){b.style.background='rgba(255,255,255,0.1)';};
    b.onmouseleave=function(){b.style.background='transparent';};
    b.onmousedown=function(e){e.preventDefault();e.stopPropagation();};
    b.onclick=function(e){e.preventDefault();e.stopPropagation();fn();};
    return b;
  }

  toolbar.appendChild(mkBtn('<b>B</b>','Bold',function(){document.execCommand('bold');}));
  toolbar.appendChild(mkBtn('<i>I</i>','Italic',function(){document.execCommand('italic');}));
  toolbar.appendChild(mkBtn('<u>U</u>','Underline',function(){document.execCommand('underline');}));

  var sep2=document.createElement('div');sep2.style.cssText='width:1px;height:16px;background:rgba(255,255,255,0.12);margin:0 2px;';
  toolbar.appendChild(sep2);

  toolbar.appendChild(mkBtn('\u2191','Font size +',function(){
    if(!editEl) return;
    var cs=window.getComputedStyle(editEl);
    var cur=parseFloat(cs.fontSize)||16;
    editEl.style.fontSize=(cur+2)+'px';
  }));
  toolbar.appendChild(mkBtn('\u2193','Font size -',function(){
    if(!editEl) return;
    var cs=window.getComputedStyle(editEl);
    var cur=parseFloat(cs.fontSize)||16;
    if(cur>8) editEl.style.fontSize=(cur-2)+'px';
  }));

  var sep3=document.createElement('div');sep3.style.cssText='width:1px;height:16px;background:rgba(255,255,255,0.12);margin:0 2px;';
  toolbar.appendChild(sep3);

  var saveBtn=document.createElement('button');saveBtn.title='Salvar direto (sem IA)';saveBtn.innerHTML='\u2713';
  saveBtn.style.cssText='width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:none;background:#22c55e;color:#fff;border-radius:6px;cursor:pointer;font-size:14px;font-weight:700;transition:background 0.15s;';
  saveBtn.onmouseenter=function(){saveBtn.style.background='#16a34a';};
  saveBtn.onmouseleave=function(){saveBtn.style.background='#22c55e';};
  saveBtn.onmousedown=function(e){e.preventDefault();e.stopPropagation();};
  saveBtn.onclick=function(e){e.preventDefault();e.stopPropagation();directSave();};
  toolbar.appendChild(saveBtn);

  toolbar.appendChild(mkBtn('\u2717','Cancelar',function(){revertEdit();window.parent.postMessage({type:'ELEMENT_PICKER_CANCEL'},'*');}));

  document.body.appendChild(toolbar);
}

function directSave(){
  if(!editEl) return;
  var newTxt=(editEl.textContent||'').trim();
  var stack=getStack(editEl);
  var comp=(stack&&stack[0])?stack[0]:null;
  var fName=comp?comp.fileName:null;
  editEl.contentEditable='false';editEl.style.outline='';editEl.style.outlineOffset='';
  window.parent.postMessage({type:'DIRECT_EDIT_SAVE',originalText:origTxt,newText:newTxt,fileName:fName,selector:cssSel(editEl)},'*');
  cleanupEdit();
}

/* ── Picker mode ── */
function onMove(e){var t=document.elementFromPoint(e.clientX,e.clientY);if(t&&t!==hl&&t!==tt){lastT=t;posHL(t);}}
function onDown(e){
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  var t=lastT||document.elementFromPoint(e.clientX,e.clientY);
  if(!t||t===hl||t===tt||t===document.body||t===document.documentElement) return false;
  startEditing(t);return false;
}
function pickerKey(e){if(e.key==='Escape') window.parent.postMessage({type:'ELEMENT_PICKER_CANCEL'},'*');}

function activatePicker(){
  if(mode!=='idle') return;mode='picking';
  createUI();
  document.addEventListener('mousemove',onMove,true);
  document.addEventListener('mousedown',onDown,true);
  document.addEventListener('click',blockEv,true);
  document.addEventListener('keydown',pickerKey,true);
  document.body.style.cursor='crosshair';
}

function deactivatePicker(){
  if(mode==='picking'){
    document.removeEventListener('mousemove',onMove,true);
    document.removeEventListener('mousedown',onDown,true);
    document.removeEventListener('click',blockEv,true);
    document.removeEventListener('keydown',pickerKey,true);
    document.body.style.cursor='';lastT=null;mode='idle';destroyUI();
  } else if(mode==='editing'){revertEdit();}
}

/* ── Edit mode ── */
function editDown(e){if(isToolbarEl(e.target)) return;if(editEl&&(editEl===e.target||editEl.contains(e.target))) return;e.preventDefault();e.stopPropagation();}
function editClick(e){if(isToolbarEl(e.target)) return;if(editEl&&(editEl===e.target||editEl.contains(e.target))) return;e.preventDefault();e.stopPropagation();}
function editKey(e){if(e.key==='Escape'){revertEdit();window.parent.postMessage({type:'ELEMENT_PICKER_CANCEL'},'*');}}

function startEditing(el){
  document.removeEventListener('mousemove',onMove,true);
  document.removeEventListener('mousedown',onDown,true);
  document.removeEventListener('click',blockEv,true);
  document.removeEventListener('keydown',pickerKey,true);
  mode='editing';editEl=el;
  origTxt=(el.textContent||'').trim();origHtml=el.innerHTML||'';
  el.contentEditable='true';
  el.style.outline='2px solid #3b82f6';el.style.outlineOffset='2px';
  try{var rng=document.createRange();rng.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(rng);}catch(ex){}
  el.focus();document.body.style.cursor='';
  if(hl)hl.style.display='none';if(tt)tt.style.display='none';
  createToolbar(el);
  document.addEventListener('mousedown',editDown,true);
  document.addEventListener('click',editClick,true);
  document.addEventListener('keydown',editKey,true);
  selectedElRef=el;
  var stack=getStack(el);
  window.parent.postMessage({type:'ELEMENT_SELECTED',element:{
    tag:el.tagName.toLowerCase(),id:el.id||undefined,
    className:(el.className&&typeof el.className==='string')?el.className.split(' ').filter(Boolean).join(' '):undefined,
    text:origTxt.slice(0,100)||undefined,selector:cssSel(el),
    html:(el.outerHTML||'').slice(0,500),
    reactComponent:(stack&&stack[0])?stack[0]:undefined,reactStack:stack||undefined,
    originalText:origTxt,
    computedStyles:getComputedStylesData(el)
  }},'*');
}

function revertEdit(){
  if(editEl){editEl.innerHTML=origHtml;editEl.contentEditable='false';editEl.style.outline='';editEl.style.outlineOffset='';}
  cleanupEdit();
}

function finalizeEdit(){
  var newTxt='';
  if(editEl){newTxt=(editEl.textContent||'').trim();editEl.innerHTML=origHtml;editEl.contentEditable='false';editEl.style.outline='';editEl.style.outlineOffset='';}
  window.parent.postMessage({type:'ELEMENT_EDIT_DONE',originalText:origTxt,newText:newTxt},'*');
  cleanupEdit();
}

function cleanupEdit(){
  document.removeEventListener('mousedown',editDown,true);
  document.removeEventListener('click',editClick,true);
  document.removeEventListener('keydown',editKey,true);
  editEl=null;origTxt='';origHtml='';mode='idle';destroyUI();
}

/* ── Messages ── */
window.addEventListener('message',function(ev){
  if(!ev.data||!ev.data.type) return;
  switch(ev.data.type){
    case 'PING_DEVTOOLS':window.parent.postMessage({type:'DEVTOOLS_BRIDGE_READY',v:V},'*');break;
    case 'ENABLE_PICKER':activatePicker();break;
    case 'DISABLE_PICKER':deactivatePicker();break;
    case 'STOP_EDITING':finalizeEdit();break;
    case 'CANCEL_EDITING':revertEdit();window.parent.postMessage({type:'ELEMENT_PICKER_CANCEL'},'*');break;
    case 'APPLY_STYLE':if(selectedElRef&&ev.data.property&&ev.data.value!==undefined){selectedElRef.style[ev.data.property]=ev.data.value;}break;
    case 'REVERT_STYLES':if(selectedElRef){selectedElRef.style.cssText='';}break;
    case 'GET_COMPUTED_STYLES':if(selectedElRef){window.parent.postMessage({type:'COMPUTED_STYLES_RESULT',styles:getComputedStylesData(selectedElRef)},'*');}break;
  }
});
window.parent.postMessage({type:'DEVTOOLS_BRIDGE_READY',v:V},'*');
})();