import Image from "next/image";

function LazyImage({
  src,
  alt,
  ...rest
}: {
  src: string;
  alt: string;
  [k: string]: any;
}) {
  return (
    <Image src={src} alt={alt} loading='lazy' decoding='async' {...rest} />
  );
}

export default LazyImage;
