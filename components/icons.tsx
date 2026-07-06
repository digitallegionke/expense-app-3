import Svg, { Path, Circle, G, Rect, Line } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export function BellIcon({ size = 30, color = '#3D3C40' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30">
      <G transform="translate(3.5, 3.5)">
        <Path
          d="M22.405 21.729C22.499 21.500 22.524 21.249 22.476 21.006C22.428 20.764 22.308 20.541 22.133 20.366C22.133 20.366 20.000 18.233 20.000 18.233C20.000 18.233 20.000 11.250 20.000 11.250C19.997 9.148 19.238 7.117 17.861 5.528C16.484 3.940 14.580 2.900 12.500 2.600C12.500 2.600 12.500 1.250 12.500 1.250C12.500 0.918 12.368 0.601 12.134 0.366C11.899 0.132 11.581 0.000 11.250 0.000C10.918 0.000 10.600 0.132 10.366 0.366C10.131 0.601 10.000 0.918 10.000 1.250C10.000 1.250 10.000 2.600 10.000 2.600C7.919 2.900 6.016 3.940 4.639 5.528C3.261 7.117 2.502 9.148 2.500 11.250C2.500 11.250 2.500 18.233 2.500 18.233C2.500 18.233 0.366 20.366 0.366 20.366C0.191 20.541 0.072 20.764 0.024 21.006C-0.024 21.249 0.001 21.500 0.095 21.728C0.190 21.957 0.350 22.152 0.555 22.289C0.761 22.427 1.003 22.500 1.250 22.500C1.250 22.500 21.250 22.500 21.250 22.500C21.497 22.500 21.739 22.427 21.944 22.290C22.150 22.152 22.310 21.957 22.405 21.729Z"
          fill={color}
        />
      </G>
      <Circle cx={22.7} cy={7} r={4.5} fill="#E00303" />
    </Svg>
  );
}

export function HomeTabIcon({ size = 24, color = '#69508C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M0.545 10.363C0.198 10.687 0.000 11.141 0.000 11.617C0.000 11.617 0.000 21.429 0.000 21.429C0.000 22.849 1.151 24.000 2.571 24.000C2.571 24.000 10.286 24.000 10.286 24.000C10.286 24.000 10.286 18.857 10.286 18.857C10.286 17.910 11.053 17.143 12.000 17.143C12.947 17.143 13.714 17.910 13.714 18.857C13.714 18.857 13.714 24.000 13.714 24.000C13.714 24.000 21.429 24.000 21.429 24.000C22.849 24.000 24.000 22.849 24.000 21.429C24.000 21.429 24.000 11.617 24.000 11.617C24.000 11.141 23.803 10.687 23.455 10.363C23.455 10.363 12.558 0.206 12.558 0.206C12.237 -0.069 11.763 -0.069 11.442 0.206C11.442 0.206 0.545 10.363 0.545 10.363Z"
        fill={color}
      />
    </Svg>
  );
}

