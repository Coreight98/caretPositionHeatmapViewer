export function getXPathFromElement(element: Element) {
  const idx = (sib: Element | null, name?: string): number =>
    sib
      ? idx(sib?.previousElementSibling, name || sib.localName) + Number(sib.localName == name)
      : 1;

  const segs = (element: Element): string[] =>
    !element || element.nodeType !== 1
      ? ['']
      : element.id && document.getElementById(element.id) === element
      ? [`id("${element.id}")`]
      : [
          ...segs(element.parentNode as Element),
          `${element.localName.toLowerCase()}[${idx(element)}]`,
        ];
  return segs(element).join('/');
}
