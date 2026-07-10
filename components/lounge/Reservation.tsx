'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, User, Users, Calendar, Clock, Send } from 'lucide-react';
import FadeIn from './FadeIn';

const inputClass =
  'w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#C8A96B]/50 focus:outline-none text-[#F5F5F5] placeholder-[#F5F5F5]/25 px-4 py-3.5 text-sm rounded-sm transition-all duration-300 focus:bg-[#1E1E1E]';

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
    time: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', guests: '', date: '', time: '', message: '' });
  };

  const whatsappMsg = encodeURIComponent(
    `Bonjour L'Olivium Lounge ! Je souhaite réserver une table.\nNom: ${form.name || '...'}\nTéléphone: ${form.phone || '...'}\nNombre: ${form.guests || '...'}\nDate: ${form.date || '...'}\nHeure: ${form.time || '...'}\n${form.message ? 'Message: ' + form.message : ''}`
  );

  return (
    <section id="reservation" className="relative py-32 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B0B0B 0%, #0D0D0D 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px divider-gold opacity-30" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[#556B2F]/5 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] rounded-full bg-[#C8A96B]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
            <span className="text-[#C8A96B] text-xs tracking-[0.5em] uppercase">Votre soirée</span>
            <div className="w-16 h-[1px] bg-[#C8A96B]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F5] leading-tight">
            <span className="text-gold-gradient italic">Réservez</span> votre table
          </h2>
          <p className="text-[#F5F5F5]/50 text-base mt-5 max-w-lg mx-auto font-light">
            Assurez votre place pour une soirée inoubliable chez L'Olivium.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Info panel */}
          <FadeIn delay={0.1} className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-sm">
              <h3 className="font-display text-xl text-[#F5F5F5] font-semibold mb-6">Informations</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#556B2F]/20 flex items-center justify-center shrink-0">
                    <Clock size={17} className="text-[#C8A96B]" />
                  </div>
                  <div>
                    <p className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest mb-0.5">Horaires</p>
                    <p className="text-[#F5F5F5]/80 text-sm">Lun – Dim : 11h00 – 02h00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#556B2F]/20 flex items-center justify-center shrink-0">
                    <Phone size={17} className="text-[#C8A96B]" />
                  </div>
                  <div>
                    <p className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest mb-0.5">Téléphone</p>
                    <a href="tel:+33616461770" className="text-[#F5F5F5]/80 text-sm hover:text-[#C8A96B] transition-colors">
                      +33 6 16 46 17 70
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#556B2F]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Users size={17} className="text-[#C8A96B]" />
                  </div>
                  <div>
                    <p className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest mb-0.5">Groupes & Privatisation</p>
                    <p className="text-[#F5F5F5]/80 text-sm">Nous contacter pour les événements privés (10+ personnes)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/33616461770?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white text-sm tracking-wider uppercase font-semibold rounded-sm hover:bg-[#1ebe5a] transition-colors duration-300 shadow-[0_0_30px_rgba(37,211,102,0.2)]"
            >
              <MessageCircle size={18} />
              Réserver sur WhatsApp
            </a>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.2} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass p-8 rounded-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest">Nom complet</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/20" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest">Téléphone</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/20" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+33 6 00 00 00 00"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest">Personnes</label>
                  <div className="relative">
                    <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/20" />
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      required
                      className={`${inputClass} pl-9 appearance-none cursor-pointer`}
                    >
                      <option value="">Nb.</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest">Date</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/20 z-10" />
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className={`${inputClass} pl-9`}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest">Heure</label>
                  <div className="relative">
                    <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5F5F5]/20 z-10" />
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                      className={`${inputClass} pl-9`}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#F5F5F5]/40 text-xs uppercase tracking-widest">Message (optionnel)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Occasion spéciale, demandes particulières..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="group relative w-full py-4 bg-[#C8A96B] text-[#0B0B0B] text-sm tracking-[0.3em] uppercase font-semibold overflow-hidden rounded-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,169,107,0.35)] flex items-center justify-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Send size={16} />
                  Envoyer ma réservation
                </span>
                <div className="absolute inset-0 bg-[#D4BA82] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </button>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-3 text-[#C8A96B] text-sm tracking-wide"
                >
                  Votre demande a bien été envoyée. Nous vous recontacterons rapidement.
                </motion.div>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
