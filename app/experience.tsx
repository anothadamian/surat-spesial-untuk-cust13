"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { formatTime, revealLetterMusic, startLetterMusic, WHATSAPP_URL } from "./experience-utils";

type Screen = "opening" | "envelope" | "time" | "letter" | "question" | "yes" | "promise";
type Curtain = "cover" | "reveal" | null;

const flowerPositions = Array.from({ length: 36 }, (_, index) => {
  const column = index % 6;
  const row = Math.floor(index / 6);
  return {
    left: `${column * 20}%`,
    top: `${row * 20}%`,
    delay: `${Math.hypot(column - 2.5, row - 2.5) * 28}ms`,
    rotate: `${(index * 71) % 360}deg`,
  };
});

function BloomArt({ mood = "calm" }: { mood?: "calm" | "happy" | "quiet" }) {
  const [touches, setTouches] = useState(0);
  return <button className={`bloom-art ${mood}${touches ? " bloomed" : ""}`} type="button" aria-label="Touch the blue magnolia to make it bloom" onClick={() => setTouches(value => value + 1)}>
    <span className="bloom-glow" aria-hidden="true" />
    <span className="bloom-orbit orbit-one" aria-hidden="true" />
    <span className="bloom-orbit orbit-two" aria-hidden="true" />
    <span className="magnolia-core" aria-hidden="true" />
    <span className="bloom-spark spark-one" aria-hidden="true">✦</span>
    <span className="bloom-spark spark-two" aria-hidden="true">✧</span>
    <span className="bloom-spark spark-three" aria-hidden="true">✦</span>
    {touches > 0 && <span className="bloom-burst" key={touches} aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} style={{ "--angle": `${index * 45}deg`, "--delay": `${index * 35}ms` } as CSSProperties} />)}</span>}
    <span className="bloom-hint">{touches ? "a little hope, slowly" : "tap to bloom"}</span>
  </button>;
}

function FlowerCurtain({ phase }: { phase: Exclude<Curtain, null> }) {
  return <div className={`flower-curtain ${phase}`} aria-hidden="true">
    <div className="curtain-wash" />
    {flowerPositions.map((flower, index) => <span className="curtain-flower" key={index} style={{ "--x": flower.left, "--y": flower.top, "--delay": flower.delay, "--rotate": flower.rotate } as CSSProperties} />)}
    <span className="curtain-heart">♡</span>
  </div>;
}

