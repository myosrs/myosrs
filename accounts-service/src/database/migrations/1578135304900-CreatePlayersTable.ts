import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePlayersTable1578135304900 implements MigrationInterface {
  name = "CreatePlayersTable1578135304900"

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "players" ("name" character varying NOT NULL, "league_points" text NOT NULL, "bounty_hunter_hunter" text NOT NULL, "bounty_hunter_rogue" text NOT NULL, "clue_scrolls_all" text NOT NULL, "clue_scrolls_beginner" text NOT NULL, "clue_scrolls_easy" text NOT NULL, "clue_scrolls_medium" text NOT NULL, "clue_scrolls_hard" text NOT NULL, "clue_scrolls_elite" text NOT NULL, "clue_scrolls_master" text NOT NULL, "last_man_standing" text NOT NULL, "abyssal_sire" text NOT NULL, "alchemical_hydra" text NOT NULL, "barrows_chests" text NOT NULL, "bryophyta" text NOT NULL, "callisto" text, "cerberus" text, "chambers_of_xeric" text NOT NULL, "chambers_of_xeric_challenge_mode" text NOT NULL, "chaos_elemental" text NOT NULL, "chaos_fanatic" text NOT NULL, "commander_zilyana" text NOT NULL, "corporeal_beast" text NOT NULL, "crazy_archaeologist" text NOT NULL, "dagannoth_prime" text NOT NULL, "dagannoth_rex" text NOT NULL, "dagannoth_supreme" text NOT NULL, "deranged_archaeologist" text NOT NULL, "general_graardor" text NOT NULL, "giant_mole" text NOT NULL, "grotesque_guardians" text NOT NULL, "hespori" text NOT NULL, "kalphite_queen" text NOT NULL, "king_black_dragon" text NOT NULL, "kraken" text NOT NULL, "kreearra" text NOT NULL, "kril_tsutsaroth" text NOT NULL, "mimic" text NOT NULL, "obor" text NOT NULL, "sarachnis" text NOT NULL, "scorpia" text NOT NULL, "skotizo" text NOT NULL, "the_gauntlet" text NOT NULL, "the_corrupted_gauntlet" text NOT NULL, "theatre_of_blood" text NOT NULL, "thermonuclear_smoke_devil" text NOT NULL, "tzkal_zuk" text NOT NULL, "tztok_jad" text NOT NULL, "venenatis" text NOT NULL, "vetion" text NOT NULL, "vorkath" text NOT NULL, "wintertodt" text NOT NULL, "zalcano" text NOT NULL, "zulrah" text NOT NULL, "overall" text NOT NULL, "attack" text NOT NULL, "defence" text NOT NULL, "strength" text NOT NULL, "hitpoints" text NOT NULL, "ranged" text NOT NULL, "prayer" text NOT NULL, "magic" text NOT NULL, "cooking" text NOT NULL, "woodcutting" text NOT NULL, "fletching" text NOT NULL, "fishing" text NOT NULL, "firemaking" text NOT NULL, "crafting" text NOT NULL, "smithing" text NOT NULL, "mining" text NOT NULL, "herblore" text NOT NULL, "agility" text NOT NULL, "thieving" text NOT NULL, "slayer" text NOT NULL, "farming" text NOT NULL, "runecrafting" text NOT NULL, "hunter" text NOT NULL, "construction" text NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1b597c8eb2fadb72240d576fd0f" PRIMARY KEY ("name"))`,
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "players"`, undefined)
  }
}
