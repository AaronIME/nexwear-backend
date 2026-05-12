import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userAddress`: Exposes CRUD operations for the **UserAddress** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserAddresses
      * const userAddresses = await prisma.userAddress.findMany()
      * ```
      */
    get userAddress(): Prisma.UserAddressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Brands
      * const brands = await prisma.brand.findMany()
      * ```
      */
    get brand(): Prisma.BrandDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.category`: Exposes CRUD operations for the **Category** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Categories
      * const categories = await prisma.category.findMany()
      * ```
      */
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.color`: Exposes CRUD operations for the **Color** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Colors
      * const colors = await prisma.color.findMany()
      * ```
      */
    get color(): Prisma.ColorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.size`: Exposes CRUD operations for the **Size** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sizes
      * const sizes = await prisma.size.findMany()
      * ```
      */
    get size(): Prisma.SizeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.material`: Exposes CRUD operations for the **Material** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Materials
      * const materials = await prisma.material.findMany()
      * ```
      */
    get material(): Prisma.MaterialDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Tags
      * const tags = await prisma.tag.findMany()
      * ```
      */
    get tag(): Prisma.TagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.discount`: Exposes CRUD operations for the **Discount** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Discounts
      * const discounts = await prisma.discount.findMany()
      * ```
      */
    get discount(): Prisma.DiscountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.product`: Exposes CRUD operations for the **Product** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Products
      * const products = await prisma.product.findMany()
      * ```
      */
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductVariants
      * const productVariants = await prisma.productVariant.findMany()
      * ```
      */
    get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductImages
      * const productImages = await prisma.productImage.findMany()
      * ```
      */
    get productImage(): Prisma.ProductImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productVariantImage`: Exposes CRUD operations for the **ProductVariantImage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductVariantImages
      * const productVariantImages = await prisma.productVariantImage.findMany()
      * ```
      */
    get productVariantImage(): Prisma.ProductVariantImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productTag`: Exposes CRUD operations for the **ProductTag** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductTags
      * const productTags = await prisma.productTag.findMany()
      * ```
      */
    get productTag(): Prisma.ProductTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productMaterial`: Exposes CRUD operations for the **ProductMaterial** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductMaterials
      * const productMaterials = await prisma.productMaterial.findMany()
      * ```
      */
    get productMaterial(): Prisma.ProductMaterialDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Carts
      * const carts = await prisma.cart.findMany()
      * ```
      */
    get cart(): Prisma.CartDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CartItems
      * const cartItems = await prisma.cartItem.findMany()
      * ```
      */
    get cartItem(): Prisma.CartItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.order`: Exposes CRUD operations for the **Order** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Orders
      * const orders = await prisma.order.findMany()
      * ```
      */
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrderItems
      * const orderItems = await prisma.orderItem.findMany()
      * ```
      */
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Payments
      * const payments = await prisma.payment.findMany()
      * ```
      */
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.supportRequest`: Exposes CRUD operations for the **SupportRequest** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SupportRequests
      * const supportRequests = await prisma.supportRequest.findMany()
      * ```
      */
    get supportRequest(): Prisma.SupportRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.log`: Exposes CRUD operations for the **Log** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Logs
      * const logs = await prisma.log.findMany()
      * ```
      */
    get log(): Prisma.LogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.review`: Exposes CRUD operations for the **Review** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reviews
      * const reviews = await prisma.review.findMany()
      * ```
      */
    get review(): Prisma.ReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map