import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

type OutlineButtonLinkProps = SharedProps & {
  href: string;
  external?: boolean;
};

type OutlineButtonButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonContent({
  label,
  children,
  icon,
}: {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <>
      <span className="btn__ripple" aria-hidden />
      <span className="inline-flex items-center gap-2">
        {icon && <span className="btn__icon shrink-0">{icon}</span>}
        <span className="block overflow-hidden">
          <span className="btn__text" data-attr={label}>
            {children}
          </span>
        </span>
      </span>
    </>
  );
}

export function OutlineButton(props: OutlineButtonLinkProps | OutlineButtonButtonProps) {
  const label = typeof props.children === "string" ? props.children : "";
  const classes = ["btn", "btn__outline", "font-satoshi", props.className].filter(Boolean).join(" ");

  if ("href" in props && props.href) {
    const { href, external, className: _c, children, icon } = props;
    const isExternal = external ?? (href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf"));

    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          <ButtonContent label={label} icon={icon}>
            {children}
          </ButtonContent>
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        <ButtonContent label={label} icon={icon}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  const { className: _c, children, icon, type = "button", ...buttonProps } =
    props as OutlineButtonButtonProps;

  return (
    <button type={type} className={classes} {...buttonProps}>
      <ButtonContent label={label} icon={icon}>
        {children}
      </ButtonContent>
    </button>
  );
}
