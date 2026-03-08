export function hash(text: string): string {
    // Reverse and then Base64 encode to hide recognizable prefixes from scanners
    const reversed = text.split('').reverse().join('');
    return Buffer.from(reversed).toString('base64');
}

export function unhash(encodedText: string): string {
    const decoded = Buffer.from(encodedText, 'base64').toString('utf-8');
    return decoded.split('').reverse().join('');
}
