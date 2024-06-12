import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    findOneUser : async function(id: number) {
        return this.findOneBy({ id });
    },
    
    checkOneUser: async function (id: number): Promise<boolean>{
        const user = await this.findOneUser(id);
        if (!user) {
            return false;
        } else {
            return true;
        }
    }
});

export default CredentialRepository;