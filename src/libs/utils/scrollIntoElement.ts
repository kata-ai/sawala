export default function scrollIntoLastElement(core: any) {
  if (core.selected.comments.length > 0) {
    const latestCommentId =
      core.selected.comments[core.selected.comments.length - 1].id;
    const element = document.getElementById(latestCommentId);
    if (element) element.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
}
