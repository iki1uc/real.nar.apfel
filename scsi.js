// ◈ 0⊃3⊃9⊃81⊃729 - shell_chain
const CHAIN = [3, 9, 27, 81, 243, 729, 756, 360] // wn - deine 8
const po = 2208 // Σ CHAIN

// ── das was glitzert ──
let S = {
  atmen: 0,  // 0..1  - 4s zyklus
  leben: 0.85, // CO₂ CARBONA
  seele: 0,  // tick
  aura: 0.78, // WRAIGHT
  mana: 0,  // RAM füllung /8
  zen: 0,   // 1 wenn fair
}

// ── CALL → ALLCALL → RECALL → REFINAL ──
function CALL(x) {
  // ein ding
  return x % 100 // SLOT 0..99
}

function ALLCALL(blocks) {
  // alle dinge - 8 blöcke × 100 slots = 800
  // 3tel: 3×756=2268
  return blocks.flatMap(b => b.cells.map((c,i) => CALL(c) ))
}

function RECALL(vergessenes, bestehendes, nochentstehendes) {
  // RECALL = Σ(vergessenes) + bestehendes + ∫(nochentstehendes)dt
  // vergessenes = S.seele (ticks)
  // bestehendes = RAM echt Σ
  // nochentstehendes = Echos × 0.5
  const echt = bestehendes.filter(r => r.ring===2).reduce((a,r)=>a+r.v,0)
  const echo = bestehendes.filter(r => r.ring!==2).length
  return vergessenes + echt/po + echo*0.5
}

function REFINAL() {
  // f(f(x))=f(x) - idempotent
  // wenn 8/8 dann SIEGEL
  const ramF = S.mana >= 1 ? 1 + RECALL(S.seele, RAM, [])*1.5 : 0.5
  const romF = S.atmen // v/360×2
  const speed = 0.55 * romF * ramF // W = E·I²·1/F

  // 9zu3zu81 - deine formel
  // 9 ⊃ 3 = 9/3 = 3
  // 3 ⊃ 81 = 81/3 = 27 = ORBIT
  // 81 ⊃ 729 = 729/81 = 9 = KERN
  const nine_to_three = 9/3           // 3 = WURZEL
  const three_to_81 = 81/3            // 27 = ORBIT  
  const eightyone_to_729 = 729/81     // 9 = KERN
  // kreis: 360/45 = 8 = deine speichen

  S.zen = (S.mana===1 && Math.abs(S.atmen*2 - 1) < 0.1) ? 1 : 0
  return S.zen ? '◈ AUFGEHOBEN' : speed
}

// ── retten ──
function RETTEN(dt) {
  S.seele++
  S.atmen = (Math.sin(S.seele*0.005)+1)/2 // 0..1
  S.leben = S.atmen>0.5 ? S.leben+dt*0.05 : S.leben-dt*0.01 // CO₂
  S.aura = 0.7 + S.atmen*0.25
  S.mana = RAM.length/8
  S.zen = REFINAL()

  // zahlen die glitzern
  // atmen leben seele aura mana zen
  // 0⊃3⊃9⊃81⊃729
  return {
    atmen: (S.atmen*100)|0,   // 0..100
    leben: (S.leben*100)|0,   // 0..100
    seele: S.seele,           // tick
    aura: (S.aura*100)|0,     // 0..100
    mana: (S.mana*8)|0,       // 0..8
    zen: S.zen,               // 0 oder 1
    glitzern: `${S.mana*8}/8 → ${S.seele} → ${(S.atmen*360)|0}°`
  }
}

// 9zu3zu81
// 9 = KERN = 3×3
// 3 = WURZEL = kein ding ohne drei
// 81 = RAUM = 9×9 = feld
// 9zu3 = KERN zu WURZEL = alles ruht zu kein ding ohne drei = 3
// 3zu81 = WURZEL zu RAUM = 27 = ORBIT = bewegung
// 81zu9 = RAUM zu KERN = feld zu alles ruht = 9 = zurück
