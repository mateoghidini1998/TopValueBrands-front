export class HttpAPI {
    public static async fetch(url: string, options: RequestInit): Promise<any>{
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error(`Network response was not ok`);
        }
        return response.json();
    }

    
    public static async get(url: string, options?: RequestInit): Promise<any> {
        return this.fetch(url, { method: 'GET', ...options });
    }


    public static async post(url: string, body: object, accessToken?: string): Promise<any> {
        return this.fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body),
        })
    }
}
