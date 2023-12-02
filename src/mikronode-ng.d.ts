// mikronode-ng.d.ts

declare module "mikronode-ng" {
  export default class RouterOSAPI {
    constructor(options: { host: string; user: string; password: string });

    connect(): Promise<void>;

    write(command: string, params?: object): Promise<any>;

    close(): void;
  }
}
