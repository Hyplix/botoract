import Axios from "axios";
import { Bot } from "./structures/Bot";

export class Discords {
    public apiKey: string;
    public apiUrl: string;
    public bots: Bot;

    constructor (opt: DiscordsOptions) {
        /**
         * The apiKey of the user
         * @type {string}
         */
        this.apiKey = opt.apiKey || null;

        /**
         * The apiUrl of discords.com
         * @type {string}
         */
        this.apiUrl = opt.apiUrl ? opt.apiUrl : "https://discords.com/bots/api";
        
        /**
         * The bot class to interact with the bot endpoint
         * @type {Bot}
         */
        this.bots = new Bot(this);
    };
};

export interface DiscordsOptions {
    apiKey: string;
    apiUrl?: string;
};