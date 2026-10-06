import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, Download, Heart, LockKeyhole, Music2, Printer, ShieldCheck, Sparkles, Star, Users, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { asset, materialAssets } from '@/lib/material-assets';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: '100 Cantigas Infantis para Flauta Doce — Cifras Kids' },
    { name: 'description', content: '100 cantigas infantis com cifras melódicas, desenhos dos dedilhados e partituras coloridas. Conheça o material, os seis bônus e os planos Cifras Kids.' },
    { property: 'og:title', content: '100 Cantigas Infantis para Flauta Doce — Cifras Kids' },
    { property: 'og:description', content: 'Um jeito visual e divertido de aprender flauta doce. Material digital pronto para impressão, com 100 cantigas e seis bônus no plano completo.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Index,
});

const allNames = Object.keys(materialAssets);
const melodicPages = allNames.slice(3, 17);
const scorePages = allNames.slice(17, 31);
const morePages = allNames.filter(n => n.startsWith('100_Cantigas'));
const bonuses = [
  { image: 'b1', title: 'Método Prático de Iniciação', subtitle: 'Material visual e animado para introdução', points: ['Apresenta o instrumento, a postura, a respiração e a emissão do som', 'Trabalha notas médias, graves e agudas de forma progressiva', 'Inclui exercícios, melodias, dinâmica e articulação', 'Traz escalas, arpejos, tabela de posições e atividades criativas'], price: '27' },
  { image: 'b2', title: 'Guia Visual de Dedilhados', subtitle: 'As posições das notas em uma consulta rápida', points: ['Mostra as posições das notas na flauta germânica', 'Inclui também os dedilhados da flauta barroca', 'Reúne notas naturais e alteradas em tabelas visuais', 'Facilita a consulta das posições durante cada prática'], price: '27' },
  { image: 'b3', title: 'Leitura de Partituras', subtitle: '30 páginas para entender a linguagem musical', points: ['Explica pauta, figuras, compassos, pausas e sinais de repetição', 'Apresenta notas, durações, ligaduras e sinais de alteração', 'Trabalha digitação, articulação, cifragem e compasso composto', 'Inclui propostas de criação e improvisação musical'], price: '27' },
  { image: 'b4', title: 'Guia de Digitação Sonora', subtitle: 'Um apoio para visualizar e escutar cada nota', points: ['Acesso por QR Code a uma tabela sonora de dedilhados', 'Permite ouvir a sonoridade das notas antes de praticar', 'Relaciona o nome da nota, o som e a posição dos dedos', 'Apoio para conferir as notas durante o estudo'], price: '27' },
  { image: 'b5', title: 'Escalas e Acordes', subtitle: '32 páginas para ampliar a prática na flauta doce', points: ['Apresenta notas naturais e alteradas da segunda oitava', 'Trabalha as escalas de Dó maior e cromática', 'Exercícios melódicos ascendentes e descendentes', 'Desenvolve extensão, agilidade e segurança nas notas'], price: '27' },
  { image: 'b6', title: 'Certificado de Conclusão', subtitle: 'Uma forma especial de celebrar cada conquista', points: ['Certificado de Musicalização Infantil com Flauta Doce Soprano', 'Espaço para nome do aluno e data ou período', 'Campo para assinatura da instrutora ou responsável', 'Um incentivo visual para reconhecer a dedicação da criança'], price: '20' },
];
const faqs = [
  ['Como vou receber o material?', 'Após a confirmação da compra, você recebe o acesso aos arquivos digitais Acesso imediato por e-mail. O acesso é imediato.'],
  ['O plano básico inclui o quê?', 'O plano básico inclui o PDF principal com 203 páginas e 100 cantigas infantis para flauta doce, cifras melódicas, desenhos dos dedilhados e partituras coloridas e em preto e branco.'],
  ['O que tem no plano completo?', 'Você recebe todo o material principal e os 6 bônus: Método Prático de Iniciação, Guia Visual de Dedilhados, Leitura de Partituras, Guia de Digitação Sonora, Escalas e Acordes e Certificado de Conclusão.'],
  ['A criança precisa saber partitura para usar?', 'Não. A criança pode começar pelas cifras melódicas, que mostram os nomes das notas, e pelos desenhos dos dedilhados. As partituras ajudam a desenvolver a leitura musical aos poucos.'],
  ['Serve para quem nunca tocou flauta doce?', 'Sim. O material foi pensado para a iniciação. No plano completo, o Método Prático de Iniciação também apresenta o instrumento, a postura, a respiração e os primeiros exercícios.'],
  ['Quais músicas fazem parte do material?', 'São 100 cantigas infantis conhecidas, como A Canoa Virou, Atirei o Pau no Gato, Brilha Brilha Estrelinha, Ciranda Cirandinha, Marcha Soldado, O Cravo e a Rosa e Sapo Cururu, entre outras.'],
  ['Preciso de algum aplicativo para usar?', 'Você só precisa de um leitor de PDF, disponível em celulares, tablets e computadores. Também pode imprimir o material para praticar sem usar uma tela.'],
  ['Esse material serve para casa e para aula?', 'Sim. É um apoio para famílias, professores, educadores e instrutores que querem apresentar a flauta doce de uma forma visual e prática.'],
  ['Para qual idade o material costuma funcionar melhor?', 'O material é indicado para a fase de iniciação musical. O aproveitamento varia conforme o interesse da criança, sua coordenação e o acompanhamento de um adulto ou professor.'],
  ['Posso imprimir quantas vezes quiser?', 'Sim. Você pode imprimir as páginas conforme a necessidade de aprendizado e prática.'],
  ['Existe garantia?', 'Sim. Você tem 15 dias após a compra para testar o material. Se não for o que precisa, basta solicitar o reembolso dentro desse prazo.'],
  ['O acesso é por tempo limitado?', 'Não. O acesso ao material é vitalício. Depois de baixar os PDFs, você pode consultar e praticar no seu ritmo.'],
];

