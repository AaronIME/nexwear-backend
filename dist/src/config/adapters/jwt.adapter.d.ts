import ms from 'ms';
export declare class JwtAdapter {
    static generateToken: (payload: any, duration?: ms.StringValue) => Promise<string | null>;
    static validateToken: <T>(token: string) => Promise<T | null>;
}
//# sourceMappingURL=jwt.adapter.d.ts.map