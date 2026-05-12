import { Router } from 'express';

import { BrandRoutes } from './presentation/brand/routes';
import { CategoryRoutes } from './presentation/category/routes';
import { ColorRoutes } from './presentation/color/routes';
import { DiscountRoutes } from './presentation/discount/routes';
import { MaterialRoutes } from './presentation/material/routes';
import { SizeRoutes } from './presentation/size/routes';
import { TagRoutes } from './presentation/tag/routes';
import { ProductRoutes } from './presentation/product/routes';
import { ProductVariantRoutes } from './presentation/product-variant/routes';
import { ProductImageRoutes } from './presentation/product-image/routes';
import { ProductVariantImageRoutes } from './presentation/product-variant-image/routes';
import { UserRoutes } from './presentation/user/routes';
import { UserAddressRoutes } from './presentation/user-address/routes';
import { CartRoutes } from './presentation/cart/routes';
import { CartItemRoutes } from './presentation/cart-item/routes';
import { OrderRoutes } from './presentation/order/routes';
import { OrderItemRoutes } from './presentation/order-item/routes';
import { PaymentRoutes } from './presentation/payment/routes';
import { SupportRequestRoutes } from './presentation/support-request/routes';
import { AuthRoutes } from './presentation/auth/routes';
import { ReviewRoutes } from './presentation/review/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/brands', BrandRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/colors', ColorRoutes.routes);
    router.use('/api/discounts', DiscountRoutes.routes);
    router.use('/api/materials', MaterialRoutes.routes);
    router.use('/api/sizes', SizeRoutes.routes);
    router.use('/api/tags', TagRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/product-variants', ProductVariantRoutes.routes);
    router.use('/api/product-images', ProductImageRoutes.routes);
    router.use('/api/product-variant-images', ProductVariantImageRoutes.routes);
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/user-addresses', UserAddressRoutes.routes);
    router.use('/api/carts', CartRoutes.routes);
    router.use('/api/cart-items', CartItemRoutes.routes);
    router.use('/api/orders', OrderRoutes.routes);
    router.use('/api/order-items', OrderItemRoutes.routes);
    router.use('/api/payments', PaymentRoutes.routes);
    router.use('/api/support-requests', SupportRequestRoutes.routes);
    router.use('/api/reviews', ReviewRoutes.routes);

    return router;
  }
}