export function ReceiptTabIcon({ size = 24, color = '#69508C', bg = '#DEDBF1' }: IconProps & { bg?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M1.255 1.255C1.653 0.857 2.125 0.541 2.645 0.326C3.166 0.111 3.723 -0.000 4.286 0.000C4.286 0.000 20.571 0.000 20.571 0.000C20.678 0.000 20.783 0.020 20.882 0.058C20.308 0.183 19.794 0.501 19.426 0.958C19.058 1.415 18.857 1.984 18.857 2.571C18.857 2.571 18.857 23.143 18.857 23.143C18.857 23.295 18.817 23.443 18.741 23.575C18.664 23.706 18.555 23.814 18.423 23.889C18.291 23.964 18.141 24.002 17.990 24.000C17.838 23.998 17.690 23.956 17.559 23.878C17.559 23.878 13.714 21.571 13.714 21.571C13.714 21.571 9.869 23.880 9.869 23.880C9.736 23.960 9.584 24.002 9.429 24.002C9.273 24.002 9.121 23.960 8.988 23.880C8.988 23.880 5.143 21.571 5.143 21.571C5.143 21.571 1.298 23.880 1.298 23.880C1.168 23.958 1.019 24.000 0.867 24.002C0.715 24.004 0.566 23.965 0.434 23.890C0.302 23.815 0.192 23.706 0.116 23.575C0.040 23.444 -0.000 23.295 0.000 23.143C0.000 23.143 0.000 4.286 0.000 4.286C-0.000 3.723 0.111 3.166 0.326 2.645C0.541 2.125 0.857 1.653 1.255 1.255Z"
        fill={bg}
      />
      <Path
        transform="translate(18.857, 0)"
        d="M0.000 2.571C0.000 2.571 0.000 10.286 0.000 10.286C0.000 10.286 3.429 10.286 3.429 10.286C3.883 10.286 4.319 10.105 4.641 9.784C4.962 9.462 5.143 9.026 5.143 8.571C5.143 8.571 5.143 2.571 5.143 2.571C5.143 1.889 4.872 1.235 4.390 0.753C3.907 0.271 3.253 0.000 2.571 0.000C1.889 -0.000 1.235 0.271 0.753 0.753C0.271 1.235 0.000 1.889 0.000 2.571Z"
        fill={color}
      />
      <Path
        transform="translate(3.429, 6.429)"
        d="M11.561 0.318C11.817 0.543 11.974 0.860 11.997 1.200C12.019 1.540 11.906 1.876 11.681 2.132C11.681 2.132 5.681 8.989 5.681 8.989C5.468 9.233 5.170 9.387 4.848 9.421C4.525 9.454 4.202 9.365 3.943 9.171C3.943 9.171 0.514 6.599 0.514 6.599C0.379 6.498 0.265 6.371 0.179 6.226C0.093 6.081 0.037 5.920 0.013 5.753C-0.035 5.415 0.053 5.072 0.257 4.799C0.462 4.527 0.766 4.346 1.104 4.298C1.441 4.250 1.784 4.338 2.057 4.542C2.057 4.542 4.533 6.399 4.533 6.399C4.533 6.399 9.747 0.438 9.747 0.438C9.972 0.182 10.289 0.025 10.629 0.003C10.970 -0.020 11.305 0.094 11.561 0.318Z"
        fill={color}
      />
    </Svg>
  );
}

export function CoinsTabIcon({ size = 24, color = '#69508C', bg = '#DEDBF1' }: IconProps & { bg?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23.79 24">
      <Path
        transform="translate(0.002, 0)"
        d="M0.000 12.490C0.000 12.490 0.000 3.429 0.000 3.429C0.000 1.534 3.453 0.000 7.714 0.000C11.974 0.000 15.429 1.534 15.429 3.429C15.429 3.429 15.429 5.949 15.429 5.949C13.310 6.019 11.319 6.429 9.749 7.128C8.889 7.510 8.059 8.023 7.414 8.698C6.761 9.386 6.218 10.339 6.218 11.510C6.218 11.510 6.218 15.854 6.218 15.854C2.657 15.545 0.000 14.150 0.000 12.490Z"
        fill={bg}
      />
      <Path
        transform="translate(8.362, 8.081)"
        d="M0.000 3.429C0.000 3.429 0.000 12.490 0.000 12.490C0.000 14.376 3.429 15.919 7.714 15.919C12.000 15.919 15.429 14.376 15.429 12.490C15.429 12.490 15.429 3.429 15.429 3.429C15.429 1.536 11.974 0.000 7.714 0.000C3.454 0.000 0.000 1.536 0.000 3.429Z"
        fill={bg}
      />
      <Path
        transform="translate(8.362, 14.638)"
        d="M15.429 0.000C15.357 0.227 15.230 0.432 15.058 0.597C14.741 0.931 14.232 1.282 13.519 1.601C12.096 2.235 10.047 2.657 7.714 2.657C5.381 2.657 3.334 2.235 1.910 1.601C1.197 1.282 0.687 0.933 0.370 0.597C0.199 0.432 0.072 0.228 0.000 0.002C0.000 0.002 0.000 3.015 0.000 3.015C0.322 3.214 0.670 3.396 1.037 3.559C2.794 4.344 5.151 4.802 7.714 4.802C10.275 4.802 12.634 4.344 14.391 3.559C14.758 3.396 15.106 3.216 15.429 3.015C15.429 3.015 15.429 0.002 15.429 0.002C15.429 0.002 15.429 0.000 15.429 0.000Z"
        fill={color}
      />
      <Path
        transform="translate(0, 6.557)"
        d="M6.998 2.643C6.542 3.255 6.274 3.986 6.226 4.747C4.245 4.606 2.448 4.186 1.035 3.557C0.679 3.399 0.333 3.218 0.000 3.014C0.000 3.014 0.000 0.000 0.000 0.000C0.071 0.227 0.198 0.432 0.369 0.597C0.686 0.931 1.197 1.282 1.910 1.599C3.185 2.169 4.961 2.568 6.996 2.645C6.996 2.645 6.998 2.643 6.998 2.643Z"
        fill={color}
      />
      <Path
        transform="translate(2.328, 1.927)"
        d="M5.386 3.098C8.362 3.098 10.774 2.405 10.774 1.550C10.774 0.693 8.362 0.000 5.386 0.000C2.412 0.000 0.000 0.694 0.000 1.550C0.000 2.405 2.412 3.098 5.386 3.098Z"
        fill={color}
      />
      <Path
        transform="translate(10.69, 10.008)"
        d="M5.386 3.099C8.361 3.099 10.773 2.405 10.773 1.550C10.773 0.694 8.361 0.000 5.386 0.000C2.410 0.000 0.000 0.694 0.000 1.550C0.000 2.407 2.410 3.099 5.386 3.099Z"
        fill={color}
      />
    </Svg>
  );
}

