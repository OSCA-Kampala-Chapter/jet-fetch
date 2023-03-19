/**
 * The Jet Class configurations
 * @param baseUrl string, the request base url and it is reqiured
 * @param interceptWithJWTAuth boolean, defaults to false, if true, the package will attempt attaching the jwt token as explained in the docs
 * @param token any, This can be any source of token like a function to execute to obtain, a token itself, once provided, the
 * package won't be checking localstorage for any token, but will always refer to it for the token
 * @param tokenBearerKey string, optional - defines how the token is stored in your localstorage, this will be the key to check for in the localstorage and defaults to 'SecretKey'
 * @param sendTokenAs string, optional - this is how the token will be sent to the backend, in short, this is how your backend expects your token and it defaults to 'Bearer' and by convention, can be one of of Bearer, Jwt, Token, by you can pass it as anything you want or empty "" to send nothing on its position
 * @param defaultHeaders HeadersInit, these are headers you want to be common to all requests, you can override these by re-defining the ssame in the subsequent request, those will overrride what you had declared on initialisation. Defaults to an empty object
 * @since 19th/03/23 @param cachable boolean, defaults to true, this makes requests cached thus improving the perfomance of the request. Once its on, it add the {'cache': 'default'} to the headers, and once turned off, it turns the same to 'no-cache'. Still this can be overriden by passing the cache header on your subsequent request headers. To globally disable caching, turn this off.
 */
