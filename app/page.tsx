"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "sight" | "food" | "transit" | "shopping" | "stay";

type Stop = {
  time: string;
  title: string;
  icon: string;
  category: Category;
  description: string;
  route?: string;
  fare?: string;
  ticket?: string;
  note?: string;
  mapQuery?: string;
  official?: string;
};

type TripDay = {
  id: string;
  date: string;
  weekday: string;
  city: string;
  title: string;
  summary: string;
  ticket: string;
  color: string;
  stops: Stop[];
};

const categories: { id: "all" | Category; label: string; icon: string }[] = [
  { id: "all", label: "全部", icon: "◎" },
  { id: "sight", label: "景點", icon: "🏯" },
  { id: "food", label: "美食", icon: "🍜" },
  { id: "transit", label: "交通", icon: "🚆" },
  { id: "shopping", label: "購物", icon: "🛍️" },
  { id: "stay", label: "住宿", icon: "🛏️" },
];

const tripDays: TripDay[] = [
  {
    id: "d1",
    date: "2/11",
    weekday: "四",
    city: "大阪",
    title: "抵達大阪・新世界散步",
    summary: "國定假日，首日留足通關與自助入住緩衝。",
    ticket: "ICOCA＋南海 ¥970",
    color: "#d24a38",
    stops: [
      {
        time: "依機票",
        title: "JX820 桃園起飛",
        icon: "✈️",
        category: "transit",
        description: "桃園機場 T1 出發；精確起飛、抵達時間以電子機票為準。",
        route: "TPE T1 → KIX T1",
        official: "https://www.starlux-airlines.com/zh-TW/timetable",
      },
      {
        time: "抵達後",
        title: "抵達關西機場",
        icon: "🛬",
        category: "transit",
        description: "通關與領行李保留 60–90 分鐘，不安排硬性預約。",
        note: "2/11 為日本建國紀念日，預期較擁擠。",
        mapQuery: "Kansai International Airport Terminal 1",
      },
      {
        time: "+90 分",
        title: "南海空港急行",
        icon: "🚆",
        category: "transit",
        description: "搭往難波方向的空港急行，新今宮下車；不用劃位。",
        route: "關西空港 → 新今宮｜約 42–45 分",
        fare: "¥970",
        ticket: "ICOCA",
        official: "https://www.nankai.co.jp/en_railway/access-timetable",
      },
      {
        time: "約 14:00",
        title: "Apartment Hotel 11",
        icon: "🧳",
        category: "stay",
        description: "先寄放行李；正式入住為 16:00。務必事前確認無人櫃檯的寄放方式。",
        route: "南海新今宮站旁",
        note: "要求高樓層、背向軌道房。",
        mapQuery: "Apartment Hotel 11 Shinimamiya 3 Osaka",
      },
      {
        time: "16:30",
        title: "新世界・通天閣",
        icon: "🗼",
        category: "sight",
        description: "從飯店步行前往新世界、通天閣外觀與ジャンジャン横丁。",
        route: "飯店 → 徒步約 10 分",
        mapQuery: "Tsutenkaku Osaka",
        official: "https://osaka-info.jp/en/spot/shinsekai/",
      },
      {
        time: "18:30",
        title: "串炸或回房料理",
        icon: "🍳",
        category: "food",
        description: "首晚保留彈性；可在附近採買早餐與食材，熟悉房內廚房。",
        route: "新世界／新今宮周邊",
      },
    ],
  },
  {
    id: "d2",
    date: "2/12",
    weekday: "五",
    city: "大阪",
    title: "拉麵榜首・北區甜點",
    summary: "早排名店，午後用地鐵串聯梅田、中之島與甜點。",
    ticket: "Enjoy Eco Card ¥820",
    color: "#cf7d2d",
    stops: [
      {
        time: "09:15",
        title: "前往中津",
        icon: "🚇",
        category: "transit",
        description: "動物園前搭御堂筋線直達中津，出站後步行約 3 分鐘。",
        route: "動物園前 M22 → 中津 M15",
        ticket: "Enjoy Eco Card",
      },
      {
        time: "09:45",
        title: "麦と麺助排隊",
        icon: "🍜",
        category: "food",
        description: "大阪拉麵榜現行約第 1 名；11:00 開門、不能訂位。",
        fare: "約 ¥1,000–2,000｜現金",
        note: "預留 60–90 分鐘候位。",
        mapQuery: "麦と麺助 大阪 中津",
        official: "https://tabelog.com/osaka/A2701/A270101/27104891/",
      },
      {
        time: "12:15",
        title: "梅田新城散步",
        icon: "🌿",
        category: "sight",
        description: "拉麵候位結束後再開始；Grand Green Osaka、Grand Front 與大阪站周邊散步。",
        route: "中津 → 徒步前往梅田",
        mapQuery: "Grand Green Osaka",
      },
      {
        time: "15:10",
        title: "Circo D’oro",
        icon: "🍨",
        category: "food",
        description: "大阪甜點榜現行最高分之一，冬天也值得吃的義式冰淇淋。",
        route: "東梅田 → 谷町六丁目",
        fare: "約 ¥1,000｜只收現金",
        mapQuery: "Gelateria Circo D'oro Osaka",
        official: "https://tabelog.com/osaka/A2701/A270204/27009531/",
      },
      {
        time: "16:20",
        title: "ACIDRACINES",
        icon: "🍰",
        category: "food",
        description: "大阪高評法式蛋糕店，純外帶；排在最後買，避免帶著蛋糕逛數小時。",
        route: "谷町六丁目 → 天滿橋，步行 6–7 分",
        fare: "約 ¥1,000–2,000｜可刷卡",
        note: "招牌品項可能售完，以現場品項為準。",
        mapQuery: "ACIDRACINES Osaka",
        official: "https://www.acidracines.com/",
      },
      {
        time: "17:10",
        title: "回住宿料理",
        icon: "🍳",
        category: "food",
        description: "甜點較多的一天，晚餐用超市食材簡單料理即可。",
        route: "天滿橋 → 天王寺轉御堂筋線 → 動物園前",
      },
    ],
  },
  {
    id: "d3",
    date: "2/13",
    weekday: "六",
    city: "大阪",
    title: "難波打卡・熟成燒肉",
    summary: "經典南區步行線，傍晚御堂筋線直達長居。",
    ticket: "Enjoy Eco Card ¥620",
    color: "#b24845",
    stops: [
      {
        time: "08:30",
        title: "前往難波八阪",
        icon: "🚇",
        category: "transit",
        description: "動物園前搭御堂筋線至大國町，步行前往難波八阪神社。",
        route: "動物園前 M22 → 大國町 M21 → 徒步",
        ticket: "週末 Enjoy Eco Card",
      },
      {
        time: "09:00",
        title: "難波八阪神社",
        icon: "🦁",
        category: "sight",
        description: "先拍巨型獅子殿，早上人潮相對少。",
        mapQuery: "Namba Yasaka Jinja",
      },
      {
        time: "10:00",
        title: "黑門市場",
        icon: "🐟",
        category: "shopping",
        description: "以散步與少量試吃為主，避免在燒肉晚餐前吃太飽。",
        route: "難波八阪神社 → 徒步約 20 分",
        mapQuery: "Kuromon Ichiba Market",
      },
      {
        time: "11:30",
        title: "法善寺・道頓堀",
        icon: "📸",
        category: "sight",
        description: "法善寺橫丁、水掛不動尊、Glico 看板與戎橋。",
        mapQuery: "Dotonbori Glico Sign",
        official: "https://osaka-info.jp/en/spot/dotonbori/",
      },
      {
        time: "13:30",
        title: "心齋橋・美國村",
        icon: "🛍️",
        category: "shopping",
        description: "心齋橋筋商店街一路走到美國村，途中安排咖啡休息。",
        route: "道頓堀 → 徒步",
        mapQuery: "Shinsaibashi-suji Shopping Street",
      },
      {
        time: "16:30",
        title: "搭車前往長居",
        icon: "🚇",
        category: "transit",
        description: "從難波搭御堂筋線直達長居，提早 15 分鐘抵達。",
        route: "難波 M20 → 長居 M26",
        ticket: "ICOCA",
      },
      {
        time: "17:30",
        title: "又三郎熟成燒肉",
        icon: "🥩",
        category: "food",
        description: "主方案選熟成肉與燒肉兼具的套餐；不是只吃牛排的套餐。",
        fare: "約 ¥10,000–15,000｜可刷卡",
        note: "二月訂位開放後立即預約。",
        mapQuery: "又三郎 焼肉 長居 大阪",
        official: "https://www.tablecheck.com/ja/matasaburo/reserve/message",
      },
      {
        time: "20:00",
        title: "返回新今宮",
        icon: "🌙",
        category: "transit",
        description: "長居搭御堂筋線直達動物園前，步行回飯店。",
        route: "長居 M26 → 動物園前 M22",
      },
    ],
  },
  {
    id: "d4",
    date: "2/14",
    weekday: "日",
    city: "大阪",
    title: "大阪城・豬排・梅田夜景",
    summary: "周遊卡價值最高的一天，關鍵是 15:00 前進空中庭園。",
    ticket: "Osaka Amazing Pass ¥3,500",
    color: "#315a7d",
    stops: [
      {
        time: "08:00",
        title: "前往大阪城",
        icon: "🚇",
        category: "transit",
        description: "動物園前搭御堂筋線至本町，轉中央線至谷町四丁目。",
        route: "M22 → 本町轉車 → C18",
        ticket: "大阪周遊卡",
      },
      {
        time: "09:00",
        title: "大阪城天守閣",
        icon: "🏯",
        category: "sight",
        description: "開門即入場，參觀天守閣與豐臣石垣館。",
        fare: "原價 ¥1,200｜周遊卡含",
        mapQuery: "Osaka Castle Museum",
        official: "https://www.osaka-info.jp/en/spot/osaka-castle-main-keep/",
      },
      {
        time: "10:20",
        title: "前往千林",
        icon: "🚆",
        category: "transit",
        description: "由大手門方向步行到天滿橋，轉京阪前往千林。",
        route: "天滿橋 → 京阪千林",
        ticket: "周遊卡涵蓋至千林",
      },
      {
        time: "11:30",
        title: "とんかつ ふじ井",
        icon: "🍱",
        category: "food",
        description: "現行約 4.14 分的頂級豬排；完整預約制，指定搶 11:30。",
        fare: "約 ¥3,000–5,000｜卡／交通 IC",
        note: "若搶不到，改訂同區的 とんかつ中村。",
        mapQuery: "とんかつ ふじ井 千林",
        official: "https://tabelog.com/osaka/A2701/A270304/27131908/",
      },
      {
        time: "12:40",
        title: "千林前往梅田",
        icon: "🚆",
        category: "transit",
        description: "京阪至淀屋橋，再轉御堂筋線至梅田。",
        route: "千林 → 淀屋橋 → 梅田",
        ticket: "大阪周遊卡",
      },
      {
        time: "14:00",
        title: "梅田藍天大廈",
        icon: "🌆",
        category: "sight",
        description: "空中庭園展望台；周遊卡免費入場只到 15:00。",
        fare: "原價 ¥2,000｜周遊卡含",
        note: "最晚 14:45 抵達入口。",
        mapQuery: "Umeda Sky Building",
        official: "https://osaka-amazing-pass.com/en/service_free.html",
      },
      {
        time: "15:30",
        title: "梅田自由活動",
        icon: "☕",
        category: "shopping",
        description: "Grand Green、百貨與地下街；預留休息時間。",
        mapQuery: "Grand Green Osaka",
      },
      {
        time: "18:00",
        title: "HEP FIVE 摩天輪",
        icon: "🎡",
        category: "sight",
        description: "以摩天輪補上夜景，結束後在梅田晚餐或回房料理。",
        fare: "原價 ¥1,000｜周遊卡含",
        mapQuery: "HEP FIVE Ferris Wheel",
        official: "https://osaka-amazing-pass.com/en/service_free.html",
      },
    ],
  },
  {
    id: "d5",
    date: "2/15",
    weekday: "一",
    city: "京都",
    title: "嵐山・金閣寺・日本製茶筅",
    summary: "本日購買茶筅最重要；隔兩天店休，不可延後。",
    ticket: "JR Kansai Mini Pass D1",
    color: "#57775c",
    stops: [
      {
        time: "06:40",
        title: "JR 前往嵐山",
        icon: "🚆",
        category: "transit",
        description: "新今宮經大阪、京都，轉嵯峨野線到嵯峨嵐山。",
        route: "新今宮 → 大阪 → 京都 → 嵯峨嵐山",
        ticket: "JR Mini Pass",
      },
      {
        time: "08:30",
        title: "天龍寺庭園",
        icon: "🪷",
        category: "sight",
        description: "開門入場，先看曹源池庭園再由北門接竹林。",
        fare: "庭園 ¥500｜諸堂另 ¥300",
        mapQuery: "Tenryu-ji Kyoto",
        official: "https://testmt.tenryuji.com/visit/",
      },
      {
        time: "09:20",
        title: "竹林・渡月橋",
        icon: "🎋",
        category: "sight",
        description: "竹林小徑、野宮神社，再步行至渡月橋。",
        route: "全程步行",
        mapQuery: "Arashiyama Bamboo Forest",
      },
      {
        time: "10:45",
        title: "嵐電移動",
        icon: "🚋",
        category: "transit",
        description: "嵐山站搭嵐電，在帷子ノ辻轉往北野白梅町，再搭短程巴士。",
        route: "嵐山 → 帷子ノ辻 → 北野白梅町 → 金閣寺",
        ticket: "ICOCA／現金",
      },
      {
        time: "11:30",
        title: "金閣寺",
        icon: "✨",
        category: "sight",
        description: "沿單向參觀路線看鏡湖池與舍利殿。",
        fare: "¥500",
        mapQuery: "Kinkaku-ji Kyoto",
        official: "https://www.shokoku-ji.jp/kinkakuji/access/",
      },
      {
        time: "12:30",
        title: "金閣寺周邊午餐",
        icon: "🍚",
        category: "food",
        description: "保留 50–60 分鐘正式午餐與休息，再前往烏丸御池。",
        route: "金閣寺／北野白梅町周邊",
      },
      {
        time: "14:30",
        title: "丸久小山園・元庵",
        icon: "🍵",
        category: "shopping",
        description: "若事前保留成功，先取日本製茶筅，再於茶房喝抹茶與上生菓子。",
        fare: "茶筅約 ¥5,830",
        note: "指定：久保駒吉・数穂・上・日本製。",
        mapQuery: "丸久小山園 西洞院店 元庵",
        official: "https://www.marukyu-koyamaen.co.jp/motoan.html",
      },
      {
        time: "15:45",
        title: "錦市場",
        icon: "🛍️",
        category: "shopping",
        description: "多數店約 17:00 前開始收攤，採買茶點與乾貨。",
        mapQuery: "Nishiki Market Kyoto",
      },
      {
        time: "17:00",
        title: "祇園德屋（彈性）",
        icon: "🍡",
        category: "food",
        description: "有餘力且尚未售完才去；本蕨餅或抹茶本葛餅，不能訂位。",
        fare: "約 ¥1,000–2,000",
        mapQuery: "Gion Tokuya Kyoto",
        official: "https://tabelog.com/kyoto/A2601/A260301/26002075/",
      },
      {
        time: "19:00",
        title: "返回大阪",
        icon: "🌙",
        category: "transit",
        description: "祇園四條搭京阪至東福寺，轉 JR 經京都、大阪回新今宮。",
        route: "祇園四條 → 東福寺 → 京都 → 大阪 → 新今宮",
        ticket: "京阪用 ICOCA；JR 用 Mini Pass",
      },
    ],
  },
  {
    id: "d6",
    date: "2/16",
    weekday: "二",
    city: "京都＋宇治",
    title: "伏見稻荷・宇治・清水寺",
    summary: "早看千本鳥居，中午喝宇治抹茶，午後走京都東山。",
    ticket: "JR Kansai Mini Pass D2",
    color: "#3c765e",
    stops: [
      {
        time: "06:40",
        title: "JR 前往伏見稻荷",
        icon: "🚆",
        category: "transit",
        description: "由新今宮經大阪、京都，轉 JR 奈良線普通車到稻荷。",
        route: "新今宮 → 大阪 → 京都 → 稻荷",
        ticket: "JR Mini Pass",
      },
      {
        time: "07:50",
        title: "伏見稻荷大社",
        icon: "⛩️",
        category: "sight",
        description: "本殿、千本鳥居與奧社來回；不攻山頂，約 90 分鐘。",
        mapQuery: "Fushimi Inari Taisha",
        official: "https://inari.jp/",
      },
      {
        time: "09:30",
        title: "JR 前往宇治",
        icon: "🚆",
        category: "transit",
        description: "從 JR 稻荷搭奈良線普通車前往宇治。",
        route: "稻荷 → 宇治",
        ticket: "JR Mini Pass",
      },
      {
        time: "10:00",
        title: "平等院・鳳翔館",
        icon: "🦚",
        category: "sight",
        description: "先登記鳳凰堂內部時段，再參觀庭園與博物館。",
        fare: "¥700｜鳳凰堂內部另 ¥300",
        mapQuery: "Byodoin Uji",
        official: "https://www.byodoin.or.jp/guide/",
      },
      {
        time: "11:45",
        title: "三星園上林三入本店",
        icon: "🍵",
        category: "food",
        description: "選正統宇治抹茶與和菓子組合；若想吃華麗聖代再改中村藤吉。",
        fare: "依當日茶品",
        mapQuery: "三星園上林三入本店 宇治",
        official: "https://www.ujicha-kanbayashi.co.jp/tea-room",
      },
      {
        time: "13:30",
        title: "移動至清水五條",
        icon: "🚆",
        category: "transit",
        description: "JR 宇治到東福寺，轉京阪至清水五條，再步行上坡約 25 分鐘。",
        route: "宇治 → 東福寺 → 清水五條",
        ticket: "JR Mini Pass＋京阪 ICOCA",
      },
      {
        time: "14:30",
        title: "清水寺",
        icon: "🏯",
        category: "sight",
        description: "二月目前開至 18:00，午後入場仍有充足時間。",
        fare: "¥500",
        mapQuery: "Kiyomizu-dera Kyoto",
        official: "https://www.kiyomizudera.or.jp/news/open-hour.php",
      },
      {
        time: "16:15",
        title: "二年坂・祇園",
        icon: "🏮",
        category: "sight",
        description: "清水坂、三年坂、二年坂、八坂塔、八坂神社至花見小路。",
        route: "全程步行，下坡較輕鬆",
        mapQuery: "Hokan-ji Temple Yasaka Pagoda",
      },
      {
        time: "18:30",
        title: "返回大阪",
        icon: "🌙",
        category: "transit",
        description: "祇園四條搭京阪至東福寺，轉 JR 回新今宮。",
        ticket: "京阪用 ICOCA；JR 用 Mini Pass",
      },
    ],
  },
  {
    id: "d7",
    date: "2/17",
    weekday: "三",
    city: "返程",
    title: "關西機場・返回台灣",
    summary: "依電子機票倒推，至少在起飛前三小時抵達 T1。",
    ticket: "JR Kansai Mini Pass D3",
    color: "#4f5968",
    stops: [
      {
        time: "T−4h30",
        title: "退房",
        icon: "🧳",
        category: "stay",
        description: "完成垃圾、廚具與自助退房確認，直接帶行李前往 JR 新今宮站。",
        route: "飯店 → JR 新今宮",
      },
      {
        time: "T−4h",
        title: "JR 關空快速",
        icon: "🚆",
        category: "transit",
        description: "搭直達關西機場的關空快速，出發前一個月確認 2027 精確班次。",
        route: "JR 新今宮 → 關西空港｜約 50–60 分",
        ticket: "JR Mini Pass",
        note: "列車在日根野分離：務必搭行進方向前方 1–4 號車。JR 延誤或 QR 無法開啟，改搭南海空港急行，另付 ¥970。",
      },
      {
        time: "T−3 小時",
        title: "抵達 KIX T1",
        icon: "🛫",
        category: "transit",
        description: "依電子機票倒推，至少在起飛前三小時抵達 T1，確認報到區與行李重量。",
        mapQuery: "Kansai International Airport Terminal 1",
      },
      {
        time: "依機票",
        title: "JX821 關西起飛",
        icon: "✈️",
        category: "transit",
        description: "JX821 返回桃園機場 T1；精確時間以電子機票為準。",
        route: "KIX T1 → TPE T1",
        official: "https://www.starlux-airlines.com/zh-TW/timetable",
      },
    ],
  },
];

