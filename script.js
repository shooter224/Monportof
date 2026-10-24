"use strict";
document.body.classList.add('js-ready');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open',open); });
document.addEventListener('keydown', event => { if(event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true'){closeMenu();menu.focus();} });
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
const filters = document.querySelectorAll('[data-filter]');
if(filters.length){document.body.classList.add('filters-ready');filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.querySelector('.filter-status').textContent=count+' projet'+(count>1?'s':'');}));}
const proofs=document.querySelectorAll('img.proof');
if(proofs.length && typeof HTMLDialogElement !== 'undefined'){
 const dialog=document.createElement('dialog');dialog.setAttribute('aria-label','Aperçu de la preuve');
 const close=document.createElement('button');close.type='button';close.className='dialog-close';close.textContent='Fermer ×';
 const enlarged=document.createElement('img');const caption=document.createElement('p');caption.className='dialog-caption';dialog.append(close,enlarged,caption);document.body.append(dialog);
 close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
 proofs.forEach(proof=>{const button=document.createElement('button');button.type='button';button.className='proof-button';button.setAttribute('aria-label','Agrandir : '+proof.alt);proof.before(button);button.append(proof);const hint=document.createElement('span');hint.className='proof-hint';hint.textContent='Agrandir la preuve ↗';button.append(hint);button.addEventListener('click',()=>{enlarged.src=proof.getAttribute('src');enlarged.alt=proof.alt;caption.textContent=proof.alt;dialog.showModal();document.body.classList.add('modal-open');});});
}
