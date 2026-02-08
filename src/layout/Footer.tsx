export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border/70 py-8">
      <div className="page-shell">
        <div className="panel-surface flex flex-col items-center justify-between gap-3 px-6 py-5 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold text-brand-gradient">책 한권만 읽은 자의 용감한 독후감</p>
            <p className="mt-1 text-xs text-muted-foreground">Read, reflect, and leave one honest line.</p>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 jingjing2222. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
