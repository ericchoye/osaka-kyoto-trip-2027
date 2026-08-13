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
    title: "木津朝市・黑毛和牛・熟成燒肉",
    summary: "把黑門改成木津市場；肉買完立刻搭計程車送回冰箱，不提著逛街。",
    ticket: "Enjoy Eco Card ¥620＋短程計程車",
    color: "#b24845",
    stops: [
      {
        time: "08:10",
        title: "計程車到難波八阪",
        icon: "🚕",
        category: "transit",
        description: "從住宿直接叫車，省掉轉車與不必要的早晨步行。",
        route: "住宿 → 難波八阪神社｜約 5–10 分",
        fare: "概估 ¥700–1,000／車｜依路況跳表",
        note: "若想省錢，才改搭 Metro 到大國町再步行約 8 分。",
      },
      {
        time: "08:25",
        title: "難波八阪神社",
        icon: "🦁",
        category: "sight",
        description: "先拍巨型獅子殿，早上人潮相對少。",
        mapQuery: "Namba Yasaka Jinja",
      },
      {
        time: "08:55",
        title: "前往木津市場",
        icon: "🚕",
        category: "transit",
        description: "不再走原規劃的 20 分鐘；直接搭短程計程車。想走路時約 10 分鐘。",
        route: "難波八阪神社 → 木津市場｜車程約 3–5 分",
        fare: "概估 ¥600–800／車｜依路況跳表",
      },
      {
        time: "09:00",
        title: "木津市場・木津の朝市",
        icon: "🐟",
        category: "shopping",
        description: "市場官方建議 08:30–10:30 採買；2/13 是第二個週六，依現行規則很可能有朝市活動。",
        note: "2027 市場日曆尚未公布，出發前再確認；多數攤位以現金最穩。",
        mapQuery: "Osaka Kizu Wholesale Market",
        official: "https://kizu-ichiba.com/introduction/",
      },
      {
        time: "09:40",
        title: "千惣・喜久安買黑毛和牛",
        icon: "🥩",
        category: "shopping",
        description: "西門外的黑毛和牛專門店，可依料理方式現切；選油脂不要太重的赤身燒肉片。",
        route: "木津市場西門旁",
        note: "確認標示「黒毛和牛」、消費期限至少到 2/14，並索取保冷劑。",
        mapQuery: "千惣 喜久安 木津市場 大阪",
        official: "https://ojg.co.jp/",
      },
      {
        time: "10:10",
        title: "計程車送肉回住宿",
        icon: "❄️",
        category: "transit",
        description: "肉買完直接回住宿冷藏，不帶著和牛繼續逛。放妥後休息再出門。",
        route: "木津市場 → 住宿｜約 5–8 分",
        fare: "概估 ¥700–1,000／車｜依路況跳表",
      },
      {
        time: "11:30",
        title: "法善寺・道頓堀",
        icon: "📸",
        category: "sight",
        description: "從動物園前搭御堂筋線到難波，再走法善寺橫丁、Glico 看板與戎橋。",
        route: "動物園前 M22 → 難波 M20",
        ticket: "週末 Enjoy Eco Card",
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
        ticket: "週末 Enjoy Eco Card",
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
    title: "大阪城・豬排・黑毛和牛料理",
    summary: "周遊卡日把移動改成地鐵直達；傍晚提早回房料理前一天買的和牛。",
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
        icon: "🚇",
        category: "transit",
        description: "不走到天滿橋；回谷町四丁目站，搭谷町線直達千林大宮。",
        route: "谷町四丁目 T23 → 千林大宮 T14",
        ticket: "大阪周遊卡",
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
        icon: "🚇",
        category: "transit",
        description: "千林大宮搭谷町線直達東梅田，不必轉車。",
        route: "千林大宮 T14 → 東梅田 T20",
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
        time: "17:00",
        title: "回住宿準備晚餐",
        icon: "🚇",
        category: "transit",
        description: "從梅田搭御堂筋線直達動物園前，預留料理與整理廚房時間。",
        route: "梅田 M16 → 動物園前 M22",
        ticket: "大阪周遊卡",
      },
      {
        time: "18:00",
        title: "自己料理黑毛和牛",
        icon: "🍳",
        category: "food",
        description: "料理前一天在木津市場買的黑毛和牛；先煎少量測試油煙與熟度，再分批下鍋。",
        note: "入住前先確認房內可煎肉、抽油煙設備與鍋具；生熟用具分開。",
      },
    ],
  },
  {
    id: "d5",
    date: "2/15",
    weekday: "一",
    city: "京都",
    title: "伏見稻荷・清水寺・日本製茶筅",
    summary: "京都縮為一天，只留首訪核心；兩段短程計程車換體力，不塞嵐山、金閣寺與宇治。",
    ticket: "ICOCA＋短程計程車",
    color: "#57775c",
    stops: [
      {
        time: "06:40",
        title: "JR 前往伏見稻荷",
        icon: "🚆",
        category: "transit",
        description: "新今宮經大阪、京都，轉 JR 奈良線普通車至稻荷。",
        route: "新今宮 → 大阪 → 京都 → 稻荷",
        ticket: "ICOCA／一般車票",
      },
      {
        time: "07:50",
        title: "伏見稻荷大社",
        icon: "⛩️",
        category: "sight",
        description: "本殿、千本鳥居與奧社來回；不攻山頂，約 80–90 分鐘。",
        mapQuery: "Fushimi Inari Taisha",
        official: "https://inari.jp/",
      },
      {
        time: "09:25",
        title: "計程車至清水寺東山區",
        icon: "🚕",
        category: "transit",
        description: "從伏見稻荷直接搭車，避開京阪轉車與清水五條約 25 分鐘上坡。",
        route: "伏見稻荷 → 清水坂／茶碗坂可下車處｜約 15–20 分",
        fare: "概估 ¥2,000–3,000／車｜依路況跳表",
        note: "車輛不能開到本堂，最後仍有一段坡道；請司機停在合法且最靠近的下車點。",
        official: "https://www.kiyomizudera.or.jp/access/index.html",
      },
      {
        time: "10:00",
        title: "清水寺",
        icon: "🏯",
        category: "sight",
        description: "由清水舞台往地主神社周邊、音羽瀑布參觀；保留坡道慢走時間。",
        fare: "¥500",
        mapQuery: "Kiyomizu-dera Kyoto",
        official: "https://www.kiyomizudera.or.jp/",
      },
      {
        time: "11:30",
        title: "三年坂・二年坂・祇園",
        icon: "🏮",
        category: "sight",
        description: "沿三年坂、二年坂、八坂塔往祇園方向下坡；這段保留給值得走的街景。",
        route: "清水寺 → 八坂塔 → 高台寺外圍 → 祇園",
        mapQuery: "Hokan-ji Temple Yasaka Pagoda",
      },
      {
        time: "12:20",
        title: "祇園午餐・坐下休息",
        icon: "🍚",
        category: "food",
        description: "安排 60 分鐘正式午餐，不邊走邊吃；避開排隊名店，保住下午取茶筅時間。",
        route: "祇園／河原町周邊",
      },
      {
        time: "13:25",
        title: "短程計程車到西洞院",
        icon: "🚕",
        category: "transit",
        description: "把祇園到烏丸御池的非景觀路段改搭車，午後留體力。",
        route: "祇園 → 丸久小山園西洞院店｜約 10–15 分",
        fare: "概估 ¥1,200–1,800／車｜依路況跳表",
      },
      {
        time: "14:00",
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
        time: "15:25",
        title: "錦市場",
        icon: "🛍️",
        category: "shopping",
        description: "短程搭地下鐵或計程車前往；多數店約 17:00 前收攤，採買茶點與乾貨。",
        route: "烏丸御池 → 四條／錦市場",
        ticket: "ICOCA",
        mapQuery: "Nishiki Market Kyoto",
      },
      {
        time: "17:00",
        title: "返回大阪",
        icon: "🌙",
        category: "transit",
        description: "從烏丸搭阪急到大阪梅田，再轉 JR 回新今宮；不繞京都站。",
        route: "烏丸 → 大阪梅田 → JR 大阪 → 新今宮",
        ticket: "ICOCA",
        note: "本日刪除嵐山、金閣寺與宇治，避免一日塞成兩日的疲勞量。",
      },
    ],
  },
  {
    id: "d6",
    date: "2/16",
    weekday: "二",
    city: "大阪",
    title: "海遊館・天保山・收行李",
    summary: "京都後安排低強度大阪港日；不喜歡水族館可整天改成休息與最後採買。",
    ticket: "ICOCA 約 ¥740 往返",
    color: "#397087",
    stops: [
      {
        time: "10:00",
        title: "前往大阪港",
        icon: "🚆",
        category: "transit",
        description: "睡飽再出門；JR 至弁天町，站內轉中央線到大阪港。",
        route: "新今宮 → 弁天町 → 大阪港｜出站步行約 5 分",
        fare: "往返概估約 ¥740／人",
        ticket: "ICOCA",
      },
      {
        time: "11:00",
        title: "大阪海遊館",
        icon: "🐋",
        category: "sight",
        description: "指定時段入場，官方常見參觀時間約 2 小時；室內行程不受冬季天氣影響。",
        fare: "現行成人動態票價約 ¥2,700–3,500",
        note: "2027 時段未公布，出發前 4–6 週再買電子票。",
        mapQuery: "Osaka Aquarium Kaiyukan",
        official: "https://www.kaiyukan.com/info/hours/",
      },
      {
        time: "13:15",
        title: "天保山午餐・休息",
        icon: "🍚",
        category: "food",
        description: "在 Marketplace 坐下吃午餐；不安排市場連吃，留時間休息。",
        mapQuery: "Tempozan Marketplace Osaka",
      },
      {
        time: "14:30",
        title: "天保山大觀覽車（可刪）",
        icon: "🎡",
        category: "sight",
        description: "體力足夠才搭，約 15 分鐘；累了就直接回住宿。",
        mapQuery: "Tempozan Ferris Wheel",
      },
      {
        time: "16:00",
        title: "回住宿休息・打包",
        icon: "🧳",
        category: "stay",
        description: "最後一晚不再塞遠點；整理行李、洗衣，晚餐再到天王寺或超市簡單採買。",
        route: "大阪港 → 弁天町 → 新今宮",
        ticket: "ICOCA",
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
    ticket: "ICOCA／JR 單次付費",
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
        ticket: "ICOCA／一般車票",
        note: "列車在日根野分離：務必搭行進方向前方 1–4 號車。JR 延誤時，改由南海新今宮搭空港急行。",
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
    icon: "🍵",
    kind: "抹茶",
    name: "丸久小山園 元庵",
    score: "3.63",
    rank: "Cafe WEST 百名店 2025",
    date: "2/15 14:00",
    budget: "¥1,000–2,000",
    payment: "現場確認",
    booking: "茶房不可預約・茶筅先保留",
    mapQuery: "丸久小山園 西洞院店 元庵",
    url: "https://www.marukyu-koyamaen.co.jp/motoan.html",
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
    detail: "大阪城、空中庭園與市內交通仍可回本；空中庭園須在 15:00 前完成入場。",
    url: "https://osaka-amazing-pass.com/en/info.html",
  },
  {
    icon: "🚆",
    title: "京都／機場單次付費",
    date: "2/15、2/17",
    price: "ICOCA／一般車票",
    detail: "京都只去一天且回程搭阪急，Mini Pass 不再划算；保留改線彈性。關空快速坐前方 1–4 號車。",
    url: "https://www.westjr.co.jp/global/en/howto/icoca/",
  },
];

const todoItems = [
  { id: "hotel", when: "現在", title: "確認飯店寄放行李與房間方向", detail: "高樓層、背向軌道、13:00 左右能否寄放。" },
  { id: "kitchen", when: "現在", title: "確認房內可煎肉與鍋具", detail: "詢問油煙規則、抽風設備、平底鍋與冷藏空間。" },
  { id: "yakiniku", when: "2026/12", title: "預約又三郎或万両", detail: "又三郎選熟成肉＋燒肉套餐。" },
  { id: "tonkatsu", when: "1/10 21:00", title: "搶 ふじ井 2/14 11:30", detail: "依現行規則為日本時間 22:00 開放；先複查店家二月月曆。" },
  { id: "chasen", when: "2027/1 中", title: "電話保留日本製茶筅", detail: "指定久保駒吉・数穂・上・日本製。" },
  { id: "kizu", when: "2027/1 中", title: "複查木津市場日曆", detail: "確認 2/13 朝市、千惣・喜久安營業與肉品保冷。" },
  { id: "passes", when: "2027/1 下", title: "購買大阪周遊卡", detail: "Mini Pass 先不買；依 2027 新票價重算京都與機場單次票。" },
  { id: "kaiyukan", when: "出發前 4–6 週", title: "決定是否買海遊館時段票", detail: "不喜歡水族館就保留為休息與最後採買日。" },
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
  const [copiedWagyu, setCopiedWagyu] = useState(false);
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

  async function copyWagyuPhrase() {
    const text = "明日ホテルで食べます。脂が重すぎない赤身寄りの黒毛和牛を、焼肉用にお願いします。保冷剤を付けて、消費期限も教えてください。";
    try {
      await navigator.clipboard.writeText(text);
      setCopiedWagyu(true);
      window.setTimeout(() => setCopiedWagyu(false), 2200);
    } catch {
      setCopiedWagyu(false);
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
            <span><i aria-hidden="true">🚆</i> 大阪＋京都一日精華</span>
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
        <div><span className="stat-icon" aria-hidden="true">🗓️</span><strong>7 天 6 夜</strong><small>4 大阪日 · 1 京都日</small></div>
        <div><span className="stat-icon" aria-hidden="true">🥩</span><strong>黑毛和牛</strong><small>木津市場買 · 隔晚料理</small></div>
        <div><span className="stat-icon" aria-hidden="true">🎫</span><strong>約 ¥9–10K</strong><small>每人鐵路與 Pass 概算</small></div>
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

      <section className="section wagyu-section" id="wagyu">
        <div className="section-heading">
          <div><span className="section-kicker">COOK AT HOME</span><h2>黑毛和牛，去木津市場買</h2></div>
          <p>主選可現切的專門店；買完先送回冰箱，隔天晚餐料理，動線與保存都比較穩。</p>
        </div>
        <div className="wagyu-layout">
          <article className="wagyu-primary">
            <div className="wagyu-label"><span aria-hidden="true">🥩</span><small>第一選擇 · 2/13 09:40</small></div>
            <h3>千惣・喜久安</h3>
            <p>位在木津市場西門旁，店家主打高品質黑毛和牛並可依用途現切。這次指定赤身比例高一些的燒肉片，較適合房內平底鍋。</p>
            <ul>
              <li><span>時間</span><strong>現行 03:00–12:00</strong></li>
              <li><span>品項</span><strong>黒毛和牛・焼肉用</strong></li>
              <li><span>回程</span><strong>計程車直送冰箱</strong></li>
            </ul>
            <div className="wagyu-actions"><ExternalButton href={mapsUrl("千惣 喜久安 木津市場 大阪")}>📍 店舖地圖</ExternalButton><ExternalButton href="https://ojg.co.jp/" subtle>店家網站</ExternalButton></div>
          </article>
          <article className="wagyu-checklist">
            <span className="section-kicker">BUYING CHECK</span>
            <h3>現場確認四件事</h3>
            <ol>
              <li><b>01</b><span>標籤要寫「黒毛和牛」，不是只有「国産牛」。</span></li>
              <li><b>02</b><span>請店家切成燒肉用，選赤身偏多、油脂別太重。</span></li>
              <li><b>03</b><span>消費期限至少到 2/14，並附保冷劑。</span></li>
              <li><b>04</b><span>回房立刻冷藏；料理時生熟夾具、砧板分開。</span></li>
            </ol>
            <div className="japanese-phrase wagyu-phrase">
              <div><span>買肉日文</span><button type="button" onClick={copyWagyuPhrase}>{copiedWagyu ? "已複製 ✓" : "複製文字"}</button></div>
              <p lang="ja">明日ホテルで食べます。脂が重すぎない赤身寄りの黒毛和牛を、焼肉用にお願いします。保冷剤を付けて、消費期限も教えてください。</p>
            </div>
          </article>
        </div>
        <div className="wagyu-backup"><span aria-hidden="true">↺</span><p><strong>市場內備案：和島精肉店</strong>販售「國產和牛」，現行 04:00–12:00。若主店休息可改買，但仍要現場確認包裝是否明寫「黒毛和牛」。</p><ExternalButton href="https://kizu-ichiba.com/shop/%E5%92%8C%E5%B3%B6%E7%B2%BE%E8%82%89%E5%BA%97/" subtle>查看市場店舖</ExternalButton></div>
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
            <div className="cost-total"><small>約</small><strong>¥9,000</strong><span>— 10,000</span></div>
            <div className="cost-bars" aria-label="費用組成示意">
              <span style={{ width: "36%" }} title="大阪周遊卡" />
              <span style={{ width: "15%" }} title="Enjoy Eco Card" />
              <span style={{ width: "31%" }} title="京都與機場" />
              <span style={{ width: "18%" }} title="其他交通" />
            </div>
            <ul><li><i className="c1" />大阪周遊卡 ¥3,500</li><li><i className="c2" />Enjoy Eco Card 共 ¥1,440</li><li><i className="c3" />京都＋KIX 單次約 ¥2,900</li><li><i className="c4" />南海、大阪其他交通約 ¥1,700+</li></ul>
            <p className="cash-note"><span aria-hidden="true">💴</span>短程計程車另計、以每車分攤；另備現金供木津市場、拉麵與 Gelato 使用。</p>
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
