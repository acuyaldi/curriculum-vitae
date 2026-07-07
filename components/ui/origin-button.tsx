"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

// Radial "origin fill" reveal, recolored to this CV's palette:
// resting surface -> warm-gold (accent) circle grows from the pointer/focus
// origin, text flips to charcoal (bg) — mirrors the global ::selection look.
const FILL_DURATION = 0.5;
const FILL_EASE = [0.16, 1, 0.3, 1] as const;

// Motion re-types these DOM handlers, so drop the native ones to avoid clashes.
type MotionConflictKeys =
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop";

function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y)
      )
  );
}

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function hasTextContent(node: React.ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") {
    return String(node).trim().length > 0;
  }

  if (Array.isArray(node)) {
    return node.some(hasTextContent);
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return hasTextContent(node.props.children);
  }

  return false;
}

// Renders a real <a> when `href` is set (keeps link semantics for nav/SEO),
// otherwise a <button>. `loading`/`type` only apply to the button variant.
type OriginButtonProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  MotionConflictKeys
> & {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  type?: "button" | "submit" | "reset";
};

const OriginButton = React.forwardRef<HTMLElement, OriginButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      loading = false,
      href,
      target,
      rel,
      download,
      type = "button",
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLElement | null>(null);
    const isLink = href !== undefined;
    const isDisabled = Boolean(disabled || loading);
    const [hovered, setHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);
    const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
    const [coverSize, setCoverSize] = React.useState(0);

    const ariaLabel = props["aria-label"];
    const ariaLabelledBy = props["aria-labelledby"];

    React.useEffect(() => {
      if (process.env.NODE_ENV === "production") {
        return;
      }

      if (
        hasTextContent(children) ||
        ariaLabel?.trim() ||
        ariaLabelledBy?.trim()
      ) {
        return;
      }

      console.warn(
        "OriginButton: provide visible label text or aria-label / aria-labelledby so the control has an accessible name."
      );
    }, [ariaLabel, ariaLabelledBy, children]);

    const updateOrigin = React.useCallback((x: number, y: number) => {
      const node = buttonRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      setOrigin({ x, y });
      setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
    }, []);

    const updateOriginFromPointer = React.useCallback(
      (event: React.PointerEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        updateOrigin(event.clientX - rect.left, event.clientY - rect.top);
      },
      [updateOrigin]
    );

    const updateOriginFromCenter = React.useCallback(() => {
      const node = buttonRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      updateOrigin(rect.width / 2, rect.height / 2);
    }, [updateOrigin]);

    const showFill = !isDisabled && (hovered || isPressed);

    React.useLayoutEffect(() => {
      const node = buttonRef.current;
      if (!(node && showFill)) return;

      const measure = () => {
        const rect = node.getBoundingClientRect();
        setCoverSize(
          getCoverDiameter(rect.width, rect.height, origin.x, origin.y)
        );
      };

      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(node);

      const fonts = document.fonts;
      if (fonts?.ready) {
        fonts.ready.then(measure).catch(() => undefined);
      }

      return () => observer.disconnect();
    }, [showFill, origin.x, origin.y]);

    const fillTransition = { duration: FILL_DURATION, ease: FILL_EASE };

    const setMergedRef = React.useCallback(
      (node: HTMLElement | null) => {
        buttonRef.current = node;
        assignRef(ref, node);
      },
      [ref]
    );

    // Only <button> takes disabled/type/aria-busy; <a> uses aria-disabled.
    const semanticProps = isLink
      ? {
          href,
          target,
          rel,
          download,
          "aria-disabled": isDisabled || undefined,
          tabIndex: isDisabled ? -1 : undefined,
        }
      : {
          type,
          disabled: isDisabled,
          "aria-busy": loading || undefined,
        };

    const Comp = (isLink ? motion.a : motion.button) as React.ElementType;

    return (
      <Comp
        {...props}
        {...semanticProps}
        className={cn(
          "relative inline-flex h-11 cursor-pointer touch-manipulation select-none items-center justify-center gap-2 overflow-hidden rounded-lg px-5 font-semibold text-sm tracking-[-0.01em]",
          "border border-line bg-surface text-text",
          "transition-[color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:pointer-events-none disabled:opacity-50",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          showFill && "text-bg",
          className
        )}
        data-pressed={isPressed ? "true" : "false"}
        onBlur={(event: React.FocusEvent<HTMLElement>) => {
          onBlur?.(event);
          setIsPressed(false);
          if (!event.defaultPrevented) {
            setHovered(false);
          }
        }}
        onClick={onClick}
        onFocus={(event: React.FocusEvent<HTMLElement>) => {
          onFocus?.(event);
          if (isDisabled || event.defaultPrevented) return;
          if (event.currentTarget.matches(":focus-visible")) {
            updateOriginFromCenter();
            setHovered(true);
          }
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
          onKeyDown?.(event);

          if (
            event.defaultPrevented ||
            isDisabled ||
            event.repeat ||
            (event.key !== " " && event.key !== "Enter")
          ) {
            return;
          }

          if (event.key === " ") {
            event.preventDefault();
          }

          updateOriginFromCenter();
          setIsPressed(true);
          setHovered(true);
        }}
        onKeyUp={(event: React.KeyboardEvent<HTMLElement>) => {
          onKeyUp?.(event);

          if (event.key === " " || event.key === "Enter") {
            setIsPressed(false);
            if (!event.currentTarget.matches(":focus-visible")) {
              setHovered(false);
            }
          }
        }}
        onPointerCancel={(event: React.PointerEvent<HTMLElement>) => {
          onPointerCancel?.(event);
          setIsPressed(false);
        }}
        onPointerDown={(event: React.PointerEvent<HTMLElement>) => {
          onPointerDown?.(event);

          if (event.defaultPrevented || isDisabled || event.button !== 0) {
            return;
          }

          updateOriginFromPointer(event);
          setIsPressed(true);
          setHovered(true);
        }}
        onPointerEnter={(event: React.PointerEvent<HTMLElement>) => {
          onPointerEnter?.(event);
          if (isDisabled || event.defaultPrevented) return;
          updateOriginFromPointer(event);
          setHovered(true);
        }}
        onPointerLeave={(event: React.PointerEvent<HTMLElement>) => {
          onPointerLeave?.(event);
          setHovered(false);
          setIsPressed(false);
        }}
        onPointerUp={(event: React.PointerEvent<HTMLElement>) => {
          onPointerUp?.(event);
          setIsPressed(false);
        }}
        ref={setMergedRef}
        whileTap={isDisabled ? undefined : { scale: 0.985 }}
      >
        <motion.span
          animate={{ scale: showFill && coverSize > 0 ? 1 : 0 }}
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          initial={false}
          style={{
            height: coverSize,
            left: origin.x,
            top: origin.y,
            width: coverSize,
          }}
          transition={fillTransition}
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </Comp>
    );
  }
);
OriginButton.displayName = "OriginButton";

export { OriginButton };
export type { OriginButtonProps };
