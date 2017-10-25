export class Appointment {
    user: string;
    date: Date; 
    time: Date;
    complaint: string;
    _id;

    constructor(user, date, time, complaint, _id) {
        this.user = user;
        this.date = date;
        this.time = time;
        this.complaint = complaint;
        this._id = _id;
    
    }
}