import slugify from "slugify"
import { AccountEntity } from "../database/entities/AccountEntity"

const skillsList = [
  "Overall",
  "Attack",
  "Defence",
  "Strength",
  "Hitpoints",
  "Ranged",
  "Prayer",
  "Magic",
  "Cooking",
  "Woodcutting",
  "Fletching",
  "Fishing",
  "Firemaking",
  "Crafting",
  "Smithing",
  "Mining",
  "Herblore",
  "Agility",
  "Thieving",
  "Slayer",
  "Farming",
  "Runecrafting",
  "Hunter",
  "Construction",
]
const activitiesList = [
  "League Points",
  "Bounty Hunter - Hunter",
  "Bounty Hunter - Rogue",
  "Clue Scrolls (all)",
  "Clue Scrolls (beginner)",
  "Clue Scrolls (easy)",
  "Clue Scrolls (medium)",
  "Clue Scrolls (hard)",
  "Clue Scrolls (elite)",
  "Clue Scrolls (master)",
  "Last Man Standing",
]
const bossesList = [
  "Abyssal Sire",
  "Alchemical Hydra",
  "Barrows Chests",
  "Bryophyta",
  /**
   * TODO: Intentially commented out, the RS API doesn't pass these values back
   * SEE: https://github.com/myosrs/api.myosrs.com/issues/3
   */
  // "Callisto",
  // "Cerberus",
  "Chambers of Xeric",
  "Chambers of Xeric: Challenge Mode",
  "Chaos Elemental",
  "Chaos Fanatic",
  "Commander Zilyana",
  "Corporeal Beast",
  "Crazy Archaeologist",
  "Dagannoth Prime",
  "Dagannoth Rex",
  "Dagannoth Supreme",
  "Deranged Archaeologist",
  "General Graardor",
  "Giant Mole",
  "Grotesque Guardians",
  "Hespori",
  "Kalphite Queen",
  "King Black Dragon",
  "Kraken",
  "Kree'Arra",
  "K'ril Tsutsaroth",
  "Mimic",
  "Obor",
  "Sarachnis",
  "Scorpia",
  "Skotizo",
  "The Gauntlet",
  "The Corrupted Gauntlet",
  "Theatre of Blood",
  "Thermonuclear Smoke Devil",
  "TzKal-Zuk",
  "TzTok-Jad",
  "Venenatis",
  "Vet'ion",
  "Vorkath",
  "Wintertodt",
  "Zalcano",
  "Zulrah",
]

const separateIntoLines = (jagexPlayer: any): string[] => {
  return jagexPlayer.split("\n")
}

const formatActivities = (activitiesArray: string[]) => {
  const activities: any = {}

  activitiesList.map((activityName, index) => {
    const [rank, count] = activitiesArray[index].split(",")
    activities[
      slugify(activityName, {
        replacement: "_",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      })
    ] = { rank: parseInt(rank), count: parseInt(count) }
  })

  return activities
}

const formatBosses = (bossesArray: string[]) => {
  const bosses: any = {}

  bossesList.map((bossName, index) => {
    const [rank, count] = bossesArray[index].split(",")
    bosses[
      slugify(bossName, {
        replacement: "_",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      })
    ] = { rank: parseInt(rank), count: parseInt(count) }
  })

  return bosses
}

const formatSkills = (skillsArray: string[]) => {
  const skills: any = {}

  skillsList.map((skillName, index) => {
    const [rank, level, experience] = skillsArray[index].split(",")
    skills[
      slugify(skillName, {
        replacement: "_",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      })
    ] = {
      rank: parseInt(rank),
      level: parseInt(level),
      experience: parseInt(experience),
    }
  })

  return skills
}

const parseJagexPlayerToJSON = (jagexPlayer: any) => {
  const lines = separateIntoLines(jagexPlayer)
  const [skillsStartIndex, skillsEndIndex] = [0, skillsList.length]
  const [activitiesStartIndex, activitiesEndIndex] = [
    skillsList.length,
    skillsList.length + activitiesList.length,
  ]
  const [bossesStartIndex, bossesEndIndex] = [
    skillsList.length + activitiesList.length,
    skillsList.length + activitiesList.length + bossesList.length,
  ]

  const activities = formatActivities([
    ...lines.slice(activitiesStartIndex, activitiesEndIndex),
  ])
  const bosses = formatBosses([
    ...lines.slice(bossesStartIndex, bossesEndIndex),
  ])
  const skills = formatSkills([
    ...lines.slice(skillsStartIndex, skillsEndIndex),
  ])

  return {
    activities,
    bosses,
    skills,
  }
}

