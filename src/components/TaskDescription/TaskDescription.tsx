export default function TaskDescription({ text }: { text: string }) {
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
}
