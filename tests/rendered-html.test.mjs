import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server renders the current Osaka and Kyoto itinerary", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /2027 大阪・京都 7 天旅行計畫/);
  assert.match(html, /大興寿司 南店/);
  assert.match(html, /雌牛専門店 板前焼肉一牛 難波 道頓堀店 離れ/);
  assert.match(html, /木津市場早餐，四間現場切換/);
  assert.match(html, /加入 Google 行事曆/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("calendar links and reservation backups are present in source", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /calendar\.google\.com\/calendar\/render/);
  assert.match(source, /stop-backups/);
  assert.match(source, /開始查一牛 2\/13 19:00 訂位/);
  assert.match(source, /搶 ふじ井/);
  assert.match(source, /焼肉割烹 YP流 宗右衛門町本店/);
  assert.match(source, /當日取號｜麺屋 猪一/);
  assert.match(source, /回飯店自己料理/);
  assert.doesNotMatch(source, /焼肉力丸|福太郎 本店|味乃家|千日前はつせ|又三郎熟成燒肉|大阪海遊館/);
});
