import { endpoints } from "../util/Constants";
import { Boat } from "..";
import Axios from "axios";

export class BotResolvable {
    public name: string;
    public id: string;
    public prefix: string;
    public library: string;
    public avatar: string;
    public description: BoatBotDescription;
    public owners: string[];
    public invite: string;
    public support: string;
    public website: string;
    public github: string;
    public serverCount: string;
    public voteCount: string;
    public listed: boolean;
    public inQueue: boolean;
    public certified: boolean;
    public categories: string[];
    public ratings: BoatBotRating;

    constructor(data: APIBoatBot) {
        /**
         * The name of the bot
         * @type {string}
         */
        this.name = data.bot_name;

        /**
         * The id of the bot
         * @type {string}
         */
        this.id = data.bot_id;

        /**
         * The prefix of the bot
         * @type {string}
         */
        this.prefix = data.bot_prefix;

        /**
         * The library of the bot
         * @type {string}
         */
        this.library = data.bot_library;

        /**
         * The avatar code of the bot
         * @type {string}
         */
        this.avatar = data.bot_avatar;

        /**
         * The short and long description of the bot
         * @type {BoatBotDescription}
         */
        this.description = {
            short: data.bot_short_desc,
            long: data.bot_long_desc
        };

        /**
         * The owners of the bot
         * @type {string[]}
         */
        this.owners = data.bot_owners;

        /**
         * The invite link of the bot
         * @type {string}
         */
        this.invite = data.bot_invite_link;

        /**
         * The support server link of the bot
         * @type {string}
         */
        this.support = data.bot_support_discord;

        /**
         * The website of the bot
         * @type {string}
         */
        this.website = data.bot_website;

        /**
         * The github repository link of the bot if open sourced
         * @type {string}
         */
        this.github = data.bot_github_repo;

        /**
         * The total server count of the bot
         * @type {string}
         */
        this.serverCount = data.bot_server_count;

        /**
         * The total vote count of the bot
         * @type {string}
         */
        this.voteCount = data.bot_vote_count;

        /**
         * Is the bot listed
         * @type {boolean}
         */
        this.listed = (data.bot_visible !== 2) ? true : false;

        /**
         * Is the bot in queue
         * @type {boolean}
         */
        this.inQueue = data.bot_in_queue;

        /**
         * Is the bot certified
         * @type {boolean}
         */
        this.certified = data.bot_certified;

        /**
         * The categories of the bot
         * @type {string[]}
         */
        this.categories = data.bot_categories;

        /**
         * The ratings of the bot
         * @type {string[]}
         */
        this.ratings = {
            five: data.bot_rate_five,
            four: data.bot_rate_four,
            three: data.bot_rate_three,
            two: data.bot_rate_two,
            one: data.bot_rate_one,
            total: Number(data.bot_rate_five) + Number(data.bot_rate_four) + Number(data.bot_rate_three) + Number(data.bot_rate_two) + Number(data.bot_rate_one)
        };
    };
};

export class Bot {
    private boat: Boat;

    constructor(boat: Boat) {
        this.boat = boat;
    };

    public async fetch(botId: string): Promise<BotResolvable> {

        try {

            const res = await Axios({
                method: "get",
                url: this.boat.apiurl + endpoints.bot + botId
            });

            return new BotResolvable(res.data);

        } catch (err) {
            return undefined;
        };
    };

    /**
 * [User isVoted]
 * @param {string} botId - The id of the bot [Optional if provided in the boat constructor]
 * @param {string} userId - The id of the user
 * @returns {boolean}
 */
    public async isVoted(botId: string, userId: string): Promise<Boolean> {

        try {

            const res = await Axios.get(this.boat.apiurl + endpoints.bot + botId + `/voted?id=${userId}`);
            const data = res.data;

            if (data.error) {
                throw new Error(`Boat [API] - ${data.message}`);
            };

            if (data.voted !== false) {
                return true;
            } else {
                return false;
            };

        } catch (err) {
            throw new Error("Boats [API] - Invalid Bot/User id or API is down");
        };
    };
};

interface BoatBotRating {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
    total: number;
};

interface BoatBotDescription {
    short: string;
    long: string;
};

interface APIBoatBot {
    bot_id: string;
    bot_name: string;
    bot_prefix: string;
    bot_library: string;
    bot_avatar: string;
    bot_short_desc: string;
    bot_long_desc: string;
    bot_owners: string[];
    bot_invite_link: string;
    bot_support_discord: string;
    bot_website: string;
    bot_github_repo: string;
    bot_server_count: string;
    bot_vote_count: string;
    bot_visible: number;
    bot_in_queue: boolean;
    bot_certified: boolean;
    bot_categories: string[];
    bot_rate_one: number;
    bot_rate_two: number;
    bot_rate_three: number;
    bot_rate_four: number;
    bot_rate_five: number;
    bot_rate_average: number;
};