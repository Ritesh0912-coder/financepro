declare module 'mongodb' {
    export class MongoClient {
        constructor(uri: string, options?: any);
        connect(): Promise<MongoClient>;
        db(name?: string): any;
    }
}
