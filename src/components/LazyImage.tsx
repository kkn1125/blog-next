import { Box } from "@mui/material";
import Image from "next/image";

function LazyImage({
  src,
  alt,
  width = 45,
  height = 45,
  ...rest
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [k: string]: any;
}) {
  return (
    <Box width={width} height={height} {...rest}>
      <Image
        src={src}
        alt={alt}
        loading='lazy'
        width={width}
        height={height}
        decoding='async'
      />
    </Box>
  );
}

export default LazyImage;
