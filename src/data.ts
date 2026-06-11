import { Project, Experience, SkillCategory } from "./types";

export const PERSONAL_INFO = {
  name: "塔利姆",
  englishName: "pi_yan14",
  title: "產品設計工程師 & 資深前端技術總監",
  bio: "這裡將介紹我自大一接觸到FF系列作後創作的作品與深受影響的品味。",
  subBio: "自大一時不經意的接觸到Final Fantasy VII 後我就被此系列深深的吸引住，在這之後開始不斷的購入其他系列作。近期最常遊玩的遊戲是Final Fantasy XIV，這是一款MMO RPG 需要續月費的遊戲，雖然每個月都需要付款才能玩，但也因如此這遊戲完全沒有逼玩家繼續花錢的意願。在付完450的月費後就能獲得非常好的遊戲體驗(no pay to win)。\n\n總結來說除了舒適的遊戲體驗，這款遊戲讓我感覺最有魅力的是製作組用心製作的劇情內容，每個角色都擁有自己的理念與動機去驅使劇情運作，讓人輕易地就感受到角色的魅力。",
  skillsQuote: "「只要BOOS先死了，我就不用補血了對吧 ?」",
  avatarUrl: "/src/assets/images/portfolio_hero_1780913263271.png.png",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "thy3uht@gmail.com",
  }
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "光之戰士變成小孩 ?!",
    category: "Web App / E-commerce",
    description: "劇情解釋拯救星球的大英雄光之戰士突然在某一天因意外變成小並由隊友照顧的故事，後續劇情還在創作",
    longDescription: "劇情解釋拯救星球的大英雄光之戰士突然在某一天因意外變成小並由隊友照顧的故事，後續劇情還在創作",
    imageUrl: "https://picsum.photos/seed/aether/800/600",
    images: [
      "https://picsum.photos/seed/aether-detail1/600/850",
      "https://picsum.photos/seed/aether-detail2/600/850"
    ],
    tags: ["React", "Typescript", "Three.js", "Tailwind CSS", "Motion"],
    year: "2025",
    link: "#"
  },
  {
    id: "2",
    title: "桑克瑞德，再次當上了單親父親 ?",
    category: "Web Application / Fintech",
    description: "劇情銜接上一篇光之戰士變成小孩 ?! ，講述拂曉大家長桑克瑞德從第一世界回來後再次當上了父親的故事。只是這次照顧的不再是模範小孩的琳，而是行為原本就意義不明的光之戰士(小孩版)\n\n此小漫畫還在繪製途中",
    longDescription: "劇情銜接上一篇光之戰士變成小孩 ?! ，講述拂曉大家長桑克瑞德從第一世界回來後再次當上了父親的故事。只是這次照顧的不再是模範小孩的琳，而是行為原本就意義不明的光之戰士(小孩版)\n\n此小漫畫還在繪製途中",
    imageUrl: "https://picsum.photos/seed/apex/800/600",
    images: [
      "https://picsum.photos/seed/apex-detail1/600/850",
      "https://picsum.photos/seed/apex-detail2/600/850",
      "https://picsum.photos/seed/apex-detail3/600/850"
    ],
    tags: ["React", "D3.js", "WebSockets", "FastAPI", "Tailwind CSS"],
    year: "2025",
    link: "#"
  },
  {
    id: "3",
    title: "愛梅特賽爾克，不想當爺爺",
    category: "AI Tool / Web App",
    description: "此篇劇情與上兩篇無關，內容敘述一條平時故事線，假如5.0反派愛梅特賽爾克在加雷馬帝國當皇帝期間撿到小時候的光之戰士，並想將他培養成自己陣營的隊友這類故事。",
    longDescription: "此篇劇情與上兩篇無關，內容敘述一條平時故事線，假如5.0反派愛梅特賽爾克在加雷馬帝國當皇帝期間撿到小時候的光之戰士，並想將他培養成自己陣營的隊友這類故事。",
    imageUrl: "https://picsum.photos/seed/nova/800/600",
    images: [
      "https://picsum.photos/seed/nova-detail1/600/850",
      "https://picsum.photos/seed/nova-detail2/600/850",
      "https://picsum.photos/seed/nova-detail3/600/850",
      "https://picsum.photos/seed/nova-detail4/600/850",
      "https://picsum.photos/seed/nova-detail5/600/850"
    ],
    tags: ["React", "Gemini API", "Node.js", "SVG Engine", "Vite"],
    year: "2024",
    link: "#"
  },
  {
    id: "4",
    title: "兩個偷窺狂 ?",
    category: "Creative Direction / Architecture Portfolio",
    description: "此篇內容講述水晶公因止不住的好奇心而忍不住偷窺光之戰士，不小心弄巧成拙的故事",
    longDescription: "此篇內容講述水晶公因止不住的好奇心而忍不住偷窺光之戰士，不小心弄巧成拙的故事",
    imageUrl: "https://picsum.photos/seed/komorebi/800/600",
    images: [
      "https://picsum.photos/seed/komo-detail1/600/850",
      "https://picsum.photos/seed/komo-detail2/600/850",
      "https://picsum.photos/seed/komo-detail3/600/850",
      "https://picsum.photos/seed/komo-detail4/600/850",
      "https://picsum.photos/seed/komo-detail5/600/850",
      "https://picsum.photos/seed/komo-detail6/600/850",
      "https://picsum.photos/seed/komo-detail7/600/850"
    ],
    tags: ["React", "Creative Coding", "WebGL", "Tailwind CSS", "Framer Motion"],
    year: "2024",
    link: "#"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "伊甸",
    company: "美商極限數位科技 (Nexis Digital Inc.)",
    period: "2023 - 至今",
    description: "這是我在打完遊戲5.0版本的大型副本後換到的衣服，因為覺得樣式很好看所以在激情難掩之下創作了這張圖。",
    tags: ["React", "Next.js", "Performance Optimizations", "Team Leadership"]
  },
  {
    id: "exp-2",
    role: "占卜",
    company: "微光創意工作室 (Flicker Studio)",
    period: "2021 - 2023",
    description: "這張圖是由於我在FF14這款遊戲中是選擇補師中的占星術師作為職業選擇，所以特別畫了一張有關於此職業的圖",
    tags: ["Creative Dev", "Three.js", "Vue 3", "Interactive Design"]
  },
  {
    id: "exp-3",
    role: "加雷馬一日遊",
    company: "雲流軟體研發 (CloudFlow)",
    period: "2020 - 2021",
    description: "這張圖畫了我在遊戲裡最喜歡的兩個角色，預設光之戰士(主角)與5.0最終的反派角色，愛梅特賽爾克。因為我實在太喜歡他們的個性與相處方式，所以在看到這張圖最初的參考圖後馬上就想到他們兩人並立刻就畫了。",
    tags: ["Node.js", "React", "PostgreSQL", "Google Cloud Platform"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Final Fantasy VII",
    description: "這作設定於類工業革命的世界，再加上內容講述與命運有關的主題，音樂通常會混有敲打鋼鐵、與合唱團誦吟的感覺。",
    skills: ["Bombing Mission", "One-Winged Angel", "Aerith's Theme", "Tifa's Theme", "Main Theme of FF7", "Those Who Fight"]
  },
  {
    title: "Final Fantasy XIV",
    description: "本作以交響與當代流行電音搖滾的完美結合出名。音樂總監祖堅正慶將和聲、電吉他與管弦交織，每一首 BOSS 戰音樂都堪稱一場酣暢淋漓的演唱會。",
    skills: ["Answers", "Dragonsong", "Flow", "To the Edge", "Shadowbringers", "Tomorrow and Tomorrow"]
  },
  {
    title: "Final Fantasy Classics",
    description: "除了最新熱門作，歷代作品也擁有神話般的經典旋律。不論是鋼琴的憂傷，還是龐大的人聲交響，音樂巨匠們共同雕琢出日式 RPG 最璀璨的樂音。",
    skills: ["To Zanarkand", "Find the Flame", "Somnus", "Apocalypsis Noctis", "Eyes on Me", "Melodies of Life"]
  }
];
