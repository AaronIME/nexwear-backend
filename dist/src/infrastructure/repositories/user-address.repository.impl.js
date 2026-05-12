"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressRepositoryImpl = void 0;
class UserAddressRepositoryImpl {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
    }
    create(dto) {
        return this.datasource.create(dto);
    }
    findById(id) {
        return this.datasource.findById(id);
    }
    findByUserId(userId) {
        return this.datasource.findByUserId(userId);
    }
    setDefault(id, userId) {
        return this.datasource.setDefault(id, userId);
    }
    update(dto) {
        return this.datasource.update(dto);
    }
    delete(id) {
        return this.datasource.delete(id);
    }
}
exports.UserAddressRepositoryImpl = UserAddressRepositoryImpl;
//# sourceMappingURL=user-address.repository.impl.js.map