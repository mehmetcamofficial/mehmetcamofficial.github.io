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
  const TTS_URL = "https://mehmetcam-portfolio-ai.aydin254.workers.dev/tts";

  class DigitalMehmet {
    constructor(root) {
      this.root = root;
      this.state = STATES.IDLE;
      this.muted = false;
      this.voiceEnabled = false;
      this.lastText = "";
      this.utterance = null;
      this.voices = [];
      this.audio = null;
      this.audioUrl = "";
      this.ttsController = null;
      this.neuralConfigured = null;
      this.status = root.querySelector("[data-dm-status]");
      this.voiceMeta = root.querySelector("[data-dm-voice-meta]");
      this.play = root.querySelector("[data-dm-play]");
      this.pause = root.querySelector("[data-dm-pause]");
      this.mute = root.querySelector("[data-dm-mute]");
      this.ask = root.querySelector("[data-dm-ask]");
      this.avatar = root.querySelector("[data-dm-avatar]");
      this.introVideo = document.querySelector("[data-dm-intro-video]");
      this.introBase = document.querySelector(".dm-character-base");
      this.quickForm = root.querySelector("[data-dm-form]");
      this.quickInput = root.querySelector("[data-dm-input]");
      this.quickButtons = root.querySelectorAll("[data-dm-question]");
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
        if (!this.lastText && this.playIntroVideo()) return;
        this.speak(this.lastText || this.intro());
      };

      this.play?.addEventListener("click", enableVoice);
      this.avatar?.addEventListener("click", enableVoice);
      document.addEventListener("digital-mehmet:listen", enableVoice);
      this.pause?.addEventListener("click", () => this.togglePause());
      this.mute?.addEventListener("click", () => this.toggleMute());
      this.ask?.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("digital-mehmet:open-chat"));
      });

      this.quickButtons?.forEach((button) => {
        button.addEventListener("click", () => {
          const question = String(button.getAttribute("data-dm-question") || "").trim();
          if (!question) return;
          document.dispatchEvent(new CustomEvent("digital-mehmet:ask", { detail: { question } }));
        });
      });

      this.quickForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const question = String(this.quickInput?.value || "").trim();
        if (!question) {
          document.dispatchEvent(new CustomEvent("digital-mehmet:open-chat"));
          return;
        }
        if (this.quickInput) this.quickInput.value = "";
        document.dispatchEvent(new CustomEvent("digital-mehmet:ask", { detail: { question } }));
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

      window.addEventListener("beforeunload", () => this.stopPlayback());
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

    playIntroVideo() {
      const video = this.introVideo;
      if (!video) return false;
      this.stopPlayback();
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1;
      video.classList.add("is-ready", "is-playing");
      if (this.introBase) this.introBase.classList.add("is-video-playing");
      this.setState(STATES.SPEAKING);
      this.setVoiceMeta("Dudak senkronlu Digital Mehmet");
      video.onended = () => {
        video.classList.remove("is-playing");
        video.classList.add("is-ready");
        if (this.introBase) this.introBase.classList.add("is-video-playing");
        this.setState(STATES.IDLE);
        this.setVoiceMeta("Doğal erkek AI sesi hazır");
      };
      video.onerror = () => {
        video.classList.remove("is-playing");
        if (this.introBase) this.introBase.classList.remove("is-video-playing");
        this.speak(this.intro());
      };
      video.play().catch(() => {
        video.classList.remove("is-playing");
        if (this.introBase) this.introBase.classList.remove("is-video-playing");
        this.speak(this.intro());
      });
      return true;
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

      const maleHints = base === "tr"
        ? ["cem", "ahmet", "tolga", "mert", "yagiz", "yağız", "emre", "kerem", "kaan", "onur", "baris", "barış", "male", "erkek"]
        : ["daniel", "alex", "guy", "ryan", "aaron", "fred", "ralph", "tom", "oliver", "male"];

      const femaleHints = base === "tr"
        ? ["yelda", "aylin", "emel", "filiz", "seda", "zeynep", "selin", "eda", "female", "kadın", "kadin"]
        : ["samantha", "victoria", "karen", "moira", "tessa", "fiona", "serena", "female"];

      const qualityWords = ["premium", "enhanced", "natural", "neural"];
      const noveltyWords = ["novelty", "whisper", "organ", "bells", "bad news", "good news"];

      const ranked = matching
        .map((voice) => {
          const name = String(voice.name || "").toLowerCase();
          const isMale = maleHints.some((hint) => name.includes(hint));
          const isFemale = femaleHints.some((hint) => name.includes(hint));

          if (!isMale || isFemale) return { voice, score: -10000 };

          let score = 100;
          maleHints.forEach((word, i) => {
            if (name.includes(word)) score += 60 - Math.min(i, 40);
          });
          qualityWords.forEach((word) => {
            if (name.includes(word)) score += 18;
          });
          noveltyWords.forEach((word) => {
            if (name.includes(word)) score -= 1000;
          });
          if (String(voice.lang || "").toLowerCase() === lang.toLowerCase()) score += 20;
          if (voice.localService) score += 3;
          return { voice, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      return ranked[0]?.voice || null;
    }

    cleanForSpeech(text) {
      return String(text || "")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/[•→↗✓✦#*_\x60]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    stopPlayback() {
      this.ttsController?.abort();
      this.ttsController = null;
      window.speechSynthesis?.cancel();

      if (this.audio) {
        try {
          this.audio.pause();
          this.audio.src = "";
        } catch {}
        this.audio = null;
      }

      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
        this.audioUrl = "";
      }
    }

    async playNeuralTts(text, lang) {
      this.ttsController?.abort();
      this.ttsController = new AbortController();
      this.setVoiceMeta("Doğal erkek AI sesi hazırlanıyor…");

      try {
        const response = await fetch(TTS_URL, {
          method: "POST",
          signal: this.ttsController.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            lang: lang.startsWith("tr") ? "tr" : "en"
          })
        });

        if (!response.ok) {
          this.neuralConfigured = response.status !== 503;
          return false;
        }

        const blob = await response.blob();
        if (!blob.size) return false;

        this.neuralConfigured = true;
        this.audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(this.audioUrl);
        audio.preload = "auto";
        this.audio = audio;

        audio.onplay = () => {
          this.root.dataset.voiceGender = "male";
          this.root.dataset.voiceProvider = "neural";
          this.setState(STATES.SPEAKING);
          this.setVoiceMeta(lang.startsWith("tr") ? "AI üretimi · neural erkek ses" : "AI generated · neural male voice");
        };

        audio.onended = () => {
          this.setState(STATES.IDLE);
          this.setVoiceMeta("Doğal erkek AI sesi hazır");
          if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
          this.audioUrl = "";
          this.audio = null;
        };

        audio.onerror = () => {
          this.setState(STATES.IDLE);
          this.setVoiceMeta("Neural ses oynatılamadı");
        };

        await audio.play();
        return true;
      } catch (error) {
        if (error?.name !== "AbortError") console.warn("Digital Mehmet neural TTS fallback:", error);
        return false;
      } finally {
        this.ttsController = null;
      }
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
      if (!text || this.muted) return;

      const clean = this.cleanForSpeech(text);
      if (!clean) return;

      this.stopPlayback();
      const lang = this.detectLanguage(clean);

      if (await this.playNeuralTts(clean.slice(0, 1400), lang)) return;

      if (!("speechSynthesis" in window)) {
        this.setVoiceMeta("Neural erkek ses için servis bağlantısı gerekli");
        this.setState(STATES.IDLE);
        return;
      }

      if (!this.voices.length) {
        this.loadVoices();
        await new Promise((resolve) => setTimeout(resolve, 120));
        this.loadVoices();
      }

      const voice = this.selectVoice(lang);

      if (!voice) {
        this.setVoiceMeta(
          this.neuralConfigured === false
            ? "Doğal erkek ses için ElevenLabs bağlantısı bekleniyor"
            : (lang.startsWith("tr")
              ? "Tarayıcıda erkek Türkçe sesi yok"
              : "Male browser voice unavailable")
        );
        this.setState(STATES.IDLE);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = lang;
      utterance.voice = voice;
      utterance.rate = lang.startsWith("tr") ? 1.01 : 1.0;
      utterance.pitch = 0.92;
      utterance.volume = 1;

      utterance.onstart = () => {
        this.setState(STATES.SPEAKING);
        this.root.dataset.voiceGender = "male";
        this.root.dataset.voiceProvider = "browser";
        this.setVoiceMeta("Erkek sistem sesi · " + voice.name);
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
      if (this.audio) {
        if (this.audio.paused) {
          this.audio.play().then(() => this.setState(STATES.SPEAKING)).catch(() => {});
        } else {
          this.audio.pause();
          this.setState(STATES.PAUSED);
        }
        return;
      }

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
        this.stopPlayback();
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
      <div class="dm-console">
        <div class="dm-panel-head">
          <div class="dm-profile-chip">
            <span class="dm-mini-avatar" aria-hidden="true">
              <img src="assets/digital-mehmet/digital-mehmet-hero.webp?v=20260921-static2" alt="">
            </span>
            <span>
              <strong>Digital Mehmet</strong>
              <small>AI Assistant</small>
            </span>
            <i aria-hidden="true"></i>
          </div>
          <div class="dm-panel-controls">
            <button type="button" data-dm-pause aria-label="Konuşmayı duraklat">−</button>
            <button type="button" data-dm-mute aria-label="Sesi aç veya kapat" aria-pressed="false">◌</button>
          </div>
        </div>

        <div class="dm-greeting">
          <div class="dm-wave" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i>
          </div>
          <div class="dm-bubble">
            <span>Merhaba!</span>
            <strong>Ben Digital Mehmet.</strong>
            <span>Size nasıl yardımcı olabilirim?</span>
          </div>
        </div>

        <div class="dm-quick-list">
          <button type="button" data-dm-question="Projelerin hakkında bilgi verir misin?"><span>◇</span><b>Projelerin hakkında bilgi ver</b><em>›</em></button>
          <button type="button" data-dm-question="Hangi teknolojileri kullanıyorsun?"><span>⚙</span><b>Hangi teknolojileri kullanıyorsun?</b><em>›</em></button>
          <button type="button" data-dm-question="Deneyim ve yetkinliklerin neler?"><span>○</span><b>Deneyim ve yetkinliklerin neler?</b><em>›</em></button>
          <button type="button" data-dm-question="İletişim bilgilerini paylaşır mısın?"><span>⌕</span><b>İletişim bilgilerini paylaş</b><em>›</em></button>
        </div>

        <form class="dm-inline-form" data-dm-form>
          <input data-dm-input type="text" autocomplete="off" placeholder="Sorunuzu buraya yazın..." aria-label="Digital Mehmet'e soru sor">
          <button type="submit" aria-label="Soruyu gönder">➤</button>
        </form>

        <div class="dm-panel-foot">
          <span data-dm-status>Hazır</span>
          <span data-dm-voice-meta>Doğal erkek AI sesi hazır</span>
          <small>Ses, yapay zekâ tarafından üretilir.</small>
        </div>
      </div>
    `;

    const heroListen = document.getElementById("dmHeroListen");
    const heroAsk = document.getElementById("dmHeroAsk");
    heroListen?.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("digital-mehmet:listen"));
    });
    heroAsk?.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("digital-mehmet:open-chat"));
    });

    host.appendChild(root);
    window.digitalMehmet = new DigitalMehmet(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();