import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar Date

  type Account {
    name: String!
    object: String!
    activities: AccountActivities!
    bosses: AccountBosses!
    skills: AccountSkills!
  }

  type AccountActivities {
    league_points: AccountActivity!
    bounty_hunter_hunter: AccountActivity!
    bounty_hunter_rogue: AccountActivity!
    clue_scrolls_all: AccountActivity!
    clue_scrolls_beginner: AccountActivity!
    clue_scrolls_easy: AccountActivity!
    clue_scrolls_medium: AccountActivity!
    clue_scrolls_hard: AccountActivity!
    clue_scrolls_elite: AccountActivity!
    clue_scrolls_master: AccountActivity!
    last_man_standing: AccountActivity!
  }

  type AccountActivity {
    rank: Int!
    count: Int!
  }

  type AccountBosses {
    abyssal_sire: AccountBoss!
    alchemical_hydra: AccountBoss!
    barrows_chests: AccountBoss!
    bryophyta: AccountBoss!
    callisto: AccountBoss!
    cerberus: AccountBoss!
    chambers_of_xeric: AccountBoss!
    chambers_of_xeric_challenge_mode: AccountBoss!
    chaos_elemental: AccountBoss!
    chaos_fanatic: AccountBoss!
    commander_zilyana: AccountBoss!
    corporeal_beast: AccountBoss!
    crazy_archaeologist: AccountBoss!
    dagannoth_prime: AccountBoss!
    dagannoth_rex: AccountBoss!
    dagannoth_supreme: AccountBoss!
    deranged_archaeologist: AccountBoss!
    general_graardor: AccountBoss!
    giant_mole: AccountBoss!
    grotesque_guardians: AccountBoss!
    hespori: AccountBoss!
    kalphite_queen: AccountBoss!
    king_black_dragon: AccountBoss!
    kraken: AccountBoss!
    kreearra: AccountBoss!
    kril_tsutsaroth: AccountBoss!
    mimic: AccountBoss!
    obor: AccountBoss!
    sarachnis: AccountBoss!
    scorpia: AccountBoss!
    skotizo: AccountBoss!
    the_gauntlet: AccountBoss!
    the_corrupted_gauntlet: AccountBoss!
    theatre_of_blood: AccountBoss!
    thermonuclear_smoke_devil: AccountBoss!
    tzkal_zuk: AccountBoss!
    tztok_jad: AccountBoss!
    venenatis: AccountBoss!
    vetion: AccountBoss!
    vorkath: AccountBoss!
    wintertodt: AccountBoss!
    zalcano: AccountBoss!
    zulrah: AccountBoss!
  }

  type AccountBoss {
    rank: Int!
    count: Int!
  }

  type AccountSkills {
    overall: AccountSkill!
    attack: AccountSkill!
    defence: AccountSkill!
    strength: AccountSkill!
    hitpoints: AccountSkill!
    ranged: AccountSkill!
    prayer: AccountSkill!
    magic: AccountSkill!
    cooking: AccountSkill!
    woodcutting: AccountSkill!
    fletching: AccountSkill!
    fishing: AccountSkill!
    firemaking: AccountSkill!
    crafting: AccountSkill!
    smithing: AccountSkill!
    mining: AccountSkill!
    herblore: AccountSkill!
    agility: AccountSkill!
    thieving: AccountSkill!
    slayer: AccountSkill!
    farming: AccountSkill!
    runecrafting: AccountSkill!
    hunter: AccountSkill!
    construction: AccountSkill!
  }

  type AccountSkill {
    rank: Int!
    level: Int!
    experience: Float!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
  }

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    id: ID!
    user: User!
  }

  type Query {
    account(name: String!): Account!
    accounts: [Account!]!
    userSession(me: Boolean!): UserSession
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession!
    deleteUserSession(sessionId: ID!): Boolean!
  }
`;
