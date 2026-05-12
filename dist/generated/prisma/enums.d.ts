export declare const Gender: {
    readonly MEN: "MEN";
    readonly WOMEN: "WOMEN";
    readonly UNISEX: "UNISEX";
    readonly KIDS: "KIDS";
};
export type Gender = (typeof Gender)[keyof typeof Gender];
export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const PaymentMethod: {
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly DEBIT_CARD: "DEBIT_CARD";
    readonly PAYPAL: "PAYPAL";
    readonly BANK_TRANSFER: "BANK_TRANSFER";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const SupportStatus: {
    readonly OPEN: "OPEN";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly RESOLVED: "RESOLVED";
    readonly CLOSED: "CLOSED";
};
export type SupportStatus = (typeof SupportStatus)[keyof typeof SupportStatus];
export declare const LogLevel: {
    readonly INFO: "INFO";
    readonly ERROR: "ERROR";
    readonly WARN: "WARN";
    readonly DEBUG: "DEBUG";
};
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
//# sourceMappingURL=enums.d.ts.map