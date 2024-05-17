// webSocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, filter, fromEvent, } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket!: Socket; 
    private webSocketUrl = 'http://localhost:3000'

    constructor() {
        this.initializeWebSocket();
    }

    private initializeWebSocket(): void {
        this.socket = io(this.webSocketUrl) as unknown as Socket

        this.socket.on('Connect', () => { this.socket.emit('notification'), { data: { message: 'newNotification' } } });
        this.listenToNotification();
    }

    listenToNotification(): Observable<any> {

        const notif = fromEvent(this.socket as any, 'notification')

        return notif
    }
}