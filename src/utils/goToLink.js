/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

/* exported goToLink */

export function goToLink(event, url) {
  let type = event.type;

  if (type === 'click' || (type === 'keydown' && event.keyCode === 13)) {
    window.location.href = url;

    event.preventDefault();
    event.stopPropagation();
  }
}
