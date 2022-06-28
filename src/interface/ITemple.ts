export interface ITemple {
    id: number;
    temple_id: string
    history_tamil: string;
    history_english: string;
    contact_tamil: string;
    contact_english: string;
    location_tamil: string;
    location_english: string;
    direction_tamil: string;
    direction_english: string;
    festival_tamil: string;
    festival_english: string;
    special_tamil: string;
    special_english: string;
    prayer_tamil: string;
    prayer_english: string;
    consecration_tamil: string;
    consecration_english: string;
    open_time_tamil: string;
    open_time_english: string;
    name_tamil: string;
    name_english: string;
    deity_name_tamil: string;
    deity_name_english: string;
    image?: any;
    video_id: string;
    latitude: string;
    longitude: string;
    god: number;
    district: number;
    star: number
}

export interface ITemples {
    count: number;
    next?: any;
    previous?: any;
    results: ITemple[];
}
