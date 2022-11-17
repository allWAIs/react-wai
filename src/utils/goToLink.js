/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

/* exported goToLink */

export function goToLink(event, url) {
  if (event.key !== 'Enter' && event.type !== 'click') return;
  
  window.location.href = url;

  event.preventDefault();
  event.stopPropagation();
}
