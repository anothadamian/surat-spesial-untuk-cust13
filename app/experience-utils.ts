export const WHATSAPP_MESSAGE = "Hai Aya, Nad dah baca surat aya. Nad maafkan aya. Terima kasih sebab jujur dan beri Nad masa untuk fikir. Semoga lepas ni kita boleh sama-sama jaga persahabatan kita dengan lebih baik 💙";

export const WHATSAPP_URL = `https://wa.me/601153312078?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

type LetterAudio = Pick<HTMLAudioElement, "currentTime" | "volume" | "play">;

export function startLetterMusic(audio: LetterAudio) {
  audio.currentTime = 0;
  audio.volume = 0;
  return audio.play();
}

export function revealLetterMusic(audio: Pick<HTMLAudioElement, "volume">) {
  audio.volume = 0.65;
}
