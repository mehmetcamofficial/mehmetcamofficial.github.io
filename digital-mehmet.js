/* Digital Mehmet V1 — progressive enhancement layer
   Keeps the portfolio usable if speech APIs or the future GLB avatar are unavailable. */
(() => {
  "use strict";

  const STATES = Object.freeze({
    IDLE: "idle",
    LISTENING: "listening",
    THINKING: "thinking",
    SPEAKING: "speaking",
    PAUSED: "paused"
  });

  class DigitalMehmet {
    constructor(root) {
      this.root = root;
      this.state = STATES.IDLE;
      this.muted = false;
      this.voiceEnabled = false;
      this.lastText = "";
      this.utterance = null;
      this.status = root.querySelector("[data-dm-status]");
      this.play = root.querySelector("[data-dm-play]");
      this.pause = root.querySelector("[data-dm-pause]");
      this.mute = root.querySelector("[data-dm-mute]");
      this.ask = root.querySelector("[data-dm-ask]");
      this.avatar = root.querySelector("[data-dm-avatar]");
      this.bind();
      this.setState(STATES.IDLE);
    }

    bind() {
      const enableVoice = () => {
        this.voiceEnabled = true;
        this.muted = false;
        this.root.dataset.voiceEnabled = "true";
        this.root.dataset.muted = "false";
        if (this.mute) this.mute.setAttribute("aria-pressed", "false");
        this.speak(this.lastText || this.intro());
      };

      this.play?.addEventListener("click", enableVoice);
      this.avatar?.addEventListener("click", enableVoice);
      this.pause?.addEventListener("click", () => this.togglePause());
      this.mute?.addEventListener("click", () => this.toggleMute());
      this.ask?.addEventListener("click", () => document.dispatchEvent(new CustomEvent("digital-mehmet:open-chat")));

      document.addEventListener("portfolio-ai:thinking", () => this.setState(STATES.THINKING));
      document.addEventListener("portfolio-ai:answer", (event) => {
        const text = String(event.detail?.text || "").trim();
        if (!text) return;
        this.lastText = text;
        if (this.voiceEnabled && !this.muted) this.speak(text);
      });

      window.addEventListener("beforeunload", () => window.speechSynthesis?.cancel());
    }

    intro() {
      return document.documentElement.lang === "tr"
        ? "Merhaba, ben Mehmet. Projelerim, araştırmalarım ve çalışma deneyimim hakkında bana soru sorabilirsiniz."
        : "Hi, I am Mehmet. Ask me about my projects, research, or professional experience.";
    }

    setState(next) {
      this.state = next;
      this.root.dataset.state = next;
      const labels = {
        idle: "Hazır",
        listening: "Dinliyor",
        thinking: "Düşünüyor",
        speaking: "Konuşuyor",
        paused: "Duraklatıldı"
      };
      if (this.status) this.status.textContent = labels[next] || next;
      this.root.dispatchEvent(new CustomEvent("digital-mehmet:state", { detail: { state: next }, bubbles: true }));
    }

    speak(text) {
      if (!text || this.muted || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = document.documentElement.lang === "tr" ? "tr-TR" : "en-US";
      utterance.rate = 0.96;
      utterance.pitch = 1;
      utterance.onstart = () => this.setState(STATES.SPEAKING);
      utterance.onend = () => this.setState(STATES.IDLE);
      utterance.onerror = () => this.setState(STATES.IDLE);
      this.utterance = utterance;
      window.speechSynthesis.speak(utterance);
    }

    togglePause() {
      if (!("speechSynthesis" in window)) return;
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.setState(STATES.SPEAKING);
      } else if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        this.setState(STATES.PAUSED);
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      if (!this.muted) this.voiceEnabled = true;
      this.root.dataset.muted = String(this.muted);
      this.root.dataset.voiceEnabled = String(this.voiceEnabled);
      if (this.muted) window.speechSynthesis?.cancel();
      if (this.mute) this.mute.setAttribute("aria-pressed", String(this.muted));
      this.setState(STATES.IDLE);
    }
  }

  function mount() {
    if (document.querySelector("[data-digital-mehmet]")) return;
    const host = document.querySelector(".hero-visual-v2") || document.querySelector(".hero-visual");
    if (!host) return;

    const root = document.createElement("aside");
    root.className = "digital-mehmet";
    root.dataset.digitalMehmet = "";
    root.dataset.state = STATES.IDLE;
    root.dataset.voiceEnabled = "false";
    root.setAttribute("aria-label", "Digital Mehmet voice assistant");
    root.innerHTML = `
      <button class="dm-stage" data-dm-avatar type="button" aria-label="Digital Mehmet sesli anlatımı aç">
        <div class="dm-aura"></div>
        <img src="profile.jpeg" alt="" loading="eager" decoding="async">
        <span class="dm-pulse"></span>
        <span class="dm-stage-hint">Konuşmak için bana dokun</span>
      </button>
      <div class="dm-console glass-panel">
        <div class="dm-heading">
          <div><small>DIGITAL MEHMET</small><strong data-dm-status>Hazır</strong></div>
          <i aria-hidden="true"></i>
        </div>
        <p>Portfolio AI yanıtlarını sesli dinleyin.</p>
        <button type="button" class="dm-ask" data-dm-ask>Bana bir soru sor →</button>
        <div class="dm-actions">
          <button type="button" data-dm-play class="dm-primary" aria-label="Mehmet'i dinle">▶ <span>Beni Dinle</span></button>
          <button type="button" data-dm-pause aria-label="Konuşmayı duraklat">Ⅱ</button>
          <button type="button" data-dm-mute aria-label="Sesi kapat" aria-pressed="false">⌁</button>
        </div>
      </div>`;

    host.appendChild(root);
    window.digitalMehmet = new DigitalMehmet(root);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();