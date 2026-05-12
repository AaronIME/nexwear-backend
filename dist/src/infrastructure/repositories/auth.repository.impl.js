"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
class AuthRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    login(dto) {
        return this.datasource.login(dto);
    }
    register(dto) {
        return this.datasource.register(dto);
    }
    checkAuth(token) {
        return this.datasource.checkAuth(token);
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
//# sourceMappingURL=auth.repository.impl.js.map