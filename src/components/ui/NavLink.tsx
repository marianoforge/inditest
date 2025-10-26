'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';

type NavLinkProps = ComponentProps<typeof Link>;

export function NavLink({ href, onClick, children, ...props }: NavLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (!e.defaultPrevented) {
      e.preventDefault();

      window.dispatchEvent(new CustomEvent('navigationStart'));

      setTimeout(() => {
        router.push(href.toString());
      }, 0);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
