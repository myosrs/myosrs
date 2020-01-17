import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { gamemodes } from "../config/gamemodes"
import { AccountEntity } from "../database/entities/AccountEntity"
import { Player } from "../lib/Player"
import { fetchPlayerByName, Gamemodes } from "../utils/APIWrapper"
import { errors } from "../utils/Errors"

export class PlayerController {
  /**
   * 1. Check if "gamemode" endpoint parameter is valid (or default to standard)
   * 1.1. Return a 404 (endpoint does not exist) if an invalid gamemode was passed
   * 2. Check if the "fresh" query parameter was set to true
   * 2.1. Skip to 4 if "true"
   * 3. Check if the requested player exists in the database already
   * 3.1. If a database entry exists, return from database
   * 3.2 Continue if no database entry exists
   * 4. Fetch a new set of data from the ultimate source of truth (OSRS API)
   * 4.1. Parse and conform Jagex data to MyOSRS Object
   * 5. Return MyOSRS Player Object
   */
  static async show(req: Request, res: Response) {
    /**
     * Check if "gamemode" endpoint parameter is valid (or default to standard)
     */
    const gamemode = (req.params.gamemode || "standard") as Gamemodes

    /**
     * Return a 404 (endpoint does not exist) if an invalid gamemode was passed
     */
    if (!gamemodes.includes(gamemode)) {
      res.sendStatus(404).send(errors.invalidGamemode)
    }

    /**
     * Check if the "fresh" query parameter was set to true
     */
    const fresh = req.query.fresh === "true"

    /**
     * Check if the requested player exists in the database already
     */
    const exists = await new Player({ name: req.params.name }).exists

    /**
     * Initialize the Player Repository to communicate with the database
     */
    const playerRepository = getRepository(AccountEntity)

    /**
     * Database entry exists and the user has not explicitly requested fresh data
     */
    if (exists && !fresh) {
      /**
       * Fetch the Player Entity from the database
       */
      const entity = await playerRepository.findOneOrFail({
        where: {
          name: req.params.name,
        },
        cache: true,
      })

      /**
       * Initialize the Player Entity into a Player Utility Class
       */
      const { name, activities, bosses, skills } = new Player({ entity })

      /**
       * Return MyOSRS Player Object
       */
      return res.send({
        data: {
          name,
          object: "player",
          activities,
          bosses,
          skills,
        },
      })
    } else {
      /**
       * Database entry does NOT exist
       */

      const { data: jagexPlayer } = await fetchPlayerByName({
        name: req.params.name,
      })

      const playerParams = playerRepository.create({
        name: req.params.name,
        ...jagexPlayer.activities,
        ...jagexPlayer.bosses,
        ...jagexPlayer.skills,
      })
      await playerRepository.save(playerParams)

      /**
       * Fetch the Player Entity from the database
       */
      const entity = await playerRepository.findOneOrFail({
        name: req.params.name,
      })

      /**
       * Initialize the Player Entity into a Player Utility Class
       */
      const { name, activities, bosses, skills } = new Player({
        entity,
      })

      /**
       * Return MyOSRS Player Object
       */
      return res.send({
        data: {
          name,
          object: "player",
          activities,
          bosses,
          skills,
        },
      })
    }
  }
}