const foodSpots = [
  {
    icon: "🍜",
    kind: "拉麵",
    name: "麦と麺助",
    score: "3.85",
    rank: "大阪拉麵榜首級",
    date: "2/12 11:00",
    budget: "¥1,000–2,000",
    payment: "現金",
    booking: "不可預約・09:45 排隊",
    mapQuery: "麦と麺助 大阪 中津",
    url: "https://tabelog.com/osaka/A2701/A270101/27104891/",
  },
  {
    icon: "🥩",
    kind: "燒肉",
    name: "又三郎",
    score: "3.82",
    rank: "燒肉 WEST 百名店",
    date: "2/13 17:30",
    budget: "¥10,000–15,000",
    payment: "信用卡",
    booking: "必訂・選熟成肉＋燒肉套餐",
    mapQuery: "又三郎 焼肉 長居 大阪",
    url: "https://www.tablecheck.com/ja/matasaburo/reserve/message",
  },
  {
    icon: "🍱",
    kind: "豬排",
    name: "とんかつ ふじ井",
    score: "4.14",
    rank: "Tabelog Award 2026 Bronze",
    date: "2/14 11:30",
    budget: "¥3,000–5,000",
    payment: "信用卡／交通 IC",
    booking: "完全預約・名額開放即搶",
    mapQuery: "とんかつ ふじ井 千林",
    url: "https://tabelog.com/osaka/A2701/A270304/27131908/",
  },
  {
    icon: "🍨",
    kind: "甜點",
    name: "Circo D’oro",
    score: "3.92",
    rank: "大阪甜點榜首級",
    date: "2/12 15:10",
    budget: "約 ¥1,000",
    payment: "現金",
    booking: "不訂位・座位很少",
    mapQuery: "Gelateria Circo D'oro Osaka",
    url: "https://tabelog.com/osaka/A2701/A270204/27009531/",
  },
  {
    icon: "🍰",
    kind: "蛋糕",
    name: "ACIDRACINES",
    score: "3.85",
    rank: "甜點百名店",
    date: "2/12 16:20",
    budget: "¥1,000–2,000",
    payment: "信用卡",
    booking: "外帶・可電話留貨",
    mapQuery: "ACIDRACINES Osaka",
    url: "https://www.acidracines.com/",
  },
  {
    icon: "🍡",
    kind: "和菓子",
    name: "祇園德屋",
    score: "3.76",
    rank: "和菓子 WEST 百名店",
    date: "2/15 17:00",
    budget: "¥1,000–2,000",
    payment: "現場確認",
    booking: "不可預約・售完提早結束",
    mapQuery: "Gion Tokuya Kyoto",
    url: "https://tabelog.com/kyoto/A2601/A260301/26002075/",
  },
];

