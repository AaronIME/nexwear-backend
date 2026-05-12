"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRequestRepositoryImpl = void 0;
class SupportRequestRepositoryImpl {
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
    findByUserId(userId, dto) {
        return this.datasource.findByUserId(userId, dto);
    }
    updateStatus(dto) {
        return this.datasource.updateStatus(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.SupportRequestRepositoryImpl = SupportRequestRepositoryImpl;
//# sourceMappingURL=support-request.repository.impl.js.map