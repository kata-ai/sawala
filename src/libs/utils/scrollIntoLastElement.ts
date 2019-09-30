export default function scrollIntoElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) element.scrollIntoView({ block: 'end', behavior: 'smooth' });
}
