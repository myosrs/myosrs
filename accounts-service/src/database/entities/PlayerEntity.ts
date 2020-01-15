import { differenceInMinutes } from "date-fns"
import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "players" })
export class PlayerEntity {
  @PrimaryColumn() name!: string

  /**
   * Activities
   */
  @Column("simple-json") league_points!: { rank: number; count: number }
  @Column("simple-json") bounty_hunter_hunter!: { rank: number; count: number }
  @Column("simple-json") bounty_hunter_rogue!: { rank: number; count: number }
  @Column("simple-json") clue_scrolls_all!: { rank: number; count: number }
  @Column("simple-json") clue_scrolls_beginner!: { rank: number; count: number }
  @Column("simple-json") clue_scrolls_easy!: { rank: number; count: number }
  @Column("simple-json") clue_scrolls_medium!: { rank: number; count: number }
  @Column("simple-json") clue_scrolls_hard!: { rank: number; count: number }
  @Column("simple-json") clue_scrolls_elite!: { rank: number; count: number }
  @Column("simple-json") clue_scrolls_master!: { rank: number; count: number }
  @Column("simple-json") last_man_standing!: { rank: number; count: number }

  /**
   * Bosses
   */
  @Column("simple-json") abyssal_sire!: { rank: number; count: number }
  @Column("simple-json") alchemical_hydra!: { rank: number; count: number }
  @Column("simple-json") barrows_chests!: { rank: number; count: number }
  @Column("simple-json") bryophyta!: { rank: number; count: number }
  @Column("simple-json", { nullable: true }) callisto!: {
    rank: number
    count: number
  }
  @Column("simple-json", { nullable: true }) cerberus!: {
    rank: number
    count: number
  }
  @Column("simple-json") chambers_of_xeric!: { rank: number; count: number }
  @Column("simple-json") chambers_of_xeric_challenge_mode!: {
    rank: number
    count: number
  }
  @Column("simple-json") chaos_elemental!: { rank: number; count: number }
  @Column("simple-json") chaos_fanatic!: { rank: number; count: number }
  @Column("simple-json") commander_zilyana!: { rank: number; count: number }
  @Column("simple-json") corporeal_beast!: { rank: number; count: number }
  @Column("simple-json") crazy_archaeologist!: { rank: number; count: number }
  @Column("simple-json") dagannoth_prime!: { rank: number; count: number }
  @Column("simple-json") dagannoth_rex!: { rank: number; count: number }
  @Column("simple-json") dagannoth_supreme!: { rank: number; count: number }
  @Column("simple-json") deranged_archaeologist!: {
    rank: number
    count: number
  }
  @Column("simple-json") general_graardor!: { rank: number; count: number }
  @Column("simple-json") giant_mole!: { rank: number; count: number }
  @Column("simple-json") grotesque_guardians!: { rank: number; count: number }
  @Column("simple-json") hespori!: { rank: number; count: number }
  @Column("simple-json") kalphite_queen!: { rank: number; count: number }
  @Column("simple-json") king_black_dragon!: { rank: number; count: number }
  @Column("simple-json") kraken!: { rank: number; count: number }
  @Column("simple-json") kreearra!: { rank: number; count: number }
  @Column("simple-json") kril_tsutsaroth!: { rank: number; count: number }
  @Column("simple-json") mimic!: { rank: number; count: number }
  @Column("simple-json") obor!: { rank: number; count: number }
  @Column("simple-json") sarachnis!: { rank: number; count: number }
  @Column("simple-json") scorpia!: { rank: number; count: number }
  @Column("simple-json") skotizo!: { rank: number; count: number }
  @Column("simple-json") the_gauntlet!: { rank: number; count: number }
  @Column("simple-json") the_corrupted_gauntlet!: {
    rank: number
    count: number
  }
  @Column("simple-json") theatre_of_blood!: { rank: number; count: number }
  @Column("simple-json") thermonuclear_smoke_devil!: {
    rank: number
    count: number
  }
  @Column("simple-json") tzkal_zuk!: { rank: number; count: number }
  @Column("simple-json") tztok_jad!: { rank: number; count: number }
  @Column("simple-json") venenatis!: { rank: number; count: number }
  @Column("simple-json") vetion!: { rank: number; count: number }
  @Column("simple-json") vorkath!: { rank: number; count: number }
  @Column("simple-json") wintertodt!: { rank: number; count: number }
  @Column("simple-json") zalcano!: { rank: number; count: number }
  @Column("simple-json") zulrah!: { rank: number; count: number }

  /**
   * Skills
   */
  @Column("simple-json") overall!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") attack!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") defence!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") strength!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") hitpoints!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") ranged!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") prayer!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") magic!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") cooking!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") woodcutting!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") fletching!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") fishing!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") firemaking!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") crafting!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") smithing!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") mining!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") herblore!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") agility!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") thieving!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") slayer!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") farming!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") runecrafting!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") hunter!: {
    rank: number
    level: number
    experience: number
  }
  @Column("simple-json") construction!: {
    rank: number
    level: number
    experience: number
  }

  @UpdateDateColumn() updatedAt!: Date

  lastUpdated() {
    return differenceInMinutes(new Date(), this.updatedAt)
  }
}
