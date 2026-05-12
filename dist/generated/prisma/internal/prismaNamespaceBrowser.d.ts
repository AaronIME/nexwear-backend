import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly UserAddress: "UserAddress";
    readonly Brand: "Brand";
    readonly Category: "Category";
    readonly Color: "Color";
    readonly Size: "Size";
    readonly Material: "Material";
    readonly Tag: "Tag";
    readonly Discount: "Discount";
    readonly Product: "Product";
    readonly ProductVariant: "ProductVariant";
    readonly ProductImage: "ProductImage";
    readonly ProductVariantImage: "ProductVariantImage";
    readonly ProductTag: "ProductTag";
    readonly ProductMaterial: "ProductMaterial";
    readonly Cart: "Cart";
    readonly CartItem: "CartItem";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly Payment: "Payment";
    readonly SupportRequest: "SupportRequest";
    readonly Log: "Log";
    readonly Review: "Review";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly isActive: "isActive";
    readonly isDeleted: "isDeleted";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserAddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly street: "street";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly isDefault: "isDefault";
};
export type UserAddressScalarFieldEnum = (typeof UserAddressScalarFieldEnum)[keyof typeof UserAddressScalarFieldEnum];
export declare const BrandScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const ColorScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly hex: "hex";
};
export type ColorScalarFieldEnum = (typeof ColorScalarFieldEnum)[keyof typeof ColorScalarFieldEnum];
export declare const SizeScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type SizeScalarFieldEnum = (typeof SizeScalarFieldEnum)[keyof typeof SizeScalarFieldEnum];
export declare const MaterialScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type MaterialScalarFieldEnum = (typeof MaterialScalarFieldEnum)[keyof typeof MaterialScalarFieldEnum];
export declare const TagScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum];
export declare const DiscountScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly percentage: "percentage";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
};
export type DiscountScalarFieldEnum = (typeof DiscountScalarFieldEnum)[keyof typeof DiscountScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly price: "price";
    readonly brandId: "brandId";
    readonly categoryId: "categoryId";
    readonly gender: "gender";
    readonly discountId: "discountId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly averageRating: "averageRating";
    readonly reviewCount: "reviewCount";
    readonly ratingSum: "ratingSum";
    readonly soldCount: "soldCount";
    readonly isDeleted: "isDeleted";
    readonly isActive: "isActive";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductVariantScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly colorId: "colorId";
    readonly sizeId: "sizeId";
    readonly stock: "stock";
    readonly sku: "sku";
    readonly price: "price";
    readonly soldCount: "soldCount";
    readonly isActive: "isActive";
    readonly isDeleted: "isDeleted";
};
export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly url: "url";
    readonly order: "order";
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const ProductVariantImageScalarFieldEnum: {
    readonly id: "id";
    readonly productVariantId: "productVariantId";
    readonly url: "url";
    readonly order: "order";
};
export type ProductVariantImageScalarFieldEnum = (typeof ProductVariantImageScalarFieldEnum)[keyof typeof ProductVariantImageScalarFieldEnum];
export declare const ProductTagScalarFieldEnum: {
    readonly productId: "productId";
    readonly tagId: "tagId";
};
export type ProductTagScalarFieldEnum = (typeof ProductTagScalarFieldEnum)[keyof typeof ProductTagScalarFieldEnum];
export declare const ProductMaterialScalarFieldEnum: {
    readonly productId: "productId";
    readonly materialId: "materialId";
};
export type ProductMaterialScalarFieldEnum = (typeof ProductMaterialScalarFieldEnum)[keyof typeof ProductMaterialScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly id: "id";
    readonly cartId: "cartId";
    readonly productVariantId: "productVariantId";
    readonly quantity: "quantity";
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly street: "street";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly subtotal: "subtotal";
    readonly tax: "tax";
    readonly discount: "discount";
    readonly shipping: "shipping";
    readonly total: "total";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly productVariantId: "productVariantId";
    readonly imageUrl: "imageUrl";
    readonly colorName: "colorName";
    readonly sizeName: "sizeName";
    readonly productName: "productName";
    readonly quantity: "quantity";
    readonly price: "price";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly method: "method";
    readonly status: "status";
    readonly amount: "amount";
    readonly transactionId: "transactionId";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const SupportRequestScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly subject: "subject";
    readonly message: "message";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type SupportRequestScalarFieldEnum = (typeof SupportRequestScalarFieldEnum)[keyof typeof SupportRequestScalarFieldEnum];
export declare const LogScalarFieldEnum: {
    readonly id: "id";
    readonly level: "level";
    readonly message: "message";
    readonly service: "service";
    readonly timestamp: "timestamp";
};
export type LogScalarFieldEnum = (typeof LogScalarFieldEnum)[keyof typeof LogScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly productId: "productId";
    readonly score: "score";
    readonly comment: "comment";
    readonly isVisible: "isVisible";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map