import {useEffect, useMemo} from "react";
import SockJS, {OpenEvent} from "sockjs-client";

export function useSocketConnection<TIn, TOut = any>(
    url: string,
    messageHandler: (data: TIn) => void,
    factory: SocketConnectionConstructor<TOut, TIn> = SocketConnection,
    connectHandler?: (ev: OpenEvent) => void,
    closeHandler?: (ev: CloseEvent) => void,
): [SocketConnection<TOut, TIn>] {
    const connection = useMemo(() => {
        return new factory(url, messageHandler, connectHandler, closeHandler);
    }, [factory, url, messageHandler, connectHandler, closeHandler]);

    useEffect(() => {
        return () => {
            return connection.close();
        };
    }, [connection]);

    return [connection];
}

export interface SocketConnectionConstructor<TOut, TIn> {
    new (
        url: string,
        messageHandler: (data: TIn) => void,
        connectHandler?: (ev: OpenEvent) => void,
        closeHandler?: (ev: CloseEvent) => void,
    ): SocketConnection<TOut, TIn>;
}

export default class SocketConnection<TOut, TIn> {
    private readonly webSocket: WebSocket;
    private readonly connect: Promise<WebSocket>;

    constructor(
        url: string,
        messageHandler: (data: TIn) => void,
        connectHandler?: (ev: OpenEvent) => void,
        closeHandler?: (ev: CloseEvent) => void,
    ) {


        this.webSocket = new SockJS(url);

        this.connect = new Promise(resolve => {
            this.webSocket.onopen = ev => {
                resolve(this.webSocket);

                if (connectHandler) connectHandler(ev);
            };
        });

        this.webSocket.onclose = (event: CloseEvent) => {
            if (closeHandler) closeHandler(event);
        };

        this.webSocket.onmessage = (message: MessageEvent) => {
            if (messageHandler) {
                const data = JSON.parse(message.data);
                messageHandler(data);
            }
        };
    }

    // send(data: TOut) {
    //     const messageString = JSON.stringify(data);
    //
    //     if (this.webSocket.readyState === 1) {
    //         this.webSocket.send(messageString);
    //     } else {
    //         this.connect.then(socket => {
    //             socket.send(messageString);
    //         });
    //     }
    // }

    close() {
        this.webSocket.close();
    }
}
