export class UserResolvable {
    public name: string;
    public bio: string;
    public discriminator: string;
    public flags: number;
    public id: string;
    
    constructor (data: APIDiscordsUser) {
        
        /**
         * The name of the user
         * @type {string}
         */
        this.name = data.username;
    }
};

export class User {

}

interface APIDiscordsUser {
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