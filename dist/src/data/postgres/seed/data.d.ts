export declare const seedData: {
    users: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        isActive: boolean;
        isDeleted: boolean;
    }[];
    userAddresses: {
        id: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        isDefault: boolean;
    }[];
    brands: {
        id: string;
        name: string;
    }[];
    categories: {
        id: string;
        name: string;
    }[];
    colors: {
        id: string;
        name: string;
        hex: string;
    }[];
    sizes: {
        id: string;
        name: string;
    }[];
    materials: {
        id: string;
        name: string;
    }[];
    tags: {
        id: string;
        name: string;
    }[];
    discounts: {
        id: string;
        name: string;
        percentage: number;
        startDate: Date;
        endDate: Date;
    }[];
    products: ({
        id: string;
        name: string;
        description: string;
        price: number;
        gender: string;
        brandId: string;
        categoryId: string;
        discountId: string;
        averageRating: number;
        reviewCount: number;
        ratingSum: number;
        soldCount: number;
        isActive: boolean;
        isDeleted: boolean;
    } | {
        id: string;
        name: string;
        description: string;
        price: number;
        gender: string;
        brandId: string;
        categoryId: string;
        averageRating: number;
        reviewCount: number;
        ratingSum: number;
        soldCount: number;
        isActive: boolean;
        isDeleted: boolean;
        discountId?: never;
    })[];
    productVariants: {
        id: string;
        productId: string;
        colorId: string;
        sizeId: string;
        stock: number;
        sku: string;
        price: number;
        isActive: boolean;
        isDeleted: boolean;
    }[];
    productImages: {
        id: string;
        productId: string;
        url: string;
        order: number;
    }[];
    productVariantImages: {
        id: string;
        productVariantId: string;
        url: string;
        order: number;
    }[];
    productTags: {
        productId: string;
        tagId: string;
    }[];
    productMaterials: {
        productId: string;
        materialId: string;
    }[];
    carts: {
        id: string;
        userId: string;
    }[];
    cartItems: {
        id: string;
        cartId: string;
        productVariantId: string;
        quantity: number;
    }[];
    /** Order: dirección embebida + desglose de totales (sin addressId) */
    orders: {
        id: string;
        userId: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        subtotal: number;
        tax: number;
        discount: number;
        shipping: number;
        total: number;
        status: string;
    }[];
    /** OrderItem: snapshot de producto/variante al comprar */
    orderItems: {
        id: string;
        orderId: string;
        productId: string;
        productVariantId: string;
        imageUrl: string;
        colorName: string;
        sizeName: string;
        productName: string;
        quantity: number;
        price: number;
    }[];
    payments: {
        id: string;
        orderId: string;
        method: string;
        status: string;
        amount: number;
        transactionId: string;
    }[];
    supportRequests: {
        id: string;
        userId: string;
        subject: string;
        message: string;
        status: string;
    }[];
    reviews: {
        id: string;
        userId: string;
        productId: string;
        score: number;
        comment: string;
        isVisible: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
};
//# sourceMappingURL=data.d.ts.map