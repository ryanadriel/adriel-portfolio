import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { 
  Mail, Linkedin, Github, FileText, Send, Copy, 
  Check, ArrowRight, ShieldCheck, RefreshCw, Terminal 
} from "lucide-react";

export function ContactForm() {
  const { language, t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Oportunidade Profissional / Contratação",
    message: ""
  });

  const emailAddress = "adrielryan.tj@hotmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert(language === "pt" ? "Por favor, preencha todos os campos obrigatórios." : "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(language === "pt" ? "VALIDANDO INPUTS..." : "VALIDATING INPUTS...");

    // Simulate API sequence steps for deep backend larping / immersion
    setTimeout(() => {
      setSubmitStep("RESOLVING_DNS_STMT");
      setTimeout(() => {
        setSubmitStep("CONNECTING_SMTP_TLS");
        setTimeout(() => {
          setSubmitStep("DISPATCH_API_SUCCESS");
          setTimeout(() => {
            setIsSubmitting(false);
            setFormSubmitted(true);
            // Reset form
            setFormData({
              name: "",
              email: "",
              subject: "Oportunidade Profissional / Contratação",
              message: ""
            });
          }, 600);
        }, 800);
      }, 700);
    }, 600);
  };

  const handleActionClick = (title: string, action: string) => {
    alert(`Ação de contato iniciada para: ${title} (${action})`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full relative">
      {/* Ambient background blur lights */}
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary-blue/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Left Column: Quick Contacts (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-5">
          <span className="text-[10px] font-mono tracking-widest text-primary-blue font-bold uppercase">
            {t("contact_direct")}
          </span>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight leading-tight">
            {t("contact_form_title")}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed font-normal">
            {t("contact_form_desc")}
          </p>
        </div>

        {/* Dynamic Clipboard Card */}
        <div className="glass-panel rounded-xl p-5 border border-border-dark bg-surface-dark/30 flex flex-col gap-3 relative overflow-hidden group">
          <div className="flex flex-col gap-1 leading-none">
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider">
              {language === "pt" ? "E-mail Profissional" : "Professional Email"}
            </span>
            <span className="text-sm font-semibold text-text-primary group-hover:text-primary-blue transition-colors duration-200">
              {emailAddress}
            </span>
          </div>

          <button
            onClick={handleCopyEmail}
            className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer border transition-all duration-300 ${
              copiedEmail
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-bg-dark border-border-dark hover:border-primary-blue/30 text-text-secondary hover:text-text-primary"
            }`}
            id="copy-email-btn"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{language === "pt" ? "COPIADO!" : "COPIED!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{language === "pt" ? "COPIAR E-MAIL" : "COPY EMAIL"}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Connection Channels Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-3">
          <a
            href="https://www.linkedin.com/in/adriel-ryan/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 border border-border-dark bg-surface-dark/20 hover:border-primary-blue/30 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer"
            id="contact-linkedin"
          >
            <Linkedin className="w-4 h-4 text-text-muted group-hover:text-primary-blue transition-colors duration-200" />
            <span className="text-[9px] font-mono font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-200">LINKEDIN</span>
          </a>

          <a
            href="https://github.com/ryanadriel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 border border-border-dark bg-surface-dark/20 hover:border-primary-blue/30 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer"
            id="contact-github"
          >
            <Github className="w-4 h-4 text-text-muted group-hover:text-primary-blue transition-colors duration-200" />
            <span className="text-[9px] font-mono font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-200">GITHUB</span>
          </a>

          <button
            onClick={() => alert(language === "pt" ? "Currículo pronto! Sinta-se à vontade para imprimir este portfólio digital como PDF corporativo ou fazer download usando o botão flutuante no canto inferior direito." : "Resume ready! Feel free to print this digital portfolio as a corporate PDF or download it using the floating button in the bottom right corner.")}
            className="p-3.5 border border-border-dark bg-surface-dark/20 hover:border-primary-blue/30 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer"
            id="contact-resume"
          >
            <FileText className="w-4 h-4 text-text-muted group-hover:text-primary-blue transition-colors duration-200" />
            <span className="text-[9px] font-mono font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-200">RESUME</span>
          </button>
        </div>
      </div>

      {/* Right Column: Interaction Form Panel (7 Cols) */}
      <div className="lg:col-span-7">
        <div className="glass-panel rounded-2xl p-4 xs:p-6 lg:p-8 border border-border-dark bg-surface-dark/10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 relative"
              >
                {/* Form Input: Nome */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="text-[10px] font-mono text-text-secondary font-bold uppercase tracking-wider">
                    {t("label_name")} <span className="text-primary-blue">*</span>
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("placeholder_name")}
                    className="w-full bg-black/40 border border-border-dark focus:border-primary-blue/60 hover:border-border-dark rounded-lg p-3 text-xs text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted"
                  />
                </div>

                {/* Form Input: E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="text-[10px] font-mono text-text-secondary font-bold uppercase tracking-wider">
                    {t("label_email")} <span className="text-primary-blue">*</span>
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("placeholder_email")}
                    className="w-full bg-black/40 border border-border-dark focus:border-primary-blue/60 hover:border-border-dark rounded-lg p-3 text-xs text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted"
                  />
                </div>

                {/* Form Input: Mensagem */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-[10px] font-mono text-text-secondary font-bold uppercase tracking-wider">
                    {t("label_message")} <span className="text-primary-blue">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows={4}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("placeholder_message")}
                    className="w-full bg-black/40 border border-border-dark focus:border-primary-blue/60 hover:border-border-dark rounded-lg p-3 text-xs text-text-primary outline-none resize-none transition-all duration-300 placeholder:text-text-muted"
                  />
                </div>

                {/* Submit button with visual simulation status loader */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-lg text-xs font-mono font-bold tracking-wider relative overflow-hidden group border cursor-pointer transition-all duration-500 ${
                      isSubmitting
                        ? "bg-primary-blue/15 border-primary-blue text-primary-blue shadow-lg"
                        : "bg-white text-black hover:bg-transparent hover:text-white border-white"
                    }`}
                    id="contact-submit-btn"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>{submitStep}</span>
                        </>
                      ) : (
                        <>
                          <span>{t("btn_send")}</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Simulating Logs Terminal Frame only visible during active submit */}
                <AnimatePresence>
                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-black border border-border-dark rounded-lg mt-2 font-mono text-[9px] text-text-muted flex flex-col gap-1 leading-none"
                    >
                      <div className="flex items-center gap-1.5 border-b border-border-dark/60 pb-1.5 mb-1 text-[8px] font-bold">
                        <Terminal className="w-3 h-3 text-primary-blue" />
                        <span>MOCK CONSOLE DISPATCH TERMINAL</span>
                      </div>
                      <div>[OK] HTTP_RESOLVER: Resolved destination IP (SMTP API GATEWAY)</div>
                      <div>[SENDING] Sending secure SMTP handshake payload over TLS 1.3...</div>
                      <div>[QUEUED] Event logged into active RabbitMQ transactions schema...</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              <motion.div
                key="success-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/5 animate-pulse">
                  <ShieldCheck className="w-7 h-7" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-text-primary tracking-tight">
                    {language === "pt" ? "Mensagem Enviada com Sucesso!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
                    {language === "pt" 
                      ? "A requisição foi roteada e enfileirada no canal de recebimento de Adriel. Entrarei em contato em breve."
                      : "The request has been routed and queued in Adriel's inbox. I will get in touch shortly."}
                  </p>
                </div>

                <div className="p-3.5 bg-black/50 border border-border-dark rounded-xl font-mono text-[10px] text-text-secondary w-full max-w-xs text-left leading-normal">
                  <div className="text-[8px] text-primary-blue font-bold tracking-wider mb-1 uppercase">
                    {language === "pt" ? "Log de Confirmação:" : "Confirmation Log:"}
                  </div>
                  <div>STATUS: 201 CREATED</div>
                  <div>ID: {`tx_${Math.random().toString(36).substring(2, 8).toUpperCase()}`}</div>
                  <div>DEST: adrielryan10.tj@gmail.com</div>
                </div>

                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2.5 rounded-lg border border-border-dark hover:border-primary-blue/30 text-xs font-mono font-bold text-text-secondary hover:text-text-primary bg-bg-dark transition-colors duration-300 cursor-pointer"
                  id="reset-form-btn"
                >
                  {language === "pt" ? "ENVIAR NOVA MENSAGEM" : "SEND NEW MESSAGE"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Social Connection Channels Grid (Mobile Only) */}
      <div className="grid lg:hidden grid-cols-3 gap-3 w-full">
        <a
          href="https://www.linkedin.com/in/adriel-ryan/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 border border-border-dark bg-surface-dark/20 hover:border-primary-blue/30 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer text-center"
          id="contact-linkedin-mobile"
        >
          <Linkedin className="w-4 h-4 mx-auto text-text-muted group-hover:text-primary-blue transition-colors duration-200" />
          <span className="text-[9px] font-mono font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-200 mt-1">LINKEDIN</span>
        </a>

        <a
          href="https://github.com/ryanadriel"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 border border-border-dark bg-surface-dark/20 hover:border-primary-blue/30 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer text-center"
          id="contact-github-mobile"
        >
          <Github className="w-4 h-4 mx-auto text-text-muted group-hover:text-primary-blue transition-colors duration-200" />
          <span className="text-[9px] font-mono font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-200 mt-1">GITHUB</span>
        </a>

        <button
          onClick={() => alert(language === "pt" ? "Currículo pronto! Sinta-se à vontade para imprimir este portfólio digital como PDF corporativo ou fazer download usando o botão flutuante no canto inferior direito." : "Resume ready! Feel free to print this digital portfolio as a corporate PDF or download it using the floating button in the bottom right corner.")}
          className="p-3.5 border border-border-dark bg-surface-dark/20 hover:border-primary-blue/30 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 group cursor-pointer text-center"
          id="contact-resume-mobile"
        >
          <FileText className="w-4 h-4 mx-auto text-text-muted group-hover:text-primary-blue transition-colors duration-200" />
          <span className="text-[9px] font-mono font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-200 mt-1">RESUME</span>
        </button>
      </div>
    </div>
  );
}
