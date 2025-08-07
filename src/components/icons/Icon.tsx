export default function Icon({ name }: { name: string }) {
  return <img src={`/icons/${name}.svg`} alt={name} class="icon" />;
}