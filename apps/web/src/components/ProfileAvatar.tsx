const PROFILE_IMAGE = '/profile.jpg';

type ProfileAvatarProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
  onClick?: () => void;
};

const sizes = {
  sm: { box: 'h-10 w-10', px: 40, ring: '-inset-0.5' },
  md: { box: 'h-20 w-20', px: 80, ring: '-inset-1' },
  lg: { box: 'h-28 w-28', px: 112, ring: '-inset-1.5' },
};

export function ProfileAvatar({
  size = 'md',
  className = '',
  animated = true,
  onClick,
}: ProfileAvatarProps) {
  const { box, px, ring } = sizes[size];
  const clickable = Boolean(onClick);

  const inner = (
    <>
      {animated && (
        <div
          className={`absolute ${ring} animate-gradient-shift rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 bg-[length:300%_300%] opacity-80 blur-[2px]`}
        />
      )}
      <div className={`relative overflow-hidden rounded-2xl ring-2 ring-white ${box}`}>
        <img
          src={PROFILE_IMAGE}
          alt="Ghulam Muhammad"
          width={px}
          height={px}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading={size === 'md' ? 'eager' : 'lazy'}
        />
      </div>
    </>
  );

  if (clickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group relative inline-block cursor-pointer rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${className}`}
        title="View profile photo"
      >
        {inner}
      </button>
    );
  }

  return <div className={`relative inline-block ${className}`}>{inner}</div>;
}

export { PROFILE_IMAGE };
