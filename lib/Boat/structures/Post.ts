import { endpoints } from "../util/Constants";
import { Boat } from "..";
import axios from "axios";

export class Post {
    private boat: Boat;

    /**
     * [Class Post]
     * @param boat - The Boat Client
     */
    constructor (boat: Boat) {
        this.boat = boat;
    };

    /**
     * [Post ServerCount]
     * @param {string} serverCount - The serverCount of the bot to post
     * @param {string} botId - The id of the bot [Optional if provided in the boat constructor]
     */
    serverCount (serverCount: string | number, botId?: string) {

        if (!serverCount) {
            throw new Error("Botoract [Boats<Post>] - Server Count is undefined");
        };

        const userBotId = botId ? botId : this.boat.botId;

        if (!userBotId) {
            throw new Error("Botoract [Boats<Post>] - BotId is undefined");
        };

        axios({
            method: "post",
            url: this.boat.apiurl + endpoints.bot + userBotId,
            headers: {
                "Authorization": this.boat.token
            },
            data: {
                "server_count": Number(serverCount)
            }
        }).then((res) => {
            const data = res.data;

            if (data.error === true) {
                throw new Error(`Boats [API] - ${res.data.message}`)
            };
        }).catch(() => {
            throw new ReferenceError("Boats [API] - Bad Request");
        });
    };
};