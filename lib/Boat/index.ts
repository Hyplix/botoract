import { Bot } from "./structures/Bot";
import { Post } from "./structures/Post";
import { User } from "./structures/User";

export class Boat {
    public token: string;
    public apiurl: string;
    public botId: string;
    public post: Post;
    public users: User;
    public bots: Bot;

    /**
     * [Class Boat]
     * @param opt - The required options for the API
     * - token
     */
    constructor (opt: BoatOptions) {

        /**
         * API Token
         * @type {string}
         */
        this.token = opt.token ?? null;

        /**
         * API URL
         * @type {string}
         */
        this.apiurl = opt.apiurl ?? `https://discord.boats/api${opt.version ? "/v" + opt.version : ""}`

        /**
         * [Optional] - BotId
         * @type {string}
         */
        this.botId = opt.botId ?? null;

        /**
         * The post class for posting stats
         * @type {Post}
         */
        this.post = new Post(this);

        /**
         * The user class for fetching users
         * @type {User}
         */
        this.users = new User(this);

        /**
         * The bot class for fetching bots
         * @type {Bot}
         */
        this.bots = new Bot(this);
    };
};

export interface BoatOptions {
    token: string;
    apiurl?: string;
    version?: string;
    botId?: string;
};