"use client";

import { IconClose, Logo } from "./icons";

interface MobileMenuProps {
  onClose: () => void;
  onShopClick: () => void;
  onCartClick: () => void;
}

export function MobileMenu({ onClose, onShopClick, onCartClick }: MobileMenuProps) {
  const items = [
    { label: "Início", action: onClose },
    { label: "Loja", action: onShopClick },
    { label: "Favoritos", action: onClose },
    { label: "Carrinho", action: onCartClick },
    { label: "Contacto", action: onClose },
  ];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 top-0 flex w-[280px] flex-col bg-bone shadow-2xl animate-slideInLeft">
        <div className="border-b border-line p-6">
          <div className="flex items-center justify-between">
            <Logo className="h-7 w-7 text-emerald" />
            <button
              onClick={onClose}
              aria-label="Fechar menu"
              className="rounded-xl p-2 transition hover:bg-bone-dim"
            >
              <IconClose size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full rounded-xl p-3 text-left font-sans text-sm font-medium text-ink transition hover:bg-bone-dim"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-line p-4">
          <p className="text-center text-xs text-ink-soft/70">
            Bliss Beauty &amp; Care © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
