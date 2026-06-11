import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Cpu, Sparkles, Terminal, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SkillCategory } from "../types";

interface SkillDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: SkillCategory[];
  initialIndex: number;
}

interface ImageDetail {
  url: string;
  badge: string;
  subtitle: string;
  description: string;
  quote: string;
  specificSkills: string[];
}

interface SkillCategoryDetail {
  code: string;
  accentColor: string;
  images: ImageDetail[];
}

const SKILL_DETAILS_CONTENT: SkillCategoryDetail[] = [
  {
    code: "MOD-01",
    accentColor: "border-rose-500/30 text-rose-400 bg-rose-500/10",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / INTRO",
        subtitle: "Bombing Mission",
        description: "這首曲子是 FF7 最經典的開場音樂。樂曲在一陣神祕的豎琴與管樂中揭開序幕，隨後響起沉重而具工業感的金屬敲擊聲與大鍵琴的和弦，搭配合唱團壯麗的吟唱，與命運決絕交響，完美切合了魔晄都市米德加那冰冷精準又帶有科幻反叛色彩的類工業革命氛圍。",
        quote: "「每一次金屬的鏗鏘敲擊，都是對抗神羅威權與直面浩瀚命運的進行曲。」",
        specificSkills: ["Mako Reactor1 - Battle Edit"]
      },
      {
        url: "https://images.unsplash.com/photo-1514533212735-5df27d970db0?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / BOSS",
        subtitle: "One-Winged Angel",
        description: "這首無庸置疑是 FF7 最具震撼力與代表性的宿敵賽菲羅斯主題曲。樂曲將管弦樂音浪與大鍵琴融合，伴隨拉丁語的合唱團高唱其名，其宏大狂放的樂音精妙地展現出降臨天使神格般壓迫與毀滅的瘋狂絕望感。",
        quote: "「在熊熊燃燒的火焰與宿命的終焉之中，呼喚着那一隻帶來毀滅的黑色羽翼。」",
        specificSkills: ["One-Winged Angel"]
      },
      {
        url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / THEME",
        subtitle: "Aerith's Theme",
        description: "一首美麗且永恆傳頌的經典交響悲劇樂章。音樂由晶瑩的鋼琴自動起筆，逐步融入溫暖的弦樂重奏，描繪出艾莉絲純淨、堅毅且溫柔的孤高背影，這首曲目在無數玩家淚水漣漣之時烙印在心頭的最深處。",
        quote: "「即便生命之流歸於寂靜，那曾給星空世界帶來救贖的旋律仍會溫柔迴響。」",
        specificSkills: ["Aerith's Theme"]
      },
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / CHARACTER",
        subtitle: "Tifa's Theme",
        description: "相較於艾莉絲曲子的悲壯宏大，這首歌散發出宛如第七天堂酒吧那一抹暖黃燈光般的恬靜與安詳。溫柔木吉他與長笛輕聲訴說著蒂法內心的包容、堅韌，以及她與克勞德跨越歲月滄桑的深情羈絆。",
        quote: "「在無盡紛擾的世事中，這裡永遠是能安撫你一切狼藉與疲憊的溫柔溫室。」",
        specificSkills: ["Tifa's Theme"]
      },
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / OVERWORLD",
        subtitle: "Main Theme of Final Fantasy VII",
        description: "FF7 世界地圖旅行的原野配樂。這是一首將旅途的孤獨感與宏偉的行星危機深度交織的交響巨作，在平緩悲愴的旋律下暗潮著行星生命之流的浩瀚湧動，是一切壯麗故事鋪陳的真正靈魂線條。",
        quote: "「行走在荒蕪遼闊的大地，看生命之流在暗夜幽幽流淌，而我們的旅程才剛剛啟封。」",
        specificSkills: ["Main Theme of FF7"]
      },
      {
        url: "https://images.unsplash.com/photo-1519074069444-1ba4e5663aa4?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / BATTLE",
        subtitle: "Those Who Fight",
        description: "狂放激進的戰鬥鋼琴與樂隊協奏！在無數回戰鬥遭遇戰中響起，高昂的節奏刺激著腎上腺素。曲子融入了重金屬搖滾與高速音符律動，讓每一場拔劍相向的戰鬥都顯得極其靈動、富有生命色彩。",
        quote: "「握緊你手中的大劍，在急促狂奔的節奏中劈開命運設下的所有險阻。」",
        specificSkills: ["Those Who Fight"]
      }
    ],
  },
  {
    code: "MOD-02",
    accentColor: "border-sky-500/30 text-sky-400 bg-sky-500/10",
    images: [
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / REBORN",
        subtitle: "Answers",
        description: "FFXIV 2.0重生的靈魂代表作。由 Susan Calloway 演繹的海德林母水晶視角。樂曲在前段用空靈的提問唱腔，到中段戰火爆發的狂暴重金屬咆哮，最後展現出眾生在苦難中尋求生命的解答的大氣與恢弘。",
        quote: "「在無盡的苦難與迷茫中跋涉，我們終將在旅途盡頭尋得生命生存的終極解答。」",
        specificSkills: ["Answers"]
      },
      {
        url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / BALLAD",
        subtitle: "Dragonsong",
        description: "3.0蒼穹之禁城主題曲。傾訴人龍萬年戰爭悲愴史詩。音樂起於孤寂柔弱的歌喉，後加入排歌而起的高空交響，將命運被愚弄、仇恨代代延續的絕望與最後企盼和解的和煦微光展現得無比美麗。",
        quote: "「為萬年的仇恨蓋上哀傷的白雪，願高飛的龍與地上的人終能在高天同吟哀歌。」",
        specificSkills: ["Dragonsong"]
      },
      {
        url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / HARBINGER",
        subtitle: "Flow",
        description: "6.0曉月之終途主題曲，由 Amanda Achen 演唱。這首歌溫暖柔美，象徵在靈魂河流中漫長的漂泊與等待。它不僅是溫柔的搖籃曲，也是光之戰士在萬里跋涉後，生命之母給予的慈愛擁抱。",
        quote: "「合上你雙眼，任由靈魂在時間之河中靜靜流淌，當黎明到來之際，我將在那裡迎接你。」",
        specificSkills: ["Flow"]
      },
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / EDGE",
        subtitle: "To the Edge",
        description: "5.3版本的終極決戰Boss音樂。重型吉他riff與極具悲涼感的聲線交錯，向我們講述了守護世界的無影艾里迪布斯，在歷經萬年後早已忘卻初衷卻依然只憑著誓言與職責苦苦支持的悲壯結局。",
        quote: "「即使一切都已在風沙中風化消磨，我們每個人心中的承諾，仍指引著我們走到彼岸的邊界。」",
        specificSkills: ["To the Edge"]
      },
      {
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / ROCK",
        subtitle: "Shadowbringers",
        description: "5.0漆黑的反叛者同名主題曲。極其硬核的重金屬雙結他加史詩和聲！這首歌是光之戰士為了拯救第一世界，背負漆黑夜色成為『暗之戰士』戰鬥的完美寫照。",
        quote: "「如果這世上只有不滅的虛假白晝，那就由我們來成為撕裂白夜、呼喚黑夜的叛逆者。」",
        specificSkills: ["Shadowbringers"]
      },
      {
        url: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / COMFORT",
        subtitle: "Tomorrow and Tomorrow",
        description: "5.0的謝幕 Ballad，曲調極其溫柔和煦。微風徐徐的吉他聲，搭配悠揚的女聲，感謝了所有在路上與光之戰士並肩前行的同伴，以及那些為了明日而逝去的英雄靈魂。",
        quote: "「帶上所有離別的思念與沉重的誓言，繼續前行吧，為了所有值得期待的明日。」",
        specificSkills: ["Tomorrow and Tomorrow"]
      }
    ],
  },
  {
    code: "MOD-03",
    accentColor: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / CLASSIC",
        subtitle: "To Zanarkand",
        description: "FFX 最著名、也是日式RPG音樂史的豐碑。一曲極致優美溫柔、又散發著無盡哀怨與懷念的純鋼琴曲。在螢火與篝火燃燒的不歸旅途前，向玩家傾訴著尤娜與提達那注定分離、卻永恆不滅的愛情淚影。",
        quote: "「請傾聽我的故事，這也許是我們最後的道別，也是我這輩子最美麗的扎納爾坎德。」",
        specificSkills: ["To Zanarkand"]
      },
      {
        url: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / EPIC",
        subtitle: "Find the Flame",
        description: "FFXVI 中克萊夫覺醒伊弗利特力量時響起的招牌戰鬥進行曲。雄渾緊湊的鼓點、排山倒海的銅管與高頻的小提琴拉扯，將主角抗爭命運、燃燒靈魂去搏鬥的悲壯野心詮釋得激情無比。",
        quote: "「燃燒我的血肉！如果在宿命前我們只是一粒塵埃，那就用最熾熱的烈焰將這黑夜點燃。」",
        specificSkills: ["Find the Flame"]
      },
      {
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / REGAL",
        subtitle: "Somnus",
        description: "FFXV 主題曲，曲調充滿深沉的哀悼。唯美絕倫的拉丁美聲和鋼琴重擊，演繹了路西斯王國歷代國王悲劇性的宿命沉淪，與主角諾克提斯在孤獨中承載救世痛苦、直到獻祭沉夢的悲涼宿命。",
        quote: "「我的神子啊，安息於沉沉長夜吧，直到你戴上代表救贖與犧牲的荊棘王冠。」",
        specificSkills: ["Somnus"]
      },
      {
        url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / CATACLYSM",
        subtitle: "Apocalypsis Noctis",
        description: "FFXV 與巨大星之召喚獸（泰坦）戰鬥時響起的宏大配樂。樂曲使用爆發般的全管弦樂與大合唱，配合激進的聖歌詠唱，將直面神明、螻蟻抗天的史詩宏大感推到了極致巔峰。",
        quote: "「在撼動大地的神之神威面前，用血肉之軀直面神明的震怒，發起最瘋狂的挑戰。」",
        specificSkills: ["Apocalypsis Noctis"]
      },
      {
        url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / LOVE",
        subtitle: "Eyes on Me",
        description: "FFVIII 主題曲，由王菲經典獻演。這首曲目開闢了系列流行天后獻唱大熱單曲的重要先河。柔美深情的英文唱詞，伴隨浪漫復古的鋼琴與管弦，抒寫了拉格納與茱莉亞、以及史考爾與莉諾雅兩代人浪漫溫存的經典愛戀。",
        quote: "「當你站在聚光燈下輕吹琴鍵，請凝望我，我的眼中只有你溫柔微笑的倒影。」",
        specificSkills: ["Eyes on Me"]
      },
      {
        url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200",
        badge: "SOUNDTRACK / FOLK",
        subtitle: "Melodies of Life",
        description: "FFIX 主題歌。帶著濃郁中世紀凱爾特風情與童話色彩。音樂由清亮純美的長笛伴隨豎琴，講述了生命、傳承、回憶與歸宿，給整個溫潤如玉的繪本童話故事蓋上了一層永恆的浪漫帷幕。",
        quote: "「不論命運將你我帶向何方，只要生命之歌還在吟唱，我們內心承載的故事便永不凋零。」",
        specificSkills: ["Melodies of Life"]
      }
    ],
  },
];

