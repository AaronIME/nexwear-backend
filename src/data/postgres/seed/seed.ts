import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../../config/adapters/env.adapter";
import { PaymentMethod, PrismaClient } from "../../../../generated/prisma/client";
import { seedData } from "./data";
import { Role } from "../../../domain/types/role.type";
import { OrderStatus } from "../../../domain/types/order-status.type";
import { PaymentStatus } from "../../../domain/types/payment-status.type";
import { SupportStatus } from "../../../domain/types/support-status.type";
import { bcryptAdapter } from "../../../config/adapters/bcrypt.adapter";
import { Gender } from "../../../domain/types/gender.type";

(() => {
    main();
})();

async function main() {
    console.log('Starting seed...');

    const adapter = new PrismaPg({
        connectionString: envs.POSTGRES_URL,
    });
    const prisma = new PrismaClient({adapter});

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
        data: seedData.users.map((user) => { return {...user, role: user.role as Role, password: bcryptAdapter.hash(user.password)}}),
    });

    await prisma.userAddress.createMany({
        data: seedData.userAddresses,
    });

    await prisma.brand.createMany({
        data: seedData.brands,
    });
    
    await prisma.category.createMany({
        data: seedData.categories,
    });

    await prisma.color.createMany({
        data: seedData.colors,
    });

    await prisma.size.createMany({
        data: seedData.sizes,
    })

    await prisma.material.createMany({
        data: seedData.materials,
    })

    await prisma.tag.createMany({
        data: seedData.tags,
    })

    await prisma.discount.createMany({
        data: seedData.discounts,
    })

    await prisma.product.createMany({
        data: seedData.products.map((product) => { return {...product, gender: product.gender as Gender}}),
    })

    await prisma.productVariant.createMany({
        data: seedData.productVariants,
    })

    await prisma.productVariantImage.createMany({
        data: seedData.productVariantImages,
    })

    await prisma.productImage.createMany({
        data: seedData.productImages,
    })

    await prisma.productTag.createMany({
        data: seedData.productTags,
    })

    await prisma.productMaterial.createMany({
        data: seedData.productMaterials,
    })

    await prisma.cart.createMany({
        data: seedData.carts,
    })

    await prisma.cartItem.createMany({
        data: seedData.cartItems,
    })

    await prisma.order.createMany({
        data: seedData.orders.map((order) => { return {...order, status: order.status as OrderStatus}}),
    })

    await prisma.orderItem.createMany({
        data: seedData.orderItems,
    })

    await prisma.payment.createMany({
        data: seedData.payments.map((payment) => { return {...payment, status: payment.status as PaymentStatus, method: payment.method as PaymentMethod}}),
    })

    await prisma.supportRequest.createMany({
        data: seedData.supportRequests.map((supportRequest) => { return {...supportRequest, status: supportRequest.status as SupportStatus}}),
    })

    await prisma.review.createMany({
        data: seedData.reviews,
    })

    console.log('Seed completed successfully');
    await prisma.$disconnect();
}