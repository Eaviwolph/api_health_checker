export function requester(url: string, method: string, body?: any): Promise<Response> {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/endpoints';
    console.log(`Requesting ${method} ${baseUrl + url}`);
    return fetch(baseUrl + url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined
    })
}