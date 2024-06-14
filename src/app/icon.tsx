import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="bg-gray-800 text-white w-full h-full flex items-center justify-center text-lg font-bold rounded-sm">
        NL
      </div>
    ),
    {
      ...size,
    }
  );
}
