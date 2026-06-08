export interface QA {
  q: string;
  a: string;
}

export default function Faq({ items }: { items: QA[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return (
    <section className="mt-12">
      <h2 className="font-mincho text-xl font-bold text-ink rule-shu">よくある質問</h2>
      <dl className="mt-5 divide-y divide-line border-t border-line">
        {items.map((it, i) => (
          <div key={i} className="py-4">
            <dt className="font-medium text-ink">{it.q}</dt>
            <dd className="mt-1.5 text-sm text-ink-soft leading-relaxed">{it.a}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