export default function Experience({ letter }: { letter: string }) {
  const [screen, setScreen] = useState<Screen>("opening");
  const [curtain, setCurtain] = useState<Curtain>(null);
  const [leavingFor, setLeavingFor] = useState<Screen | null>(null);
  const [letterProgress, setLetterProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioNotice, setAudioNotice] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const history = useRef<{ screen: Screen; scroll: number }[]>([]);
  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pendingScroll = useRef(0);
  const pendingLetterMusic = useRef(false);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useLayoutEffect(() => { window.scrollTo(0, pendingScroll.current); }, [screen]);
  useEffect(() => {
    if (screen !== "letter" || !pendingLetterMusic.current) return;
    pendingLetterMusic.current = false;
    const audio = audioRef.current;
    if (audio) revealLetterMusic(audio);
  }, [screen]);
  useEffect(() => {
    if (screen !== "letter") return;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setLetterProgress(total > 0 ? Math.min(100, window.scrollY / total * 100) : 100);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [screen]);

  function change(next: Screen, back = false) {
    if (busy.current) return;
    let restoreScroll = 0;
    if (back) {
      const previous = history.current.pop();
      if (!previous) return;
      next = previous.screen;
      restoreScroll = previous.scroll;
    } else {
      history.current.push({ screen, scroll: window.scrollY });
    }
    if (screen === "letter" && next !== "letter") audioRef.current?.pause();
    busy.current = true;
    setLeavingFor(next);
    pendingScroll.current = restoreScroll;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScreen(next);
      setLeavingFor(null);
      busy.current = false;
      return;
    }
    setCurtain("cover");
    timers.current.push(setTimeout(() => {
      setScreen(next);
      setCurtain("reveal");
      timers.current.push(setTimeout(() => {
        setCurtain(null);
        setLeavingFor(null);
        busy.current = false;
      }, 560));
    }, 600));
  }

  function playMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    revealLetterMusic(audio);
    void audio.play().then(() => setAudioNotice("")).catch(() => setAudioNotice("Tap Play to listen to the song."));
  }

  function openLetter() {
    if (busy.current) return;
    const audio = audioRef.current;
    if (audio) {
      pendingLetterMusic.current = true;
      void startLetterMusic(audio).then(() => setAudioNotice("")).catch(() => setAudioNotice("Tap Play to listen to the song."));
    }
    change("letter");
  }

  function forgive() {
    change("yes");
  }

  const button = (label: string, next: Screen, className = "") => <button className={`pill ${className}`} type="button" disabled={Boolean(curtain)} onClick={() => change(next)}>{label}</button>;
  const back = () => <button className="pill back" type="button" disabled={Boolean(curtain)} onClick={() => change("opening", true)}>Back</button>;

  return <main className="experience">
    <audio ref={audioRef} src="/music/photograph.mp3" preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(event.currentTarget.duration)} onError={() => { setPlaying(false); setAudioNotice("The song could not load. Please try Play again."); }} />
    <div className="ambient-petals" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <span key={index} />)}</div>
    {screen === "opening" && <section className="scene center opening" key="opening">
      <span className="tiny-star star-one" aria-hidden="true">✦</span><span className="tiny-star star-two" aria-hidden="true">✦</span>
      <h1 className="script write">I&apos;m Sorry, Love...</h1>
      <p>A space to clear the air, share my heart, and bridge the gap between us</p>
      {button("Start", "envelope")}
    </section>}

    {screen === "envelope" && <section className="scene center envelope-scene" key="envelope">
      <button className={`envelope-art${leavingFor === "letter" ? " opening" : ""}`} type="button" aria-label="Open the letter" onClick={openLetter}><span className="envelope-back"/><span className="envelope-letter"/><span className="envelope-front"/><span className="envelope-flap"/><span className="envelope-seal">♡</span></button>
      <div className="choice-stack"><button className="pill" type="button" disabled={Boolean(curtain)} onClick={openLetter}>Read</button>{button("I need more time", "time", "quiet-choice")}</div>
      {back()}
    </section>}

    {screen === "time" && <section className="scene center space-scene" key="time">
      <h1 className="script write">Take all the time you need to process, love</h1>
      <div className="space-row"><p>I respect your space. Please take the time you need.</p><BloomArt mood="quiet" /></div>
      {back()}
    </section>}

    {screen === "letter" && <section className="scene letter-scene" key="letter">
      <div className="read-progress" aria-hidden="true"><span style={{ width: `${letterProgress}%` }} /></div>
      <article className="letter-inner">
        <h1 className="script write">I&apos;m Sorry</h1>
        <figure className="memory"><Image src="/photos/nadira-memory.jpeg" alt="Two people photographed together outdoors at night" width={810} height={1080} priority /></figure>
        <div className="music-player" role="group" aria-label="Music player">
          <span className={`music-disc${playing ? " spinning" : ""}`} aria-hidden="true">♪</span>
          <div className="music-details"><div className="music-title"><strong>Photograph</strong><span>Ed Sheeran</span></div><input type="range" aria-label="Seek in Photograph" min="0" max={duration || 0} step="1" value={Math.min(currentTime, duration || 0)} disabled={!duration} onChange={event => { if (audioRef.current) audioRef.current.currentTime = Number(event.target.value); }} style={{ "--music-progress": `${duration ? currentTime / duration * 100 : 0}%` } as CSSProperties} /><div className="music-time"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></div>
          <button className="music-toggle" type="button" aria-label={playing ? "Pause music" : "Play music"} onClick={() => playing ? audioRef.current?.pause() : playMusic()}>{playing ? "❚❚" : "▶"}</button>
          {audioNotice && <p className="music-notice" role="status">{audioNotice}</p>}
        </div>
        <p className="letter-intro">For you, Nadira.</p>
        <p className="letter-copy">{letter}</p>
        <div className="letter-actions">{back()}{button("Continue", "question")}</div>
      </article>
    </section>}

    {screen === "question" && <section className="scene center question-scene" key="question">
      <h1 className="script write">Will you forgive me, my love?</h1>
      <div className="question-flower"><BloomArt /></div>
      <div className="question-actions"><button className="pill" type="button" disabled={Boolean(curtain)} onClick={forgive}>Yes</button>{button("I need more time", "time", "quiet-choice")}</div>
      <div className="question-back">{back()}</div>
    </section>}

    {screen === "yes" && <section className="scene center yes-scene" key="yes">
      <h1 className="script write">Yesss!!!</h1>
      <BloomArt mood="happy" />
      <p>Thank you, Nadira. We can take things slowly. 💙</p>
      <a className="pill whatsapp-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Talk to Aya ↗</a>
      <small className="whatsapp-note">You can edit the message before sending it.</small>
      {button("Continue", "promise", "continue-choice")}
      {back()}
    </section>}

    {screen === "promise" && <section className="scene center promise-scene" key="promise">
      <h1 className="script write">I Promise</h1>
      <BloomArt mood="happy" />
      <p>I&apos;ll learn from my mistakes and try to be a better friend.</p>
      {back()}
    </section>}
    {curtain && <FlowerCurtain phase={curtain} />}
  </main>;
}
