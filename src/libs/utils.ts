export function focusMessageForm() {
  const element: any = document.querySelector('.qcw-comment-form textarea');
  if (element) element.focus();
}

export function scrollIntoLastElement(core: any) {
  if (core.selected.comments.length > 0) {
    const latestCommentId =
      core.selected.comments[core.selected.comments.length - 1].id;
    const element = document.getElementById(latestCommentId);
    if (element) element.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
}

export function scrollIntoElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) element.scrollIntoView({ block: 'end', behavior: 'smooth' });
}