export function ProfileTabIcon({ size = 24, color = '#69508C', bg = '#DEDBF1' }: IconProps & { bg?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M0.000 12.000C0.000 15.183 1.264 18.235 3.515 20.485C5.765 22.736 8.817 24.000 12.000 24.000C15.183 24.000 18.235 22.736 20.485 20.485C22.736 18.235 24.000 15.183 24.000 12.000C24.000 8.817 22.736 5.765 20.485 3.515C18.235 1.264 15.183 0.000 12.000 0.000C8.817 0.000 5.765 1.264 3.515 3.515C1.264 5.765 0.000 8.817 0.000 12.000Z"
        fill={bg}
      />
      <Path
        transform="translate(7.714, 4.286)"
        d="M0.000 4.286C0.000 5.422 0.452 6.512 1.255 7.316C2.059 8.120 3.149 8.571 4.286 8.571C5.422 8.571 6.512 8.120 7.316 7.316C8.120 6.512 8.571 5.422 8.571 4.286C8.571 3.149 8.120 2.059 7.316 1.255C6.512 0.452 5.422 0.000 4.286 0.000C3.149 0.000 2.059 0.452 1.255 1.255C0.452 2.059 0.000 3.149 0.000 4.286Z"
        fill={color}
      />
      <Path
        transform="translate(4.726, 14.571)"
        d="M14.547 3.429C13.664 2.355 12.553 1.491 11.295 0.898C10.038 0.305 8.664 -0.001 7.274 0.000C5.883 -0.001 4.510 0.305 3.252 0.898C1.994 1.491 0.884 2.355 0.000 3.429C0.884 4.502 1.994 5.366 3.252 5.959C4.510 6.552 5.883 6.859 7.274 6.857C8.664 6.859 10.038 6.552 11.295 5.959C12.553 5.366 13.664 4.502 14.547 3.429Z"
        fill={color}
      />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 20, color = '#949494' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: [{ rotate: '-90deg' }] }}>
      <Path
        d="M12 15.5a1 1 0 0 1-.707-.293l-6-6a1 1 0 1 1 1.414-1.414L12 13.086l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6A1 1 0 0 1 12 15.5Z"
        fill={color}
      />
    </Svg>
  );
}

export function WarningTriangleIcon({ size = 14, color = '#A96A35' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 13.99 13.99">
      <Path
        d="M6.215 0.220C6.450 0.076 6.721 0.000 6.997 0.000C7.273 0.000 7.544 0.076 7.779 0.220C8.015 0.364 8.206 0.570 8.332 0.816C8.332 0.816 8.334 0.820 8.334 0.820C8.334 0.820 13.833 11.819 13.833 11.819C13.948 12.047 14.003 12.302 13.993 12.557C13.982 12.812 13.906 13.061 13.772 13.279C13.639 13.497 13.451 13.677 13.228 13.802C13.005 13.927 12.754 13.993 12.498 13.994C12.498 13.994 12.497 13.994 12.497 13.994C12.497 13.994 1.497 13.994 1.497 13.994C1.497 13.994 1.495 13.994 1.495 13.994C1.240 13.993 0.989 13.927 0.766 13.802C0.543 13.677 0.355 13.497 0.222 13.279C0.088 13.061 0.012 12.812 0.001 12.557C-0.009 12.302 0.045 12.048 0.160 11.820C0.160 11.820 5.660 0.820 5.660 0.820C5.660 0.820 5.662 0.816 5.662 0.816C5.788 0.570 5.979 0.364 6.215 0.220ZM6.997 4.119C7.411 4.119 7.747 4.455 7.747 4.869C7.747 4.869 7.747 8.119 7.747 8.119C7.747 8.533 7.411 8.869 6.997 8.869C6.583 8.869 6.247 8.533 6.247 8.119C6.247 8.119 6.247 4.869 6.247 4.869C6.247 4.455 6.583 4.119 6.997 4.119ZM7.997 10.869C7.997 11.421 7.549 11.869 6.997 11.869C6.445 11.869 5.997 11.421 5.997 10.869C5.997 10.317 6.445 9.869 6.997 9.869C7.549 9.869 7.997 10.317 7.997 10.869Z"
        fillRule="evenodd"
        fill={color}
      />
    </Svg>
  );
}

