import axios from "axios"
import slugify from "slugify"

export type Gamemodes =
  | "standard"
  | "ironman"
  | "hardcore"
  | "ultimate"
  | "deadman"
  | "seasonal"

type FetchPlayer = {
  name: string
  gamemode?: Gamemodes
}

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
  "Callisto",
  "Cerberus",
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

export const fetchPlayerByName = async ({
  name,
  gamemode = "standard",
}: FetchPlayer) => {
  const endpoints = {
    standard: `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=`,
    ironman:
      "https://secure.runescape.com/m=hiscore_oldschool_ironman/index_lite.ws?player=",
    hardcore:
      "https://secure.runescape.com/m=hiscore_oldschool_hardcore_ironman/index_lite.ws?player=",
    ultimate:
      "https://secure.runescape.com/m=hiscore_oldschool_ultimate/index_lite.ws?player=",
    deadman:
      "https://secure.runescape.com/m=hiscore_oldschool_deadman/index_lite.ws?player=",
    seasonal:
      "https://secure.runescape.com/m=hiscore_oldschool_seasonal/index_lite.ws?player=",
  }

  const { data, code } = await axios.get(endpoints[gamemode] + name)

  return { code, data: parseJagexPlayerToJSON(data) }
}
