"use client";

import { useEffect } from "react";
import { useCart } from "@/context/cart-context";

export function Toast() {
  const { toastMessage, dismissToast } = useCart();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(dismissToast, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage, dismissToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-bone shadow-2xl animate-fadeIn">
      {toastMessage}
    </div>
  );
}
