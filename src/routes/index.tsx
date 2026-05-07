import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Microscope, Home, Smartphone, Stethoscope, Calendar, FlaskConical,
  ClipboardCheck, Phone, Mail, MapPin, Clock, Instagram, Facebook,
  MessageCircle, Star, ArrowRight, Activity, Dna, Shield, Heart, TestTube,
} from "lucide-react";
import logo from "@/assets/lovitta-logo.png";
import heroImg from "@/assets/hero-lab.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lóvitta Laboratório — Análises Clínicas com Precisão" },
      { name: "description", content: "Exames laboratoriais com tecnologia de ponta, coleta domiciliar e resultados online 24h em um atendimento humanizado." },
      { property: "og:title", content: "Lóvitta Laboratório de Análises Clínicas" },
      { property: "og:description", content: "Precisão que cuida. Resultados em que você confia." },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Exames", href: "#exames" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logo} alt="Lóvitta" className="h-12 w-12 rounded-full bg-background object-contain" />
          <span className="font-serif text-2xl font-bold text-primary hidden sm:block">Lóvitta</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contato" className="hidden md:inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-medium hover:opacity-90 transition shadow-soft">
            <Calendar className="w-4 h-4" /> Agendar Exame
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-primary" />
              <span className="block w-6 h-0.5 bg-primary" />
              <span className="block w-6 h-0.5 bg-primary" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container-x py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-foreground/80 hover:text-accent">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Laboratório Lóvitta" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>
      <div className="container-x relative z-10 py-20">
        <div className="max-w-2xl fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground border border-accent/30 backdrop-blur text-sm font-medium mb-6 text-white">
            Laboratório de Análises Clínicas
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.05]">
            Precisão que cuida. <br />
            <span className="text-accent">Resultados</span> em que você confia.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-xl">
            Exames laboratoriais com tecnologia de ponta e atendimento humanizado, pensados para o seu bem-estar.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contato" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-md font-semibold hover:opacity-90 transition shadow-soft">
              <Calendar className="w-5 h-5" /> Agendar Exame
            </a>
            <a href="#exames" className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 rounded-md font-semibold hover:bg-white/10 transition backdrop-blur">
              Ver Exames <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 text-white/90">
            {[
              { icon: Smartphone, label: "Resultados Online" },
              { icon: Home, label: "Coleta em Domicílio" },
              { icon: ClipboardCheck, label: "Laudos Digitais" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center backdrop-blur">
                  <Icon className="w-4 h-4" />
                </div>
                {label}
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
    { icon: Microscope, title: "Tecnologia de Ponta", desc: "Equipamentos modernos garantindo análises precisas e confiáveis." },
    { icon: Home, title: "Coleta Domiciliar", desc: "Conforto e segurança da sua casa, com profissionais qualificados." },
    { icon: Smartphone, title: "Resultados Online 24h", desc: "Acesse seus laudos de forma rápida e segura, a qualquer hora." },
    { icon: Stethoscope, title: "Equipe Especializada", desc: "Biomédicos e técnicos comprometidos com seu cuidado." },
  ];
  return (
    <section id="sobre" className="py-24 bg-secondary">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-accent font-medium uppercase tracking-wider text-sm">Diferenciais</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mt-3">
            Por que escolher a Lóvitta?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Mais que exames, oferecemos cuidado em cada detalhe da sua jornada.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card p-8 rounded-xl shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300 border border-border">
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <Icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">{title}</h3>
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
    { icon: TestTube, title: "Hemograma e Bioquímica", desc: "Análises completas do sangue e perfil metabólico." },
    { icon: Activity, title: "Hormônios", desc: "Avaliação hormonal completa para todas as fases da vida." },
    { icon: FlaskConical, title: "Microbiologia", desc: "Identificação de microrganismos e antibiogramas." },
    { icon: Shield, title: "Imunologia", desc: "Diagnóstico de doenças autoimunes e infecciosas." },
    { icon: Dna, title: "Genética Molecular", desc: "Testes genéticos com tecnologia de última geração." },
    { icon: Heart, title: "Check-up Completo", desc: "Avaliação preventiva personalizada para sua saúde." },
  ];
  return (
    <section id="exames" className="py-24 bg-background">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-accent font-medium uppercase tracking-wider text-sm">Serviços</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mt-3">Nossos Exames</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Um portfólio completo de análises clínicas para diagnósticos precisos.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exames.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-8 rounded-xl border border-border bg-card hover:border-accent/40 hover:shadow-soft transition-all">
              <Icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-bold text-primary mb-2">{title}</h3>
              <p className="text-muted-foreground mb-4">{desc}</p>
              <a href="#contato" className="inline-flex items-center gap-1 text-accent font-medium text-sm hover:gap-2 transition-all">
                Saiba mais <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const steps = [
    { icon: Calendar, title: "Agende seu exame", desc: "Marque online ou por telefone, no horário que preferir." },
    { icon: FlaskConical, title: "Realize a coleta", desc: "No laboratório ou no conforto da sua casa." },
    { icon: Smartphone, title: "Acesse seus resultados", desc: "Online, com segurança, 24 horas por dia." },
  ];
  return (
    <section className="py-24 bg-secondary">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-accent font-medium uppercase tracking-wider text-sm">Processo</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mt-3">Como funciona?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 relative">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-soft mb-5 relative z-10">
                <s.icon className="w-9 h-9 text-accent" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-2">{s.title}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resultados() {
  return (
    <section id="resultados" className="py-24 relative overflow-hidden" style={{ background: "var(--gradient-dark)" }}>
      <div className="container-x relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Acesse seus resultados de forma rápida e segura
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg">
            Disponível 24 horas por dia, 7 dias por semana.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="CPF ou código do pedido"
              className="flex-1 px-5 py-4 rounded-md bg-background/95 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent text-accent-foreground px-7 py-4 rounded-md font-semibold hover:opacity-90 transition shadow-soft">
              Acessar Resultado
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const items = [
    { name: "Mariana Silva", exam: "Check-up Completo", text: "Atendimento impecável e resultados muito rápidos. A equipe é extremamente atenciosa." },
    { name: "Carlos Mendes", exam: "Hemograma", text: "A coleta em domicílio foi um diferencial enorme. Profissionais super qualificados." },
    { name: "Ana Beatriz", exam: "Hormônios", text: "Confio plenamente na Lóvitta. Precisão nos exames e atendimento humanizado de verdade." },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-accent font-medium uppercase tracking-wider text-sm">Depoimentos</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mt-3">
            O que nossos pacientes dizem
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.name} className="bg-secondary p-8 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/85 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-primary">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.exam}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Convenios() {
  const planos = ["Unimed", "Bradesco Saúde", "SulAmérica", "Amil", "Hapvida", "NotreDame", "Porto Seguro", "Allianz"];
  return (
    <section className="py-20 bg-secondary border-y border-border">
      <div className="container-x">
        <div className="text-center mb-12">
          <span className="text-accent font-medium uppercase tracking-wider text-sm">Parcerias</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-3">Convênios Aceitos</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {planos.map((p) => (
            <div key={p} className="bg-card border border-border rounded-lg h-20 flex items-center justify-center text-primary/60 font-semibold text-sm hover:text-accent transition-colors">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-accent font-medium uppercase tracking-wider text-sm">Contato</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mt-3">Fale Conosco</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            {[
              { icon: MapPin, title: "Endereço", text: "Rua Exemplo, 123 — Centro, Sua Cidade" },
              { icon: Phone, title: "Telefone", text: "(00) 0000-0000" },
              { icon: Mail, title: "E-mail", text: "contato@lovittalaboratorio.com.br" },
              { icon: Clock, title: "Horário", text: "Seg a Sex: 7h às 18h | Sáb: 7h às 12h" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-lg bg-secondary border border-border">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-primary">{title}</p>
                  <p className="text-muted-foreground text-sm mt-1">{text}</p>
                </div>
              </div>
            ))}
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-lg font-semibold text-white shadow-soft hover:opacity-90 transition"
              style={{ backgroundColor: "var(--whatsapp)" }}
            >
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
            </a>
          </div>
          <div className="rounded-xl overflow-hidden border border-border min-h-[400px] bg-secondary">
            <iframe
              title="Localização Lóvitta"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0!2d-46.6333!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzcnNTkuOSJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
              width="100%" height="100%" style={{ border: 0, minHeight: 400 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-x">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Lóvitta" className="h-12 w-12 rounded-full bg-white object-contain" />
              <span className="font-serif text-2xl font-bold">Lóvitta</span>
            </div>
            <p className="text-primary-foreground/70 max-w-md">
              Laboratório de Análises Clínicas. Precisão que cuida, resultados em que você confia.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/lovittalaboratorio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/5500000000000" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent transition flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="hover:text-accent transition">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-primary-foreground/70 text-sm">
              <li>Seg–Sex: 7h às 18h</li>
              <li>Sáb: 7h às 12h</li>
              <li>(00) 0000-0000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-primary-foreground/60">
          <p>© 2025 Lóvitta Laboratório. Todos os direitos reservados.</p>
          <a href="#" className="hover:text-accent transition">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <>
      <a
        href="https://wa.me/5500000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-soft hover:scale-110 transition"
        style={{ backgroundColor: "var(--whatsapp)" }}
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      <a
        href="#contato"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-accent text-accent-foreground py-4 text-center font-semibold shadow-soft"
      >
        Agendar Exame
      </a>
    </>
  );
}

function Index() {
  return (
    <div className="bg-background">
      <Navbar />
      <main className="pb-16 md:pb-0">
        <Hero />
        <Diferenciais />
        <Exames />
        <ComoFunciona />
        <Resultados />
        <Depoimentos />
        <Convenios />
        <Contato />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
