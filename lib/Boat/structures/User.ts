import { endpoints } from "../util/Constants";
import { Boat } from "..";
import Axios from "axios";

export class UserResolvable {
    public name: string;
    public id: string;
    public bio: string;
    public website: string;
    public premium: boolean;
    public social: BoatUserSocial;

    constructor(data: APIBoatUser) {
        /**
         * The name of the user
         * @type {string}
         */
        this.name = data.user_name;

        /**
         * The id of the user
         * @type {string}
         */
        this.id = data.user_id;

        /**
         * The bio of the user
         * @type {string}
         */
        this.bio = data.user_bio;

        /**
         * The website of the user
         * @param {string}
         */
        this.website = data.user_website;

        /**
         * The social links of the user
         * @param {BoatUserSocial}
         */
        this.social = {
            twitter: data.user_twitter ?? null,
            github: data.user_github ?? null,
            instagram: data.user_instagram ?? null,
            reddit: data.user_reddit ?? null
        };

        /**
         * Is the user premium
         * @param {boolean}
         */
        this.premium = (data.user_premium !== null && data.user_premium === 1) ? true : false;
    };
};

export class User {
    private boat: Boat;

    constructor(boat: Boat) {
        this.boat = boat;
    };

    /**
     * [User Fetch]
     * @param {string} userId - The id of the user to fetch
     * @returns {UserResolvable}
     */
    public async fetch (userId: string): Promise<UserResolvable> {

        try {
            const res = await Axios.get(
                this.boat.apiurl + endpoints.user + userId
            );

            return new UserResolvable(res.data);
        } catch (err) {
            return undefined;
        };
    };
};


export interface APIBoatUser {
    user_id: string;
    user_name: string;
    user_website: string;
    user_twitter: string;
    user_github: string;
    user_instagram: string;
    user_reddit: string;
    user_premium: number;
    user_bio: string;
};

interface BoatUserSocial {
    twitter?: string;
    github?: string;
    instagram?: string;
    reddit?: string;
};