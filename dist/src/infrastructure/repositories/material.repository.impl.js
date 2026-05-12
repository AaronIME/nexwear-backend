"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialRepositoryImpl = void 0;
class MaterialRepositoryImpl {
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
    update(dto) {
        return this.datasource.update(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.MaterialRepositoryImpl = MaterialRepositoryImpl;
//# sourceMappingURL=material.repository.impl.js.map