const getSkillLink = (skill: string): string => {
  const lowercase = skill.toLowerCase();
  if (lowercase.includes("mako reactor1 - battle edit")) return "https://open.spotify.com/track/1p6P3nOGPdtGn9KtCEcrfp?si=678b4ccc521a487b";
  if (lowercase.includes("bombing mission")) return "https://open.spotify.com/track/4uhuaxcZjRMFdiQxMKpz3W?si=7a9f49265edc4d3d";
  if (lowercase.includes("one-winged angel")) return "https://open.spotify.com/track/3WCOvD2Z9f8FidLIsyH3f1?si=0367d30b91e94cbd";
  if (lowercase.includes("aerith's theme")) return "https://open.spotify.com/track/5r0lMstX8k2T6tH01Z89G8?si=e2fe3c7f3b8f411b";
  if (lowercase.includes("tifa's theme")) return "https://open.spotify.com/track/5u0vj4k6PZcnd3u9vjYfW1?si=63a566fed7ba494d";
  if (lowercase.includes("main theme of final fantasy vii") || lowercase.includes("main theme of ff7")) return "https://open.spotify.com/track/4jD9N4F9X1HwXG9wXgYdZf?si=8c8d8213bcfa41fe";
  if (lowercase.includes("those who fight")) return "https://open.spotify.com/track/2SId8S1K7M1Pq4hX4Z0Rz7?si=f7036a443a5b4f62";
  if (lowercase.includes("answers")) return "https://open.spotify.com/track/1LInZorqK66z7768jZf7lD?si=4a6659f81ce145ec";
  if (lowercase.includes("dragonsong")) return "https://open.spotify.com/track/53L0O64zY2aZl7W6Jb6C3z?si=73cb588f638f4be1";
  if (lowercase.includes("flow")) return "https://open.spotify.com/track/2XWqG95n5NfP8yD6Y4H5Z5?si=08cba9a6fe4a40d5";
  if (lowercase.includes("to the edge")) return "https://open.spotify.com/track/0XyX2g08LOf79P8C71Of5n?si=b3cefa06fdac4b6c";
  if (lowercase.includes("shadowbringers")) return "https://open.spotify.com/track/2V1N3K4XJ9O5Z7gW8S7F8N?si=398cb9b6ed2f45ea";
  if (lowercase.includes("tomorrow and tomorrow")) return "https://open.spotify.com/track/3MyeY8h7V2z77vW5f7v6X8?si=369cbef68d6f469a";
  if (lowercase.includes("to zanarkand")) return "https://open.spotify.com/track/1LInZorqK66z7768jZf7lD?si=5aace2f6a9e14ee5";
  if (lowercase.includes("find the flame")) return "https://open.spotify.com/track/3u63NdfnB77XU8C7gqdfK6?si=47cbd7fc6df64983";
  if (lowercase.includes("somnus")) return "https://open.spotify.com/track/5688uOfN7HhU8c9S86Ufg7?si=7be60c8861df4005";
  if (lowercase.includes("apocalypsis noctis")) return "https://open.spotify.com/track/1B98vHn30F4N4Y93W3XdfU?si=fb8cfdf96e8e4a9e";
  if (lowercase.includes("eyes on me")) return "https://open.spotify.com/track/5d6W7D1F5OfCdf6v6S9UfC?si=92cead9dcd8e4c70";
  if (lowercase.includes("melodies of life")) return "https://open.spotify.com/track/5u9gX4D3Of9zC8G49bdf8J?si=dc79fa8e4c8e410b";
  return "https://open.spotify.com";
};

