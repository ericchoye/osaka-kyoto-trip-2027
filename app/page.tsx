"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "sight" | "food" | "transit" | "shopping" | "stay";

type Backup = {
  name: string;
  detail: string;
  url?: string;
};

type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  timeZone: "Asia/Taipei" | "Asia/Tokyo";
  details: string;
  location?: string;
};

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
  backups?: Backup[];
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
  calendar: CalendarEvent;
  stops: Stop[];
};

type TodoItem = {
  id: string;
  when: string;
  title: string;
  detail: string;
  calendar?: CalendarEvent;
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
    title: "抵達大阪・新世界壽司與採買",
    summary: "國定假日，抵達時段保留彈性；晚餐與唐吉訶德集中在新世界。",
    ticket: "ICOCA＋南海空港急行",
    color: "#d24a38",
    calendar: {
      title: "大阪 DAY 1｜抵達・新世界",
      start: "20270211",
      end: "20270212",
      timeZone: "Asia/Tokyo",
      details: "JX820 抵達後前往新今宮；新世界、大興壽司南店、MEGA 唐吉訶德新世界店。班機時間依電子機票。",
      location: "Shinsekai, Osaka",
    },
    stops: [
      {
        time: "依機票",
        title: "JX820 桃園起飛",
        icon: "✈️",
        category: "transit",
        description: "桃園機場 T1 出發；精確起飛與抵達時間以電子機票為準。",
        route: "TPE T1 → KIX T1",
        official: "https://www.starlux-airlines.com/zh-TW/timetable",
      },
      {
        time: "抵達後",
        title: "抵達關西機場",
        icon: "🛬",
        category: "transit",
        description: "通關、領行李預留 60–90 分鐘；第一天不安排不可遲到的預約。",
        note: "2/11 是日本建國紀念日，交通與餐廳增加 20–30 分鐘人潮緩衝。",
        mapQuery: "Kansai International Airport Terminal 1",
      },
      {
        time: "+90 分",
        title: "南海空港急行到新今宮",
        icon: "🚆",
        category: "transit",
        description: "搭往難波方向的空港急行，新今宮下車；一般車廂不用劃位。",
        route: "關西空港 → 南海新今宮｜約 42–45 分",
        fare: "現行 ¥970",
        ticket: "ICOCA",
        official: "https://www.nankai.co.jp/en_railway/access-timetable",
      },
      {
        time: "約 14:00",
        title: "Apartment Hotel 11",
        icon: "🧳",
        category: "stay",
        description: "正式入住為 16:00；若提前抵達，寄放方式必須先向住宿確認。",
        route: "南海新今宮站旁",
        note: "要求高樓層、背向軌道房；不可假設無人櫃檯一定能寄放。",
        mapQuery: "Apartment Hotel 11 Shinimamiya 3 Osaka",
      },
      {
        time: "16:30",
        title: "新世界・通天閣",
        icon: "🗼",
        category: "sight",
        description: "飯店放妥行李後逛新世界、通天閣外觀與ジャンジャン横丁。",
        route: "住宿 → 步行約 8–10 分",
        mapQuery: "Tsutenkaku Osaka",
        official: "https://osaka-info.jp/en/spot/shinsekai/",
      },
      {
        time: "17:45",
        title: "大興寿司 南店",
        icon: "🍣",
        category: "food",
        description: "正式店名為 DAIKOSUSHI MINAMI。不可預約、只收現金；目標 18:00 前入店。",
        fare: "約 ¥3,000–4,000／人｜現金",
        note: "若店家告知等候超過 25–30 分鐘，立即切換備案。2/11 假日營業請於 2027/1 複查。",
        mapQuery: "大興寿司 南店 大阪",
        official: "https://daikosushi.jp/access/daikosushi-minami/",
        backups: [
          { name: "大衆すし 謹賀 新世界", detail: "距離近、可網路預約，適合第一順位備案。", url: "https://tabelog.com/osaka/A2701/A270206/27136277/" },
          { name: "六鮮 通天閣本店", detail: "座位較多、可預約並可刷卡。", url: "https://tabelog.com/osaka/A2701/A270206/27004322/" },
        ],
      },
      {
        time: "19:15",
        title: "MEGA 唐吉訶德 新世界店",
        icon: "🛍️",
        category: "shopping",
        description: "壽司店步行約 3–4 分鐘；補日用品、零食與第一晚需要的東西。",
        route: "大興壽司南店 → 步行約 250 公尺",
        ticket: "卡／ICOCA／多元支付",
        mapQuery: "MEGA Don Quijote Shinsekai",
        official: "https://www.donki.com/en/store/shop_detail.php?shop_id=356",
      },
    ],
  },
  {
    id: "d2",
    date: "2/12",
    weekday: "五",
    city: "大阪",
    title: "梅田拉麵・友都八喜・甜點・飯店料理",
    summary: "白天集中在大阪站周邊，傍晚買食材後搭 JR 回飯店自己料理。",
    ticket: "ICOCA 單次刷｜JR 往返現行約 ¥400",
    color: "#cf7d2d",
    calendar: {
      title: "大阪 DAY 2｜梅田吃喝購物",
      start: "20270212",
      end: "20270213",
      timeZone: "Asia/Tokyo",
      details: "鴨と葱梅田店 → 友都八喜梅田 → grenier梅田 → 補食材 → 返回新今宮，在飯店自己料理。",
      location: "Umeda / Shin-Imamiya, Osaka",
    },
    stops: [
      {
        time: "09:10",
        title: "JR 前往大阪站",
        icon: "🚆",
        category: "transit",
        description: "從住宿旁的新今宮站搭大阪環狀線，在大阪站西口下車前往 Inogate Osaka。",
        route: "JR 新今宮 → JR 大阪｜約 15–18 分",
        fare: "現行 ¥200",
        ticket: "ICOCA",
      },
      {
        time: "09:50",
        title: "らぁ麺 鴨と葱 梅田店",
        icon: "🍜",
        category: "food",
        description: "10:00 開門，主打鴨拉麵與「飲める親子丼」；不可預約，09:50 到場。",
        fare: "約 ¥1,000–2,000｜卡／交通 IC／QR",
        note: "若到 10:40 仍無法入店，直接切換備案，避免壓縮購物時間。",
        mapQuery: "らぁ麺 鴨と葱 梅田店",
        official: "https://www.kamotonegi.com/shoprisuto/oosaka/",
        backups: [
          { name: "銀座 篝 LUCUA大阪店", detail: "拉麵百名店，11:00 開門，從大阪站內移動最方便。", url: "https://www.lucua.jp/shopguide/id804.html" },
          { name: "なにわ麺次郎 然", detail: "阪神梅田 B2，拉麵百名店，11:00 開門。", url: "https://naniwamenjiro.com/store_02" },
        ],
      },
      {
        time: "11:15",
        title: "友都八喜相機多媒體 梅田店",
        icon: "📷",
        category: "shopping",
        description: "相機、電器、玩具與生活用品集中採買；大阪站北側直接連通。",
        route: "Inogate Osaka → 步行約 5–8 分",
        mapQuery: "Yodobashi Camera Multimedia Umeda",
        official: "https://global.yodobashi/stores/yodobashi_camera/umeda/",
      },
      {
        time: "15:45",
        title: "grenier 梅田店",
        icon: "🥐",
        category: "food",
        description: "本日唯一甜點，建議現點炙燒千層或當日新鮮品項；店型偏外帶。",
        fare: "約 ¥1,000 內｜卡／交通 IC",
        note: "預留 15–20 分鐘排隊。若招牌售完就改買當日品項或跳過，不另排第二間甜點店。",
        mapQuery: "grenier Umeda Osaka",
        official: "https://grenier.shopselect.net/",
      },
      {
        time: "16:15",
        title: "補買晚餐食材",
        icon: "🛒",
        category: "shopping",
        description: "重視品質可在阪急うめだ本店 B2 食品採買；想少提東西就先回新今宮，再到住宿旁的スーパー玉出。",
        route: "grenier → 阪急 B2 約 2–5 分；或回新今宮後採買",
        note: "只買當晚需要的份量並儘快冷藏；不預設一定買特定肉品。",
        mapQuery: "阪急うめだ本店 地下2階 食品売場",
        official: "https://www.hankyu-dept.co.jp/honten/floor/floorb2.html",
        backups: [
          { name: "スーパー玉出 新今宮店", detail: "住宿幾乎隔壁、24 小時營業；最省體力的採買方案。", url: "https://supertamade.co.jp/store/%E6%96%B0%E4%BB%8A%E5%AE%AE/" },
        ],
      },
      {
        time: "17:10",
        title: "JR 返回新今宮",
        icon: "🚆",
        category: "transit",
        description: "大阪站 1 號月台搭往西九條、弁天町方向，確認列車停靠新今宮。",
        route: "JR 大阪 → JR 新今宮｜約 15–18 分",
        fare: "現行 ¥200",
        ticket: "ICOCA",
        note: "不要搭只往 Universal City／桜島的列車。",
      },
      {
        time: "18:00",
        title: "回飯店自己料理",
        icon: "🍳",
        category: "stay",
        description: "利用房內廚房準備晚餐，晚上保留休息、整理戰利品與洗衣時間。",
        route: "Apartment Hotel 11 Shinimamiya 3",
        note: "依房內實際鍋具與調味料調整菜色；需要補貨可再到附近スーパー玉出。",
        mapQuery: "Apartment Hotel 11 Shinimamiya 3 Osaka",
      },
    ],
  },
  {
    id: "d3",
    date: "2/13",
    weekday: "六",
    city: "大阪",
    title: "木津早餐・難波拉麵・道頓堀夜景與燒肉",
    summary: "早餐、可麗露、拉麵、夜間 Glico 與指定雌牛燒肉串成不折返的一天。",
    ticket: "ICOCA＋短程計程車",
    color: "#b24845",
    calendar: {
      title: "大阪 DAY 3｜木津市場・難波・道頓堀",
      start: "20270213",
      end: "20270214",
      timeZone: "Asia/Tokyo",
      details: "木津市場早餐 → 難波八阪神社 → CANELE du JAPON → 難波拉麵 → 晚上 Glico → 19:00 板前焼肉一牛 難波 道頓堀店 離れ。",
      location: "Namba, Osaka",
    },
    stops: [
      {
        time: "07:35",
        title: "短程計程車到木津市場",
        icon: "🚕",
        category: "transit",
        description: "住宿直接叫車，避免一早搬動轉車；車程約 5–8 分鐘。",
        route: "住宿 → 木津市場",
        fare: "依跳表／每車分攤",
      },
      {
        time: "07:45",
        title: "木津 魚市食堂早餐",
        icon: "🐟",
        category: "food",
        description: "海鮮丼主選，熱門且不可預約；只點適量，保留中午拉麵食量。",
        fare: "現金為主",
        note: "若 07:45 已排很長，立刻改下列店家；市場 2027 休市曆於 2027/1 複查。",
        mapQuery: "木津 魚市食堂 大阪",
        official: "https://kizu-ichiba.com/restaurant/",
        backups: [
          { name: "川上商店", detail: "炭火鰻魚，可電話詢問訂位，想避開海鮮丼就選它。", url: "https://tabelog.com/osaka/A2701/A270206/27016977/" },
          { name: "まるよし", detail: "壽司、海鮮丼與鰻魚，06:00 左右起營業。", url: "https://tabelog.com/osaka/A2701/A270206/27053505/" },
          { name: "かなえ寿司", detail: "可預約，是最能避免現場吃不到的保險。", url: "https://tabelog.com/osaka/A2701/A270206/27020286/" },
        ],
      },
      {
        time: "09:15",
        title: "難波八阪神社",
        icon: "🦁",
        category: "sight",
        description: "早餐後搭短程計程車，拍巨型獅子殿；停留約 25 分鐘。",
        route: "木津市場 → 計程車約 3–5 分",
        mapQuery: "Namba Yasaka Jinja",
      },
      {
        time: "10:00",
        title: "CANELE du JAPON 桜川店",
        icon: "🧁",
        category: "food",
        description: "桜川店 10:00 開，比長堀橋店早一小時，買完再去難波吃拉麵。",
        route: "難波八阪神社 → 短程計程車約 5–8 分",
        note: "外帶為主，買少量即可。",
        mapQuery: "CANELE du JAPON Sakuragawa",
        official: "https://caneledujapon.stores.jp/about",
        backups: [
          { name: "CANELE du JAPON 長堀橋店", detail: "同品牌備案，11:00 開門；若桜川臨休，午餐後再去。", url: "https://caneledujapon.stores.jp/about" },
        ],
      },
      {
        time: "11:10",
        title: "麺屋 丈六 なんば店排隊",
        icon: "🍜",
        category: "food",
        description: "拉麵百名店，11:30 開門、不可預約；主吃大阪高井田系醬油拉麵。",
        fare: "約 ¥1,000–2,000｜現金",
        note: "若估計等候超過 30–40 分鐘，直接換備案。",
        mapQuery: "麺屋 丈六 なんば店",
        official: "https://tabelog.com/osaka/A2701/A270202/27084754/",
        backups: [
          { name: "なにわ 麺次郎", detail: "拉麵百名店，位於近鐵大阪難波站閘內。", url: "https://tabelog.com/osaka/A2701/A270202/27112089/" },
          { name: "NEXT□", detail: "牡蠣系拉麵、營業時間長且無現金支付。", url: "https://tabelog.com/osaka/A2701/A270202/27124383/" },
          { name: "だしと小麦の可能性", detail: "近鐵日本橋附近的潮／鹽系拉麵。", url: "https://tabelog.com/osaka/A2701/A270202/27125763/" },
        ],
      },
      {
        time: "13:00",
        title: "難波・心齋橋自由逛",
        icon: "🛍️",
        category: "shopping",
        description: "法善寺外圍、心齋橋筋與美國村自由選；下午刻意留休息時間。",
        route: "以地鐵或短程計程車取代不必要長走",
        mapQuery: "Shinsaibashi-suji Shopping Street",
      },
      {
        time: "18:15",
        title: "Glico Sign Dotonbori 夜景",
        icon: "🌃",
        category: "sight",
        description: "冬季日落後再拍 Glico 看板、戎橋與道頓堀河岸。",
        note: "依當日日落微調；官方現行為日落約 30 分鐘後亮燈。",
        mapQuery: "Dotonbori Glico Sign",
        official: "https://www.glico.com/jp/newscenter/pressrelease/8077/",
      },
      {
        time: "19:00",
        title: "雌牛専門店 板前焼肉一牛 難波 道頓堀店 離れ",
        icon: "🥩",
        category: "food",
        description: "依指定安排的雌黑毛和牛專門店；訂位時核對地址東心斎橋 2-6-15、電話末四碼 8855。",
        route: "Glico Sign → 步行約 10 分；想省體力可搭短程計程車",
        fare: "約 ¥6,000–8,000／人｜主要信用卡",
        note: "建議提前預約；遲到 15 分鐘可能取消。2027 營業時間於 2027/1 複查，勿誤訂道頓堀 2-1-7 的另一分店。",
        mapQuery: "雌牛専門店 板前焼肉一牛 難波 道頓堀店 離れ",
        official: "https://booking.ebica.jp/webrsv/vacant/e014171301/32344?affiid=oa01&language=ja",
        backups: [
          { name: "焼肉割烹 YP流 宗右衛門町本店", detail: "高評品質備案，主打長期肥育雌牛；價位較高且建議預約。", url: "https://ypryu-honten.com/" },
          { name: "食道園 宗右衛門町本店", detail: "520 席的容量型備案，臨時需要換店時較實用。", url: "https://syokudoen.co.jp/store/" },
        ],
      },
    ],
  },
  {
    id: "d4",
    date: "2/14",
    weekday: "日",
    city: "大阪",
    title: "大阪城・高評豬排・梅田空中庭園",
    summary: "保留大阪城與豬排名店，下午用大阪周遊卡進空中庭園。",
    ticket: "Osaka Amazing Pass｜現行 ¥3,500",
    color: "#315a7d",
    calendar: {
      title: "大阪 DAY 4｜大阪城・豬排・梅田夜景",
      start: "20270214",
      end: "20270215",
      timeZone: "Asia/Tokyo",
      details: "大阪城 → 11:30とんかつふじ井 → 15:00前入場梅田藍天大廈 → 梅田自由活動。",
      location: "Osaka Castle, Osaka",
    },
    stops: [
      {
        time: "08:00",
        title: "地鐵前往大阪城",
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
        description: "開門即入場，參觀天守閣與周邊城郭。",
        fare: "現行原價 ¥1,200｜周遊卡含",
        mapQuery: "Osaka Castle Museum",
        official: "https://www.osaka-info.jp/en/spot/osaka-castle-main-keep/",
      },
      {
        time: "10:20",
        title: "谷町線直達千林大宮",
        icon: "🚇",
        category: "transit",
        description: "回谷町四丁目站，搭谷町線直達千林大宮。",
        route: "谷町四丁目 T23 → 千林大宮 T14",
        ticket: "大阪周遊卡",
      },
      {
        time: "11:30",
        title: "とんかつ ふじ井",
        icon: "🍱",
        category: "food",
        description: "高評豬排主選，依現行規則每月 10 日 22:00 JST 開放次月座位。",
        fare: "約 ¥3,000–5,000｜卡／交通 IC",
        note: "目標搶 11:30，最晚 12:15；遲到超過 10 分鐘可能取消。",
        mapQuery: "とんかつ ふじ井 千林",
        official: "https://www.tablecheck.com/ja/shops/tonkatsu-fujii/reserve",
        backups: [
          { name: "とんかつ中村", detail: "同在千林、可預約，是最順路的高評備案。", url: "https://tabelog.com/osaka/A2701/A270304/27092639/" },
          { name: "Tonkatsu New Babe Namba", detail: "若想吃原先指定的 New Babe，可改訂難波店並重排午前動線。", url: "https://www.hotpepper.jp/strJ004090515/yoyaku/" },
        ],
      },
      {
        time: "12:40",
        title: "谷町線前往東梅田",
        icon: "🚇",
        category: "transit",
        description: "千林大宮搭谷町線直達東梅田，不必轉車。",
        route: "千林大宮 T14 → 東梅田 T20",
        ticket: "大阪周遊卡",
      },
      {
        time: "14:00",
        title: "梅田藍天大廈・空中庭園",
        icon: "🌆",
        category: "sight",
        description: "周遊卡免費規則是 15:00 前完成入場，不是只到大樓。",
        fare: "現行原價 ¥2,000｜周遊卡含",
        note: "最晚 14:40 抵入口；若豬排只搶到晚時段，改上午先上展望台。",
        mapQuery: "Umeda Sky Building",
        official: "https://osaka-amazing-pass.com/en/service_free.html",
      },
      {
        time: "15:30",
        title: "Grand Green・梅田自由活動",
        icon: "🌿",
        category: "shopping",
        description: "百貨、Grand Green 與地下街自由選，晚餐依當下食量就近決定。",
        mapQuery: "Grand Green Osaka",
      },
      {
        time: "19:00",
        title: "返回新今宮",
        icon: "🌙",
        category: "transit",
        description: "梅田搭御堂筋線直達動物園前，再步行回住宿。",
        route: "梅田 M16 → 動物園前 M22",
        ticket: "大阪周遊卡",
      },
    ],
  },
  {
    id: "d5",
    date: "2/15",
    weekday: "一",
    city: "京都",
    title: "清水寺・兩間指定飲品店・豬一・茶筅",
    summary: "由清水寺一路下坡，再搭計程車銜接豬一與茶筅店。",
    ticket: "ICOCA＋短程計程車",
    color: "#57775c",
    calendar: {
      title: "京都 DAY 5｜清水寺・豬一・抹茶・茶筅",
      start: "20270215",
      end: "20270216",
      timeZone: "Asia/Tokyo",
      details: "清水寺 → here Kyoto Kiyomizu → 二三年坂 → 八十八良葉舎清水 → 麺屋猪一當日取號 → 丸久小山園買日本製茶筅 → 錦市場。",
      location: "Kiyomizu-dera, Kyoto",
    },
    stops: [
      {
        time: "06:40",
        title: "JR 前往京都",
        icon: "🚆",
        category: "transit",
        description: "新今宮搭環狀線至大阪，轉 JR 京都線新快速到京都。",
        route: "新今宮 → 大阪 → 京都｜現行約 50–60 分",
        fare: "現行約 ¥960／人",
        ticket: "ICOCA／一般車票",
      },
      {
        time: "07:50",
        title: "京都站搭計程車到清水寺",
        icon: "🚕",
        category: "transit",
        description: "直接到五條坂／茶碗坂合法下車處，省掉公車擁擠與轉乘。",
        route: "京都站 → 清水寺周邊｜約 15–25 分",
        fare: "現行估約 ¥2,400／車｜依路況跳表",
        note: "車不能到本堂，最後仍有約 10 分鐘上坡。",
      },
      {
        time: "08:15",
        title: "清水寺",
        icon: "🏯",
        category: "sight",
        description: "早上先看清水舞台與音羽瀑布；09:10 前離開，保住後面兩間指定店。",
        fare: "現行成人 ¥500",
        mapQuery: "Kiyomizu-dera Kyoto",
        official: "https://www.kiyomizudera.or.jp/",
      },
      {
        time: "09:15",
        title: "here Kyoto Kiyomizu",
        icon: "☕",
        category: "food",
        description: "清水寺旁咖啡站，建議咖啡搭清水限定抹茶歐姆蕾或可麗露。",
        fare: "約 ¥1,000–2,000｜卡／電子錢／QR",
        note: "不可預約、現行 08:30–18:00、不定休；停留控制在 15 分鐘。",
        mapQuery: "here Kyoto Kiyomizu",
        official: "https://coffeehere.world/access/",
      },
      {
        time: "09:30",
        title: "三年坂・二年坂下坡散策",
        icon: "🏮",
        category: "sight",
        description: "從 here 經三年坂、二年坂往高台寺方向一路下坡，不走回頭路。",
        route: "here → 八坂塔 → 二年坂 → 高台寺南門通",
        mapQuery: "Sannenzaka Kyoto",
      },
      {
        time: "10:00",
        title: "八十八良葉舎 清水",
        icon: "🍵",
        category: "food",
        description: "指定抹茶站，建議抹茶拿鐵「壱」或清水店限定茶團子，小份外帶。",
        fare: "卡／電子錢／QR",
        note: "不可預約且店面很小；公開時間有差異，先以 10:00 開門保守安排。10:10 必須離開。",
        mapQuery: "八十八良葉舎 清水",
        official: "https://www.8108kyoto.com/",
      },
      {
        time: "10:10",
        title: "計程車前往麺屋 猪一",
        icon: "🚕",
        category: "transit",
        description: "從東山安井附近叫車，目標 10:25 抵達；不要步行 20 分鐘。",
        route: "八十八良葉舎 → 麺屋猪一｜約 10–15 分",
        fare: "依跳表／每車分攤",
      },
      {
        time: "10:30",
        title: "麺屋 猪一・當日取號",
        icon: "🍜",
        category: "food",
        description: "10:30 起發午餐整理券，不能提前訂位；依券面時間返回並完成午餐。",
        fare: "約 ¥1,000–2,000",
        note: "全員一起取號。here 或八十八排隊時，以豬一整理券優先。",
        mapQuery: "麺屋 猪一 京都",
        official: "https://menyainoichi.net/news/663335b9c7a87201ab8228cf",
        backups: [
          { name: "麺処 虵の目屋", detail: "河原町站旁、拉麵百名店，最容易原地救援。", url: "https://tabelog.com/kyoto/A2601/A260201/26035164/" },
          { name: "麺屋 猪一 離れ", detail: "同集團，但同樣需要 10:30 當日整理券。", url: "https://menyainoichi.net/about" },
          { name: "和醸良麺 すがり", detail: "四條／烏丸附近高評備案，適合銜接丸久小山園。", url: "https://tabelog.com/kyoto/A2601/A260201/26006820/" },
        ],
      },
      {
        time: "13:30",
        title: "丸久小山園 西洞院店・元庵",
        icon: "🍵",
        category: "shopping",
        description: "先領事前保留的日本製茶筅；有位再喝傳統抹茶與上生菓子。",
        fare: "茶筅現行約 ¥5,830",
        note: "指定：久保駒吉・数穂・上・日本製。茶房不可預約，茶筅庫存須先電話確認。",
        mapQuery: "丸久小山園 西洞院店 元庵",
        official: "https://www.marukyu-koyamaen.co.jp/motoan.html",
      },
      {
        time: "15:15",
        title: "錦市場・四條河原町",
        icon: "🛍️",
        category: "shopping",
        description: "採買茶點與乾貨；多數店約 17:00 前收，累了可直接刪除。",
        route: "丸久小山園 → 短程計程車或地下鐵",
        mapQuery: "Nishiki Market Kyoto",
      },
      {
        time: "17:00",
        title: "阪急返回大阪",
        icon: "🌙",
        category: "transit",
        description: "烏丸／京都河原町搭阪急至大阪梅田，再轉 JR 回新今宮。",
        route: "烏丸／京都河原町 → 大阪梅田 → JR大阪 → 新今宮",
        ticket: "ICOCA",
      },
    ],
  },
  {
    id: "d6",
    date: "2/16",
    weekday: "二",
    city: "大阪",
    title: "天王寺・阿倍野逛街・Harukas 300",
    summary: "景點全在天王寺／阿倍野，核心步行多在 2–10 分鐘內。",
    ticket: "ICOCA 單次刷",
    color: "#397087",
    calendar: {
      title: "大阪 DAY 6｜天王寺・阿倍野・Harukas 300",
      start: "20270216",
      end: "20270217",
      timeZone: "Asia/Tokyo",
      details: "大阪市立美術館 → 慶澤園／天芝 → Q’s Mall、近鐵百貨、MIO → 16:30 Harukas 300。",
      location: "Abeno Harukas, Osaka",
    },
    stops: [
      {
        time: "09:20",
        title: "JR 前往天王寺",
        icon: "🚆",
        category: "transit",
        description: "今宮／新今宮搭 JR 到天王寺，之後整天留在同一區。",
        route: "JR 今宮／新今宮 → 天王寺",
        ticket: "ICOCA",
      },
      {
        time: "09:30",
        title: "大阪市立美術館",
        icon: "🖼️",
        category: "sight",
        description: "參觀 2027/2/6–4/4 的圓山應舉特展；2/16 週二開館。",
        note: "不愛美術可整段改成天王寺動物園，不要兩個都塞。",
        mapQuery: "Osaka City Museum of Fine Arts",
        official: "https://www.osaka-art-museum.jp/special_exhibition/10344",
      },
      {
        time: "11:15",
        title: "慶澤園",
        icon: "🌿",
        category: "sight",
        description: "美術館旁的日式庭園，安靜停留約 35 分鐘；下雨或累了可刪。",
        fare: "現行成人 ¥300",
        mapQuery: "Keitakuen Garden Osaka",
        official: "https://www.keitakuen-garden.jp/info",
      },
      {
        time: "12:00",
        title: "Tenshiba 午餐",
        icon: "🍽️",
        category: "food",
        description: "主選 MAKIBI PLACE，讓這天午餐保持彈性、不再追排隊名店。",
        mapQuery: "MAKIBI PLACE Tenshiba",
        official: "https://tennoji-park.jp/shop/food",
        backups: [
          { name: "KNEADERS", detail: "同在 Tenshiba，營業時段長，適合現場候位。", url: "https://tennoji-park.jp/shop/food" },
          { name: "阿倍野 Q’s Mall 餐廳街", detail: "雨天或兩店客滿時，直接進商場選餐。", url: "https://www.qs-mall.jp/abeno/" },
        ],
      },
      {
        time: "13:00",
        title: "阿倍野 Q’s Mall・近鐵百貨",
        icon: "🛍️",
        category: "shopping",
        description: "服飾、藥妝、生活雜貨與 Harukas 近鐵百貨地下食品街集中採買。",
        route: "Tenshiba → 步行約 8–10 分",
        mapQuery: "Abeno Q's Mall",
        official: "https://www.qs-mall.jp/abeno/access",
      },
      {
        time: "15:30",
        title: "天王寺 MIO・休息",
        icon: "🛍️",
        category: "shopping",
        description: "與 JR 天王寺站相連；逛街或找咖啡休息，準備傍晚上展望台。",
        mapQuery: "Tennoji MIO",
        official: "https://www.tennoji-mio.co.jp/access",
      },
      {
        time: "16:30",
        title: "Harukas 300 展望台",
        icon: "🌇",
        category: "sight",
        description: "安排白天轉夜景的時段；16 樓入口掃 QR，入場後不可重複進出。",
        fare: "現行網路預購 ¥1,980／當日 ¥2,200",
        note: "2027 票價與日落時間出發前複查；建議提前購票。",
        mapQuery: "Harukas 300 Observatory",
        official: "https://www.abenoharukas-300.jp/observatory/information.html",
      },
      {
        time: "18:15",
        title: "阿倍野晚餐・最後採買",
        icon: "🍚",
        category: "food",
        description: "依當天食量在 Harukas、MIO 或 Q’s Mall 選餐，再搭一站 JR 回住宿打包。",
        route: "天王寺 → 今宮／新今宮",
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
    summary: "依電子機票倒推，至少在起飛前三小時抵達 KIX T1。",
    ticket: "ICOCA／JR 單次付費",
    color: "#4f5968",
    calendar: {
      title: "大阪 DAY 7｜JX821 返回台灣",
      start: "20270217",
      end: "20270218",
      timeZone: "Asia/Tokyo",
      details: "依電子機票倒推：T−4h離開住宿，T−3h抵達KIX T1。關空快速務必坐前方1–4號車。",
      location: "Kansai International Airport Terminal 1",
    },
    stops: [
      {
        time: "T−4h30",
        title: "退房",
        icon: "🧳",
        category: "stay",
        description: "完成垃圾、廚具與自助退房確認，直接帶行李前往 JR 新今宮站。",
        route: "住宿 → JR 新今宮",
      },
      {
        time: "T−4h",
        title: "JR 關空快速",
        icon: "🚆",
        category: "transit",
        description: "搭直達關西機場的關空快速，出發前一個月確認 2027 精確班次。",
        route: "JR 新今宮 → 關西空港｜約 50–60 分",
        ticket: "ICOCA／一般車票",
        note: "列車在日根野分離：務必坐行進方向前方 1–4 號車。JR 異常則步行到南海新今宮搭空港急行。",
        official: "https://www.westjr.co.jp/travel-information/sc/train-usage-guide/howto/guide/",
      },
      {
        time: "T−3 小時",
        title: "抵達 KIX T1",
        icon: "🛫",
        category: "transit",
        description: "星宇櫃檯現行於起飛前三小時開放，確認報到區與行李重量。",
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
    icon: "🍣",
    kind: "壽司",
    name: "大興寿司 南店",
    score: "3.48",
    rank: "新世界在地人氣店",
    date: "2/11 17:45",
    budget: "¥3,000–4,000",
    payment: "現金",
    booking: "不可預約・候位超過 30 分換店",
    backup: "謹賀新世界／六鮮通天閣本店",
    mapQuery: "大興寿司 南店 大阪",
    url: "https://daikosushi.jp/access/daikosushi-minami/",
  },
  {
    icon: "🍜",
    kind: "拉麵",
    name: "らぁ麺 鴨と葱 梅田店",
    score: "3.58",
    rank: "指定梅田拉麵",
    date: "2/12 10:00",
    budget: "¥1,000–2,000",
    payment: "卡／交通 IC／QR",
    booking: "不可預約・09:50 到場",
    backup: "銀座篝／なにわ麺次郎 然",
    mapQuery: "らぁ麺 鴨と葱 梅田店",
    url: "https://www.kamotonegi.com/shoprisuto/oosaka/",
  },
  {
    icon: "🥐",
    kind: "甜點",
    name: "grenier 梅田店",
    score: "3.54",
    rank: "本日唯一甜點",
    date: "2/12 15:45",
    budget: "約 ¥1,000 內",
    payment: "卡／交通 IC",
    booking: "外帶・不另排第二間甜點",
    backup: "售完則選當日品項或跳過",
    mapQuery: "grenier Umeda Osaka",
    url: "https://grenier.shopselect.net/",
  },
  {
    icon: "🥩",
    kind: "燒肉",
    name: "雌牛専門店 板前焼肉一牛 難波 道頓堀店 離れ",
    score: "3.10",
    rank: "依指定安排・雌牛專門",
    date: "2/13 19:00",
    budget: "¥6,000–8,000",
    payment: "主要信用卡／備現金",
    booking: "建議提前預約・核對末四碼 8855",
    backup: "YP流／食道園宗右衛門町",
    mapQuery: "雌牛専門店 板前焼肉一牛 難波 道頓堀店 離れ",
    url: "https://booking.ebica.jp/webrsv/vacant/e014171301/32344?affiid=oa01&language=ja",
  },
  {
    icon: "🐟",
    kind: "市場早餐",
    name: "木津 魚市食堂",
    score: "3.55",
    rank: "木津市場高評海鮮丼",
    date: "2/13 07:45",
    budget: "現場菜單",
    payment: "現金",
    booking: "不可預約・早到",
    backup: "川上商店／まるよし／かなえ寿司",
    mapQuery: "木津 魚市食堂 大阪",
    url: "https://tabelog.com/osaka/A2701/A270206/27103960/",
  },
  {
    icon: "🍜",
    kind: "拉麵",
    name: "麺屋 丈六 なんば店",
    score: "3.73",
    rank: "拉麵 OSAKA 百名店 2025",
    date: "2/13 11:30",
    budget: "¥1,000–2,000",
    payment: "現金",
    booking: "不可預約・11:10 排隊",
    backup: "なにわ麺次郎／NEXT□／だしと小麦",
    mapQuery: "麺屋 丈六 なんば店",
    url: "https://tabelog.com/osaka/A2701/A270202/27084754/",
  },
  {
    icon: "🍱",
    kind: "豬排",
    name: "とんかつ ふじ井",
    score: "4.14",
    rank: "Tabelog Award 2026 Bronze",
    date: "2/14 11:30",
    budget: "¥3,000–5,000",
    payment: "卡／交通 IC",
    booking: "完全預約・1/10 21:00 搶",
    backup: "とんかつ中村／New Babe難波",
    mapQuery: "とんかつ ふじ井 千林",
    url: "https://www.tablecheck.com/ja/shops/tonkatsu-fujii/reserve",
  },
  {
    icon: "🍜",
    kind: "京都午餐",
    name: "麺屋 猪一",
    score: "3.71",
    rank: "拉麵 WEST 百名店 2025",
    date: "2/15 10:30 取號",
    budget: "¥1,000–2,000",
    payment: "現場確認",
    booking: "不可預約・當日整理券",
    backup: "虵の目屋／猪一離れ／すがり",
    mapQuery: "麺屋 猪一 京都",
    url: "https://menyainoichi.net/news/663335b9c7a87201ab8228cf",
  },
];

const alternatives = [
  {
    icon: "🍣",
    name: "謹賀／六鮮",
    label: "D1 壽司備案",
    description: "大興壽司等超過 30 分鐘，先改可預約的謹賀，再看六鮮。",
    url: "https://tabelog.com/osaka/A2701/A270206/27136277/",
  },
  {
    icon: "🍜",
    name: "銀座篝／麺次郎 然",
    label: "D2 拉麵備案",
    description: "鴨と葱候位過長，11:00 起改走大阪站內兩間百名店。",
    url: "https://www.lucua.jp/shopguide/id804.html",
  },
  {
    icon: "🛒",
    name: "阪急 B2／スーパー玉出",
    label: "D2 自炊採買備案",
    description: "品質優先在梅田買；最省體力就回住宿旁採買，再進房料理。",
    url: "https://www.hankyu-dept.co.jp/honten/floor/floorb2.html",
  },
  {
    icon: "🐟",
    name: "川上／まるよし／かなえ",
    label: "D3 早餐備案",
    description: "魚市食堂人龍過長就換店；かなえ寿司可預約最穩。",
    url: "https://kizu-ichiba.com/restaurant/",
  },
  {
    icon: "🍜",
    name: "麺次郎／NEXT□／だし小麦",
    label: "D3 拉麵備案",
    description: "丈六等超過 40 分鐘就切換，不讓整天卡在隊伍裡。",
    url: "https://tabelog.com/osaka/A2701/A270202/27112089/",
  },
  {
    icon: "🥩",
    name: "YP流／食道園",
    label: "D3 燒肉備案",
    description: "一牛未訂到先查高評的 YP流；臨時換店則改座位多的食道園。",
    url: "https://ypryu-honten.com/",
  },
  {
    icon: "🍱",
    name: "とんかつ中村／New Babe",
    label: "D4 豬排備案",
    description: "ふじ井沒搶到，優先訂同區中村；想吃 New Babe 才改難波。",
    url: "https://tabelog.com/osaka/A2701/A270304/27092639/",
  },
  {
    icon: "🍜",
    name: "虵の目屋／すがり",
    label: "D5 京都午餐備案",
    description: "豬一整理券發完，河原町就近改虵の目屋，或往烏丸吃すがり。",
    url: "https://tabelog.com/kyoto/A2601/A260201/26035164/",
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
    title: "大阪市區單次刷卡",
    date: "2/12、2/13、2/16",
    price: "ICOCA 最簡單",
    detail: "D2 改搭 JR 往返大阪站，現行約 ¥400；D3 多用短程計程車，D6 僅天王寺近距離，日票都不易回本。",
    url: "https://subway.osakametro.co.jp/guide/fare/fare/price.php",
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

const todoItems: TodoItem[] = [
  {
    id: "hotel",
    when: "現在",
    title: "確認飯店寄放行李與房間方向",
    detail: "高樓層、背向軌道、抵達時能否寄放；不要假設無人櫃檯一定可寄放。",
  },
  {
    id: "tonkatsu",
    when: "1/10 21:00 台灣",
    title: "搶 ふじ井 2/14 11:30",
    detail: "依現行規則為日本時間 22:00 開放次月座位；先複查二月月曆。",
    calendar: {
      title: "搶訂｜とんかつ ふじ井 2/14 11:30",
      start: "20270110T210000",
      end: "20270110T213000",
      timeZone: "Asia/Taipei",
      details: "日本時間22:00開搶。目標2/14 11:30，最晚12:15；若失敗改訂とんかつ中村。https://www.tablecheck.com/ja/shops/tonkatsu-fujii/reserve",
      location: "線上訂位",
    },
  },
  {
    id: "ichigyu",
    when: "11/13 09:00 台灣",
    title: "開始查一牛 2/13 19:00 訂位",
    detail: "官方未公布固定開放週期；先查正確分店，未開放就每兩週重查，最晚 2027/1 再電話確認。",
    calendar: {
      title: "開始查訂位｜板前焼肉一牛 難波 道頓堀店 離れ",
      start: "20261113T090000",
      end: "20261113T093000",
      timeZone: "Asia/Taipei",
      details: "預約2027/2/13 19:00日本時間。核對地址東心斎橋2-6-15、電話末四碼8855；若尚未開放，每兩週重查。備案依序為YP流、食道園宗右衛門町本店。https://booking.ebica.jp/webrsv/vacant/e014171301/32344?affiid=oa01&language=ja",
      location: "雌牛専門店 板前焼肉一牛 難波 道頓堀店 離れ",
    },
  },
  {
    id: "chasen",
    when: "1/18 10:00 台灣",
    title: "電話保留日本製茶筅",
    detail: "丸久小山園指定久保駒吉・数穂・上・日本製；這是商品保留，茶房不可預約。",
    calendar: {
      title: "電話保留｜日本製・奈良高山茶筅",
      start: "20270118T100000",
      end: "20270118T102000",
      timeZone: "Asia/Taipei",
      details: "致電丸久小山園西洞院店，確認2/15取貨；核對日本製、奈良高山製、工藝師與型號。茶房不可預約。",
      location: "丸久小山園 西洞院店",
    },
  },
  {
    id: "harukas",
    when: "1/20 20:00 台灣",
    title: "購買 Harukas 300 傍晚票",
    detail: "目標 2/16 16:30；確認 2027 票價、營業與當日日落。",
    calendar: {
      title: "購票｜Harukas 300 2/16 16:30",
      start: "20270120T200000",
      end: "20270120T203000",
      timeZone: "Asia/Taipei",
      details: "購買2027/2/16 16:30左右入場票；複查票價、日落與臨時維護。https://www.abenoharukas-300.jp/observatory/information.html",
      location: "線上購票",
    },
  },
  {
    id: "hours",
    when: "1/28 20:00 台灣",
    title: "複查所有 2027/2 營業日",
    detail: "特別確認 2/11 大興壽司、木津早餐、here、八十八、豬一規則與丸久庫存。",
    calendar: {
      title: "複查｜大阪京都餐廳與景點營業",
      start: "20270128T200000",
      end: "20270128T210000",
      timeZone: "Asia/Taipei",
      details: "逐一複查2/11國定假日大興壽司、木津市場早餐店、京都here與八十八不定休、豬一整理券、丸久茶筅庫存及Harukas營業。",
      location: "線上確認",
    },
  },
  {
    id: "passes",
    when: "2027/1 下旬",
    title: "購買大阪周遊卡並重算交通",
    detail: "只預定 2/14 使用；其他天以 ICOCA 單次刷，短程計程車另計。",
  },
  {
    id: "inoichi",
    when: "2/15 10:15 日本",
    title: "到麺屋 猪一取午餐整理券",
    detail: "10:30 發券、全員一起到；here 或八十八延誤時，優先保住整理券。",
    calendar: {
      title: "當日取號｜麺屋 猪一 午餐整理券",
      start: "20270215T101500",
      end: "20270215T104500",
      timeZone: "Asia/Tokyo",
      details: "10:30發整理券，不能提前預約。全員一起到並依券面時間準時返回；券面時間不代表立即入座。https://menyainoichi.net/news/663335b9c7a87201ab8228cf",
      location: "麺屋 猪一 京都",
    },
  },
  {
    id: "finalcheck",
    when: "2/8 20:00 台灣",
    title: "最終確認訂位、備案與離線地址",
    detail: "取消重複訂位，儲存一牛／豬排確認信、餐廳日文店名與地圖。",
    calendar: {
      title: "最終確認｜大阪京都訂位與備案",
      start: "20270208T200000",
      end: "20270208T210000",
      timeZone: "Asia/Taipei",
      details: "確認板前焼肉一牛、ふじ井或備案；取消重複訂位並儲存確認信與離線地址。",
      location: "行前檢查",
    },
  },
  {
    id: "flight",
    when: "出發前 72 小時",
    title: "確認 JX820／JX821",
    detail: "班機時間、機型、行李與 KIX 報到櫃檯；回程依 T−3h 抵達機場。",
  },
];

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function googleCalendarUrl(event: CalendarEvent) {
  const query = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${event.start}/${event.end}`,
    ctz: event.timeZone,
    details: event.details,
    location: event.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${query.toString()}`;
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
    const timer = window.setTimeout(() => {
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
    }, 0);
    return () => window.clearTimeout(timer);
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
        .filter((stop) => `${stop.title} ${stop.description} ${stop.route ?? ""} ${(stop.backups ?? []).map((item) => item.name).join(" ")}`.toLocaleLowerCase("zh-Hant").includes(keyword))
        .map((stop) => ({ key: `${day.id}-${stop.time}-${stop.title}`, icon: stop.icon, title: stop.title, subtitle: `${day.date}（${day.weekday}）・${day.city}`, dayId: day.id, target: "day-planner" }))
    );
    const foodResults = foodSpots
      .filter((spot) => `${spot.name} ${spot.kind} ${spot.rank}`.toLocaleLowerCase("zh-Hant").includes(keyword))
      .map((spot) => ({ key: `food-${spot.name}`, icon: spot.icon, title: spot.name, subtitle: `${spot.kind}・${spot.date}`, target: "food" }));
    const passResults = transportCards
      .filter((pass) => `${pass.title} ${pass.detail}`.toLocaleLowerCase("zh-Hant").includes(keyword))
      .map((pass) => ({ key: `pass-${pass.title}`, icon: pass.icon, title: pass.title, subtitle: `${pass.date}・${pass.price}`, target: "transport" }));
    const todoResults = todoItems
      .filter((item) => `${item.title} ${item.detail}`.toLocaleLowerCase("zh-Hant").includes(keyword))
      .map((item) => ({ key: `todo-${item.id}`, icon: "✓", title: item.title, subtitle: item.when, target: "todo" }));
    return [...dayResults, ...foodResults, ...passResults, ...todoResults].slice(0, 12);
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
          <p className="hero-lead">一份可直接照走的手機旅程：每天只看當日路線，餐廳備案、車站與茶筅店一鍵開啟，也能加入 Google 行事曆。</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#day-planner"><span aria-hidden="true">🗓️</span> 開始看行程</a>
            <a className="secondary-cta" href="#todo"><span aria-hidden="true">✓</span> 查看預約待辦</a>
          </div>
          <div className="hero-notes">
            <span><i aria-hidden="true">✈️</i> 星宇直飛</span>
            <span><i aria-hidden="true">🏨</i> 新今宮 6 晚</span>
            <span><i aria-hidden="true">🚆</i> 大阪＋京都一日精華</span>
            <span><i aria-hidden="true">◷</i> 資料查核 2026/08/14</span>
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
        <div><span className="stat-icon" aria-hidden="true">🐟</span><strong>木津早餐</strong><small>4 間候選 · 現場切換</small></div>
        <div><span className="stat-icon" aria-hidden="true">🎫</span><strong>約 ¥8K</strong><small>每人鐵路與 Pass 概算</small></div>
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
            <div className="day-board-tools">
              <div className="ticket-pill"><span aria-hidden="true">🎫</span><span><small>當日票券</small><strong>{activeDay.ticket}</strong></span></div>
              <a className="calendar-button" href={googleCalendarUrl(activeDay.calendar)} target="_blank" rel="noreferrer">
                <span aria-hidden="true">＋</span> 加入 Google 行事曆
              </a>
            </div>
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
                  {stop.backups && stop.backups.length > 0 && (
                    <div className="stop-backups">
                      <strong><span aria-hidden="true">↺</span> 現場備案</strong>
                      <div>
                        {stop.backups.map((backup) => backup.url ? (
                          <a href={backup.url} target="_blank" rel="noreferrer" key={backup.name}>
                            <b>{backup.name}</b><small>{backup.detail}</small><span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <span key={backup.name}><b>{backup.name}</b><small>{backup.detail}</small></span>
                        ))}
                      </div>
                    </div>
                  )}
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
          <div><span className="section-kicker">FOOD PLAN</span><h2>指定餐廳與在地高評美食</h2></div>
          <p>評分為 2026/8/14 Tabelog 快照；指定店與高評店分開標示，2027/1 再確認營業。</p>
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
                <div><dt>備案</dt><dd>{spot.backup}</dd></div>
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

      <section className="section wagyu-section market-section" id="kizu">
        <div className="section-heading">
          <div><span className="section-kicker">MARKET BREAKFAST</span><h2>木津市場早餐，四間現場切換</h2></div>
          <p>07:45 先看魚市食堂人龍，太長就立即切換，不把早晨耗在排隊。</p>
        </div>
        <div className="wagyu-layout">
          <article className="wagyu-primary">
            <div className="wagyu-label"><span aria-hidden="true">🐟</span><small>第一選擇 · 2/13 07:45</small></div>
            <h3>木津 魚市食堂</h3>
            <p>市場內高評海鮮丼主選，12 席且不可預約。週六可能很快形成長隊，因此只把它當第一選擇，不把它當唯一選擇。</p>
            <ul>
              <li><span>到場</span><strong>07:45 前</strong></li>
              <li><span>付款</span><strong>只收現金</strong></li>
              <li><span>原則</span><strong>人龍太長立刻換店</strong></li>
            </ul>
            <div className="wagyu-actions"><ExternalButton href={mapsUrl("木津 魚市食堂 大阪")}>📍 店舖地圖</ExternalButton><ExternalButton href="https://kizu-ichiba.com/restaurant/" subtle>市場餐飲清單</ExternalButton></div>
          </article>
          <article className="wagyu-checklist">
            <span className="section-kicker">BACKUP ORDER</span>
            <h3>早餐候選順序</h3>
            <ol>
              <li><b>01</b><span><strong>魚市食堂：</strong>海鮮丼首選，07:45 前看人龍。</span></li>
              <li><b>02</b><span><strong>川上商店：</strong>炭火鰻魚，可先電話詢問訂位。</span></li>
              <li><b>03</b><span><strong>まるよし：</strong>壽司、海鮮丼與鰻魚都有。</span></li>
              <li><b>04</b><span><strong>かなえ寿司：</strong>能先預約，是最穩保險。</span></li>
            </ol>
          </article>
        </div>
        <div className="wagyu-backup"><span aria-hidden="true">💴</span><p><strong>市場早餐請帶現金：</strong>2027 市場休市曆尚未發布；於 2027/1 再確認 2/13 週六各店營業與是否接受預約。</p><ExternalButton href="https://kizu-ichiba.com/restaurant/" subtle>查看官方清單</ExternalButton></div>
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
            <div className="cost-total"><small>約</small><strong>¥7,500</strong><span>— 8,500</span></div>
            <div className="cost-bars" aria-label="費用組成示意">
              <span style={{ width: "44%" }} title="大阪周遊卡" />
              <span style={{ width: "14%" }} title="大阪市區單次" />
              <span style={{ width: "31%" }} title="京都與機場" />
              <span style={{ width: "11%" }} title="其他交通" />
            </div>
            <ul><li><i className="c1" />大阪周遊卡現行 ¥3,500</li><li><i className="c2" />大阪市區 ICOCA 約 ¥1,100</li><li><i className="c3" />京都＋KIX 單次約 ¥2,600</li><li><i className="c4" />南海與其他交通約 ¥900+</li></ul>
            <p className="cash-note"><span aria-hidden="true">💴</span>短程計程車不含在內、以每車分攤；另備現金供木津市場、壽司與部分拉麵店使用。</p>
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
        <p className="calendar-explainer"><span aria-hidden="true">📅</span>「加入 Google 行事曆」會開啟預填事件，由你選擇自己的 Google 帳號儲存；網站不會取得或讀取行事曆權限。</p>
        <div className="todo-grid">
          {todoItems.map((item) => (
            <article className={`todo-card${checkedTodos[item.id] ? " checked" : ""}`} key={item.id}>
              <label className="todo-check-row">
                <input type="checkbox" checked={Boolean(checkedTodos[item.id])} onChange={(event) => setCheckedTodos((current) => ({ ...current, [item.id]: event.target.checked }))} />
                <span className="custom-check" aria-hidden="true">✓</span>
                <span className="todo-time">{item.when}</span>
                <span className="todo-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
              </label>
              {item.calendar && (
                <a className="todo-calendar" href={googleCalendarUrl(item.calendar)} target="_blank" rel="noreferrer">
                  <span aria-hidden="true">＋</span> 加入 Google 行事曆
                </a>
              )}
            </article>
          ))}
        </div>
        <p className="storage-note"><span aria-hidden="true">☁️</span>勾選進度只儲存在目前裝置；行事曆事件則由 Google 在你按下儲存後管理。</p>
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
        <p>餐廳評分、營業與票價查核至 2026/8/14；2027 年 1 月請再次核對臨休、訂位與班次。</p>
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
