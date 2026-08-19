import { AuthRepository } from "../repositories/authRepository.js";
import { PasswordSecurity } from "../security/passwordSecurity.js";
import { JwtSecurity } from "../security/jwtSecurity.js";

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async login(ref: string, passwordPlain: string) {
        const user = await this.authRepository.getUserAccount(ref); 

        if (!user) throw new Error("INVALID_REF");

        const isValid = await PasswordSecurity.compare(passwordPlain, user.passwordHash);

        if (!isValid) throw new Error("INVALID_PASSWORD");

        const token = JwtSecurity.generateToken({
            userId: user.id,
            role: user.role,
        });

        return {
            token,
            user: { id: user.id, ref: user.ref, role: user.role }
        };
    }
}