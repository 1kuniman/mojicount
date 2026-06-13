"use client";
import { useEffect, useState } from "react";

interface Toast { id: number; msg: string; }

export default function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let n = 0;
    const handler = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail || "完了しました";
      const id = ++n;
      setToasts((t) => [...t, { id, msg }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 1800);
    };
    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="rounded-full bg-panel-strong text-on-strong text-sm font-medium px-4 py-2 shadow-lg animate-[toastIn_.2s_ease]"
        >
          {t.msg}
        </div>
      ))}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

export function showToast(msg: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("toast", { detail: msg }));
  }
}