interface Configuration {
    baseUrl: string;
    interceptWithJWTAuth?: boolean;
    token?: any;
    tokenBearerKey?: string;
    sendTokenAs?: string;
    defaultHeaders?: HeadersInit;
    cachable?: boolean;
}
export declare class Jet {
    baseUrl: string;
    token: any;
    tokenBearerKey: string;
    sendTokenAs: string;
    interceptWithJWTAuth: boolean;
    headers: HeadersInit;
    cachable: boolean | undefined;
    constructor(options: Configuration);
    attachAuthorisation(): {
        Authorization: string;
    } | null;
    generateAuthHeader(token: any): {
        Authorization: string;
    } | null;
    flyer(url: RequestInfo | URL | undefined, data: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Checks if an object is empty
     * @param {object} obj The object to check
     * @returns bool
     */
    isEmpty(obj: object): boolean;
    /**
     * Sets the body part of the request
     * @param {object} body-> Request body
     * @param {object} config-> Request configurations
     * @returns Object -> Configuration with body combined
     */
    _setBody(body?: object, config?: RequestInit): RequestInit | undefined;
    _setType(config: RequestInit, type: string | null): RequestInit;
    _getHeaders(): {
        cache: string;
    } | {
        cache: string;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string | undefined): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number | undefined, end?: number | undefined): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number | undefined): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: [string, string], index: number, array: [string, string][]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S_1 extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S_2, thisArg?: any): S_2 | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number | undefined, end?: number | undefined): [string, string][];
        copyWithin(target: number, start: number, end?: number | undefined): [string, string][];
        entries(): IterableIterator<[number, [string, string]]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<[string, string]>;
        includes(searchElement: [string, string], fromIndex?: number | undefined): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<[string, string]>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
    } | {
        cache: string;
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
        /**
         * Checks if an object is empty
         * @param {object} obj The object to check
         * @returns bool
         */
        entries(): IterableIterator<[string, string]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<string>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
    };
    _setHeaders(headers: HeadersInit | undefined): {
        cache: string;
    } | {
        cache: string;
    } | {
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string | undefined): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number | undefined, end?: number | undefined): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number | undefined): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: [string, string], index: number, array: [string, string][]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S_1 extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S_2, thisArg?: any): S_2 | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number | undefined, end?: number | undefined): [string, string][];
        copyWithin(target: number, start: number, end?: number | undefined): [string, string][];
        entries(): IterableIterator<[number, [string, string]]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<[string, string]>;
        includes(searchElement: [string, string], fromIndex?: number | undefined): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<[string, string]>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
        cache: string;
    } | {
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
        /**
         * Checks if an object is empty
         * @param {object} obj The object to check
         * @returns bool
         */
        entries(): IterableIterator<[string, string]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<string>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
        cache: string;
    } | {
        cache: string;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string | undefined): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number | undefined, end?: number | undefined): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number | undefined): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: [string, string], index: number, array: [string, string][]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S_1 extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S_2, thisArg?: any): S_2 | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number | undefined, end?: number | undefined): [string, string][];
        copyWithin(target: number, start: number, end?: number | undefined): [string, string][];
        entries(): IterableIterator<[number, [string, string]]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<[string, string]>;
        includes(searchElement: [string, string], fromIndex?: number | undefined): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<[string, string]>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
    } | {
        cache: string;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string | undefined): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number | undefined, end?: number | undefined): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number | undefined): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: [string, string], index: number, array: [string, string][]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S_1 extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S_2, thisArg?: any): S_2 | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number | undefined, end?: number | undefined): [string, string][];
        copyWithin(target: number, start: number, end?: number | undefined): [string, string][];
        entries(): IterableIterator<[number, [string, string]]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<[string, string]>;
        includes(searchElement: [string, string], fromIndex?: number | undefined): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<[string, string]>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
    } | {
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string | undefined): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number | undefined, end?: number | undefined): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number | undefined): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: [string, string], index: number, array: [string, string][]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S_1 extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S_2, thisArg?: any): S_2 | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number | undefined, end?: number | undefined): [string, string][];
        copyWithin(target: number, start: number, end?: number | undefined): [string, string][];
        entries(): IterableIterator<[number, [string, string]]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<[string, string]>;
        includes(searchElement: [string, string], fromIndex?: number | undefined): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<[string, string]>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
        cache: string;
    } | {
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
        /**
         * Checks if an object is empty
         * @param {object} obj The object to check
         * @returns bool
         */
        entries(): IterableIterator<[string, string]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<string>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
        cache: string;
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string | undefined): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number | undefined, end?: number | undefined): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number | undefined): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S_1 extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S_2, thisArg?: any): S_2 | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number | undefined, end?: number | undefined): [string, string][];
        copyWithin(target: number, start: number, end?: number | undefined): [string, string][];
        includes(searchElement: [string, string], fromIndex?: number | undefined): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
    } | {
        cache: string;
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
        /**
         * Checks if an object is empty
         * @param {object} obj The object to check
         * @returns bool
         */
        entries(): IterableIterator<[string, string]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<string>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
    } | {
        cache: string;
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
        /**
         * Checks if an object is empty
         * @param {object} obj The object to check
         * @returns bool
         */
        entries(): IterableIterator<[string, string]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<string>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
    } | {
        length: number;
        toString(): string;
        toLocaleString(): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string | undefined): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number | undefined, end?: number | undefined): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number | undefined): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number | undefined): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: [string, string], index: number, array: [string, string][]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S_1 extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S_1, thisArg?: any): S_1[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_1, initialValue: U_1): U_1;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U_2, initialValue: U_2): U_2;
        find<S_2 extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S_2, thisArg?: any): S_2 | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number | undefined, end?: number | undefined): [string, string][];
        copyWithin(target: number, start: number, end?: number | undefined): [string, string][];
        entries(): IterableIterator<[number, [string, string]]>;
        keys(): IterableIterator<number>;
        values(): IterableIterator<[string, string]>;
        includes(searchElement: [string, string], fromIndex?: number | undefined): boolean;
        flatMap<U_3, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.iterator](): IterableIterator<[string, string]>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
        cache: string;
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
    } | {
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
        /**
         * Checks if an object is empty
         * @param {object} obj The object to check
         * @returns bool
         */
        entries(): IterableIterator<[string, string]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<string>;
        [Symbol.iterator](): IterableIterator<[string, string]>;
        cache: string;
    };
    _setUrl(url?: string): string | undefined;
    _extractHeadersFromConfigs(config: RequestInit): HeadersInit;
    __attach_auth(): HeadersInit;
    /**
     * Populates the body and configurations of the request, should not be called directly from the instannce
     * @protected
     * @param {object} body Request body/data
     * @author jet2018
     * @param {object} configs Request configurations such as headers and any other settings
     * @see [customising fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_your_own_request_object)
     * @param headers Request headers
     * @param {string} type Request type, that is, post, get, put ...
     * @returns Object
     */
    _populateData(type?: string, body?: any, headers?: any, configs?: any, secure?: boolean): any;
    _requestDefinition(url: string | undefined, type: string | undefined, body: any, headers: any, config: any, secure?: boolean): {
        newUrl: string | undefined;
        data: any;
    };
    /**
     * Makes a GET request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} headers Request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    get(url?: string, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a secure GET request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} headers Request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    gets(url?: string, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a POST request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    post(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a secure POST request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    posts(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a PATCH request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    patch(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a secure PATCH request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    patchs(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a PUT request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    put(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a secure PUT request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    puts(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a DELETE request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    delete(url?: string, body?: object, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * Makes a DELETE request to the server
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @returns Promise
     */
    deletes(url?: string, body?: object | null, headers?: HeadersInit | undefined, config?: RequestInit | undefined): Promise<{
        response: Response;
        data: any;
    }>;
    /**
     * If the pre-configured request types are not working for you, using this endpoint enables you to configure your own ground up.
     * @author jet2018
     * @param {string} url Relative or absolute url of the endpoint to hit. Providing the `baseUrl` automatically makes this relative to it
     * @param {string} type Request type, can be GET, PUT, PATCH, DELETE etc
     * @param {object} body The body of the request.
     * @param {object} headers The request headers
     * @param {object} config The request configuration
     * @param {boolean} secure Whether the token should be attached or not
     * @returns Promise
     */
    custom(url: string, type: string, body?: object | null, headers?: HeadersInit | undefined, config?: RequestInit | undefined, secure?: boolean): Promise<{
        response: Response;
        data: any;
    }>;
}
export {};
