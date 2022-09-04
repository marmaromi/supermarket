import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    private readonly notifier: NotifierService;

    constructor(notifierService: NotifierService) {
        this.notifier = notifierService;
    }

    public success(message: string): void {    
        this.notifier.notify('success', message);
    }

    public error(err: any): void {
        this.notifier.notify('error',this.extractError(err));
    }

    private extractError(err: any): string {

        if (typeof err === 'string') return err;

        if (typeof err.response?.data === 'string') return err.response.data;

        if (Array.isArray(err.response?.data)) return err.response.data[0];

        if (typeof err.message === 'string') return err.message;

        return 'שגיאה כללית - בבקשה נסה שנית.';
    }
}
