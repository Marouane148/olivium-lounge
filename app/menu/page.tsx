/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import MenuPhoto from '@/components/lounge/MenuPhoto';
import { SITE_URL } from '@/lib/business';
import {
  featuredItems,
  hasExampleItems,
  menuInfo,
  menuJsonLd,
  menuSections,
  visibleItems,
  type MenuGroup,
  type MenuItem,
  type MenuSection,
} from '@/lib/menu';
import MenuTabs from './MenuTabs';
import './menu.css';

const title = "La Carte | L'Olivium Lounge, Le Pré-Saint-Gervais";
const description =
  "La carte de L'Olivium Lounge au Pré-Saint-Gervais : plats, burgers, pâtes, paninis, crêpes, boissons et chichas. Ouvert tous les jours, 11h – 2h.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/menu` },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/menu`,
    siteName: "L'Olivium Lounge",
    title,
    description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
};

function Badge({ item }: { item: MenuItem }) {
  return item.badge ? <span className="mn-badge">{item.badge}</span> : null;
}

function ItemCard({ item }: { item: MenuItem }) {
  return (
    <li className="mn-card mn-reveal">
      <MenuPhoto src={item.image} />
      <div className="mn-card-body">
        <Badge item={item} />
        <h3 className="mn-name">{item.name}</h3>
        {item.description && <p className="mn-desc">{item.description}</p>}
        <div className="mn-card-foot">
          <span className="mn-price">{item.price}</span>
        </div>
      </div>
    </li>
  );
}

function GridCard({ item }: { item: MenuItem }) {
  return (
    <li className="mn-gcard mn-reveal">
      <MenuPhoto src={item.image} />
      <div className="mn-gbody">
        <Badge item={item} />
        <h3 className="mn-name">{item.name}</h3>
        {item.description && <p className="mn-desc">{item.description}</p>}
        <div className="mn-card-foot">
          <span className="mn-price">{item.price}</span>
        </div>
      </div>
    </li>
  );
}

function Rows({ items }: { items: MenuItem[] }) {
  return (
    <ul className="mn-rows mn-reveal">
      {items.map((i) => (
        <li key={i.name} className="mn-row">
          <span className="mn-name">{i.name}</span>
          <span className="mn-row-price">{i.price}</span>
        </li>
      ))}
    </ul>
  );
}

function Families({ items }: { items: MenuItem[] }) {
  return (
    <ul className="mn-rows mn-reveal">
      {items.map((i) => (
        <li key={i.name} className="mn-fam">
          <div className="mn-row">
            <span className="mn-name">{i.name}</span>
            <span className="mn-row-price">{i.price}</span>
          </div>
          {i.options && i.options.length > 0 && (
            <ul className="mn-flavors mn-flavors-sm">
              {i.options.map((o) => (
                <li key={o} className="mn-pill mn-pill-sm">{o}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function Group({ group, title }: { group: MenuGroup; title?: string }) {
  const items = visibleItems(group);
  return (
    <div>
      {title && <h3 className="mn-sub mn-reveal">{title}</h3>}
      {group.display === 'cards' && (
        <ul className="mn-cards">
          {items.map((i) => (
            <ItemCard key={i.name} item={i} />
          ))}
        </ul>
      )}
      {group.display === 'grid' && (
        <ul className="mn-grid">
          {items.map((i) => (
            <GridCard key={i.name} item={i} />
          ))}
        </ul>
      )}
      {group.display === 'rows' && <Rows items={items} />}
      {group.display === 'families' && <Families items={items} />}
    </div>
  );
}

function Section({ section }: { section: MenuSection }) {
  const groups = section.groups.filter((g) => visibleItems(g).length > 0);
  if (groups.length === 0) return null;
  const chichas = section.layout === 'chichas';

  return (
    <section id={section.id} className="mn-section" aria-labelledby={`${section.id}-t`}>
      <h2 id={`${section.id}-t`} className="mn-title mn-reveal">{section.label}</h2>

      {chichas && (
        <div className="mn-banner mn-reveal">
          <img src={menuInfo.chichaBanner} alt="Ambiance du lounge" width={738} height={493} loading="lazy" decoding="async" />
          <span>L’art de la chicha</span>
        </div>
      )}

      {groups.map((g, idx) => (
        <Group key={g.title ?? idx} group={g} title={groups.length > 1 ? g.title : undefined} />
      ))}

      {chichas && section.flavors && (
        <>
          <h3 className="mn-sub mn-reveal">Nos goûts</h3>
          <ul className="mn-flavors mn-reveal">
            {section.flavors.map((f) => (
              <li key={f} className="mn-pill">{f}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default function MenuPage() {
  const featured = featuredItems();
  const tabs = menuSections.map((s) => ({ id: s.id, label: s.label }));

  return (
    <div className="mn">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd(SITE_URL)) }}
      />

      <header className="mn-hero">
        <img className="mn-hero-bg" src={menuInfo.heroImage} alt="" width={738} height={696} fetchPriority="high" decoding="async" />
        <div className="mn-hero-content">
          <img className="mn-logo" src="/brand/logo-512.png" alt="L'Olivium Lounge" width={84} height={84} />
          <h1>
            La <em>Carte</em>
          </h1>
          <p className="mn-hero-sub">{menuInfo.subtitle}</p>
        </div>
      </header>

      <MenuTabs tabs={tabs} />

      <main className="mn-main mn-wrap">
        {hasExampleItems() && <p className="mn-sample">Carte d’exemple</p>}
        {featured.length > 0 && (
          <section className="mn-section" aria-labelledby="inc-t">
            <h2 id="inc-t" className="mn-title mn-reveal">Les incontournables</h2>
            <ul className="mn-feat">
              {featured.map((i) => (
                <li key={i.name} className="mn-feat-card">
                  {i.badge && <span className="mn-badge">{i.badge}</span>}
                  <MenuPhoto src={i.imageLarge ?? i.image} className="mn-feat-ph" />
                  <div className="mn-feat-info">
                    <p className="mn-feat-name">{i.fullName ?? i.name}</p>
                    <span className="mn-price">{i.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {menuSections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </main>

      <footer className="mn-foot mn-wrap">
        <a className="mn-btn mn-btn-solid" href={menuInfo.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Réserver sur WhatsApp
        </a>
        <a className="mn-btn mn-btn-line" href={menuInfo.reviewUrl} target="_blank" rel="noopener noreferrer">
          Laisser un avis Google
        </a>
        <p className="mn-addr">
          {menuInfo.address} ·{' '}
          <a href={menuInfo.phoneHref}>{menuInfo.phone}</a>
        </p>
        {menuInfo.photoDisclaimer && <p className="mn-disclaimer">{menuInfo.photoDisclaimer}</p>}
        <a className="mn-site" href="/">Voir le site</a>
      </footer>
    </div>
  );
}
