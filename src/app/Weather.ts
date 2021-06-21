export class Weather
{
    day : string;
    event : number;
    temperature : string;
    windspeed : string;
    
    
    

    constructor(day : string, event : number, temperature : string, windspeed : string)
    {
        this.day = day;
        this.event = event;
        this.temperature = temperature;
        this.windspeed = windspeed;
        
    }

}