export function ShieldCheckIcon({ size = 16, color = '#158578' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 13.33 16">
      <Path
        d="M11.963 1.755C11.963 1.755 6.667 0.000 6.667 0.000C6.667 0.000 1.371 1.755 1.371 1.755C0.972 1.888 0.624 2.142 0.378 2.483C0.132 2.824 -0.000 3.234 0.000 3.654C0.000 3.654 0.000 7.994 0.000 7.994C0.000 13.010 6.133 15.780 6.396 15.895C6.396 15.895 6.632 16.000 6.632 16.000C6.632 16.000 6.877 15.919 6.877 15.919C7.141 15.831 13.333 13.712 13.333 7.994C13.333 7.994 13.333 3.654 13.333 3.654C13.333 3.234 13.201 2.824 12.955 2.483C12.709 2.142 12.362 1.888 11.963 1.755ZM6.963 9.320C6.846 9.437 6.707 9.530 6.555 9.594C6.402 9.657 6.238 9.689 6.073 9.689C6.073 9.689 6.051 9.689 6.051 9.689C5.882 9.686 5.715 9.649 5.561 9.581C5.407 9.512 5.269 9.413 5.154 9.289C5.154 9.289 3.617 7.689 3.617 7.689C3.617 7.689 4.579 6.767 4.579 6.767C4.579 6.767 6.075 8.327 6.075 8.327C6.075 8.327 9.529 4.873 9.529 4.873C9.529 4.873 10.471 5.816 10.471 5.816C10.471 5.816 6.963 9.320 6.963 9.320Z"
        fill={color}
      />
    </Svg>
  );
}

export function CheckCircleIcon({ size = 14, color = '#158578' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 11.08 11.08">
      <Path
        d="M4.714 8.023C4.714 8.023 8.636 4.101 8.636 4.101C8.636 4.101 8.021 3.487 8.021 3.487C8.021 3.487 4.714 6.794 4.714 6.794C4.714 6.794 3.051 5.131 3.051 5.131C3.051 5.131 2.437 5.746 2.437 5.746C2.437 5.746 4.714 8.023 4.714 8.023ZM5.543 11.083C4.776 11.083 4.056 10.938 3.381 10.647C2.707 10.356 2.120 9.961 1.621 9.463C1.123 8.964 0.728 8.378 0.436 7.703C0.145 7.029 0.000 6.309 0.000 5.543C0.000 4.776 0.145 4.056 0.436 3.381C0.727 2.707 1.122 2.120 1.621 1.621C2.119 1.123 2.706 0.728 3.380 0.436C4.054 0.145 4.774 0.000 5.541 0.000C6.307 0.000 7.028 0.145 7.702 0.436C8.376 0.727 8.963 1.122 9.462 1.621C9.961 2.119 10.356 2.706 10.647 3.380C10.938 4.054 11.083 4.774 11.083 5.541C11.083 6.307 10.938 7.028 10.647 7.702C10.356 8.376 9.961 8.963 9.463 9.462C8.964 9.961 8.378 10.356 7.703 10.647C7.029 10.938 6.309 11.083 5.543 11.083Z"
        fill={color}
      />
    </Svg>
  );
}

export function ExternalArrowIcon({ size = 24, color = '#69508C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 15 11.31">
      <Path
        d="M9.346 11.308C9.346 11.308 8.292 10.223 8.292 10.223C8.292 10.223 12.112 6.404 12.112 6.404C12.112 6.404 0.000 6.404 0.000 6.404C0.000 6.404 0.000 4.904 0.000 4.904C0.000 4.904 12.112 4.904 12.112 4.904C12.112 4.904 8.292 1.085 8.292 1.085C8.292 1.085 9.346 0.000 9.346 0.000C9.346 0.000 15.000 5.654 15.000 5.654C15.000 5.654 9.346 11.308 9.346 11.308Z"
        fill={color}
      />
    </Svg>
  );
}

