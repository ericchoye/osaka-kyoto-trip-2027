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
  assert.match(html, /焼肉力丸 梅田東通り店/);
  assert.match(html, /木津市場早餐，四間現場切換/);
  assert.match(html, /加入 Google 行事曆/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("calendar links and reservation backups are present in source", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /calendar\.google\.com\/calendar\/render/);
  assert.match(source, /stop-backups/);
  assert.match(source, /預約燒肉力丸/);
  assert.match(source, /搶 ふじ井/);
  assert.match(source, /千日前はつせ/);
  assert.match(source, /當日取號｜麺屋 猪一/);
  assert.doesNotMatch(source, /又三郎熟成燒肉|自己料理黑毛和牛|大阪海遊館/);
});
