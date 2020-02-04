export interface Search {
    flightName: string;
    departureLocation: string;
    arrivalLocation: string;
    departureDate: Date;
    duration: Date;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
    travelId: number;
    flightId: number;
}
export interface FlightListResponse {
    flightDetails: Search[];
    statusCode: number;
    message: string;

}
