import { getRepository, Repository } from "typeorm"
import { PlayerEntity } from "../database/entities/PlayerEntity"
import { fetchPlayerByName } from "../utils/APIWrapper"

interface PlayerProps {
  entity?: PlayerEntity
  name?: string
}

export class Player {
  private _entity?: PlayerEntity
  private _name?: string
  private _repo: Repository<PlayerEntity>

  constructor({ name, entity }: PlayerProps) {
    this._repo = getRepository(PlayerEntity)

    if (name === undefined && entity === undefined) {
      throw new Error(
        "Player Class must be provided with either name or entity"
      )
    }

    if (entity !== undefined) {
      this._entity = entity
      this._name = entity.name
    }

    if (name !== undefined) {
      this._name = name
    }
  }

  get name() {
    return this._name
  }

  get exists() {
    return this._repo
      .count({
        select: ["name"],
        where: { name: this._name },
      })
      .then(count => {
        return count >= 1 ? true : false
      })
      .catch(() => false)
  }

  get activities() {
    if (this._entity === undefined) {
      return {}
    } else {
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
      } = this._entity

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
  }

  get bosses() {
    if (this._entity === undefined) {
      return {}
    } else {
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
      } = this._entity

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
  }

  get skills() {
    if (this._entity === undefined) {
      return {}
    } else {
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
      } = this._entity

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

  async update() {
    if (this._name !== undefined) {
      const { data: jagexPlayer } = await fetchPlayerByName({
        name: this._name,
      })

      const playerParams = this._repo.create({
        name: this._name,
        ...jagexPlayer.activities,
        ...jagexPlayer.bosses,
        ...jagexPlayer.skills,
      })
      await this._repo.save(playerParams)
    }
  }
}
