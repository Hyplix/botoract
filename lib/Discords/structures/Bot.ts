import Axios from "axios";
import { Discords } from "..";
import { endpoints } from "../utils/Constants";

export class BotResolvable {
    private discords: Discords;
    public name: string;
    public shortDescription: string;
    public color: string;
    public id: string;
    public discriminator: string;
    public addedAt: string;
    public addedTimestamp: number;
    public approvedAt: string;
    public approvedTimestamp: number;
    public library: string;
    public nsfw: boolean;
    public tag: string;
    public categories: string[];
    public ownerId: string;
    public owners: string[];
    public partnered: boolean;
    public prefix: string;
    public serverCount: number;
    public voteCount: number;
    public voteMonth: number;
    public votes24: number;
    public verified: boolean;
    public support: string;
    public status: discordStatus;
    public vanityUrl: string;
    public website: boolean;

    constructor(data: APIDiscordsBot, discords: Discords) {

        /**
         * The name of the bot
         * @type {string}
         */
        this.name = data.name;

        /**
         * The short description of the bot
         * @type {string}
         */
        this.shortDescription = data.short_desc;

        /**
         * The color of the bot
         * @type {string}
         */
        this.color = data.color;

        /**
         * The discriminator of the bot
         * @type {string}
         */
        this.discriminator = data.discrim;

        /**
         * The id of the bot
         * @type {string}
         */
        this.id = data.id;

        /**
         * The added time in ISO format when the bot added to the list
         * @type {string}
         */
        this.addedAt = new Date(data.added).toISOString(); // Pending

        /**
         * The time in ms when the bot added to the list
         * @type {number}
         */
        this.addedTimestamp = data.added;

        /**
         * The approved time in ISO format when the bot got approved in the list
         * @type {string} 
         */
        this.approvedAt = new Date(data.approvedTime).toISOString();

        /**
         * The approved time in ms when the bot got approved in the list
         * @type {number}
         */
        this.approvedTimestamp = data.approvedTime;

        /**
         * The library of the bot
         * @type {string}
         */
        this.library = data.library;

        /**
         * Is the bot nsfw or not
         * @type {boolean}
         */
        this.nsfw = data.nsfw;

        /**
         * The bot username with discriminator
         * @type {string}
         */
        this.tag = data.tag;

        /**
         * The categories of the bot
         * @type {string[]}
         */
        this.categories = data.tags;

        /**
         * The ownerId of the bot
         * @type {string}
         */
        this.ownerId = data.owner;

        /**
         * The other owners of the bot
         * @type {string[]}
         */
        this.owners = data.owners;

        /**
         * Is the bot partnered or not
         * @type {boolean}
         */
        this.partnered = data.partner;

        /**
         * The prefix of the bot
         * @type {string}
         */
        this.prefix = data.prefix;

        /**
         * The total servers count of the bot
         * @type {number}
         */
        this.serverCount = data.server_count;

        /**
         * The total votes count of the bot
         * @type {number}
         */
        this.voteCount = data.votes;

        /**
         * The votes count within 24 hours
         * @type {number}
         */
        this.votes24 = data.votes24;

        /**
         * Is the vote verified in site or not
         * @type {boolean}
         */
        this.verified = data.verified;

        /**
         * The support server link of the bot
         * @type {string}
         */
        this.support = data.support_server;

        /**
         * The status of the bot. E.g online
         * @type {discordStatus}
         */
        this.status = data.status;

        /**
         * The vanity of the bot
         * @type {string}
         */
        this.vanityUrl = data.vanityUrl;

        /**
         * The website link of the bot
         * @type {string}
         */
        this.website = data.website_bot;

        /**
         * The discords class
         * @type {Discords}
         */
        this.discords = discords;
    };

    /**
    * Fetch bot votes [Token required]
    * @param {string} apiKey - The apiKey of the bot owner
    */
    public async fetchVotes(apiKey?: string): Promise<APIDiscordsBotVotes> {
        return new Promise(async (resolve, reject) => {
            Axios({
                method: "get",
                url: this.discords.apiUrl + endpoints.bot + this.id + "/votes",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": apiKey ?? this.discords.apiKey
                }
            }).then(res => {
               const data = res.data as APIDiscordsBotVotes;
               
               return resolve(data);
            }).catch((err) => {
                reject(new Error(`Botoract [Discords] - ${err.response.data.message} (fetchVotes)`));
            });
        });
    };

    public postServerStats(serverCount: number, apiKey?: string) {

        if (!serverCount) {
            throw new Error("Botoract [Discords] - Invalid serverCount (postServerStats)");
        };

        const token = apiKey ?? this.discords.apiKey;

        if (!token) {
            throw new Error("Botoract [Discords] - No apiKey provided [postServerStats]");
        };

        Axios({
            method: "post",
            url: this.discords.apiUrl + endpoints.bot + this.id,
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey ?? this.discords.apiKey
            },
            data: JSON.stringify({
                server_count: Number(serverCount)
            })
        }).catch(err => {
            throw new Error(`Botoract [Discords] - ${err.response.data.message} (postServerStats)`);
        });
    };
};

export class Bot {
    private discords: Discords;

    constructor(discords: Discords) {
        this.discords = discords;
    };

    public async fetch(botId: string): Promise<BotResolvable> {
        return new Promise(async (resolve) => {
            Axios({
                method: "get",
                url: this.discords.apiUrl + endpoints.bot + botId
            }).then((res) => {

                resolve(new BotResolvable(res.data, this.discords));

            }).catch(err => {
                resolve(null);
            });
        });
    };
};


export interface APIDiscordsBot {
    added: number;
    approved: boolean;
    approvedTime: number;
    avatar: string;
    color: string;
    discrim: string;
    featured: boolean;
    github: string;
    id: string;
    invite: string;
    library: string;
    name: string;
    nsfw: boolean;
    owner: string;
    owners: string[];
    partner: boolean;
    prefix: string;
    server_count: number;
    short_desc: string;
    status: discordStatus;
    support_server: string;
    tag: string;
    tags: string[];
    vanityUrl: string;
    verified: boolean;
    votes: number;
    votes24: number;
    votesMonth: number;
    website_bot: boolean;
};

export interface APIDiscordsBotVotes {
    hasVoted: string[];
    hasVoted24: string[];
    repeatVotersAll: string[];
    repeatVotersMonth: string[];
    votes: number;
    votes24: number;
    votesMonth: number;
};

type discordStatus = "online" | "idle" | "dnd" | "offline";