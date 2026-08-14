import bcrypt from "bcrypt";

const salt_round: number = 10;

export const PasswordSecurity = {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, salt_round);
    },

    async compare(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }
}