const alternatives = [
  {
    icon: "🥩",
    name: "京洛焼肉 ぽめ",
    label: "夢幻榜首",
    description: "約 4.13、可能要排近一年，套餐約 ¥15,000–20,000 且只收現金。可候補，但不拿它綁行程。",
    url: "https://tabelog.com/osaka/A2701/A270201/27119987/",
  },
  {
    icon: "🥩",
    name: "万両 南森町店",
    label: "燒肉平價替代",
    description: "連年百名店，預算約 ¥5,000–8,000；如果又三郎預算過高，改訂這間。",
    url: "https://tabelog.com/osaka/A2701/A270103/27002291/",
  },
  {
    icon: "🍱",
    name: "とんかつ中村",
    label: "豬排備案",
    description: "同在千林、約 3.9 分且較容易預約；想吃明確的豬排丼可選它。",
    url: "https://tabelog.com/osaka/A2701/A270304/27092639/",
  },
];

const transportCards = [
  {
    icon: "💳",
    title: "ICOCA",
    date: "全程基礎卡",
    price: "先儲值 ¥5,000",
    detail: "JR、Metro、南海、京阪、嵐電、京都巴士皆可刷；每人一張。",
    url: "https://www.westjr.co.jp/global/en/howto/icoca/",
  },
  {
    icon: "🚇",
    title: "Enjoy Eco Card",
    date: "2/12、2/13 使用",
    price: "平日 ¥820／週末 ¥620",
    detail: "兩天皆用 Metro 串線；不含 JR、南海與私鐵。",
    url: "https://subway.osakametro.co.jp/en/guide/page/enjoy-eco.php",
  },
  {
    icon: "🎫",
    title: "Osaka Amazing Pass",
    date: "2/14 使用",
    price: "1 日 ¥3,500",
    detail: "大阪城、空中庭園、HEP FIVE 加交通原價約 ¥4,820；QR 需網路，購買後 3 個月內用。",
    url: "https://osaka-amazing-pass.com/en/info.html",
  },
  {
    icon: "🚆",
    title: "JR Kansai Mini Pass",
    date: "2/15–2/17",
    price: "3 日 ¥3,000",
    detail: "海外通路購買；手機 QR 需即時網路。不能搭 HARUKA、特急或新幹線。",
    url: "https://www.westjr.co.jp/global/tc/ticket/pass/kansaimini/",
  },
];

