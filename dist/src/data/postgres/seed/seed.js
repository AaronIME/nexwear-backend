"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_pg_1 = require("@prisma/adapter-pg");
const env_adapter_1 = require("../../../config/adapters/env.adapter");
const client_1 = require("../../../../generated/prisma/client");
const data_1 = require("./data");
const bcrypt_adapter_1 = require("../../../config/adapters/bcrypt.adapter");
(() => {
    main();
})();
async function main() {
    console.log('Starting seed...');
    const adapter = new adapter_pg_1.PrismaPg({
        connectionString: env_adapter_1.envs.POSTGRES_URL,
    });
    const prisma = new client_1.PrismaClient({ adapter });
    await prisma.$connect();
    await prisma.brand.deleteMany();
    await prisma.category.deleteMany();
    await prisma.color.deleteMany();
    await prisma.size.deleteMany();
    await prisma.material.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.discount.deleteMany();
    await prisma.productVariantImage.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productTag.deleteMany();
    await prisma.productMaterial.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.supportRequest.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.review.deleteMany();
    await prisma.user.createMany({
        data: data_1.seedData.users.map((user) => { return { ...user, role: user.role, password: bcrypt_adapter_1.bcryptAdapter.hash(user.password) }; }),
    });
    await prisma.userAddress.createMany({
        data: data_1.seedData.userAddresses,
    });
    await prisma.brand.createMany({
        data: data_1.seedData.brands,
    });
    await prisma.category.createMany({
        data: data_1.seedData.categories,
    });
    await prisma.color.createMany({
        data: data_1.seedData.colors,
    });
    await prisma.size.createMany({
        data: data_1.seedData.sizes,
    });
    await prisma.material.createMany({
        data: data_1.seedData.materials,
    });
    await prisma.tag.createMany({
        data: data_1.seedData.tags,
    });
    await prisma.discount.createMany({
        data: data_1.seedData.discounts,
    });
    await prisma.product.createMany({
        data: data_1.seedData.products.map((product) => { return { ...product, gender: product.gender }; }),
    });
    await prisma.productVariant.createMany({
        data: data_1.seedData.productVariants,
    });
    await prisma.productVariantImage.createMany({
        data: data_1.seedData.productVariantImages,
    });
    await prisma.productImage.createMany({
        data: data_1.seedData.productImages,
    });
    await prisma.productTag.createMany({
        data: data_1.seedData.productTags,
    });
    await prisma.productMaterial.createMany({
        data: data_1.seedData.productMaterials,
    });
    await prisma.cart.createMany({
        data: data_1.seedData.carts,
    });
    await prisma.cartItem.createMany({
        data: data_1.seedData.cartItems,
    });
    await prisma.order.createMany({
        data: data_1.seedData.orders.map((order) => { return { ...order, status: order.status }; }),
    });
    await prisma.orderItem.createMany({
        data: data_1.seedData.orderItems,
    });
    await prisma.payment.createMany({
        data: data_1.seedData.payments.map((payment) => { return { ...payment, status: payment.status, method: payment.method }; }),
    });
    await prisma.supportRequest.createMany({
        data: data_1.seedData.supportRequests.map((supportRequest) => { return { ...supportRequest, status: supportRequest.status }; }),
    });
    await prisma.review.createMany({
        data: data_1.seedData.reviews,
    });
    console.log('Seed completed successfully');
    await prisma.$disconnect();
}
//# sourceMappingURL=seed.js.map