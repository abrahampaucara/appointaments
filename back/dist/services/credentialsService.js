"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByCredentialsIdService = exports.validateCredentialsService = exports.createCredentialService = void 0;
const data_source_1 = require("../config/data-source");
let credentials = [];
let id = 1;
const createCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = yield data_source_1.CredentialModel.create({
        username: username,
        password: password
    });
    const result = yield data_source_1.CredentialModel.save(newCredential);
    return newCredential;
});
exports.createCredentialService = createCredentialService;
const validateCredentialsService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield data_source_1.CredentialModel.findOneBy({ username: username });
    if (credential === null) {
        return null;
    }
    if (credential.password === password) {
        return credential;
    }
    else {
        return null;
    }
});
exports.validateCredentialsService = validateCredentialsService;
const getUserByCredentialsIdService = (credentialsId) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield data_source_1.CredentialModel.findOneBy({ id: credentialsId });
    return credential;
});
exports.getUserByCredentialsIdService = getUserByCredentialsIdService;
exports.default = exports.createCredentialService;
