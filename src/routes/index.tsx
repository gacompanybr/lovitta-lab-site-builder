import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Microscope, Home, Smartphone, Calendar, FlaskConical,
  Phone, Mail, MapPin, Clock, Instagram,
  MessageCircle, Star, ArrowRight, ShieldCheck, Sparkles, Timer, HeartHandshake, Plus, Minus, Menu, X,
} from "lucide-react";
import logo from "@/assets/lovitta-logo.png";
import heroImg from "@/assets/hero-lab.jpg";
import lorenImg from "@/assets/loren-biomedica.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lóvitta Laboratório — Análises Clínicas com Precisão" },
      { name: "description", content: "Exames laboratoriais com tecnologia de ponta, coleta domiciliar e resultados online em um atendimento humanizado." },
      { property: "og:title", content: "Lóvitta Laboratório de Análises Clínicas" },
      { property: "og:description", content: "Precisão nos resultados. Cuidado em cada detalhe." },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Exames", href: "#exames" },
  { label: "Resultados", href: "#resultados" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const WHATSAPP_URL = "https://wa.me/5500000000000";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-b border-border/70 shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-20 md:h-22">
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="Lóvitta" className="h-12 w-12 md:h-14 md:w-14 object-contain" />
          <span className="font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight">Lóvitta</span>
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contato" className="hidden md:inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition">
            Agendar exame <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2 text-primary" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="container-x py-4 flex flex-col">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-foreground/80 border-b border-border/60 last:border-0">
                {l.label}
              </a>
            ))}
            <a href="#contato" onClick={() => setOpen(false)} className="mt-4 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-medium">
              Agendar exame
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-[92vh] md:min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Laboratório Lóvitta" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>
      <div className="container-x relative z-10 py-16 md:py-24">
        <div className="max-w-2xl fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/15 backdrop-blur text-xs font-medium tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Análises Clínicas
          </span>
          <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl font-semibold text-white tracking-tight">
            Precisão nos resultados.<br />
            <span className="italic font-normal text-white/85">Cuidado em cada detalhe.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/75 max-w-xl leading-relaxed">
            Tecnologia de ponta e atendimento humanizado para cuidar da sua saúde com a confiança e a clareza que você merece.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href="#contato" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-7 py-3.5 rounded-full font-medium hover:bg-white/95 transition shadow-lg shadow-black/10">
              <Calendar className="w-4 h-4" /> Agendar exame
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/10 transition backdrop-blur-sm">
              <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-md">
            {[
              { v: "+15", l: "Anos de experiência" },
              { v: "24h", l: "Resultados online" },
              { v: "100%", l: "Coleta humanizada" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-2xl md:text-3xl text-white font-semibold">{s.v}</div>
                <div className="text-[11px] sm:text-xs text-white/65 mt-1 leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  const items = [
    { icon: Microscope, title: "Tecnologia avançada", desc: "Equipamentos modernos calibrados para análises precisas e confiáveis." },
    { icon: Timer, title: "Resultados rápidos", desc: "Laudos disponíveis online em até 24 horas, com clareza e segurança." },
    { icon: Home, title: "Coleta domiciliar", desc: "Conforto da sua casa com profissionais qualificados e atenciosos." },
    { icon: HeartHandshake, title: "Atendimento humano", desc: "Cada paciente é único — escuta atenta e cuidado em cada etapa." },
    { icon: ShieldCheck, title: "Precisão laboratorial", desc: "Protocolos rigorosos de controle de qualidade em todas as análises." },
    { icon: Smartphone, title: "Acesso digital", desc: "Resultados na palma da sua mão, 24 horas por dia, com total privacidade." },
  ];
  return (
    <section id="diferenciais" className="py-24 md:py-32 bg-background">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Diferenciais</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Por que a Lóvitta é diferente.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Mais que exames, oferecemos uma experiência cuidadosa, transparente e construída em torno da sua confiança.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background p-8 md:p-10 hover:bg-secondary/60 transition-colors duration-300">
              <Icon className="w-6 h-6 text-accent mb-5" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Exames() {
  const exames = [
    "Hemograma e Bioquímica",
    "Hormônios",
    "Microbiologia",
    "Imunologia",
    "Genética Molecular",
    "Check-up Completo",
    "Toxicológicos",
    "Cardiológicos",
  ];
  return (
    <section id="exames" className="py-24 md:py-32 bg-secondary">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Exames</span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-semibold text-primary tracking-tight">
              Um portfólio completo<br />de análises clínicas.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Atendemos as principais especialidades médicas com protocolos rigorosos e laudos assinados por profissionais qualificados.
            </p>
            <a href="#contato" className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Consulte exames específicos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {exames.map((title, i) => (
              <a key={title} href="#contato" className="group flex items-center justify-between py-6 hover:px-2 transition-all">
                <div className="flex items-center gap-5">
                  <span className="font-serif text-sm text-muted-foreground tabular-nums">0{i + 1}</span>
                  <span className="font-serif text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">{title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const steps = [
    { icon: Calendar, title: "Agende", desc: "Online ou pelo WhatsApp, no horário que melhor se encaixa na sua rotina." },
    { icon: FlaskConical, title: "Realize a coleta", desc: "Em nossa unidade ou no conforto da sua casa, com toda a segurança." },
    { icon: Smartphone, title: "Acesse o laudo", desc: "Disponível online em até 24 horas, com privacidade e clareza." },
  ];
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Processo</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Simples do início ao fim.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-px md:bg-border md:border md:border-border md:rounded-2xl md:overflow-hidden">
          {steps.map((s, i) => (
            <div key={s.title} className="md:bg-background md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-sm text-accent tabular-nums">0{i + 1}</span>
                <span className="h-px flex-1 bg-border" />
                <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-primary mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resultados() {
  return (
    <section id="resultados" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Resultados</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl font-semibold tracking-tight">
            Seu laudo, quando<br />e onde precisar.
          </h2>
          <p className="mt-5 text-primary-foreground/70 text-lg leading-relaxed">
            Acesse seus resultados online com total privacidade, 24 horas por dia.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="text"
              placeholder="CPF ou código do pedido"
              className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition"
            />
            <button className="bg-white text-primary px-7 py-4 rounded-full font-medium hover:bg-white/95 transition">
              Acessar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const items = [
    { name: "Mariana Silva", exam: "Check-up Completo", text: "Atendimento impecável e resultados muito rápidos. A equipe é extremamente atenciosa do início ao fim." },
    { name: "Carlos Mendes", exam: "Hemograma", text: "A coleta em domicílio foi um diferencial enorme. Profissionais super qualificados e gentis." },
    { name: "Ana Beatriz", exam: "Hormônios", text: "Confio plenamente na Lóvitta. Precisão nos exames e atendimento humanizado de verdade." },
  ];
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Pacientes</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Histórias de quem confia.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure key={t.name} className="bg-background p-8 rounded-2xl border border-border flex flex-col">
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="font-serif text-lg text-primary/90 leading-relaxed flex-1">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border">
                <p className="font-medium text-primary text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.exam}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    { q: "Preciso de jejum para os exames?", a: "Depende do exame solicitado. No agendamento, orientamos exatamente o preparo necessário, incluindo tempo de jejum e cuidados específicos." },
    { q: "Em quanto tempo recebo os resultados?", a: "A maioria dos exames fica disponível online em até 24 horas. Análises mais complexas podem ter prazos diferentes, sempre informados no momento da coleta." },
    { q: "Como funciona a coleta domiciliar?", a: "Nossa equipe vai até você no horário agendado, com todos os equipamentos e protocolos de biossegurança. Disponível para diversas regiões — consulte cobertura." },
    { q: "Quais são os horários de atendimento?", a: "Segunda a sexta das 7h às 18h e sábados das 7h às 12h. Para coleta domiciliar, horários estendidos sob agendamento." },
    { q: "Como acesso meus resultados online?", a: "Basta informar seu CPF ou o código do pedido na seção de resultados deste site. Acesso seguro, 24 horas por dia." },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Dúvidas</span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-semibold text-primary tracking-tight">
              Perguntas<br />frequentes.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Não encontrou o que procurava? Fale conosco no WhatsApp.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              <MessageCircle className="w-4 h-4" /> Tirar dúvida
            </a>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-lg md:text-xl text-primary">{f.q}</span>
                    <span className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden text-muted-foreground leading-relaxed pr-12">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" className="py-24 md:py-32 bg-secondary">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Contato</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Vamos cuidar de você.
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-3">
            {[
              { icon: MapPin, title: "Endereço", text: "Rua Exemplo, 123 — Centro, Sua Cidade" },
              { icon: Phone, title: "Telefone", text: "(00) 0000-0000" },
              { icon: Mail, title: "E-mail", text: "contato@lovittalaboratorio.com.br" },
              { icon: Clock, title: "Horário", text: "Seg–Sex: 7h às 18h · Sáb: 7h às 12h" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl bg-background border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">{title}</p>
                  <p className="text-muted-foreground text-sm mt-0.5">{text}</p>
                </div>
              </div>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-medium text-white hover:opacity-90 transition mt-2"
              style={{ backgroundColor: "var(--whatsapp)" }}
            >
              <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border min-h-[420px] bg-background">
            <iframe
              title="Localização Lóvitta"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0!2d-46.6333!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzcnNTkuOSJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
              width="100%" height="100%" style={{ border: 0, minHeight: 420 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="container-x">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <img src={logo} alt="Lóvitta" className="h-12 w-12 object-contain" />
              <span className="font-serif text-2xl font-semibold">Lóvitta</span>
            </div>
            <p className="text-primary-foreground/60 max-w-md leading-relaxed">
              Laboratório de Análises Clínicas. Precisão nos resultados, cuidado em cada detalhe.
            </p>
            <div className="flex gap-2 mt-6">
              <a href="https://www.instagram.com/lovittalaboratorio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/15 hover:bg-white/10 transition flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={WHATSAPP_URL} aria-label="WhatsApp" className="w-10 h-10 rounded-full border border-white/15 hover:bg-white/10 transition flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-primary-foreground/50 mb-4 font-sans font-medium">Navegação</h4>
            <ul className="space-y-3 text-primary-foreground/75 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="hover:text-white transition">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-primary-foreground/50 mb-4 font-sans font-medium">Atendimento</h4>
            <ul className="space-y-3 text-primary-foreground/75 text-sm">
              <li>Seg–Sex: 7h às 18h</li>
              <li>Sáb: 7h às 12h</li>
              <li>(00) 0000-0000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-primary-foreground/50">
          <p>© 2025 Lóvitta Laboratório. Todos os direitos reservados.</p>
          <a href="#" className="hover:text-white transition">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-black/15 hover:scale-105 active:scale-95 transition-transform"
      style={{ backgroundColor: "var(--whatsapp)" }}
    >
      <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
    </a>
  );
}

function Index() {
  return (
    <div className="bg-background">
      <Navbar />
      <main>
        <Hero />
        <Diferenciais />
        <Exames />
        <ComoFunciona />
        <Resultados />
        <Depoimentos />
        <Faq />
        <Contato />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
