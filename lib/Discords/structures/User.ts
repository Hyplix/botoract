import Axios from "axios";
import { Discords } from "..";
import { endpoints } from "../../Boat/util/Constants";
import { apiUrl } from "../utils/Constants";
import { APIDiscordsBot, BotResolvable } from "./Bot";

export class UserResolvable {
    private discords: Discords;
    public name: string;
    public bio: string;
    public discriminator: string;
    public id: string;
    public flags: number;
    public tag: string;
    public house: string;
    public isAdmin: boolean;
    public isBeta: boolean;
    public isJrMod: boolean;
    public isMod: boolean;
    public isPartner: boolean;
    public teamTrees: boolean;
    public website: string;
    
    constructor (data: APIDiscordsUser, discords: Discords) {
        
        /**
         * The name of the user
         * @type {string}
         */
        this.name = data.username;

        /**
         * The bio of the user
         * @param {string}
         */
        this.bio = data.bio;

        /**
         * The discriminator of the user
         * @type {string}
         */
        this.discriminator = data.discrim;

        /**
         * The id of the user
         * @type {string}
         */
        this.id = data.id;

        /**
         * The flags of the user
         * @type {string}
         */
        this.flags = data.flags;

        /**
         * The username with discriminator of the user
         * @type {string}
         */
        this.tag = data.tag;

        /**
         * Is the user admin?
         * @type {boolean}
         */
        this.isAdmin = data.isAdmin;

        /**
         * Is the user beta?
         * @type {boolean}
         */
        this.isBeta = data.isBeta;
        
        /**
         * Is the user junior mod?
         * @type {boolean}
         */
        this.isJrMod = data.isJrMod;

        /**
         * Is the user partnered?
         * @type {boolean}
         */
        this.isPartner = data.isPartner;
        
        /**
         * The website link of the user
         * @type {string}
         */
        this.website = data.website;

        /**
         * Is the user teamtrees supporter?
         * @type {boolean}
         */
        this.teamTrees = data.teamTrees;

        /**
         * The house of the user [seriously]
         * @type {string}
         */
        this.house = data.house;

        /**
         * The discords class
         * @type {Discords}
         */
        this.discords = discords;
    };

    public async fetchBots (): Promise<BotResolvable[]> {
        return new Promise(async (resolve, reject) => {
            Axios({
                method: "get",
                url: apiUrl + endpoints.user + this.id + "/bots"
            }).then(async res => {
                const data = res.data as APIDiscordsUserBot;
                const bots = [];

                return data.bots.forEach(async (id) => {
                    const bot = await this.discords.bots.fetch(id);

                    if (bot) {
                        bots.push(bot);
                    };

                    if (bots.length === data.bots.length) {
                        return resolve(bots);
                    };

                });

            }).catch(() => {
                resolve(null);
            });
        });
    };
};

export class User {
    private discords: Discords;

    constructor(discords: Discords) {
        this.discords = discords;
    };

    public async fetch(userId: string): Promise<UserResolvable> {
        return new Promise(async (resolve) => {
            Axios({
                method: "get",
                url: this.discords.apiUrl + endpoints.user + userId
            }).then((res) => {

                resolve(new UserResolvable(res.data, this.discords));

            }).catch(err => {
                resolve(null);
            });
        });
    };
};

export interface APIDiscordsUserBot {
    bots: string[];
};

export interface APIDiscordsUser {
    avatar: string;
    background: string;
    bio: string;
    covidFund: boolean;
    discrim: string;
    flags: number;
    house: string;
    id: string;
    isAdmin: boolean;
    isBeta: boolean;
    isJrMod: boolean;
    isMod: boolean;
    isPartner: boolean;
    status: string;
    tag: string;
    teamTrees: boolean;
    username: string;
    website: string;
};