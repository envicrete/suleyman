import { cn } from '@envi/ui';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 48 48"
      {...props}
      className={cn('h-8 w-8 fill-black dark:fill-white', props.className)}
    >
      <path d="M12.577 34.356v-14.313a1.382 1.382 0 0 0 -1.711 -1.343l-1.225 0.303a1.382 1.382 0 0 0 -1.05 1.34v11.351a1.382 1.382 0 0 1 -1.888 1.284l-0.417 -0.164a1.382 1.382 0 0 1 -0.874 -1.296l0.124 -15.286a1.382 1.382 0 0 1 0.89 -1.279l20.736 -7.894a1.382 1.382 0 0 1 1.193 0.1l1.345 0.791a1.382 1.382 0 0 1 0.681 1.19v29.604a1.382 1.382 0 0 1 -0.7 1.201l-1.604 0.911a1.396 1.396 0 0 1 -1.188 0.081l-4.804 -1.894a1.382 1.382 0 0 1 -0.874 -1.286V18.305a1.382 1.382 0 0 0 -1.711 -1.343l-1.225 0.303a1.382 1.382 0 0 0 -1.05 1.34v16.495a1.382 1.382 0 0 1 -1.888 1.284l-1.887 -0.743a1.382 1.382 0 0 1 -0.874 -1.284M41.775 15.055l0.127 0.074a1.382 1.382 0 0 1 0.681 1.201l-0.127 15.584a1.382 1.382 0 0 1 -0.7 1.19 1.382 1.382 0 0 1 -2.063 -1.201V16.244a1.38 1.38 0 0 1 2.081 -1.19m-5.132 20.143V12.828a1.382 1.382 0 0 0 -0.681 -1.19l-0.452 -0.266a1.38 1.38 0 0 0 -2.081 1.19v22.892a1.382 1.382 0 0 0 2.063 1.201l0.452 -0.256a1.382 1.382 0 0 0 0.7 -1.201" />
    </svg>
  );
}
