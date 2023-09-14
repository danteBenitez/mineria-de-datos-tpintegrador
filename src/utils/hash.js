import bcrypt from 'bcrypt';

export async function hashPassword(string) {
    return bcrypt.hash(string, 10);
}

export async function comparePassword(plain, encoded) {
    return bcrypt.compare(plain, encoded);
}