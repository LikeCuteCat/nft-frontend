import { BaseApi } from './base.api';

export class NotificationApi extends BaseApi {
	constructor() {
		super('http://localhost:5000/notifications');
	}

	async getAllNotifications(): Promise<any[]> {
		const res = await this.get(`/`);
		return res.data.notifications;
	}
}
