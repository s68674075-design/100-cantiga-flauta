import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Brain, Check, ChevronDown, ChevronLeft, ChevronRight, Download, FileText, Heart, Lightbulb, LockKeyhole, Music2, Printer, ShieldCheck, Smartphone, Sparkles, Star, Users, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { asset, materialAssets, materialFullAssets } from '@/lib/material-assets';

const heroImage = asset('livroinfantilflautadoce');

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: '100 Cantigas Infantiles para Flauta Dulce — Cifras Kids' },
    { name: 'description', content: '100 cantigas infantiles con cifras melódicas, dibujos de las digitaciones y partituras a color. Conoce el material, los tres bonos y los planes Cifras Kids.' },
    { property: 'og:title', content: '100 Cantigas Infantiles para Flauta Dulce — Cifras Kids' },
    { property: 'og:description', content: 'Una forma visual y divertida de aprender flauta dulce. Material digital listo para imprimir, con 100 cantigas y tres bonos en el plan completo.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [
    { rel: 'preload', as: 'image', href: heroImage, fetchPriority: 'high' },
  ] }), component: Index,
});

const allNames = Object.keys(materialAssets);
const insidePages = allNames.filter(n => n.startsWith('pagina-dentro'));
const partiturasPages = allNames.filter(n => n.startsWith('partituras'));
const morePages = allNames.filter(n => n.startsWith('mais-paginas'));
const feedbackImages = allNames.filter(n => n.startsWith('feedback-'));
const bonuses = [
  { image: 'b1', title: 'Método Práctico de Iniciación', subtitle: 'Material visual y animado para la introducción', points: ['Presenta el instrumento, la postura, la respiración y la emisión del sonido', 'Trabaja notas medias, graves y agudas de forma progresiva', 'Incluye ejercicios, melodías, dinámica y articulación', 'Trae escalas, arpegios, tabla de posiciones y actividades creativas'], price: '7' },
  { image: 'b2', title: 'Guía Visual de Digitaciones', subtitle: 'Las posiciones de las notas en una consulta rápida', points: ['Muestra las posiciones de las notas en la flauta germana', 'Incluye también las digitaciones de la flauta barroca', 'Reúne notas naturales y alteradas en tablas visuales', 'Facilita la consulta de las posiciones durante cada práctica'], price: '7' },
  { image: 'b3', title: 'Lectura de Partituras', subtitle: '30 páginas para entender el lenguaje musical', points: ['Explica pentagrama, figuras, compases, silencios y signos de repetición', 'Presenta notas, duraciones, ligaduras y signos de alteración', 'Trabaja digitación, articulación, cifrado y compás compuesto', 'Incluye propuestas de creación e improvisación musical'], price: '7' },
];
const faqs = [
  ['¿Cómo voy a recibir el material?', 'Después de confirmar la compra, recibes el acceso a los archivos digitales por correo electrónico. El acceso es inmediato.'],
  ['¿Qué incluye el plan básico?', 'El plan básico incluye el PDF principal con 203 páginas y 100 cantigas infantiles para flauta dulce, cifras melódicas, dibujos de las digitaciones y partituras a color y en blanco y negro.'],
  ['¿Qué trae el plan completo?', 'Recibes todo el material principal y los 3 bonos: Método Práctico de Iniciación, Guía Visual de Digitaciones y Lectura de Partituras.'],
  ['¿El niño necesita saber leer partituras para usarlo?', 'No. El niño puede empezar por las cifras melódicas, que muestran los nombres de las notas, y por los dibujos de las digitaciones. Las partituras ayudan a desarrollar la lectura musical poco a poco.'],
  ['¿Sirve para quien nunca tocó la flauta dulce?', 'Sí. El material fue pensado para la iniciación. En el plan completo, el Método Práctico de Iniciación también presenta el instrumento, la postura, la respiración y los primeros ejercicios.'],
  ['¿Qué canciones forman parte del material?', 'Son 100 cantigas infantiles conocidas, como A Canoa Virou, Atirei o Pau no Gato, Brilha Brilha Estrelinha, Ciranda Cirandinha, Marcha Soldado, O Cravo e a Rosa y Sapo Cururu, entre otras.'],
  ['¿Necesito alguna aplicación para usarlo?', 'Solo necesitas un lector de PDF, disponible en celulares, tablets y computadoras. También puedes imprimir el material para practicar sin usar una pantalla.'],
  ['¿Este material sirve para casa y para clase?', 'Sí. Es un apoyo para familias, profesores, educadores e instructores que quieren presentar la flauta dulce de una forma visual y práctica.'],
  ['¿Para qué edad suele funcionar mejor el material?', 'El material está indicado para la fase de iniciación musical. El aprovechamiento varía según el interés del niño, su coordinación y el acompañamiento de un adulto o profesor.'],
  ['¿Puedo imprimir cuantas veces quiera?', 'Sí. Puedes imprimir las páginas según la necesidad de aprendizaje y práctica.'],
  ['¿Existe garantía?', 'Sí. Tienes 7 días después de la compra para probar el material. Si no es lo que necesitas, solo tienes que solicitar el reembolso dentro de ese plazo.'],
  ['¿El acceso es por tiempo limitado?', 'No. El acceso al material es de por vida. Después de descargar los PDFs, puedes consultar y practicar a tu ritmo.'],
];

