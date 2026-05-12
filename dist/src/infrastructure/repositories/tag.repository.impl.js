"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRepositoryImpl = void 0;
class TagRepositoryImpl {
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
exports.TagRepositoryImpl = TagRepositoryImpl;
//# sourceMappingURL=tag.repository.impl.js.map