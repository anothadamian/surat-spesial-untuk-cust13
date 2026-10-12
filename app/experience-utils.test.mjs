import assert from "node:assert/strict";
import test from "node:test";
import { formatTime, startLetterMusic, revealLetterMusic, WHATSAPP_URL } from "./experience-utils.ts";

test("WhatsApp draft goes to Aya and says Nadira has forgiven her", () => {
  const url = new URL(WHATSAPP_URL);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/601153312078");
  assert.match(url.searchParams.get("text") ?? "", /Nad maafkan aya/);
  assert.match(url.searchParams.get("text") ?? "", /Terima kasih/);
});

test("player time is readable", () => {
  assert.equal(formatTime(0), "0:00");
  assert.equal(formatTime(259), "4:19");
  assert.equal(formatTime(Number.NaN), "0:00");
});

test("opening the letter starts playback silently, then reveals the volume", async () => {
  let played = false;
  const audio = { currentTime: 42, volume: 1, play: async () => { played = true; } };
  await startLetterMusic(audio);
  assert.equal(played, true);
  assert.equal(audio.currentTime, 0);
  assert.equal(audio.volume, 0);
  revealLetterMusic(audio);
  assert.equal(audio.volume, 0.65);
});
