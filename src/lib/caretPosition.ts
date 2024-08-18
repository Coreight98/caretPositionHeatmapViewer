function getCaretPositionFromPoint({ x, y }: { x: number; y: number }) {
  const range = (document as any).caretPositionFromPoint(x, y);

  return {
    offsetNode: range?.offsetNode,
    offset: range?.offset ?? 0,
  };
}

function getCaretPointFromRange({ x, y }: { x: number; y: number }) {
  const range = document.caretRangeFromPoint(x, y);

  return {
    offsetNode: range?.startContainer,
    offset: range?.startOffset ?? 0,
  };
}

export function getCaretPosition({ x, y }: { x: number; y: number }) {
  return 'caretPositionFromPoint' in document
    ? getCaretPositionFromPoint({ x, y })
    : getCaretPointFromRange({ x, y });
}
