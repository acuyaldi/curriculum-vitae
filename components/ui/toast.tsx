"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { LuCircleAlert, LuCircleCheck, LuX } from "react-icons/lu";

import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error";

export type ToastData = {
  variant: ToastVariant;
  message: string;
  // Optional escape-hatch link (e.g. LinkedIn when a send fails). Rendered as a
  // secondary link beneath the message.
  action?: { label: string; href: string };
};

type ToastProps = {
  // The toast to show, or null when nothing is live. A NEW object reference
  // re-triggers the enter animation + auto-dismiss timer, so callers should
  // build a fresh object per event (even for a repeated message).
  toast: ToastData | null;
  onClose: () => void;
  // How long a success toast stays before auto-dismissing. Errors are sticky —
  // they carry an action and shouldn't vanish before the reader acts.
  successDuration?: number;
};

// Single, non-blocking status toast for send outcomes. Portaled to <body> so
// fixed positioning anchors to the viewport — a transformed ancestor (Reveal)
// would otherwise become its containing block and pin it mid-page.
export function Toast({ toast, onClose, successDuration = 5000 }: ToastProps) {
  const reduceMotion = useReducedMotion();

  // Auto-dismiss success only. Re-runs when a new toast object arrives.
  useEffect(() => {
    if (!toast || toast.variant !== "success") return;
    const id = setTimeout(onClose, successDuration);
    return () => clearTimeout(id);
  }, [toast, successDuration, onClose]);

  // Portal target (document.body) only exists on the client. Diverge the
  // server/client snapshot here rather than a setState-in-effect mount flag —
  // renders null through hydration, then the real toast on the client.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  if (!isClient) return null;

  const isSuccess = toast?.variant === "success";
  const Icon = isSuccess ? LuCircleCheck : LuCircleAlert;

  return createPortal(
    <div
      // Non-interactive wrapper so the toast never blocks clicks on the page
      // behind it; the card itself re-enables pointer events.
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message + toast.variant}
            role={isSuccess ? "status" : "alert"}
            aria-live={isSuccess ? "polite" : "assertive"}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className={cn(
              "pointer-events-auto flex w-full items-start gap-3 rounded-lg border bg-surface-2 px-4 py-3 text-sm shadow-lg shadow-black/20 sm:max-w-sm",
              isSuccess
                ? "border-accent/40 text-text"
                : "border-error/50 text-text",
            )}
          >
            <Icon
              size={18}
              className={cn(
                "mt-0.5 shrink-0",
                isSuccess ? "text-accent" : "text-error",
              )}
            />
            <div className="flex-1">
              <p>{toast.message}</p>
              {toast.action && (
                <a
                  href={toast.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent-dim"
                >
                  {toast.action.label}
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="-mr-1 -mt-0.5 shrink-0 rounded p-1 text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LuX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