const todoItems = [
  { id: "hotel", when: "現在", title: "確認飯店寄放行李與房間方向", detail: "高樓層、背向軌道、13:00 左右能否寄放。" },
  { id: "yakiniku", when: "2026/12", title: "預約又三郎或万両", detail: "又三郎選熟成肉＋燒肉套餐。" },
  { id: "tonkatsu", when: "1/10 21:00", title: "搶 ふじ井 2/14 11:30", detail: "依現行規則為日本時間 22:00 開放；先複查店家二月月曆。" },
  { id: "chasen", when: "2027/1 中", title: "電話保留日本製茶筅", detail: "指定久保駒吉・数穂・上・日本製。" },
  { id: "passes", when: "2027/1 下", title: "購買周遊卡與 JR Mini Pass", detail: "再次核對售價、效期及手機 QR 使用方式。" },
  { id: "hours", when: "出發前 2 週", title: "複查臨休與 2027 時刻", detail: "餐廳 IG、茶店、JR、南海與京都景點。" },
  { id: "flight", when: "出發前 72 小時", title: "確認 JX820／JX821", detail: "班機時間、機型、行李與 KIX 報到櫃檯。" },
];

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function ExternalButton({ href, children, subtle = false }: { href: string; children: React.ReactNode; subtle?: boolean }) {
  return (
    <a className={`action-button${subtle ? " subtle" : ""}`} href={href} target="_blank" rel="noreferrer">
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const [activeDayId, setActiveDayId] = useState("d1");
  const [activeCategory, setActiveCategory] = useState<"all" | Category>("all");
  const [search, setSearch] = useState("");
  const [checkedTodos, setCheckedTodos] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("osaka-trip-todos");
      if (saved) setCheckedTodos(JSON.parse(saved));
      const savedDay = window.localStorage.getItem("osaka-trip-active-day");
      if (savedDay && tripDays.some((day) => day.id === savedDay)) setActiveDayId(savedDay);
    } catch {
      // Device-local convenience only; the site still works without storage.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("osaka-trip-active-day", activeDayId);
    } catch {
      // Ignore unavailable browser storage.
    }
  }, [activeDayId, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("osaka-trip-todos", JSON.stringify(checkedTodos));
    } catch {
      // Ignore unavailable browser storage.
    }
  }, [checkedTodos, storageReady]);

  const activeDay = tripDays.find((day) => day.id === activeDayId) ?? tripDays[0];
  const visibleStops = activeDay.stops.filter((stop) => activeCategory === "all" || stop.category === activeCategory);

  const searchResults = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("zh-Hant");
    if (!keyword) return [];
    const dayResults = tripDays.flatMap((day) =>
      day.stops
        .filter((stop) => `${stop.title} ${stop.description} ${stop.route ?? ""}`.toLocaleLowerCase("zh-Hant").includes(keyword))
        .map((stop) => ({ key: `${day.id}-${stop.time}-${stop.title}`, icon: stop.icon, title: stop.title, subtitle: `${day.date}（${day.weekday}）・${day.city}`, dayId: day.id, target: "day-planner" }))
    );
    const foodResults = foodSpots
      .filter((spot) => `${spot.name} ${spot.kind} ${spot.rank}`.toLocaleLowerCase("zh-Hant").includes(keyword))
      .map((spot) => ({ key: `food-${spot.name}`, icon: spot.icon, title: spot.name, subtitle: `${spot.kind}・${spot.date}`, target: "food" }));
    const passResults = transportCards
      .filter((pass) => `${pass.title} ${pass.detail}`.toLocaleLowerCase("zh-Hant").includes(keyword))
      .map((pass) => ({ key: `pass-${pass.title}`, icon: pass.icon, title: pass.title, subtitle: `${pass.date}・${pass.price}`, target: "transport" }));
    return [...dayResults, ...foodResults, ...passResults].slice(0, 10);
  }, [search]);

  function selectSearchResult(result: { dayId?: string; target: string }) {
    if (result.dayId) {
      setActiveDayId(result.dayId);
      setActiveCategory("all");
    }
    setSearch("");
    window.setTimeout(() => document.getElementById(result.target)?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }

  async function copyChasenPhrase() {
    const text = "奈良・高山製の国産茶筌を一つ探しています。久保駒吉作の数穂・上は店頭在庫がありますか。2月15日まで取り置きできますか？";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const completedCount = todoItems.filter((item) => checkedTodos[item.id]).length;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="回到網站頂端">
          <span className="brand-mark" aria-hidden="true">旅</span>
          <span><strong>OSAKA 2027</strong><small>大阪・京都自由行</small></span>
        </a>
        <nav className="desktop-nav" aria-label="主要導覽">
          <a href="#day-planner">每日行程</a>
          <a href="#food">美食</a>
          <a href="#transport">交通</a>
          <a href="#chasen">茶筅</a>
          <a href="#todo">待辦</a>
        </nav>
        <div className="search-wrap">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">搜尋行程</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜尋景點、餐廳、票券" />
          </label>
          {search.trim() && (
            <div className="search-results" role="listbox" aria-label="搜尋結果">
              {searchResults.length > 0 ? searchResults.map((result) => (
                <button key={result.key} type="button" onClick={() => selectSearchResult(result)}>
                  <span className="search-result-icon" aria-hidden="true">{result.icon}</span>
                  <span><strong>{result.title}</strong><small>{result.subtitle}</small></span>
                  <span aria-hidden="true">→</span>
                </button>
              )) : <p>找不到相符項目，試試「燒肉」或「京都」。</p>}
            </div>
          )}
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>7 DAYS</span> 2027.02.11 — 02.17</div>
          <h1>大阪的熱鬧，<br /><em>京都的靜。</em></h1>
          <p className="hero-lead">一份可直接照走的手機旅程：每天只看當日路線，餐廳、車站、茶筅店一鍵開地圖。</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#day-planner"><span aria-hidden="true">🗓️</span> 開始看行程</a>
            <a className="secondary-cta" href="#todo"><span aria-hidden="true">✓</span> 查看預約待辦</a>
          </div>
          <div className="hero-notes">
            <span><i aria-hidden="true">✈️</i> 星宇直飛</span>
            <span><i aria-hidden="true">🏨</i> 新今宮 6 晚</span>
            <span><i aria-hidden="true">🚆</i> 大阪＋京都＋宇治</span>
            <span><i aria-hidden="true">◷</i> 資料查核 2026/08/13</span>
          </div>
        </div>

        <aside className="trip-ticket" aria-label="航班與住宿摘要">
          <div className="ticket-top">
            <span className="ticket-label">TRIP PASS</span>
            <span className="ticket-code">KIX · 0211</span>
          </div>
          <div className="flight-line">
            <div><strong>JX820</strong><span>TPE</span><small>2/11 · 時間依電子機票</small></div>
            <div className="flight-path"><span aria-hidden="true">✈</span></div>
            <div className="align-right"><strong>KIX</strong><span>T1</span><small>抵達後預留 90 分鐘</small></div>
          </div>
          <div className="ticket-dash" />
          <div className="ticket-info">
            <div><span>返程</span><strong>2/17 · JX821</strong><small>起飛前 3 小時抵達 KIX</small></div>
            <div><span>住宿</span><strong>新今宮 · 6 晚</strong><small>廚房・洗衣機・自助入住</small></div>
          </div>
          <div className="hotel-alert"><span aria-hidden="true">🔔</span><p><strong>入住前先確認</strong>13:00 能否寄放行李，並要求高樓層背向軌道。</p></div>
        </aside>
      </section>

      <section className="quick-stats" aria-label="旅程摘要">
        <div><span className="stat-icon" aria-hidden="true">🗓️</span><strong>7 天 6 夜</strong><small>3 大阪核心日 · 2 京都日</small></div>
        <div><span className="stat-icon" aria-hidden="true">🍜</span><strong>6 間精選</strong><small>拉麵 · 燒肉 · 豬排 · 甜點</small></div>
        <div><span className="stat-icon" aria-hidden="true">🎫</span><strong>約 ¥10–11K</strong><small>每人交通與 Pass 概算</small></div>
        <div><span className="stat-icon" aria-hidden="true">🍵</span><strong>日本製茶筅</strong><small>2/15 京都完成購買</small></div>
      </section>

      <section className="section day-section" id="day-planner">
        <div className="section-heading">
          <div><span className="section-kicker">DAILY ROUTE</span><h2>每天怎麼走</h2></div>
          <p>先選日期，再用圖示只看景點、美食或交通。每站的地圖會在新頁開啟。</p>
        </div>

        <div className="day-tabs" role="tablist" aria-label="選擇旅行日期">
          {tripDays.map((day) => (
            <button
              key={day.id}
              type="button"
              role="tab"
              aria-selected={activeDayId === day.id}
              className={activeDayId === day.id ? "active" : ""}
              onClick={() => { setActiveDayId(day.id); setActiveCategory("all"); }}
              style={{ "--day-color": day.color } as React.CSSProperties}
            >
              <small>DAY {day.id.slice(1)}</small>
              <strong>{day.date}</strong>
              <span>週{day.weekday} · {day.city}</span>
            </button>
          ))}
        </div>

        <article className="day-board" style={{ "--day-color": activeDay.color } as React.CSSProperties}>
          <div className="day-board-header">
            <div>
              <span className="day-number">DAY {activeDay.id.slice(1)}</span>
              <h3>{activeDay.title}</h3>
              <p>{activeDay.summary}</p>
            </div>
            <div className="ticket-pill"><span aria-hidden="true">🎫</span><span><small>當日票券</small><strong>{activeDay.ticket}</strong></span></div>
          </div>

          <div className="category-filters" aria-label="篩選當日行程">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                aria-pressed={activeCategory === category.id}
                className={activeCategory === category.id ? "active" : ""}
                onClick={() => setActiveCategory(category.id)}
              ><span aria-hidden="true">{category.icon}</span>{category.label}</button>
            ))}
          </div>

          <div className="timeline">
            {visibleStops.length > 0 ? visibleStops.map((stop, index) => (
              <article className="timeline-item" key={`${stop.time}-${stop.title}`}>
                <time>{stop.time}</time>
                <div className="timeline-marker"><span aria-hidden="true">{stop.icon}</span></div>
                <div className="stop-card">
                  <div className="stop-topline">
                    <div><span className={`category-tag ${stop.category}`}>{categories.find((item) => item.id === stop.category)?.label}</span><h4>{stop.title}</h4></div>
                    <span className="stop-count">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p>{stop.description}</p>
                  <div className="stop-meta">
                    {stop.route && <span><i aria-hidden="true">→</i>{stop.route}</span>}
                    {stop.fare && <span><i aria-hidden="true">¥</i>{stop.fare}</span>}
                    {stop.ticket && <span><i aria-hidden="true">票</i>{stop.ticket}</span>}
                  </div>
                  {stop.note && <div className="inline-note"><span aria-hidden="true">!</span>{stop.note}</div>}
                  {(stop.mapQuery || stop.official) && <div className="stop-actions">
                    {stop.mapQuery && <ExternalButton href={mapsUrl(stop.mapQuery)}>📍 開啟地圖</ExternalButton>}
                    {stop.official && <ExternalButton href={stop.official} subtle>官方／店家資訊</ExternalButton>}
                  </div>}
                </div>
              </article>
            )) : <div className="empty-filter">這一天沒有此類項目，請切換其他圖示。</div>}
          </div>
        </article>
      </section>

      <section className="section food-section" id="food">
        <div className="section-heading light">
          <div><span className="section-kicker">LOCAL PICKS</span><h2>日本在地高評美食</h2></div>
          <p>以 2026/8 日本 Tabelog 現行評分安排；分數會浮動，營業日於 2027/1 再確認。</p>
        </div>
        <div className="food-grid">
          {foodSpots.map((spot) => (
            <article className="food-card" key={spot.name}>
              <div className="food-card-top"><span className="food-icon" aria-hidden="true">{spot.icon}</span><span className="food-kind">{spot.kind}</span><span className="score"><b>{spot.score}</b><small>Tabelog</small></span></div>
              <h3>{spot.name}</h3>
              <p className="rank-line">★ {spot.rank}</p>
              <dl>
                <div><dt>安排</dt><dd>{spot.date}</dd></div>
                <div><dt>預算</dt><dd>{spot.budget}</dd></div>
                <div><dt>付款</dt><dd>{spot.payment}</dd></div>
                <div><dt>預約</dt><dd>{spot.booking}</dd></div>
              </dl>
              <div className="food-actions"><ExternalButton href={mapsUrl(spot.mapQuery)}>📍 地圖</ExternalButton><ExternalButton href={spot.url} subtle>店家資訊</ExternalButton></div>
            </article>
          ))}
        </div>
        <div className="alternative-strip">
          <div className="alternative-heading"><span aria-hidden="true">↺</span><div><strong>訂不到或想換預算</strong><small>不必重排行程的備案</small></div></div>
          {alternatives.map((item) => (
            <a key={item.name} href={item.url} target="_blank" rel="noreferrer">
              <span aria-hidden="true">{item.icon}</span><div><small>{item.label}</small><strong>{item.name}</strong><p>{item.description}</p></div><b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section transport-section" id="transport">
        <div className="section-heading">
          <div><span className="section-kicker">SMART FARES</span><h2>這樣買票最省</h2></div>
          <p>不堆疊大範圍周遊券；每張票只放在真正能回本的那一天。</p>
        </div>
        <div className="transport-layout">
          <div className="pass-grid">
            {transportCards.map((pass) => (
              <a href={pass.url} target="_blank" rel="noreferrer" className="pass-card" key={pass.title}>
                <span className="pass-icon" aria-hidden="true">{pass.icon}</span>
                <div><small>{pass.date}</small><h3>{pass.title}</h3><strong>{pass.price}</strong><p>{pass.detail}</p></div>
                <span className="external-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <aside className="cost-card">
            <span className="cost-label">PER PERSON</span>
            <h3>交通＋Pass 概算</h3>
            <div className="cost-total"><small>約</small><strong>¥10,000</strong><span>— 11,000</span></div>
            <div className="cost-bars" aria-label="費用組成示意">
              <span style={{ width: "29%" }} title="大阪周遊卡" />
              <span style={{ width: "25%" }} title="JR Mini Pass" />
              <span style={{ width: "18%" }} title="京都市內交通" />
              <span style={{ width: "28%" }} title="其他交通" />
            </div>
            <ul><li><i className="c1" />大阪周遊卡 ¥3,500</li><li><i className="c2" />JR Mini Pass ¥3,000</li><li><i className="c3" />京都私鐵／巴士約 ¥1,300</li><li><i className="c4" />南海、Metro、ICOCA 約 ¥2,200+</li></ul>
            <p className="cash-note"><span aria-hidden="true">💴</span>另備每人 ¥10,000–20,000 現金，拉麵、Gelato 與部分店家不能刷卡。</p>
          </aside>
        </div>
      </section>

      <section className="section chasen-section" id="chasen">
        <div className="chasen-visual" aria-hidden="true"><span className="tea-ring ring-one" /><span className="tea-ring ring-two" /><span className="whisk-icon">茶<br />筅</span><small>TAKAYAMA · NARA</small></div>
        <div className="chasen-copy">
          <span className="section-kicker">MADE IN JAPAN</span>
          <h2>要買的是奈良高山製，<br />不是只在日本販售。</h2>
          <p>2/15 到丸久小山園西洞院店領取預留品。盒底須同時確認「日本製」「奈良高山」及工藝師姓名。</p>
          <div className="product-card">
            <div className="product-title"><span aria-hidden="true">🍵</span><div><small>主選規格</small><strong>久保駒吉・数穂・上</strong></div><b>約 ¥5,830</b></div>
            <ul><li><span>✓</span>初學日常薄茶實用</li><li><span>✓</span>日本傳統工藝士製</li><li><span>✓</span>同店元庵可喝抹茶</li></ul>
            <p className="stock-warning"><span aria-hidden="true">!</span><strong>目前官網顯示售罄：</strong>店頭庫存可能不同，只有電話確認保留後才能視為買得到；不要誤買韓國製「並」¥3,080。</p>
            <div className="product-actions"><ExternalButton href={mapsUrl("丸久小山園 西洞院店 元庵")}>📍 店舖地圖</ExternalButton><ExternalButton href="https://www.marukyu-koyamaen.co.jp/english/catalog/Simple_English_Catalog_for_Eng_HP_2026.01.01.pdf" subtle>官方型錄</ExternalButton></div>
          </div>
          <div className="japanese-phrase">
            <div><span>店頭日文</span><button type="button" onClick={copyChasenPhrase}>{copied ? "已複製 ✓" : "複製文字"}</button></div>
            <p lang="ja">奈良・高山製の国産茶筌を一つ探しています。久保駒吉作の数穂・上は店頭在庫がありますか。2月15日まで取り置きできますか？</p>
          </div>
          <div className="backup-line"><span aria-hidden="true">↺</span><p><strong>缺貨備案：</strong>京都一保堂「高山茶筌 80 本立」，同樣標示日本奈良製，現行約 ¥6,600。</p><ExternalButton href="https://www.ippodo-tea.co.jp/products/utensils901008" subtle>查看備案</ExternalButton></div>
          <div className="backup-line last-resort"><span aria-hidden="true">C</span><p><strong>最後備案：</strong>兩間京都店都無貨，才另排半天到奈良高山「竹茗堂左文」，出發前先電話確認。</p><ExternalButton href="https://chasen.jp/store" subtle>產地店舖</ExternalButton></div>
          <div className="closure-warning"><span aria-hidden="true">⚠️</span><p><strong>不可拖到最後兩天：</strong>2/16 是第三個星期二、2/17 是星期三，丸久小山園兩天皆休。</p></div>
        </div>
      </section>

      <section className="section todo-section" id="todo">
        <div className="section-heading">
          <div><span className="section-kicker">BOOKING CHECKLIST</span><h2>出發前待辦</h2></div>
          <div className="todo-progress"><span><b>{completedCount}</b> / {todoItems.length} 完成</span><div><i style={{ width: `${(completedCount / todoItems.length) * 100}%` }} /></div></div>
        </div>
        <div className="todo-grid">
          {todoItems.map((item) => (
            <label className={`todo-card${checkedTodos[item.id] ? " checked" : ""}`} key={item.id}>
              <input type="checkbox" checked={Boolean(checkedTodos[item.id])} onChange={(event) => setCheckedTodos((current) => ({ ...current, [item.id]: event.target.checked }))} />
              <span className="custom-check" aria-hidden="true">✓</span>
              <span className="todo-time">{item.when}</span>
              <span className="todo-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
            </label>
          ))}
        </div>
        <p className="storage-note"><span aria-hidden="true">☁️</span>勾選進度只儲存在目前裝置，不會上傳個人資料。</p>
      </section>

      <section className="hotel-section" id="hotel">
        <div><span className="section-kicker">STAY VERDICT</span><h2>住宿先保留，<br />淺眠才換。</h2></div>
        <div className="hotel-verdict">
          <div className="hotel-score"><strong>9.0</strong><span>Booking<br />住客評分</span></div>
          <div><h3>Apartment Hotel 11 Shinimamiya 3</h3><p>機場直達、JR／Metro 都近，加上廚房與洗衣機，對六晚行程的性價比很好。</p><div className="pros"><span>✓ 機場無轉車</span><span>✓ 房內料理</span><span>✓ 洗衣機</span></div></div>
        </div>
        <div className="hotel-caveat"><span aria-hidden="true">🔊</span><div><strong>唯一足以換飯店的理由：鐵路噪音</strong><p>列車約到午夜，清晨五點左右又開始；如果非常淺眠，六晚總價只貴 10–15% 時可改 ESLEAD Namba Daikokucho。</p></div></div>
        <div className="hotel-actions"><ExternalButton href={mapsUrl("Apartment Hotel 11 Shinimamiya 3 Osaka")}>📍 住宿地圖</ExternalButton><ExternalButton href="https://www.booking.com/reviews/jp/hotel/apartment-11-shinimamiya-3.en-gb.html" subtle>查看住客評論</ExternalButton></div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark" aria-hidden="true">旅</span><div><strong>OSAKA 2027</strong><small>大阪・京都 7 天 6 夜</small></div></div>
        <p>營業時間、評分與票價依 2026/8 可查資料整理；2027 年 1 月請再次核對臨休與班次。</p>
        <a href="#top">回到頂端 ↑</a>
      </footer>

      <nav className="mobile-nav" aria-label="手機快速導覽">
        <a href="#day-planner"><span aria-hidden="true">🗓️</span>行程</a>
        <a href="#food"><span aria-hidden="true">🍜</span>美食</a>
        <a href="#transport"><span aria-hidden="true">🎫</span>交通</a>
        <a href="#chasen"><span aria-hidden="true">🍵</span>茶筅</a>
        <a href="#todo"><span aria-hidden="true">✓</span>待辦</a>
      </nav>
    </main>
  );
}
