/* Digital Mehmet — polished portrait + opt-in professional voice */
(() => {
  "use strict";

  const STATES = Object.freeze({
    IDLE: "idle",
    THINKING: "thinking",
    SPEAKING: "speaking",
    PAUSED: "paused"
  });

  const TURKISH_RE = /[çğıöşüÇĞİÖŞÜ]|\b(merhaba|ben|bana|proje|projeler|araştırma|çalışma|deneyim|hakkında|nasıl|nedir|yapay zeka|tarım|turizm|rezervasyon)\b/i;

  class DigitalMehmet {
    constructor(root) {
      this.root = root;
      this.state = STATES.IDLE;
      this.muted = false;
      this.voiceEnabled = false;
      this.lastText = "";
      this.utterance = null;
      this.voices = [];
      this.status = root.querySelector("[data-dm-status]");
      this.voiceMeta = root.querySelector("[data-dm-voice-meta]");
      this.play = root.querySelector("[data-dm-play]");
      this.pause = root.querySelector("[data-dm-pause]");
      this.mute = root.querySelector("[data-dm-mute]");
      this.ask = root.querySelector("[data-dm-ask]");
      this.avatar = root.querySelector("[data-dm-avatar]");
      this.motionFrame = null;
      this.bind();
      this.loadVoices();
      this.setState(STATES.IDLE);
    }

    bind() {
      const enableVoice = () => {
        this.voiceEnabled = true;
        this.muted = false;
        this.root.dataset.voiceEnabled = "true";
        this.root.dataset.muted = "false";
        this.mute?.setAttribute("aria-pressed", "false");
        this.speak(this.lastText || this.intro());
      };

      this.play?.addEventListener("click", enableVoice);
      this.avatar?.addEventListener("click", enableVoice);
      this.pause?.addEventListener("click", () => this.togglePause());
      this.mute?.addEventListener("click", () => this.toggleMute());
      this.ask?.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("digital-mehmet:open-chat"));
      });

      this.bindPortraitMotion();

      document.addEventListener("portfolio-ai:thinking", () => this.setState(STATES.THINKING));
      document.addEventListener("portfolio-ai:answer", (event) => {
        const text = String(event.detail?.text || "").trim();
        if (!text) return;
        this.lastText = text;
        if (this.voiceEnabled && !this.muted) this.speak(text);
        else this.setState(STATES.IDLE);
      });

      if ("speechSynthesis" in window) {
        window.speechSynthesis.addEventListener?.("voiceschanged", () => this.loadVoices());
      }

      window.addEventListener("beforeunload", () => window.speechSynthesis?.cancel());
    }

    bindPortraitMotion() {
      if (!this.avatar || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const update = (clientX, clientY) => {
        const rect = this.avatar.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width - 0.5) * 2));
        const y = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height - 0.5) * 2));
        this.avatar.style.setProperty("--dm-mx", (x * 4.5).toFixed(2) + "px");
        this.avatar.style.setProperty("--dm-my", (y * 3.2).toFixed(2) + "px");
        this.avatar.style.setProperty("--dm-ry", (x * 1.8).toFixed(2) + "deg");
        this.avatar.style.setProperty("--dm-rx", (-y * 1.25).toFixed(2) + "deg");
      };

      this.avatar.addEventListener("pointermove", (event) => {
        if (this.motionFrame) cancelAnimationFrame(this.motionFrame);
        this.motionFrame = requestAnimationFrame(() => update(event.clientX, event.clientY));
      });

      this.avatar.addEventListener("pointerleave", () => {
        this.avatar.style.setProperty("--dm-mx", "0px");
        this.avatar.style.setProperty("--dm-my", "0px");
        this.avatar.style.setProperty("--dm-ry", "0deg");
        this.avatar.style.setProperty("--dm-rx", "0deg");
      });
    }

    intro() {
      return "Merhaba, ben Mehmet. Projelerim, araştırmalarım ve çalışma deneyimim hakkında bana soru sorabilirsiniz.";
    }

    loadVoices() {
      if (!("speechSynthesis" in window)) {
        this.setVoiceMeta("Ses bu tarayıcıda desteklenmiyor");
        return;
      }
      this.voices = window.speechSynthesis.getVoices?.() || [];
      if (this.voices.length) this.setVoiceMeta("Profesyonel ses modu hazır");
    }

    detectLanguage(text) {
      return TURKISH_RE.test(text) ? "tr-TR" : "en-US";
    }

    selectVoice(lang) {
      const all = this.voices.length ? this.voices : (window.speechSynthesis?.getVoices?.() || []);
      const base = lang.toLowerCase().split("-")[0];
      const matching = all.filter((voice) => String(voice.lang || "").toLowerCase().startsWith(base));
      if (!matching.length) return null;

      const preferredNames = base === "tr"
        ? ["cem", "ahmet", "tolga", "mert", "yagiz", "yağız", "emre", "google türkçe", "microsoft"]
        : ["daniel", "alex", "guy", "ryan", "aaron", "google us english", "microsoft"];

      const qualityWords = ["premium", "enhanced", "natural", "neural", "google", "microsoft"];
      const penaltyWords = ["novelty", "whisper", "organ", "bells", "bad news", "good news"];

      return matching
        .map((voice) => {
          const name = String(voice.name || "").toLowerCase();
          let score = 0;
          preferredNames.forEach((word, i) => {
            if (name.includes(word)) score += 40 - i;
          });
          qualityWords.forEach((word) => {
            if (name.includes(word)) score += 12;
          });
          penaltyWords.forEach((word) => {
            if (name.includes(word)) score -= 100;
          });
          if (String(voice.lang || "").toLowerCase() === lang.toLowerCase()) score += 15;
          if (voice.localService) score += 2;
          return { voice, score };
        })
        .sort((a, b) => b.score - a.score)[0]?.voice || matching[0];
    }

    cleanForSpeech(text) {
      return String(text || "")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/[•→↗✓✦#*_\x60]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    setVoiceMeta(text) {
      if (this.voiceMeta) this.voiceMeta.textContent = text;
    }

    setState(next) {
      this.state = next;
      this.root.dataset.state = next;
      const labels = {
        idle: "Hazır",
        thinking: "Düşünüyor",
        speaking: "Konuşuyor",
        paused: "Duraklatıldı"
      };
      if (this.status) this.status.textContent = labels[next] || next;
      this.root.dispatchEvent(
        new CustomEvent("digital-mehmet:state", { detail: { state: next }, bubbles: true })
      );
    }

    async speak(text) {
      if (!text || this.muted || !("speechSynthesis" in window)) return;

      const clean = this.cleanForSpeech(text);
      if (!clean) return;

      window.speechSynthesis.cancel();

      if (!this.voices.length) {
        this.loadVoices();
        await new Promise((resolve) => setTimeout(resolve, 120));
        this.loadVoices();
      }

      const lang = this.detectLanguage(clean);
      const voice = this.selectVoice(lang);

      if (!voice) {
        this.setVoiceMeta(lang.startsWith("tr")
          ? "Türkçe sistem sesi bulunamadı"
          : "Uygun sistem sesi bulunamadı");
        this.setState(STATES.IDLE);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = lang;
      utterance.voice = voice;
      utterance.rate = lang.startsWith("tr") ? 1.04 : 1.02;
      utterance.pitch = 1.0;
      utterance.volume = 1;

      utterance.onstart = () => {
        this.setState(STATES.SPEAKING);
        this.setVoiceMeta("Ses · " + voice.name);
      };
      utterance.onend = () => {
        this.setState(STATES.IDLE);
        this.setVoiceMeta("Profesyonel ses modu hazır");
      };
      utterance.onerror = () => {
        this.setState(STATES.IDLE);
        this.setVoiceMeta("Ses oynatılamadı");
      };

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

      if (this.muted) {
        window.speechSynthesis?.cancel();
        this.setVoiceMeta("Ses kapalı");
      } else {
        this.setVoiceMeta("Profesyonel ses modu hazır");
      }

      this.mute?.setAttribute("aria-pressed", String(this.muted));
      this.setState(STATES.IDLE);
    }
  }

  function mount() {
    if (document.querySelector("[data-digital-mehmet]")) return;

    const host = document.querySelector(".hero-visual-v2") || document.querySelector(".hero-visual");
    if (!host) return;

    host.classList.add("has-digital-mehmet");

    const root = document.createElement("aside");
    root.className = "digital-mehmet";
    root.dataset.digitalMehmet = "";
    root.dataset.state = STATES.IDLE;
    root.dataset.voiceEnabled = "false";
    root.setAttribute("aria-label", "Digital Mehmet voice assistant");

    root.innerHTML = `
      <div class="dm-portrait-wrap">
        <button class="dm-stage" data-dm-avatar type="button" aria-label="Digital Mehmet sesli anlatımı aç">
          <span class="dm-portrait-glow" aria-hidden="true"></span>
          <img src="profile.jpeg" alt="Mehmet Cam" loading="eager" decoding="async">
          <span class="dm-live-badge"><i></i> DIGITAL MEHMET</span>
          <span class="dm-stage-hint">Konuşmayı başlat</span>
        </button>
      </div>

      <div class="dm-console glass-panel">
        <div class="dm-heading">
          <div>
            <small>DIGITAL MEHMET</small>
            <strong data-dm-status>Hazır</strong>
          </div>
          <i aria-hidden="true"></i>
        </div>

        <p class="dm-copy">Projelerim, araştırmalarım ve çalışma deneyimim hakkında bana sorabilirsiniz.</p>
        <div class="dm-voice-row">
          <div class="dm-voice-meta" data-dm-voice-meta>Profesyonel ses modu hazırlanıyor…</div>
          <div class="dm-wave" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>

        <button type="button" class="dm-ask" data-dm-ask>
          <span>Bana bir soru sor</span>
          <b>→</b>
        </button>

        <div class="dm-actions">
          <button type="button" data-dm-play class="dm-primary" aria-label="Mehmet'i dinle">
            <span class="dm-play-icon">▶</span>
            <span>Beni Dinle</span>
          </button>
          <button type="button" data-dm-pause aria-label="Konuşmayı duraklat">Ⅱ</button>
          <button type="button" data-dm-mute aria-label="Sesi kapat" aria-pressed="false">⌁</button>
        </div>
      </div>
    `;

    host.appendChild(root);
    window.digitalMehmet = new DigitalMehmet(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();