/// <reference types="typescript" />

declare module 'rskjs-util' {
    export function isValidChecksumAddress(address: string, chainId: number): boolean;
    export function isValidAddress(address: string): boolean;
    export function toChecksumAddress(address: string, chainId?: number): string;
    export function stripHexPrefix(address: string): string;
    export function keccak(elem: string): string;
}