function CTA({ children = 'QUERO AS 100 CANTIGAS' }: { children?: ReactNode }) {
  return <div className="cta-wrap"><Button className="purchase-cta" onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}><ArrowRight />{children}</Button></div>;
}function CheckList({ items, negative = false }: { items: string[]; negative?: boolean }) {
  return <ul className={`check-list ${negative ? 'negative' : ''}`}>{items.map(item => <li key={item}>{negative ? <X /> : <Check />}<span>{item}</span></li>)}</ul>;
}
function Gallery({ names, onPreview, label }: { names: string[]; onPreview: (url: string) => void; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(1);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * track.current.clientWidth, behavior: 'smooth' });
  return <div className="gallery" aria-label={label}>
    <div className="gallery-track" ref={track} onScroll={() => { const el = track.current; if (el) setPosition(Math.min(names.length, Math.round(el.scrollLeft / (el.scrollWidth / names.length)) + 1)); }}>
      {names.map((name, i) => <Button key={name} variant="ghost" className="preview-button" aria-label={`Ampliar ${label.toLowerCase()} ${i + 1}`} onClick={() => { const url = materialAssets[name]; if (url) onPreview(url); }}><img loading="lazy" src={materialAssets[name]} alt={`${label} — página ${i + 1}`} /></Button>)}
    </div>
    <div className="gallery-nav"><Button variant="outline" size="icon" aria-label={`Páginas anteriores: ${label}`} onClick={() => move(-1)}><ChevronLeft /></Button><span>{position} / {names.length}</span><Button variant="outline" size="icon" aria-label={`Próximas páginas: ${label}`} onClick={() => move(1)}><ChevronRight /></Button></div>
  </div>;
}
function Timer() {
  const [seconds, setSeconds] = useState(540);
  useEffect(() => { const id = window.setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000); return () => window.clearInterval(id); }, []);
  return <div className="timer-band"><p>⏰ Aproveite a condição especial disponível somente hoje</p><div className="timer-clock"><div className="timer-unit"><strong>{String(Math.floor(seconds / 60)).padStart(2, '0')}</strong><small>min</small></div><strong>:</strong><div className="timer-unit"><strong>{String(seconds % 60).padStart(2, '0')}</strong><small>seg</small></div></div></div>;
}
function Index() {
  const [preview, setPreview] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [today, setToday] = useState(() => new Intl.DateTimeFormat(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()));
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setToday(new Date().toLocaleDateString('pt-BR')); }, []);
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
    <div className="sale-bar">⚡ OFERTA ESPECIAL DISPONÍVEL APENAS HOJE {today}</div>
    <section className="hero">
      <h1>100 <span>cantigas infantis</span> para crianças aprender <span>flauta doce</span> de forma <span>fácil e divertida</span> prontas para impressão</h1>
      <img className="hero-product" src={asset('heromockup')} alt="100 Cantigas Infantis para Flauta Doce: capa e páginas com dedilhados e notas coloridas" fetchPriority="high" />
      <div className="hero-details"><p className="intro-line"><Music2 size={22} /><span>Um material completo com canções divertidas para a criança tocar suas primeiras músicas na flauta doce em 15 minutos.</span></p>
        <CheckList items={['Cantigas divertidas com cifras melódicas simples, desenhos dos dedilhados e partituras coloridas', 'Para flauta doce soprano germânica e barroca com digitação completa', 'Material 100% digital e pronto para impressão']} />
        <CTA>ACESSAR AGORA</CTA>
      </div>
    </section>
    <Timer />
    <section className="page-section"><div className="section-inner">
      <h2 className="section-title">Veja algumas páginas <span>por dentro</span></h2>
      <Gallery names={melodicPages} onPreview={setPreview} label="Cifras melódicas e dedilhados" />
      <p className="section-caption">Tudo já vem organizado para você <strong>baixar, imprimir e começar a praticar na flauta doce</strong> sem perder tempo montando atividades do zero.</p>
      <div className="workflow"><div className="workflow-item"><Download />Baixa</div><ArrowRight className="text-muted-foreground" /><div className="workflow-item"><Printer />Imprime</div><ArrowRight className="text-muted-foreground" /><div className="workflow-item"><Music2 />Toca e aprende brincando!</div></div>
      <CTA />
      <Gallery names={scorePages} onPreview={setPreview} label="Partituras coloridas e em preto e branco" />
      <Gallery names={morePages} onPreview={setPreview} label="Mais páginas do material" />
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">Um método simples para <span>aprender flauta doce brincando</span></h2>
      <div className="method-grid">{[
        ['lampadaicon', '100 cantigas prontas', 'Um repertório infantil conhecido para praticar flauta doce com músicas que despertam interesse e vontade de repetir.'],
        ['cerebroicon', 'Cifras melódicas simples', 'Os nomes das notas aparecem na sequência da melodia para facilitar a prática de quem ainda está começando.'],
        ['papelicon', 'Dedilhados e notas coloridas', 'Os desenhos mostram quais furos cobrir, enquanto as cores ajudam a relacionar cada nota à partitura.'],
        ['phoneicon', 'Acesso 100% digital', 'Receba os PDFs, use no celular ou tablet e imprima as páginas para praticar em casa ou nas aulas.'],
      ].map(([image, title, text]) => <div className="method-item" key={title}><img loading="lazy" src={asset(image ?? '')} alt="" /><h3>{title}</h3><p>{text}</p></div>)}</div><CTA>QUERO O MATERIAL COMPLETO</CTA>
    </div></section>
    <section className="page-section"><div className="section-inner">
      <h2 className="section-title">Já pensou em ver a criança tocando na flauta doce <span>as cantigas que ela ama?</span></h2>
      <p className="section-caption">Sem um começo confuso e cheio de teoria.</p>
      <img className="children-image" loading="lazy" src={asset('coupleimg')} alt="Crianças aprendendo flauta doce com um material visual" />
      <div className="comparison"><CheckList negative items={['A criança perde o interesse quando o aprendizado começa com teoria demais e pouca prática.', 'As notas e os dedilhados parecem confusos quando não há um apoio visual claro.', 'Você quer incentivar a música em casa ou na aula, mas não sabe qual sequência seguir.', 'Partituras tradicionais podem assustar antes mesmo de tocar uma música conhecida.']} /><CheckList items={['Começar por 100 cantigas que a criança já conhece e tem vontade de tocar.', 'Ler o nome das notas nas cifras melódicas sem depender só da partitura tradicional.', 'Visualizar quais furos cobrir em cada nota com os desenhos dos dedilhados.', 'Associar notas, cores e posições dos dedos de forma leve e progressiva.']} /></div>
      <CTA>QUERO FACILITAR ESSE APRENDIZADO</CTA>
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">Esse material é <span>ideal para você que...</span></h2>
      <div className="audience-grid">{[
        { icon: Heart, title: 'Quer apresentar a flauta doce de forma leve', text: 'Ideal para famílias e professores que querem começar por músicas conhecidas, sem excesso de teoria.' },
        { icon: BookOpen, title: 'A criança ainda não lê partitura ou quer aprender', text: 'As cifras melódicas e os desenhos dos dedilhados facilitam o início, enquanto estuda as partituras com o material.' },
        { icon: Music2, title: 'Busca um repertório que desperte interesse', text: 'Cantigas conhecidas tornam a prática mais familiar, divertida e convidativa para quem está começando.' },
        { icon: Users, title: 'Busca um material prático para casa ou aula', text: 'Funciona como apoio para famílias, educadores e instrutores que querem ensinar flauta doce com mais clareza.' },
      ].map(item => <div className="audience-item" key={item.title}><item.icon /><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div><CTA>QUERO COMEÇAR AGORA</CTA>
    </div></section>
    <section className="page-section"><div className="section-inner">
      <h2 className="section-title">Tudo o que você <span>vai receber</span></h2><p className="section-caption"><Zap className="inline size-4 text-primary" /> Acesso imediato</p>
      <img className="receive-image" loading="lazy" src={asset('heromockup')} alt="Material principal com 100 cantigas infantis para flauta doce" />
      <div className="receive-list"><CheckList items={['PDF principal com 203 páginas e 100 cantigas infantis para flauta doce', 'Cifras melódicas com a sequência das notas de cada música', 'Desenhos dos dedilhados para visualizar quais furos cobrir', 'Partituras coloridas e versões em preto e branco para imprimir', 'Material digital organizado para consultar e praticar no seu ritmo']} /></div>
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">O plano completo entrega <span>ainda mais</span></h2><p className="section-caption">Você também vai receber <strong>6 bônus</strong> para construir uma base mais completa na flauta doce.</p>
      <div className="bonus-grid">{bonuses.map((bonus, i) => <article className="bonus-card" key={bonus.title}><span className="bonus-label">Bônus {i + 1}</span><img loading="lazy" src={asset(bonus.image)} alt={bonus.title} /><h3>{bonus.title}</h3><p className="subtitle">({bonus.subtitle})</p><CheckList items={bonus.points} /><p className="bonus-value">Valor: <s>R${bonus.price}</s> <ArrowRight className="inline size-4 mx-2" /><strong>Grátis</strong></p></article>)}</div>
    </div></section>
    <section className="page-section" id="planos"><div className="section-inner">
      <p className="offer-eyebrow">⏰ ÚLTIMA CHANCE — OFERTA TERMINA HOJE</p><h2 className="section-title">Tenha o <span>plano completo</span></h2>
      <div className="plans-grid single-plan">
        <article className="plan-card featured"><div className="plan-heading">★ PLANO COMPLETO</div><div className="plan-body"><h3>100 Cantigas + 6 Bônus</h3><img loading="lazy" src={asset('pacotecompleto')} alt="Plano Completo com 100 cantigas e seis bônus" /><p className="text-primary text-xs font-black"><Sparkles className="inline size-4" /> MATERIAL COMPLETO</p><CheckList items={['PDF com 100 cantigas para flauta doce soprano', 'Cifras melódicas com dedilhados, partituras coloridas + preto e branco', ...bonuses.map((b, i) => `Bônus ${i + 1} — ${b.title}`)]} /><p className="old-price">de <s>R$138,90</s> por:</p><p className="plan-price"><small>R$</small>27,90</p><p className="installments">ou 4x de R$7,85 no cartão</p><p className="savings">🔥 Você economiza R$111,00</p><Button asChild className="purchase-cta"><a href="https://pay.wiapy.com/1DKkkGNq63V4" target="_blank" rel="noopener noreferrer"><ArrowRight />QUERO O PLANO COMPLETO</a></Button></div></article>
      </div><img className="trust-image" loading="lazy" src={asset('trust')} alt="Compra segura" />
    </div></section>
    <section className="page-section soft-section"><div className="section-inner">
      <h2 className="section-title">Veja o que estão dizendo <span>sobre o material</span></h2><p className="section-caption">Feedbacks de quem buscou um jeito mais visual e prático de apresentar a flauta doce às crianças.</p><img className="feedback-image" loading="lazy" src={asset('feedb1')} alt="Feedback sobre o material infantil de flauta doce" /><div className="review-score" aria-label="5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" />)}</div><p className="review-count">(1723 avaliações)</p><CTA>QUERO GARANTIR AS 100 CANTIGAS</CTA>
    </div></section>
    <section className="page-section"><div className="guarantee-layout"><img loading="lazy" src={asset('garantia15')} alt="Selo de garantia de 15 dias" /><div><p className="text-primary font-extrabold"><ShieldCheck className="inline size-4" /> Risco zero para você</p><h2 className="section-title">Garantia de <span>15 dias</span><br /> satisfação ou reembolso</h2><p>Você não precisa comprar no escuro.</p><p>Após a compra, você tem 15 dias para acessar os PDFs, escolher algumas cantigas, testar o material na flauta doce e ver se ele faz sentido para a sua rotina.</p><p>Se por qualquer motivo você sentir que não era o que precisava, basta solicitar o reembolso dentro desse prazo.</p><p><strong>Sem burocracia. Sem dor de cabeça. Sem complicação.</strong></p><p>O risco fica com a gente para você explorar as cifras, os dedilhados e as partituras com tranquilidade.</p></div></div></section>
    <section className="page-section soft-section"><div className="section-inner"><h2 className="section-title">Perguntas <span>frequentes</span></h2><div className="faq-list">{faqs.map(([question, answer], i) => <div className="faq-item" key={question}><Button id={`faq-question-${i}`} aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} variant="ghost" className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{question}<ChevronDown /></Button>{openFaq === i && <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} className="faq-answer">{answer}</div>}</div>)}</div></div></section>
    <footer className="site-footer"><LockKeyhole className="inline size-3 mr-1" />Copyright © 2026 | Cifras Kids</footer>
    {preview && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Página do material ampliada" onClick={() => setPreview(null)}><Button ref={closeRef} variant="outline" size="icon" className="lightbox-close" aria-label="Fechar prévia" onClick={() => setPreview(null)}><X /></Button><img src={preview} alt="Página do material ampliada" onClick={e => e.stopPropagation()} /></div>}
  </main>;
}
