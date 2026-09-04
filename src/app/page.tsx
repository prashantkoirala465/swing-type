import { SwingTypeCard } from "@/components/swing-type/swing-type-card";

const BUILT_FROM = [
  "One line of geometry drives everything: a letter's rotation is its distance from centre divided by a constant, so the row only ever translates and every other quantity — squash, spacing, cull — falls out of that single relation.",
  "The swing amplitude is derived from the letter count, not declared, so it lands an end letter dead centre at both extremes of the pendulum. A hardcoded amplitude would strand a shorter word squashed and alone for a third of the loop.",
  "A pure sine lingers on the two end letters and whips past the middle of the word. The phase gets warped by a detent term so it crawls wherever a letter is square-on, derived from the pitch so it stays correct if the pitch ever moves.",
  "Letters change by turning, not by swapping while hidden — at this pitch, the slots on either side of centre are never both culled at the same moment, so a hidden turnover is provably impossible. The changing letter is driven to edge-on and back, and its glyph swaps at the midpoint.",
];

const CONSTRAINTS = [
  "The row is drawn far to near — sorted by absolute angle before drawing — so an edge-on sliver never paints over the square-on letter next to it.",
  "The lean is an in-plane rotation, not a shear: a letter's width axis and height axis tilt in opposite senses, the way a real object turning in space would, not the way flat 2D squashing does.",
  "Each letter is rasterised at two weights and cross-faded as it turns, because the squash takes the stem down with it — a bold letter would thin to a hairline exactly where it's moving fastest without a heavier cut arriving underneath it.",
  "Reduced motion draws one still frame at full face on the word's first letter, not the loop's resting phase — the resting phase happens to centre a bare vertical stem and says nothing about what the piece is.",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
        <span className="text-sm font-bold tracking-tight">Swing Type</span>
        <a
          href="https://github.com/prashantkoirala465/swing-type"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            A word that never fully assembles.
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            Enormous coloured letters swing back and forth past a fixed
            window, each one turning on its own vertical axis as it travels —
            squashed to a thin sliver at the sides, full face in the middle.
            Only two or three are ever readable at once, and every few
            seconds the word quietly becomes a different one.
          </p>
        </div>

        <SwingTypeCard />
      </main>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              How it&apos;s built
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {BUILT_FROM.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              Constraints
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {CONSTRAINTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span>© {year} Prashant Koirala</span>
          <a
            href="https://github.com/prashantkoirala465/swing-type"
            className="transition-colors hover:text-foreground"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