export class JagexPlayer {
  _jagexPlayer: any
  player: any

  constructor({ jagexPlayer }: { jagexPlayer: any }) {
    this._jagexPlayer = jagexPlayer
    this.player = parseJagexPlayerToJSON(jagexPlayer)
  }

  get getActivities() {
    return this.player.activities
  }

  get getBosses() {
    return this.player.bosses
  }

  get getSkills() {
    return this.player.skills
  }
}

export class MyOSRSPlayer {
  player: AccountEntity

  constructor(player: AccountEntity) {
    this.player = player
  }

  get name() {
    return this.player.name
  }

  get activities() {
    const {
      league_points,
      bounty_hunter_hunter,
      bounty_hunter_rogue,
      clue_scrolls_all,
      clue_scrolls_beginner,
      clue_scrolls_easy,
      clue_scrolls_medium,
      clue_scrolls_hard,
      clue_scrolls_elite,
      clue_scrolls_master,
      last_man_standing,
    } = this.player

    return {
      league_points,
      bounty_hunter_hunter,
      bounty_hunter_rogue,
      clue_scrolls_all,
      clue_scrolls_beginner,
      clue_scrolls_easy,
      clue_scrolls_medium,
      clue_scrolls_hard,
      clue_scrolls_elite,
      clue_scrolls_master,
      last_man_standing,
    }
  }

  get bosses() {
    const {
      abyssal_sire,
      alchemical_hydra,
      barrows_chests,
      bryophyta,
      callisto,
      cerberus,
      chambers_of_xeric,
      chambers_of_xeric_challenge_mode,
      chaos_elemental,
      chaos_fanatic,
      commander_zilyana,
      corporeal_beast,
      crazy_archaeologist,
      dagannoth_prime,
      dagannoth_rex,
      dagannoth_supreme,
      deranged_archaeologist,
      general_graardor,
      giant_mole,
      grotesque_guardians,
      hespori,
      kalphite_queen,
      king_black_dragon,
      kraken,
      kreearra,
      kril_tsutsaroth,
      mimic,
      obor,
      sarachnis,
      scorpia,
      skotizo,
      the_gauntlet,
      the_corrupted_gauntlet,
      theatre_of_blood,
      thermonuclear_smoke_devil,
      tzkal_zuk,
      tztok_jad,
      venenatis,
      vetion,
      vorkath,
      wintertodt,
      zalcano,
      zulrah,
    } = this.player

    return {
      abyssal_sire,
      alchemical_hydra,
      barrows_chests,
      bryophyta,
      callisto,
      cerberus,
      chambers_of_xeric,
      chambers_of_xeric_challenge_mode,
      chaos_elemental,
      chaos_fanatic,
      commander_zilyana,
      corporeal_beast,
      crazy_archaeologist,
      dagannoth_prime,
      dagannoth_rex,
      dagannoth_supreme,
      deranged_archaeologist,
      general_graardor,
      giant_mole,
      grotesque_guardians,
      hespori,
      kalphite_queen,
      king_black_dragon,
      kraken,
      kreearra,
      kril_tsutsaroth,
      mimic,
      obor,
      sarachnis,
      scorpia,
      skotizo,
      the_gauntlet,
      the_corrupted_gauntlet,
      theatre_of_blood,
      thermonuclear_smoke_devil,
      tzkal_zuk,
      tztok_jad,
      venenatis,
      vetion,
      vorkath,
      wintertodt,
      zalcano,
      zulrah,
    }
  }

  get skills() {
    const {
      overall,
      attack,
      defence,
      strength,
      hitpoints,
      ranged,
      prayer,
      magic,
      cooking,
      woodcutting,
      fletching,
      fishing,
      firemaking,
      crafting,
      smithing,
      mining,
      herblore,
      agility,
      thieving,
      slayer,
      farming,
      runecrafting,
      hunter,
      construction,
    } = this.player

    return {
      overall,
      attack,
      defence,
      strength,
      hitpoints,
      ranged,
      prayer,
      magic,
      cooking,
      woodcutting,
      fletching,
      fishing,
      firemaking,
      crafting,
      smithing,
      mining,
      herblore,
      agility,
      thieving,
      slayer,
      farming,
      runecrafting,
      hunter,
      construction,
    }
  }
}
