import Image from "next/image";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  rotulo?: boolean;
};

// Mostra a foto quando houver; senão, um espaço reservado discreto.
export default function FotoSlot({ src, alt, className = "", priority, sizes, rotulo = true }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${alt} (foto em breve)`}
      className={`relative flex items-end overflow-hidden bg-gradient-to-br from-navy-800 via-mar-500 to-mar-300 ${className}`}
    >
      {rotulo ? (
        <span className="m-3 rounded bg-white/85 px-2 py-1 text-xs font-medium text-navy-900">
          Foto em breve
        </span>
      ) : null}
    </div>
  );
}
