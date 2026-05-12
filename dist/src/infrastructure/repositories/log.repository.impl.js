"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogRepositoryImpl = void 0;
class LogRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(dto) {
        return this.datasource.create(dto);
    }
    findAll(dto) {
        return this.datasource.findAll(dto);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
}
exports.LogRepositoryImpl = LogRepositoryImpl;
//# sourceMappingURL=log.repository.impl.js.map