export function BackArrowIcon({ size = 24, color = '#666666' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960">
      <Path
        d="m382-480 294 294q15 15 14.5 35T675-116q-15 15-35 15t-35-15L297-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T676-844q15 15 15 35t-15 35L382-480Z"
        fill={color}
      />
    </Svg>
  );
}

export function MoreIcon({ size = 20, color = '#666666' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={4.167} cy={10} r={1.667} fill={color} />
      <Circle cx={10} cy={10} r={1.667} fill={color} />
      <Circle cx={15.833} cy={10} r={1.667} fill={color} />
    </Svg>
  );
}

export function ExpandCornersIcon({ size = 13, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M8 3H5a2 2 0 0 0-2 2v3" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 3h3a2 2 0 0 1 2 2v3" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 21H5a2 2 0 0 1-2-2v-3" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 21h3a2 2 0 0 0 2-2v-3" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TagIcon({ size = 15, color = '#69508C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.41l8 8a2 2 0 0 0 2.82 0l7.17-7.17a2 2 0 0 0 0-2.82z"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={7.5} cy={7.5} r={1.2} fill={color} />
    </Svg>
  );
}

export function ChevronDownIcon({ size = 16, color = '#949494' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M6 9l6 6 6-6" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 20, color = '#949494' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: [{ rotate: '90deg' }] }}>
      <Path
        d="M12 15.5a1 1 0 0 1-.707-.293l-6-6a1 1 0 1 1 1.414-1.414L12 13.086l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6A1 1 0 0 1 12 15.5Z"
        fill={color}
      />
    </Svg>
  );
}

export function BanknoteIcon({ size = 18, color = '#69508C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={2} y={6} width={20} height={12} rx={2} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={12} r={2.5} fill="none" stroke={color} strokeWidth={2} />
      <Line x1={6} y1={12} x2={6.01} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={18} y1={12} x2={18.01} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function CalculatorIcon({ size = 18, color = '#158578' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={4} y={2} width={16} height={20} rx={2} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={8} y1={6.5} x2={16} y2={6.5} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={8} cy={11} r={1} fill={color} />
      <Circle cx={12} cy={11} r={1} fill={color} />
      <Circle cx={16} cy={11} r={1} fill={color} />
      <Circle cx={8} cy={15} r={1} fill={color} />
      <Circle cx={12} cy={15} r={1} fill={color} />
      <Circle cx={16} cy={15} r={1} fill={color} />
      <Circle cx={8} cy={19} r={1} fill={color} />
      <Circle cx={12} cy={19} r={1} fill={color} />
    </Svg>
  );
}

export function ReceiptStackIcon({ size = 18, color = '#2F6FA6' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1={8} y1={7} x2={16} y2={7} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={11} x2={16} y2={11} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={15} x2={13} y2={15} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function DownloadIcon({ size = 16, color = '#69508C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7 10l5 5 5-5" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={12} y1={15} x2={12} y2={3} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BarChartIcon({ size = 40, color = '#939393' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1={3} y1={21} x2={3} y2={3} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Rect x={6} y={13} width={4} height={8} rx={1} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Rect x={12} y={8} width={4} height={13} rx={1} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Rect x={18} y={16} width={4} height={5} rx={1} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CopyIcon({ size = 14, color = '#69508C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={9} y={9} width={13} height={13} rx={2} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ListIcon({ size = 14, color = '#666666' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1={8} y1={6} x2={21} y2={6} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={8} y1={12} x2={21} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={8} y1={18} x2={21} y2={18} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={3.5} cy={6} r={1} fill={color} />
      <Circle cx={3.5} cy={12} r={1} fill={color} />
      <Circle cx={3.5} cy={18} r={1} fill={color} />
    </Svg>
  );
}

export function CardIcon({ size = 16, color = '#666666' }: IconProps) {
  return (
    <Svg width={size} height={14} viewBox="0 0 24 24">
      <Rect x={2} y={5} width={20} height={14} rx={2} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={2} y1={10} x2={22} y2={10} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PencilIcon({ size = 13, color = '#69508C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 20h9" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BatteryIcon({ color = '#000000' }: { color?: string }) {
  return (
    <Svg width={27} height={13} viewBox="0 0 27.33 13">
      <Rect x={1.5} y={0.5} width={23.5} height={12} rx={4} stroke={color} strokeOpacity={0.35} fill="none" />
      <Rect x={3} y={2} width={20.5} height={9} rx={2.5} fill={color} />
      <Path d="M26 4.5v4c.8-.35 1.33-1.15 1.33-2s-.53-1.65-1.33-2Z" fill={color} fillOpacity={0.4} />
    </Svg>
  );
}
