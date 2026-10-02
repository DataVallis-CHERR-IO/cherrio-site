import { ButtonLink } from "@/components/ds";

export default function NotFound() {
  return (
    <section className="s-section">
      <div className="s-wrap s-stack-lg" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <span className="ch-label s-mono" style={{ fontWeight: 500 }}>
          404
        </span>
        <h1 className="s-display-1">Not on the record</h1>
        <p className="s-lead">This page doesn&apos;t exist. Check the address, or start from the home page.</p>
        <div>
          <ButtonLink href="/" variant="primary" size="lg">
            Go to the home page
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
