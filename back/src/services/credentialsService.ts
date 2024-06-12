import ICredential from "../intefaces/ICredential";
import CredentialDto from "../intefaces/ICredential";
import { Credential } from "../entities/Credential";
import { CredentialModel } from "../config/data-source";
import { User } from "../entities/User";

let credentials : Credential[] = [];
let id: number = 1;

export const createCredentialService = async(username: string, password: string) : Promise<Credential> => {
    const newCredential = await CredentialModel.create({
        username: username,
        password: password
    });
    const result = await CredentialModel.save(newCredential);
    return newCredential;
}

export const validateCredentialsService = async(username: string, password: string) : Promise<Credential | null> => {
    const credential = await CredentialModel.findOneBy({username: username});
    if (credential === null) {
        return null;
    }
    if (credential.password === password) {
        return credential;
    } else {
        return null;
    }
}

export const getUserByCredentialsIdService = async(credentialsId: number) : Promise<Credential | null> => {
    const credential = await CredentialModel.findOneBy({id: credentialsId});
    return credential;
}

export default createCredentialService;