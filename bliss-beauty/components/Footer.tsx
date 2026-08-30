export function Footer() {
  return (
    <footer className="bg-ink px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl text-center">
        <h4 className="mb-2 font-display text-xl text-bone">Bliss Beauty &amp; Care</h4>
        <p className="mb-4 text-xs text-bone/50">
          Beleza e bem-estar ao seu alcance
        </p>
        <div className="mb-4 flex justify-center gap-4">
          <a href="#" className="text-xs text-bone/60 transition hover:text-bone">
            Termos
          </a>
          <a href="#" className="text-xs text-bone/60 transition hover:text-bone">
            Privacidade
          </a>
          <a href="#" className="text-xs text-bone/60 transition hover:text-bone">
            Sobre
          </a>
        </div>
        <p className="text-[10px] text-bone/30">
          © 2026 Bliss Beauty &amp; Care. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
