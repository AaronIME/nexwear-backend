"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./presentation/brand/routes");
const routes_2 = require("./presentation/category/routes");
const routes_3 = require("./presentation/color/routes");
const routes_4 = require("./presentation/discount/routes");
const routes_5 = require("./presentation/material/routes");
const routes_6 = require("./presentation/size/routes");
const routes_7 = require("./presentation/tag/routes");
const routes_8 = require("./presentation/product/routes");
const routes_9 = require("./presentation/product-variant/routes");
const routes_10 = require("./presentation/product-image/routes");
const routes_11 = require("./presentation/product-variant-image/routes");
const routes_12 = require("./presentation/user/routes");
const routes_13 = require("./presentation/user-address/routes");
const routes_14 = require("./presentation/cart/routes");
const routes_15 = require("./presentation/cart-item/routes");
const routes_16 = require("./presentation/order/routes");
const routes_17 = require("./presentation/order-item/routes");
const routes_18 = require("./presentation/payment/routes");
const routes_19 = require("./presentation/support-request/routes");
const routes_20 = require("./presentation/auth/routes");
const routes_21 = require("./presentation/review/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/auth', routes_20.AuthRoutes.routes);
        router.use('/api/brands', routes_1.BrandRoutes.routes);
        router.use('/api/categories', routes_2.CategoryRoutes.routes);
        router.use('/api/colors', routes_3.ColorRoutes.routes);
        router.use('/api/discounts', routes_4.DiscountRoutes.routes);
        router.use('/api/materials', routes_5.MaterialRoutes.routes);
        router.use('/api/sizes', routes_6.SizeRoutes.routes);
        router.use('/api/tags', routes_7.TagRoutes.routes);
        router.use('/api/products', routes_8.ProductRoutes.routes);
        router.use('/api/product-variants', routes_9.ProductVariantRoutes.routes);
        router.use('/api/product-images', routes_10.ProductImageRoutes.routes);
        router.use('/api/product-variant-images', routes_11.ProductVariantImageRoutes.routes);
        router.use('/api/users', routes_12.UserRoutes.routes);
        router.use('/api/user-addresses', routes_13.UserAddressRoutes.routes);
        router.use('/api/carts', routes_14.CartRoutes.routes);
        router.use('/api/cart-items', routes_15.CartItemRoutes.routes);
        router.use('/api/orders', routes_16.OrderRoutes.routes);
        router.use('/api/order-items', routes_17.OrderItemRoutes.routes);
        router.use('/api/payments', routes_18.PaymentRoutes.routes);
        router.use('/api/support-requests', routes_19.SupportRequestRoutes.routes);
        router.use('/api/reviews', routes_21.ReviewRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=routes.js.map