function CTA({ children = 'QUIERO LAS 100 CANTIGAS' }: { children?: ReactNode }) {
  return <div className="cta-wrap"><Button className="purchase-cta" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}><ArrowRight />{children}</Button></div>;
}function CheckList({ items, negative = false }: { items: string[]; negative?: boolean }) {
  return <ul className={`check-list ${negative ? 'negative' : ''}`}>{items.map(item => <li key={item}>{negative ? <X /> : <Check />}<span>{item}</span></li>)}</ul>;
}
function Gallery({ names, onPreview, label, className = '', autoDirection = 0 }: { names: string[]; onPreview: (url: string) => void; label: string; className?: string; autoDirection?: 1 | -1 | 0 }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(1);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const items = names;
  const cardStep = (el: HTMLElement) => {
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return (first?.offsetWidth ?? el.scrollWidth / items.length) + gap;
  };
  const setWidth = (el: HTMLElement) => cardStep(el) * names.length;
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const st = cardStep(el);
    const sw = setWidth(el);
    if (autoDirection && sw > 0) {
      if (direction > 0 && el.scrollLeft + el.clientWidth >= sw - 4) { el.scrollTo({ left: 0, behavior: 'auto' }); return; }
      if (direction < 0 && el.scrollLeft <= 4) { el.scrollTo({ left: sw, behavior: 'auto' }); return; }
    }
    el.scrollBy({ left: direction * st, behavior: 'smooth' });
  };
  useEffect(() => {
    const el = root.current;
    if (!el || ready) return;
    if (typeof IntersectionObserver === 'undefined') { setReady(true); return; }
    const io = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { setReady(true); io.disconnect(); } }, { rootMargin: '900px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);
  useEffect(() => {
    if (!autoDirection) return;
    const el = track.current;
    if (el) el.scrollLeft = autoDirection > 0 ? 0 : setWidth(el);
  }, [autoDirection, ready, names.length]);
  useEffect(() => {
    if (!autoDirection || paused) return;
    const id = window.setInterval(() => move(autoDirection), 2400);
    return () => window.clearInterval(id);
  }, [autoDirection, paused, names.length]);
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const sw = setWidth(el);
    const local = sw > 0 ? (((el.scrollLeft % sw) + sw) % sw) : el.scrollLeft;
    setPosition(Math.min(names.length, Math.round(local / cardStep(el)) + 1));
  };
  return <div ref={root} className={`gallery ${className}`.trim()} aria-label={label} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
    <div className="gallery-track" ref={track} style={autoDirection ? { scrollSnapType: 'none' } : undefined} onScroll={onScroll}>
      {items.map((name, i) => <Button key={`${name}-${i}`} variant="ghost" className="preview-button" aria-label={`Ampliar ${label.toLowerCase()} ${(i % names.length) + 1}`} onClick={() => { const url = materialFullAssets[name] ?? materialAssets[name]; if (url) onPreview(url); }}><img loading={ready && i < 4 ? 'eager' : 'lazy'} fetchPriority={i < 4 ? 'high' : 'low'} decoding="async" src={ready ? materialAssets[name] : undefined} alt={`${label} — página ${(i % names.length) + 1}`} /></Button>)}
    </div>
    <div className="gallery-nav"><Button variant="outline" size="icon" aria-label={`Páginas anteriores: ${label}`} onClick={() => move(-1)}><ChevronLeft /></Button><span>{position} / {names.length}</span><Button variant="outline" size="icon" aria-label={`Páginas siguientes: ${label}`} onClick={() => move(1)}><ChevronRight /></Button></div>
  </div>;
}
function Timer() {
  const [seconds, setSeconds] = useState(540);
  useEffect(() => { const id = window.setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000); return () => window.clearInterval(id); }, []);
  return <div className="timer-band"><p>⏰ Aprovecha la condición especial disponible solo hoy</p><div className="timer-clock"><div className="timer-unit"><strong>{String(Math.floor(seconds / 60)).padStart(2, '0')}</strong><small>min</small></div><strong>:</strong><div className="timer-unit"><strong>{String(seconds % 60).padStart(2, '0')}</strong><small>seg</small></div></div></div>;
}
function Index() {
  const [preview, setPreview] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [today, setToday] = useState(() => new Intl.DateTimeFormat(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()));
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setToday(new Date().toLocaleDateString('es-ES')); }, []);
  useEffect(() => {
    if (!preview) return;
    const previous = document.activeElement;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; closeRef.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setPreview(null); if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus(); } };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = original; window.removeEventListener('keydown', key); if (previous instanceof HTMLElement) previous.focus(); };
  }, [preview]);
  return <main>
    <div className="sale-bar">⚡ OFERTA ESPECIAL DISPONIBLE SOLO HOY {today}</div>
    <section className="hero">
      <h1>100 <span>cantigas infantiles</span> para que los niños aprendan <span>flauta dulce</span> de forma <span>fácil y divertida</span> listas para imprimir</h1>
      <img className="hero-product" src={heroImage} width={577} height={433} alt="100 Cantigas Infantiles para Flauta Dulce: portada y páginas con digitaciones y notas a color" fetchPriority="high" decoding="async" />
      <div className="hero-details"><p className="intro-line"><Music2 size={22} /><span>Un material completo con canciones divertidas para que el niño toque sus primeras canciones en la flauta dulce en 15 minutos.</span></p>
        <CheckList items={['Cantigas divertidas con cifras melódicas simples, dibujos de las digitaciones y partituras a color', 'Para flauta dulce soprano germana y barroca con digitación completa', 'Material 100% digital y listo para imprimir']} />
        <CTA>ACCEDER AHORA</CTA>
      </div>
    </section>
    <Timer />
    <section className="page-section"><div className="section-inner">
      <h2 className="section-title">Mira algunas páginas <span>por dentro</span></h2>
      <Gallery names={insidePages} onPreview={setPreview} label="Cifras melódicas y digitaciones" autoDirection={1} />
      <p className="section-caption">Todo ya viene organizado para que <strong>descargues, imprimas y empieces a practicar con la flauta dulce</strong> sin perder tiempo armando actividades desde cero.</p>
      <div className="workflow"><div className="workflow-item"><Download />Descarga</div><ArrowRight className="text-muted-foreground" /><div className="workflow-item"><Printer />Imprime</div><ArrowRight className="text-muted-foreground" /><div className="workflow-item"><Music2 />¡Toca y aprende jugando!</div></div>
      <CTA />
      <Gallery names={partiturasPages} onPreview={setPreview} label="Partituras a color y en blanco y negro" autoDirection={-1} />
      <Gallery names={morePages} onPreview={setPreview} label="Más páginas del material" autoDirection={1} />
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">Un método simple para <span>aprender flauta dulce jugando</span></h2>
      <div className="method-grid">{[
        { icon: Lightbulb, title: '100 cantigas listas', text: 'Un repertorio infantil conocido para practicar flauta dulce con canciones que despiertan interés y ganas de repetir.' },
        { icon: Brain, title: 'Cifras melódicas simples', text: 'Los nombres de las notas aparecen en la secuencia de la melodía para facilitar la práctica de quien todavía está empezando.' },
        { icon: FileText, title: 'Digitaciones y notas a color', text: 'Los dibujos muestran qué agujeros tapar, mientras los colores ayudan a relacionar cada nota con la partitura.' },
        { icon: Smartphone, title: 'Acceso 100% digital', text: 'Recibe los PDFs, úsalos en el celular o tablet e imprime las páginas para practicar en casa o en las clases.' },
      ].map(item => <div className="method-item" key={item.title}><item.icon className="method-icon" aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></div>)}</div><CTA>QUIERO EL MATERIAL COMPLETO</CTA>
    </div></section>
    <section className="page-section"><div className="section-inner">
      <h2 className="section-title">¿Ya pensaste en ver al niño tocando en la flauta dulce <span>las canciones que ama?</span></h2>
      <p className="section-caption">Sin un comienzo confuso y lleno de teoría.</p>
      <img className="children-image" loading="lazy" decoding="async" width={577} height={433} src={asset('criancastocandoflautadoce')} alt="Niño tocando flauta dulce" />
      <div className="comparison"><CheckList negative items={['El niño pierde el interés cuando el aprendizaje empieza con demasiada teoría y poca práctica.', 'Las notas y las digitaciones parecen confusas cuando no hay un apoyo visual claro.', 'Quieres incentivar la música en casa o en la clase, pero no sabes qué secuencia seguir.', 'Las partituras tradicionales pueden asustar antes incluso de tocar una canción conocida.']} /><CheckList items={['Empezar por 100 cantigas que el niño ya conoce y tiene ganas de tocar.', 'Leer el nombre de las notas en las cifras melódicas sin depender solo de la partitura tradicional.', 'Visualizar qué agujeros tapar en cada nota con los dibujos de las digitaciones.', 'Asociar notas, colores y posiciones de los dedos de forma ligera y progresiva.']} /></div>
      <CTA>QUIERO FACILITAR ESTE APRENDIZAJE</CTA>
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">Este material es <span>ideal para ti que...</span></h2>
      <div className="audience-grid">{[
        { icon: Heart, title: 'Quieres presentar la flauta dulce de forma ligera', text: 'Ideal para familias y profesores que quieren empezar por canciones conocidas, sin exceso de teoría.' },
        { icon: BookOpen, title: 'El niño todavía no lee partituras o quiere aprender', text: 'Las cifras melódicas y los dibujos de las digitaciones facilitan el inicio, mientras estudia las partituras con el material.' },
        { icon: Music2, title: 'Buscas un repertorio que despierte interés', text: 'Las cantigas conocidas hacen la práctica más familiar, divertida y atractiva para quien está empezando.' },
        { icon: Users, title: 'Buscas un material práctico para casa o clase', text: 'Funciona como apoyo para familias, educadores e instructores que quieren enseñar flauta dulce con más claridad.' },
      ].map(item => <div className="audience-item" key={item.title}><item.icon /><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div><CTA>QUIERO EMPEZAR AHORA</CTA>
    </div></section>
    <section className="page-section"><div className="section-inner">
      <h2 className="section-title">Todo lo que <span>vas a recibir</span></h2><p className="section-caption"><Zap className="inline size-4 text-primary" /> Acceso inmediato</p>
      <img className="receive-image" loading="lazy" decoding="async" width={577} height={433} src={asset('livroinfantilflautadoce')} alt="Libro infantil de canciones para flauta dulce" />
      <div className="receive-list"><CheckList items={['PDF principal con 203 páginas y 100 cantigas infantiles para flauta dulce', 'Cifras melódicas con la secuencia de las notas de cada canción', 'Dibujos de las digitaciones para visualizar qué agujeros tapar', 'Partituras a color y versiones en blanco y negro para imprimir', 'Material digital organizado para consultar y practicar a tu ritmo']} /></div>
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">El plan completo entrega <span>todavía más</span></h2><p className="section-caption">También vas a recibir <strong>3 bonos</strong> para construir una base más completa en la flauta dulce.</p>
      <div className="bonus-grid">{bonuses.map((bonus, i) => <article className="bonus-card" key={bonus.title}><span className="bonus-label">Bono {i + 1}</span><img loading="lazy" decoding="async" src={asset(bonus.image)} alt={bonus.title} /><h3>{bonus.title}</h3><p className="subtitle">({bonus.subtitle})</p><CheckList items={bonus.points} /><p className="bonus-value">Valor: <s>US$ {bonus.price}</s> <ArrowRight className="inline size-4 mx-2" /><strong>Gratis</strong></p></article>)}</div>
    </div></section>
    <section className="page-section" id="planos"><div className="section-inner">
      <p className="offer-eyebrow">⏰ ÚLTIMA OPORTUNIDAD — LA OFERTA TERMINA HOY</p><h2 className="section-title">Ten el <span>plan completo</span></h2>
      <div className="plans-grid single-plan">
        <article className="plan-card featured"><div className="plan-heading">★ PLAN COMPLETO</div><div className="plan-body"><h3>100 Cantigas + 3 Bonos</h3><img loading="lazy" decoding="async" src={asset('pacotecompleto')} alt="Plan Completo con 100 cantigas y tres bonos" /><p className="text-primary text-xs font-black"><Sparkles className="inline size-4" /> MATERIAL COMPLETO</p><CheckList items={['PDF con 100 cantigas para flauta dulce soprano', 'Cifras melódicas con digitaciones, partituras a color + blanco y negro', ...bonuses.map((b, i) => `Bono ${i + 1} — ${b.title}`)]} /><p className="special-price-label">Precio especial de hoy</p><p className="old-price">de <s>US$ 27</s> por:</p><p className="plan-price"><small>US$</small>9<span className="price-cents">,00</span></p><p className="savings">¡Ahorras (67% de descuento)!</p><Button asChild className="purchase-cta"><a href="https://pay.hotmart.com/Y107972617C?checkoutMode=10" target="_blank" rel="noopener noreferrer"><ArrowRight />QUIERO EL PLAN COMPLETO</a></Button></div></article>
      </div>
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">Mira lo que están diciendo <span>sobre el material</span></h2><p className="section-caption">Comentarios de quienes buscaron una forma más visual y práctica de presentar la flauta dulce a los niños.</p><Gallery className="feedback-gallery" names={feedbackImages} onPreview={setPreview} label="Comentarios sobre el material infantil de flauta dulce" /><div className="review-score" aria-label="5 estrellas">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" />)}</div><p className="review-count">(1723 valoraciones)</p><CTA>QUIERO ASEGURAR LAS 100 CANTIGAS</CTA>
    </div></section>
    <section className="page-section"><div className="guarantee-layout"><img loading="lazy" decoding="async" width={1312} height={1199} src={asset('selo-garantia-7-dias')} alt="Sello dorado de garantía de 7 días" /><div><p className="text-primary font-extrabold"><ShieldCheck className="inline size-4" /> Riesgo cero para ti</p><h2 className="section-title">Garantía de <span>7 días</span><br /> satisfacción o reembolso</h2><p>No necesitas comprar a ciegas.</p><p>Después de la compra, tienes 7 días para acceder a los PDFs, elegir algunas cantigas, probar el material con la flauta dulce y ver si tiene sentido para tu rutina.</p><p>Si por cualquier motivo sientes que no era lo que necesitabas, solo tienes que solicitar el reembolso dentro de ese plazo.</p><p><strong>Sin burocracia. Sin dolores de cabeza. Sin complicaciones.</strong></p><p>El riesgo queda con nosotros para que explores las cifras, las digitaciones y las partituras con tranquilidad.</p></div></div></section>
    <section className="page-section soft-section"><div className="section-inner"><h2 className="section-title">Preguntas <span>frecuentes</span></h2><div className="faq-list">{faqs.map(([question, answer], i) => <div className="faq-item" key={question}><Button id={`faq-question-${i}`} aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} variant="ghost" className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{question}<ChevronDown /></Button>{openFaq === i && <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} className="faq-answer">{answer}</div>}</div>)}</div></div></section>
    <footer className="site-footer"><LockKeyhole className="inline size-3 mr-1" />Copyright © 2026 | Cifras Kids</footer>
    {preview && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Página del material ampliada" onClick={() => setPreview(null)}><Button ref={closeRef} variant="outline" size="icon" className="lightbox-close" aria-label="Cerrar vista previa" onClick={() => setPreview(null)}><X /></Button><img src={preview} alt="Página del material ampliada" onClick={e => e.stopPropagation()} /></div>}
  </main>;
}