export default function SkillDetailModal({
  isOpen,
  onClose,
  categories,
  initialIndex,
}: SkillDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);

  // Sync index with initial opening index
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setCurrentImageIndex(0);
      setIsFullscreenImage(false);
    }
  }, [isOpen, initialIndex]);

  const currentCategory = categories[activeIndex];
  const currentDetails = SKILL_DETAILS_CONTENT[activeIndex] || SKILL_DETAILS_CONTENT[0];
  const currentImageDetail = currentDetails.images[currentImageIndex] || currentDetails.images[0];
  const totalCategories = categories.length;

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentDetails.images && currentDetails.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % currentDetails.images.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentDetails.images && currentDetails.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + currentDetails.images.length) % currentDetails.images.length);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreenImage) {
          setIsFullscreenImage(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreenImage, activeIndex, currentImageIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] overflow-hidden flex items-center justify-center font-sans">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md"
          id="skills-modal-backdrop"
        />

        {/* Modal Structure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-zinc-900 border border-zinc-800 w-full max-w-5xl h-full md:h-[85vh] max-h-[800px] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden mx-4 z-10"
          id="skills-modal-body"
        >
          
          <div className="absolute top-4 right-4 z-40 flex items-center">
            <button
              onClick={onClose}
              className="p-2.5 bg-white text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors font-bold shadow-lg"
              title="關閉視窗 (Esc)"
              id="skill-modal-close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Left Panel */}
          <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto h-[260px] md:h-full bg-zinc-950 group overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800 flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeIndex}-${currentImageIndex}`}
                src={currentImageDetail.url}
                alt={`${currentCategory.title} - ${currentImageIndex + 1}`}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 0.95, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover group-hover:opacity-100 transition-all duration-500 cursor-zoom-in"
                onClick={() => setIsFullscreenImage(true)}
                id="skill-modal-primary-image"
              />
            </AnimatePresence>

            {/* Slider arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-zinc-950/80 hover:bg-zinc-800 text-white border border-white/10 p-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
              title="上一張"
              id="skill-panel-inner-prev"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-zinc-950/80 hover:bg-zinc-800 text-white border border-white/10 p-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
              title="下一張"
              id="skill-panel-inner-next"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="absolute bottom-4 left-4 z-30 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 text-xs font-mono text-zinc-300">
              {currentImageIndex + 1} / {currentDetails.images.length}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border-r border-dashed border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] border-t border-dashed border-white/5 pointer-events-none" />
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col justify-between overflow-y-auto p-6 md:p-10 space-y-8 text-zinc-100 bg-zinc-900/40">
            
            <div className="space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-blue-400 font-semibold uppercase block">
                  {currentImageDetail.subtitle}
                </span>
                <h3 className="font-serif italic text-3xl font-medium text-white tracking-wide">
                  {currentCategory.title}
                </h3>
              </div>

              <div className="space-y-5 pt-2 border-t border-zinc-800/80">
                <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
                  {currentImageDetail.description}
                </p>

                <div className="border-l-2 border-zinc-500 pl-4 py-1 bg-zinc-950/20 rounded-r-sm">
                  <p className="font-serif italic text-xs leading-relaxed text-zinc-400 font-light mx-1">
                    {currentImageDetail.quote}
                  </p>
                </div>
              </div>

              {/* Action Button Links */}
              <div className="space-y-3 pt-4">
                <div className="grid grid-cols-1 gap-2" id="skill-modal-tags-grid">
                  {currentImageDetail.specificSkills.slice(0, 1).map((skill) => (
                    <a
                      key={skill}
                      href={getSkillLink(skill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-zinc-950/50 border border-zinc-800 p-2.5 rounded-sm hover:border-zinc-500 hover:bg-zinc-900/40 transition-all duration-300 group/link cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-none bg-blue-500 shrink-0" />
                        <span className="font-sans text-xs text-white font-medium tracking-wide group-hover/link:text-zinc-300 transition-colors">
                          {skill}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 group-hover/link:text-blue-400 font-light tracking-wider flex items-center space-x-1">
                        <span>OPEN DOCS</span>
                        <svg className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </motion.div>

        {/* Fullscreen Image Overlay Wrapper */}
        <AnimatePresence>
          {isFullscreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col justify-between p-6 select-none"
              id="skill-fullscreen-page-viewer"
            >
              <div className="flex items-center justify-between w-full z-10 text-white">
                <button
                  onClick={() => setIsFullscreenImage(false)}
                  className="flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2.5 rounded-sm font-sans text-xs font-semibold tracking-wider uppercase transition-colors"
                  id="fullscreen-close-top"
                >
                  <ArrowLeft className="w-4 h-4 text-zinc-400" />
                  <span>返回項目詳情</span>
                </button>

                <div className="font-mono text-xs tracking-widest text-zinc-400 font-bold uppercase">
                  {currentImageDetail.subtitle} // {currentCategory.title}
                </div>

                <button
                  onClick={() => setIsFullscreenImage(false)}
                  className="p-2.5 bg-white text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors shadow-lg"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center py-8 relative">
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 md:left-8 z-10 bg-zinc-900/80 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 p-3 rounded-full shadow-lg hover:scale-105 transition-all"
                  id="fullscreen-arrow-prev"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <motion.div 
                  className="max-w-5xl max-h-[72vh] rounded shadow-2xl overflow-hidden border border-zinc-800/80 aspect-video md:aspect-[3/2] flex items-center justify-center bg-zinc-900"
                  key={`${activeIndex}-${currentImageIndex}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <img
                    src={currentImageDetail.url}
                    alt={currentCategory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter saturate-[95%]"
                  />
                </motion.div>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 md:right-8 z-10 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 p-3 rounded-full shadow-lg hover:scale-105 transition-all"
                  id="fullscreen-arrow-next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 border-t border-zinc-900 text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
                <div>
                  [ STATUS: APPROVED SYSTEMS LOCK ] // MODULE: {currentDetails.code}
                </div>
                <div className="flex items-center space-x-1.5">
                  {currentDetails.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <span>SWIPE OR USE ARROWS KEY TO BROWSE</span>
                  <span className="text-zinc-600">•</span>
                  <span>{currentImageIndex + 1} / {currentDetails.images.length}</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
}
